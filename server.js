#!/usr/bin/env node
/**
 * Visual UI Studio v3.0 — Zero-Dependency Local Workspace Bridge & Static Server
 * Supports:
 * - CLI usage: `npx visual-ui-studio [folder]` or `node server.js [--open]`
 * - Automatic port fallback if 4567 is busy
 * - Safe path traversal validation & automatic .bak backup before saving
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const BASE_PORT = parseInt(process.env.PORT, 10) || 4567;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Determine initial workspace directory cleanly across any machine
function resolveInitialWorkspace() {
  const args = process.argv.slice(2).filter(a => !a.startsWith('-'));
  if (args[0] && fs.existsSync(args[0]) && fs.statSync(args[0]).isDirectory()) {
    return path.resolve(args[0]);
  }
  if (process.env.UI_STUDIO_WORKSPACE && fs.existsSync(process.env.UI_STUDIO_WORKSPACE)) {
    return path.resolve(process.env.UI_STUDIO_WORKSPACE);
  }
  // If user's Portfolio folder exists on this machine, connect to it out-of-the-box
  if (fs.existsSync('d:\\Khoa\\Porfolio') && fs.statSync('d:\\Khoa\\Porfolio').isDirectory()) {
    return 'd:\\Khoa\\Porfolio';
  }
  // If invoked from another directory via npx, use process.cwd()
  if (path.resolve(process.cwd()) !== path.resolve(__dirname)) {
    return path.resolve(process.cwd());
  }
  return path.resolve(__dirname);
}

let currentWorkspaceDir = resolveInitialWorkspace();
const backedUpFiles = new Set();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.webmanifest': 'application/manifest+json'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function isSafeInsideDir(baseDir, targetPath) {
  const normalizedBase = path.resolve(baseDir);
  const normalizedTarget = path.resolve(targetPath);
  const rel = path.relative(normalizedBase, normalizedTarget);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

function listHtmlFiles(dirPath) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'public') continue;
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isFile() && /\.html?$/i.test(entry.name) && !entry.name.endsWith('.bak.html')) {
        const stats = fs.statSync(fullPath);
        results.push({
          name: entry.name,
          relativePath: entry.name,
          size: stats.size,
          modifiedAt: stats.mtime
        });
      } else if (entry.isDirectory()) {
        try {
          const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });
          for (const sub of subEntries) {
            if (sub.isFile() && /\.html?$/i.test(sub.name) && !sub.name.endsWith('.bak.html')) {
              const subFull = path.join(fullPath, sub.name);
              const stats = fs.statSync(subFull);
              results.push({
                name: `${entry.name}/${sub.name}`,
                relativePath: `${entry.name}/${sub.name}`,
                size: stats.size,
                modifiedAt: stats.mtime
              });
            }
          }
        } catch (_) {}
      }
    }
  } catch (err) {
    console.error('Error listing HTML files:', err.message);
  }
  return results;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function serveStaticFile(res, filePath) {
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  const mime = getMimeType(filePath);
  res.writeHead(200, {
    'Content-Type': mime,
    'Cache-Control': 'no-store, no-cache, must-revalidate'
  });
  fs.createReadStream(filePath).pipe(res);
}

function openBrowser(url) {
  const plat = process.platform;
  const cmd =
    plat === 'win32'
      ? `start "" "${url}"`
      : plat === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    if (req.method === 'GET' && (pathname === '/api/workspace' || pathname === '/api/files')) {
      const fileEntries = listHtmlFiles(currentWorkspaceDir);
      return sendJson(res, 200, {
        workspaceDir: currentWorkspaceDir,
        files: pathname === '/api/files' ? fileEntries.map(f => f.relativePath) : fileEntries,
        fileEntries
      });
    }

    if (req.method === 'GET' && pathname === '/api/raw-html') {
      const relFile = (parsedUrl.searchParams.get('file') || 'index.html').replace(/^[/\\]+/, '');
      const targetPath = path.resolve(currentWorkspaceDir, relFile);
      if (!isSafeInsideDir(currentWorkspaceDir, targetPath) || !fs.existsSync(targetPath)) {
        return sendJson(res, 404, { error: 'File not found' });
      }
      const content = fs.readFileSync(targetPath, 'utf8');
      return sendJson(res, 200, { file: relFile, content });
    }

    if (req.method === 'POST' && (pathname === '/api/workspace' || pathname === '/api/set-workspace')) {
      const body = await readJsonBody(req);
      const targetDir = (body.workspaceDir || body.folderPath || '').trim();
      if (!targetDir || !fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
        return sendJson(res, 400, {
          success: false,
          error: `Thư mục không tồn tại hoặc không hợp lệ: ${targetDir}`
        });
      }
      currentWorkspaceDir = path.resolve(targetDir);
      const fileEntries = listHtmlFiles(currentWorkspaceDir);
      return sendJson(res, 200, {
        success: true,
        workspaceDir: currentWorkspaceDir,
        files: fileEntries.map(f => f.relativePath),
        fileEntries
      });
    }

    if (req.method === 'POST' && pathname === '/api/save') {
      const body = await readJsonBody(req);
      const relFile = (body.relativePath || body.file || '').replace(/^[/\\]+/, '');
      const htmlContent = body.htmlContent !== undefined ? body.htmlContent : body.content;

      if (!relFile || typeof htmlContent !== 'string') {
        return sendJson(res, 400, { error: 'Thiếu đường dẫn file hoặc nội dung HTML.' });
      }

      const targetPath = path.resolve(currentWorkspaceDir, relFile);
      if (!isSafeInsideDir(currentWorkspaceDir, targetPath)) {
        return sendJson(res, 403, { error: 'Đường dẫn file nằm ngoài thư mục dự án.' });
      }

      let backupCreated = false;
      if (fs.existsSync(targetPath) && !backedUpFiles.has(targetPath)) {
        const backupPath = `${targetPath}.bak`;
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(targetPath, backupPath);
          backupCreated = true;
        }
        backedUpFiles.add(targetPath);
      }

      fs.writeFileSync(targetPath, htmlContent, 'utf8');
      return sendJson(res, 200, {
        success: true,
        savedPath: targetPath,
        backupCreated,
        timestamp: new Date().toISOString()
      });
    }

    if (req.method === 'POST' && pathname === '/api/restore-backup') {
      const body = await readJsonBody(req);
      const relFile = (body.relativePath || '').replace(/^[/\\]+/, '');
      const targetPath = path.resolve(currentWorkspaceDir, relFile);
      if (!isSafeInsideDir(currentWorkspaceDir, targetPath)) {
        return sendJson(res, 403, { error: 'Đường dẫn file nằm ngoài thư mục dự án.' });
      }
      const backupPath = `${targetPath}.bak`;

      if (!fs.existsSync(backupPath)) {
        return sendJson(res, 404, { error: 'Chưa có file sao lưu (.bak) cho trang này.' });
      }
      fs.copyFileSync(backupPath, targetPath);
      return sendJson(res, 200, {
        success: true,
        restoredPath: targetPath
      });
    }

    if (pathname.startsWith('/workspace/')) {
      const relPath = pathname.slice('/workspace/'.length);
      const targetFile = path.resolve(currentWorkspaceDir, relPath);
      if (!isSafeInsideDir(currentWorkspaceDir, targetFile)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      return serveStaticFile(res, targetFile);
    }

    let studioFile = pathname === '/' ? '/index.html' : pathname;
    const resolvedStudioFile = path.resolve(PUBLIC_DIR, '.' + studioFile);
    if (!isSafeInsideDir(PUBLIC_DIR, resolvedStudioFile)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    return serveStaticFile(res, resolvedStudioFile);
  } catch (err) {
    console.error('Server error:', err);
    sendJson(res, 500, { error: err.message || 'Internal Server Error' });
  }
});

function startServer(portToTry) {
  server.once('error', err => {
    if (err.code === 'EADDRINUSE' && portToTry < BASE_PORT + 20) {
      startServer(portToTry + 1);
    } else {
      console.error('Could not start server:', err);
      process.exit(1);
    }
  });

  server.listen(portToTry, () => {
    const url = `http://localhost:${portToTry}`;
    console.log(`\n🚀 Visual UI Studio v3.0 đang chạy tại: ${url}`);
    console.log(`📂 Thư mục dự án đang kết nối: ${currentWorkspaceDir}\n`);
    if (process.argv.includes('--open')) {
      openBrowser(url);
    }
  });
}

startServer(BASE_PORT);
