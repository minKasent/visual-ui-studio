const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
let compileOfficialTsxToHtml = null;
try {
  ({ compileOfficialTsxToHtml } = require('./tsx-ssr-engine.js'));
} catch (e) {}

function fetchRemoteText(urlStr, redirects = 4) {
  return new Promise((resolve, reject) => {
    const client = urlStr.startsWith('https') ? https : http;
    client.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0 VisualUIStudio/6.0' } }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirects > 0) {
        return resolve(fetchRemoteText(new URL(res.headers.location, urlStr).href, redirects - 1));
      }
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

const PORT = process.env.PORT || 4567;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Default linked project directory (auto-detects user's Portfolio folder if present)
let currentWorkspaceDir = fs.existsSync('d:\\Khoa\\Porfolio')
  ? 'd:\\Khoa\\Porfolio'
  : path.join(PUBLIC_DIR, 'demo');

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

function listHtmlFiles(dirPath) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
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
        } catch (_) {
          // Ignore unreadable subdirectories
        }
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

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // API: Get current workspace & HTML files
    if (req.method === 'GET' && pathname === '/api/workspace') {
      return sendJson(res, 200, {
        workspaceDir: currentWorkspaceDir,
        files: listHtmlFiles(currentWorkspaceDir)
      });
    }

    // API: Change active workspace directory
    if (req.method === 'POST' && pathname === '/api/workspace') {
      const body = await readJsonBody(req);
      const targetDir = (body.workspaceDir || '').trim();
      if (!targetDir || !fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
        return sendJson(res, 400, {
          error: `Thư mục không tồn tại hoặc không hợp lệ: ${targetDir}`
        });
      }
      currentWorkspaceDir = path.resolve(targetDir);
      return sendJson(res, 200, {
        workspaceDir: currentWorkspaceDir,
        files: listHtmlFiles(currentWorkspaceDir)
      });
    }

    // API: Save edited HTML directly back to source file on disk
    if (req.method === 'POST' && pathname === '/api/save') {
      const body = await readJsonBody(req);
      const relFile = (body.relativePath || '').replace(/^[/\\]+/, '');
      const htmlContent = body.htmlContent;

      if (!relFile || typeof htmlContent !== 'string') {
        return sendJson(res, 400, { error: 'Thiếu đường dẫn file hoặc nội dung HTML.' });
      }

      const targetPath = path.resolve(currentWorkspaceDir, relFile);
      const normalizedWorkspace = path.resolve(currentWorkspaceDir);
      if (!targetPath.startsWith(normalizedWorkspace)) {
        return sendJson(res, 403, { error: 'Đường dẫn file nằm ngoài thư mục dự án.' });
      }

      // Create a one-time .bak backup before overwriting original file in this session
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

    // API: Restore from .bak backup
    if (req.method === 'POST' && pathname === '/api/restore-backup') {
      const body = await readJsonBody(req);
      const relFile = (body.relativePath || '').replace(/^[/\\]+/, '');
      const targetPath = path.resolve(currentWorkspaceDir, relFile);
      const backupPath = `${targetPath}.bak`;

      if (!fs.existsSync(backupPath)) {
        return sendJson(res, 404, { error: 'Không tìm thấy file sao lưu (.bak) cho trang này.' });
      }
      fs.copyFileSync(backupPath, targetPath);
      return sendJson(res, 200, {
        success: true,
        restoredPath: targetPath
      });
    }

    // API: Compile official React/TSX component code via SSR Engine (Sucrase + Lucide Static + Shadcn/Origin Primitives)
    if (req.method === 'POST' && pathname === '/api/compile-tsx') {
      const body = await readJsonBody(req);
      const rawCode = body.code || '';
      const compiledHtml = compileOfficialTsxToHtml ? compileOfficialTsxToHtml(rawCode) : null;
      return sendJson(res, 200, {
        success: Boolean(compiledHtml),
        compiledHtml: compiledHtml || ''
      });
    }

    // API: Fetch live component JSON/TSX directly from official UI Library Registry URL
    if (req.method === 'POST' && pathname === '/api/fetch-registry-url') {
      const body = await readJsonBody(req);
      const targetUrl = (body.url || '').trim();
      if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
        return sendJson(res, 400, { error: 'Hãy nhập URL hợp lệ (https://...)' });
      }
      const remote = await fetchRemoteText(targetUrl);
      if (remote.status !== 200 || !remote.body) {
        return sendJson(res, 404, { error: `Không tải được từ URL (HTTP ${remote.status})` });
      }
      let code = remote.body;
      let name = path.basename(targetUrl).replace(/\.(json|tsx|jsx)$/i, '');
      let desc = '';
      if (targetUrl.endsWith('.json') || remote.body.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(remote.body);
          name = parsed.title || parsed.description || parsed.name || name;
          desc = parsed.description || '';
          if (parsed.files && parsed.files[0] && parsed.files[0].content) {
            code = parsed.files[0].content;
          }
        } catch (e) {}
      }
      const compiledHtml = compileOfficialTsxToHtml ? compileOfficialTsxToHtml(code) : null;
      return sendJson(res, 200, {
        success: true,
        name,
        desc,
        rawCode: code,
        compiledHtml: compiledHtml || ''
      });
    }

    // Serve target workspace files under /workspace/*
    if (pathname.startsWith('/workspace/')) {
      const relPath = pathname.slice('/workspace/'.length);
      const targetFile = path.resolve(currentWorkspaceDir, relPath);
      const normalizedWorkspace = path.resolve(currentWorkspaceDir);
      if (!targetFile.startsWith(normalizedWorkspace)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      return serveStaticFile(res, targetFile);
    }

    // Serve Studio UI files from public/
    let studioFile = pathname === '/' ? '/index.html' : pathname;
    const resolvedStudioFile = path.resolve(PUBLIC_DIR, '.' + studioFile);
    if (!resolvedStudioFile.startsWith(path.resolve(PUBLIC_DIR))) {
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

server.listen(PORT, () => {
  console.log(`\n🚀 Visual UI Studio đang chạy tại: http://localhost:${PORT}`);
  console.log(`📂 Thư mục dự án đang kết nối: ${currentWorkspaceDir}\n`);
});
