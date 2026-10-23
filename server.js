const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync, execSync } = require('child_process');

const PORT = process.env.PORT || 4567;
const PUBLIC_DIR = path.join(__dirname, 'public');
const AUTH_CONFIG_FILE = path.join(__dirname, '.studio-github-auth.json');

// Default linked project directory (auto-detects user's Portfolio folder if present)
let currentWorkspaceDir = fs.existsSync('d:\\Khoa\\Porfolio')
  ? 'd:\\Khoa\\Porfolio'
  : path.join(PUBLIC_DIR, 'demo');

const backedUpFiles = new Set();

// Persisted GitHub Auth State (supports both gh CLI keyring & Personal Access Token)
let githubSession = {
  loggedOutManually: false,
  token: '',
  user: null
};

try {
  if (fs.existsSync(AUTH_CONFIG_FILE)) {
    const saved = JSON.parse(fs.readFileSync(AUTH_CONFIG_FILE, 'utf8'));
    githubSession = { ...githubSession, ...saved };
  }
} catch (_) {}

function saveGithubSession() {
  try {
    fs.writeFileSync(AUTH_CONFIG_FILE, JSON.stringify(githubSession, null, 2), 'utf8');
  } catch (_) {}
}

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

// ============================================================================
// 1. LIVE WEBSITE URL FETCHER, ASSET REWRITER & LOCAL CLONER (/api/clone-url)
// ============================================================================
function fetchUrlBuffer(targetUrl, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 6) {
      return reject(new Error('Quá nhiều lần chuyển hướng (Too many redirects).'));
    }
    let parsed;
    try {
      parsed = new URL(targetUrl);
    } catch (e) {
      return reject(new Error('Đường dẫn URL không hợp lệ.'));
    }

    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(
      parsed,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,text/css,*/*;q=0.8',
          'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
          'Accept-Encoding': 'identity'
        },
        timeout: 15000,
        rejectUnauthorized: false
      },
      res => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          const nextUrl = new URL(res.headers.location, parsed.href).href;
          res.resume();
          return resolve(fetchUrlBuffer(nextUrl, redirectCount + 1));
        }
        if (res.statusCode < 200 || res.statusCode >= 400) {
          res.resume();
          return reject(new Error(`Trang web trả về mã lỗi HTTP ${res.statusCode}`));
        }
        const chunks = [];
        let totalBytes = 0;
        res.on('data', chunk => {
          totalBytes += chunk.length;
          if (totalBytes <= 8 * 1024 * 1024) {
            chunks.push(chunk);
          }
        });
        res.on('end', () => {
          resolve({
            finalUrl: parsed.href,
            origin: parsed.origin,
            hostname: parsed.hostname,
            pathname: parsed.pathname,
            contentType: res.headers['content-type'] || '',
            body: Buffer.concat(chunks).toString('utf8')
          });
        });
      }
    );
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Hết thời gian chờ (Timeout) khi tải trang web.'));
    });
    req.on('error', reject);
  });
}

function resolveCssUrls(cssText, baseUrl) {
  if (!cssText) return '';
  return cssText.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (match, quote, rawPath) => {
    const trimmed = (rawPath || '').trim();
    if (!trimmed || trimmed.startsWith('data:') || trimmed.startsWith('#') || trimmed.startsWith('blob:')) {
      return match;
    }
    try {
      const abs = new URL(trimmed, baseUrl).href;
      return `url("${abs}")`;
    } catch (_) {
      return match;
    }
  });
}

async function cloneAndRewriteWebpage(rawInputUrl, customFileName = '') {
  let normalizedUrl = (rawInputUrl || '').trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = 'https://' + normalizedUrl;
  }

  const fetched = await fetchUrlBuffer(normalizedUrl);
  const finalUrl = fetched.finalUrl;
  let html = fetched.body || '';

  // 1. Strip restrictive CSP meta tags & frame-busting headers that block visual editing
  html = html.replace(/<meta[^>]+http-equiv\s*=\s*["']?Content-Security-Policy["']?[^>]*>/gi, '');
  html = html.replace(/<meta[^>]+http-equiv\s*=\s*["']?X-Frame-Options["']?[^>]*>/gi, '');

  // 2. Fetch & inline up to 8 external <link rel="stylesheet"> so styles/fonts/icons work 100% locally without CORS issues
  const linkRegex = /<link\b[^>]*rel\s*=\s*["']?stylesheet["']?[^>]*>/gi;
  const stylesheetTags = html.match(linkRegex) || [];
  let inlinedCssCount = 0;

  for (const linkTag of stylesheetTags.slice(0, 8)) {
    const hrefMatch = linkTag.match(/\bhref\s*=\s*["']([^"']+)["']/i);
    if (!hrefMatch || !hrefMatch[1]) continue;
    try {
      const cssUrl = new URL(hrefMatch[1], finalUrl).href;
      const cssRes = await fetchUrlBuffer(cssUrl);
      if (cssRes && cssRes.body && cssRes.body.length < 1500000) {
        const rewrittenCss = resolveCssUrls(cssRes.body, cssRes.finalUrl);
        html = html.replace(
          linkTag,
          `<style data-cloned-stylesheet="${cssUrl}">\n${rewrittenCss}\n</style>`
        );
        inlinedCssCount++;
      }
    } catch (_) {
      // Keep original <link> with absolute href if stylesheet fetch fails
    }
  }

  // 3. Rewrite relative attributes (src, href, poster, action) to absolute URLs so images, scripts, and links work locally
  html = html.replace(/\b(src|href|poster|action)\s*=\s*(["'])([^"']+)\2/gi, (match, attr, quote, val) => {
    const v = val.trim();
    if (!v || v.startsWith('#') || v.startsWith('data:') || v.startsWith('mailto:') || v.startsWith('tel:') || v.startsWith('javascript:')) {
      return match;
    }
    try {
      const abs = new URL(v, finalUrl).href;
      return `${attr}=${quote}${abs}${quote}`;
    } catch (_) {
      return match;
    }
  });

  // 4. Rewrite srcset="..."
  html = html.replace(/\bsrcset\s*=\s*(["'])([^"']+)\1/gi, (match, quote, srcsetVal) => {
    try {
      const parts = srcsetVal.split(',').map(part => {
        const segs = part.trim().split(/\s+/);
        if (!segs[0] || segs[0].startsWith('data:')) return part;
        segs[0] = new URL(segs[0], finalUrl).href;
        return segs.join(' ');
      });
      return `srcset=${quote}${parts.join(', ')}${quote}`;
    } catch (_) {
      return match;
    }
  });

  // 5. Rewrite url(...) inside existing <style> tags
  html = html.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (m, openTag, cssContent, closeTag) => {
    return openTag + resolveCssUrls(cssContent, finalUrl) + closeTag;
  });

  // 6. Inject a metadata comment & <base> fallback if needed
  const clonedBanner = `<!-- Cloned by Visual UI Studio from ${finalUrl} at ${new Date().toISOString()} -->\n`;
  if (!/<html\b/i.test(html)) {
    html = `<!DOCTYPE html>\n<html lang="vi">\n<head><meta charset="UTF-8"><title>Cloned: ${fetched.hostname}</title></head>\n<body>\n${html}\n</body>\n</html>`;
  }
  html = clonedBanner + html;

  // 7. Compute quick DOM & Asset analysis stats
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : fetched.hostname;
  const elementsCount = (html.match(/<[a-zA-Z][a-zA-Z0-9-]*/g) || []).length;
  const imagesCount = (html.match(/<(img|svg|picture|video)\b/gi) || []).length;
  const buttonsCount = (html.match(/<(button|a)\b/gi) || []).length;

  // 8. Save directly as a local .html file in currentWorkspaceDir so user can edit & press Ctrl+S to save locally!
  const safeHost = fetched.hostname.replace(/[^a-zA-Z0-9.-]/g, '-').replace(/^www\./i, '');
  const safePath = (fetched.pathname || '')
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.html?$/i, '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .slice(0, 32);

  let fileName = (customFileName || '').trim();
  if (!fileName) {
    fileName = safePath ? `cloned-${safeHost}-${safePath}.html` : `cloned-${safeHost}.html`;
  }
  if (!/\.html?$/i.test(fileName)) fileName += '.html';
  fileName = path.basename(fileName);

  if (!fs.existsSync(currentWorkspaceDir)) {
    fs.mkdirSync(currentWorkspaceDir, { recursive: true });
  }
  const savedFilePath = path.join(currentWorkspaceDir, fileName);
  fs.writeFileSync(savedFilePath, html, 'utf8');

  return {
    success: true,
    sourceUrl: finalUrl,
    title: pageTitle,
    fileName,
    relativePath: fileName,
    savedPath: savedFilePath,
    html,
    stats: {
      elementsCount,
      imagesCount,
      buttonsCount,
      inlinedCssCount,
      sizeKb: Math.round(Buffer.byteLength(html, 'utf8') / 1024)
    }
  };
}

// ============================================================================
// 2. GITHUB AUTHENTICATION, REPOSITORY LINKING & AUTO-PUSH ENGINE
// ============================================================================
function runCmd(cmd, args, cwd) {
  return execFileSync(cmd, args, {
    cwd: cwd || currentWorkspaceDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 25000
  }).trim();
}

function githubApiRequest(endpoint, token, method = 'GET', bodyObj = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      `https://api.github.com${endpoint}`,
      {
        method,
        headers: {
          'User-Agent': 'Visual-UI-Studio-Pro',
          'Accept': 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        timeout: 10000
      },
      res => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString('utf8');
          try {
            const parsed = raw ? JSON.parse(raw) : {};
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(parsed.message || `GitHub API HTTP ${res.statusCode}`));
            }
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', reject);
    if (bodyObj) req.write(JSON.stringify(bodyObj));
    req.end();
  });
}

async function detectGithubAuthAndRepos() {
  if (githubSession.loggedOutManually) {
    return { loggedIn: false, authMethod: null, user: null, repos: [] };
  }

  // 1. If a Personal Access Token is stored in githubSession
  if (githubSession.token) {
    try {
      const user = await githubApiRequest('/user', githubSession.token);
      const repos = await githubApiRequest('/user/repos?sort=updated&per_page=25', githubSession.token);
      githubSession.user = {
        login: user.login,
        name: user.name || user.login,
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url,
        publicRepos: user.public_repos
      };
      saveGithubSession();
      return {
        loggedIn: true,
        authMethod: 'token',
        user: githubSession.user,
        repos: Array.isArray(repos)
          ? repos.map(r => ({
              name: r.name,
              fullName: r.full_name,
              private: r.private,
              cloneUrl: r.clone_url,
              htmlUrl: r.html_url,
              defaultBranch: r.default_branch
            }))
          : []
      };
    } catch (_) {
      githubSession.token = '';
      saveGithubSession();
    }
  }

  // 2. Auto-detect GitHub CLI (`gh`) authentication on Windows/macOS/Linux
  try {
    const userJson = runCmd('gh', ['api', 'user'], __dirname);
    const user = JSON.parse(userJson);
    let repos = [];
    try {
      const reposJson = runCmd('gh', ['api', 'user/repos?sort=updated&per_page=25'], __dirname);
      const parsedRepos = JSON.parse(reposJson);
      if (Array.isArray(parsedRepos)) {
        repos = parsedRepos.map(r => ({
          name: r.name,
          fullName: r.full_name,
          private: r.private,
          cloneUrl: r.clone_url,
          htmlUrl: r.html_url,
          defaultBranch: r.default_branch
        }));
      }
    } catch (_) {}

    githubSession.user = {
      login: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      publicRepos: user.public_repos
    };
    return {
      loggedIn: true,
      authMethod: 'gh-cli',
      user: githubSession.user,
      repos
    };
  } catch (_) {}

  return { loggedIn: false, authMethod: null, user: null, repos: [] };
}

function getWorkspaceGitStatus(dirPath = currentWorkspaceDir) {
  const status = {
    workspaceDir: dirPath,
    isGitRepo: false,
    hasRemote: false,
    remoteUrl: '',
    repoShortName: '',
    branch: 'main',
    changedCount: 0,
    changedFiles: [],
    lastCommit: ''
  };

  if (!fs.existsSync(dirPath)) return status;

  try {
    const inside = runCmd('git', ['rev-parse', '--is-inside-work-tree'], dirPath);
    if (inside !== 'true') return status;
    status.isGitRepo = true;
  } catch (_) {
    return status;
  }

  try {
    status.branch = runCmd('git', ['branch', '--show-current'], dirPath) || 'main';
  } catch (_) {}

  try {
    const remote = runCmd('git', ['remote', 'get-url', 'origin'], dirPath);
    if (remote) {
      status.hasRemote = true;
      // Strip embedded token from display URL if present
      status.remoteUrl = remote.replace(/https:\/\/[^@]+@github\.com\//i, 'https://github.com/');
      const m = status.remoteUrl.match(/github\.com[:/]([^/]+\/[^/.]+)(?:\.git)?$/i);
      status.repoShortName = m ? m[1] : status.remoteUrl;
    }
  } catch (_) {}

  try {
    const porcelain = runCmd('git', ['status', '--porcelain'], dirPath);
    if (porcelain) {
      const lines = porcelain.split(/\r?\n/).filter(Boolean);
      status.changedCount = lines.length;
      status.changedFiles = lines.slice(0, 15).map(l => l.trim());
    }
  } catch (_) {}

  try {
    status.lastCommit = runCmd('git', ['log', '-1', '--oneline'], dirPath);
  } catch (_) {}

  return status;
}

function commitAndPushWorkspace(options = {}) {
  const dirPath = options.dirPath || currentWorkspaceDir;
  const relFile = options.relativePath || '';
  const customMsg = (options.commitMessage || '').trim();

  const gitInfo = getWorkspaceGitStatus(dirPath);
  if (!gitInfo.isGitRepo) {
    return { pushed: false, reason: 'Thư mục dự án chưa khởi tạo Git (chưa phải Git repository).' };
  }
  if (!gitInfo.hasRemote) {
    return { pushed: false, reason: 'Dự án chưa liên kết với GitHub Remote (origin).' };
  }

  try {
    // Stage either the specific saved file or all modified files
    if (relFile) {
      runCmd('git', ['add', relFile], dirPath);
    } else {
      runCmd('git', ['add', '-A'], dirPath);
    }

    // Check if there are any staged or working tree changes to commit
    const statusOut = runCmd('git', ['status', '--porcelain'], dirPath);
    const commitMsg = customMsg || (relFile
      ? `style(ui): update ${relFile} via Visual UI Studio`
      : `style(ui): visual updates via Visual UI Studio`);

    if (statusOut) {
      if (!relFile) {
        runCmd('git', ['add', '-A'], dirPath);
      }
      try {
        runCmd('git', ['commit', '-m', commitMsg], dirPath);
      } catch (commitErr) {
        // Ignore if nothing staged to commit
      }
    }

    const branch = gitInfo.branch || 'main';

    // If user authenticated via Personal Access Token, push using token header/URL if origin is https://github.com
    if (githubSession.token && /^https:\/\/github\.com\//i.test(gitInfo.remoteUrl)) {
      const authedUrl = gitInfo.remoteUrl.replace(
        /^https:\/\/github\.com\//i,
        `https://x-access-token:${githubSession.token}@github.com/`
      );
      runCmd('git', ['push', authedUrl, `HEAD:${branch}`], dirPath);
    } else {
      runCmd('git', ['push', '-u', 'origin', branch], dirPath);
    }

    const latestCommit = runCmd('git', ['log', '-1', '--oneline'], dirPath);
    const shortHash = latestCommit ? latestCommit.split(' ')[0] : '';

    return {
      pushed: true,
      branch,
      remoteUrl: gitInfo.remoteUrl,
      repoShortName: gitInfo.repoShortName,
      commitHash: shortHash,
      lastCommit: latestCommit,
      message: commitMsg
    };
  } catch (err) {
    return {
      pushed: false,
      reason: err.stderr ? String(err.stderr).trim() : (err.message || 'Lỗi khi push lên GitHub')
    };
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // API: Get current workspace, HTML files & Git status
    if (req.method === 'GET' && pathname === '/api/workspace') {
      return sendJson(res, 200, {
        workspaceDir: currentWorkspaceDir,
        files: listHtmlFiles(currentWorkspaceDir),
        git: getWorkspaceGitStatus(currentWorkspaceDir)
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
        files: listHtmlFiles(currentWorkspaceDir),
        git: getWorkspaceGitStatus(currentWorkspaceDir)
      });
    }

    // API: Clone any live website URL, analyze DOM & save to local workspace for editing
    if (req.method === 'POST' && pathname === '/api/clone-url') {
      const body = await readJsonBody(req);
      const targetUrl = (body.url || '').trim();
      const customFileName = (body.fileName || '').trim();
      if (!targetUrl) {
        return sendJson(res, 400, { error: 'Vui lòng nhập đường dẫn URL trang web (ví dụ: https://example.com).' });
      }
      try {
        const result = await cloneAndRewriteWebpage(targetUrl, customFileName);
        return sendJson(res, 200, {
          ...result,
          workspaceDir: currentWorkspaceDir,
          files: listHtmlFiles(currentWorkspaceDir)
        });
      } catch (cloneErr) {
        return sendJson(res, 400, {
          error: `Không thể phân tích URL này: ${cloneErr.message}`
        });
      }
    }

    // API: GitHub Status (Auth Profile + Repositories + Local Workspace Git Link)
    if (req.method === 'GET' && pathname === '/api/github/status') {
      const auth = await detectGithubAuthAndRepos();
      const git = getWorkspaceGitStatus(currentWorkspaceDir);
      return sendJson(res, 200, {
        ...auth,
        git
      });
    }

    // API: Login with GitHub CLI / Browser Keyring
    if (req.method === 'POST' && pathname === '/api/github/login-cli') {
      githubSession.loggedOutManually = false;
      saveGithubSession();
      let auth = await detectGithubAuthAndRepos();
      if (!auth.loggedIn) {
        // Attempt interactive browser login via gh CLI if installed
        try {
          execSync('gh auth login --hostname github.com --git-protocol https --web', {
            cwd: __dirname,
            timeout: 60000
          });
          auth = await detectGithubAuthAndRepos();
        } catch (e) {
          return sendJson(res, 400, {
            error: 'Chưa phát hiện phiên GitHub CLI tự động. Bạn có thể dán Personal Access Token (ghp_...) ở khung bên dưới để đăng nhập ngay!'
          });
        }
      }
      return sendJson(res, 200, {
        ...auth,
        git: getWorkspaceGitStatus(currentWorkspaceDir)
      });
    }

    // API: Login with GitHub Personal Access Token (PAT)
    if (req.method === 'POST' && pathname === '/api/github/login-token') {
      const body = await readJsonBody(req);
      const token = (body.token || '').trim();
      if (!token) {
        return sendJson(res, 400, { error: 'Vui lòng nhập GitHub Personal Access Token (ghp_... hoặc github_pat_...).' });
      }
      try {
        const user = await githubApiRequest('/user', token);
        githubSession.token = token;
        githubSession.loggedOutManually = false;
        githubSession.user = {
          login: user.login,
          name: user.name || user.login,
          avatarUrl: user.avatar_url,
          htmlUrl: user.html_url,
          publicRepos: user.public_repos
        };
        saveGithubSession();
        const auth = await detectGithubAuthAndRepos();
        return sendJson(res, 200, {
          ...auth,
          git: getWorkspaceGitStatus(currentWorkspaceDir)
        });
      } catch (err) {
        return sendJson(res, 401, {
          error: `Token không hợp lệ hoặc đã hết hạn: ${err.message}`
        });
      }
    }

    // API: Logout of GitHub Session in Studio
    if (req.method === 'POST' && pathname === '/api/github/logout') {
      githubSession.loggedOutManually = true;
      githubSession.token = '';
      githubSession.user = null;
      saveGithubSession();
      return sendJson(res, 200, {
        loggedIn: false,
        user: null,
        repos: [],
        git: getWorkspaceGitStatus(currentWorkspaceDir)
      });
    }

    // API: Link current workspace to a GitHub remote repository URL (or initialize Git if needed)
    if (req.method === 'POST' && pathname === '/api/github/link-repo') {
      const body = await readJsonBody(req);
      const remoteUrl = (body.remoteUrl || '').trim();
      if (!remoteUrl) {
        return sendJson(res, 400, { error: 'Vui lòng chọn hoặc nhập URL GitHub Repository.' });
      }
      try {
        const gitStat = getWorkspaceGitStatus(currentWorkspaceDir);
        if (!gitStat.isGitRepo) {
          runCmd('git', ['init'], currentWorkspaceDir);
          runCmd('git', ['branch', '-M', 'main'], currentWorkspaceDir);
        }
        try {
          runCmd('git', ['remote', 'set-url', 'origin', remoteUrl], currentWorkspaceDir);
        } catch (_) {
          runCmd('git', ['remote', 'add', 'origin', remoteUrl], currentWorkspaceDir);
        }
        return sendJson(res, 200, {
          success: true,
          git: getWorkspaceGitStatus(currentWorkspaceDir)
        });
      } catch (err) {
        return sendJson(res, 400, { error: `Không thể liên kết GitHub Repo: ${err.message}` });
      }
    }

    // API: Manual Commit & Push all workspace changes to GitHub
    if (req.method === 'POST' && pathname === '/api/github/push') {
      const body = await readJsonBody(req);
      const pushResult = commitAndPushWorkspace({
        dirPath: currentWorkspaceDir,
        commitMessage: body.commitMessage || ''
      });
      if (!pushResult.pushed) {
        return sendJson(res, 400, { error: pushResult.reason, git: getWorkspaceGitStatus(currentWorkspaceDir) });
      }
      return sendJson(res, 200, {
        success: true,
        gitPush: pushResult,
        git: getWorkspaceGitStatus(currentWorkspaceDir)
      });
    }

    // API: Save edited HTML directly back to source file on disk (+ Optional Auto-Push to GitHub!)
    if (req.method === 'POST' && pathname === '/api/save') {
      const body = await readJsonBody(req);
      const relFile = (body.relativePath || '').replace(/^[/\\]+/, '');
      const htmlContent = body.htmlContent;
      const shouldAutoPush = Boolean(body.autoPush);
      const commitMessage = body.commitMessage || '';

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

      let gitPush = null;
      if (shouldAutoPush) {
        gitPush = commitAndPushWorkspace({
          dirPath: currentWorkspaceDir,
          relativePath: relFile,
          commitMessage
        });
      }

      return sendJson(res, 200, {
        success: true,
        savedPath: targetPath,
        relativePath: relFile,
        backupCreated,
        gitPush,
        git: getWorkspaceGitStatus(currentWorkspaceDir),
        files: listHtmlFiles(currentWorkspaceDir),
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
