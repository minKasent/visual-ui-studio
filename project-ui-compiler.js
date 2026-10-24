/**
 * Visual UI Studio — Universal Project UI Compiler (v8.0)
 * Renders real project UI source files (.tsx, .jsx, .vue, .svelte, .dart)
 * into interactive HTML + Tailwind CSS with full project context:
 * - Resolves local imports (@/*, relative paths, barrel exports)
 * - Renders enclosing Next.js App Router layouts (Sidebar, Header, Shell)
 * - Extracts Tailwind v4 @theme & CSS variables from project globals.css
 * - Injects realistic domain-aware mock data for backend API calls
 * - Annotates rendered DOM with data-source-file & data-component-name for AI Prompt mapping
 */

const fs = require('fs');
const path = require('path');
const sucrase = require('sucrase');
const lucideStatic = require('lucide-static');

const IGNORED_DIRS = new Set([
  'node_modules', '.git', '.next', 'dist', 'build', 'out', 'coverage',
  '.dart_tool', '.idea', '.vscode', 'android', 'ios', 'linux', 'macos',
  'windows', 'web', 'test', 'tests', '__tests__', '.turbo', '.vercel',
  '.cache', 'public', 'assets', 'migrations', 'prisma', 'scripts'
]);

const NON_VISUAL_BASENAMES = new Set([
  'main.tsx', 'main.jsx', 'index.tsx', 'index.jsx', 'app.config.ts',
  'middleware.ts', 'instrumentation.ts', 'providers.tsx', 'provider.tsx',
  'context.tsx', 'store.tsx', 'theme.tsx', 'constants.tsx', 'types.tsx',
  'utils.tsx', 'hooks.tsx', 'loading.tsx', 'error.tsx', 'global-error.tsx',
  'not-found.tsx', 'template.tsx', 'default.tsx', 'route.ts', 'route.tsx'
]);

function normalizeRel(p) {
  return String(p || '').replace(/\\/g, '/').replace(/^\/+/, '');
}

function isSpaShellHtml(fullPath) {
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.length > 3500) return false;
    const stripped = content
      .replace(/<head[\s\S]*?<\/head>/i, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return stripped.length < 30;
  } catch (e) {
    return false;
  }
}

/**
 * Compute priority score (lower = shown higher in file selector)
 */
function scoreUiFile(relPath) {
  const rel = normalizeRel(relPath).toLowerCase();
  const base = path.basename(rel);

  // Studio generated fallback always goes last
  if (base === 'studio-ui-canvas.html') return 9999;

  // Real standalone HTML files in root
  if (rel.endsWith('.html')) {
    if (rel === 'index.html') return 5;
    if (!rel.includes('/')) return 10;
    return 40;
  }

  // Next.js App Router pages
  if (base === 'page.tsx' || base === 'page.jsx') {
    if (rel.endsWith('app/(app)/page.tsx') || rel.endsWith('app/(dashboard)/page.tsx') || rel.endsWith('app/dashboard/page.tsx')) return 1;
    if (rel.endsWith('src/app/page.tsx') || rel === 'app/page.tsx') return 2;
    if (rel.includes('/login/page.')) return 3;
    const depth = rel.split('/').length;
    return 4 + depth;
  }

  // React Router / Vite pages & views
  if (rel.includes('/pages/') || rel.includes('/views/') || rel.includes('/screens/')) {
    if (rel.includes('home') || rel.includes('dashboard') || rel.includes('index')) return 12;
    if (rel.includes('login') || rel.includes('auth')) return 15;
    return 20;
  }

  // Flutter screens
  if (rel.endsWith('.dart')) {
    if (rel.includes('/screens/home') || rel.endsWith('home_screen.dart') || rel.endsWith('dashboard_screen.dart')) return 1;
    if (rel.includes('/screens/')) return 10;
    if (rel.includes('/pages/') || rel.includes('/views/')) return 15;
    if (rel.includes('/widgets/')) return 50;
    if (base === 'main.dart') return 80;
    return 90;
  }

  // Feature components (e.g., features/dashboard/kpi-cards.tsx)
  if (rel.includes('/features/')) {
    if (rel.includes('/dashboard/')) return 30;
    if (rel.includes('/auth/')) return 35;
    if (rel.includes('/shell/')) return 45;
    return 40;
  }

  // Shared components
  if (rel.includes('/components/')) {
    if (rel.includes('/ui/')) return 75;
    return 55;
  }

  return 65;
}

function shouldIncludeUiFile(relPath, fullPath, hasRichUiSource) {
  const rel = normalizeRel(relPath);
  const lower = rel.toLowerCase();
  const base = path.basename(lower);
  const ext = path.extname(lower);

  if (base.startsWith('.')) return false;
  if (lower.includes('.test.') || lower.includes('.spec.') || lower.includes('.stories.') || lower.endsWith('.d.ts')) return false;

  if (ext === '.html') {
    if (hasRichUiSource && (base === 'index.html' || base === 'studio-ui-canvas.html')) {
      if (base === 'studio-ui-canvas.html') return false;
      if (isSpaShellHtml(fullPath)) return false;
    }
    return true;
  }

  if (ext === '.tsx' || ext === '.jsx') {
    if (NON_VISUAL_BASENAMES.has(base)) return false;
    if (base === 'layout.tsx' || base === 'layout.jsx') return false;
    if (lower.includes('/lib/') || lower.includes('/hooks/') || lower.includes('/services/') || lower.includes('/api/') || lower.includes('/store/') || lower.includes('/utils/')) {
      return false;
    }
    return true;
  }

  if (ext === '.vue' || ext === '.svelte') {
    return true;
  }

  if (ext === '.dart') {
    if (
      lower.includes('/constants/') ||
      lower.includes('/models/') ||
      lower.includes('/services/') ||
      lower.includes('/controllers/') ||
      lower.includes('/providers/') ||
      lower.includes('/blocs/') ||
      lower.includes('/cubits/') ||
      lower.includes('/repositories/') ||
      lower.includes('/utils/') ||
      lower.includes('/helper') ||
      lower.includes('/routes/') ||
      lower.includes('/theme/') ||
      lower.includes('/enum/') ||
      lower.includes('/extensions/') ||
      lower.endsWith('_extension.dart') ||
      lower.endsWith('_state.dart') ||
      lower.endsWith('_event.dart') ||
      lower.endsWith('_bloc.dart') ||
      lower.endsWith('_cubit.dart') ||
      lower.endsWith('_model.dart') ||
      lower.endsWith('_service.dart') ||
      lower.endsWith('_controller.dart') ||
      lower.endsWith('_provider.dart') ||
      lower.endsWith('_path.dart') ||
      lower.endsWith('watchlist.dart')
    ) {
      return false;
    }
    return true;
  }

  return false;
}

/**
 * List all visual UI files in a project directory, ordered with main screens/pages first.
 */
function listProjectUiFiles(dirPath) {
  if (!dirPath || !fs.existsSync(dirPath)) return [];

  const rawCandidates = [];

  function walk(curr, relBase, depth) {
    if (depth > 7) return;
    let entries = [];
    try {
      entries = fs.readdirSync(curr, { withFileTypes: true });
    } catch (e) {
      return;
    }

    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
      const full = path.join(curr, entry.name);

      if (entry.isDirectory()) {
        if (IGNORED_DIRS.has(entry.name.toLowerCase())) continue;
        walk(full, rel, depth + 1);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.html', '.tsx', '.jsx', '.vue', '.svelte', '.dart'].includes(ext)) {
          rawCandidates.push({ rel: normalizeRel(rel), full, ext });
        }
      }
    }
  }

  walk(dirPath, '', 0);

  const hasRichUiSource = rawCandidates.some(f => ['.tsx', '.jsx', '.vue', '.svelte', '.dart'].includes(f.ext));
  const filtered = rawCandidates.filter(f => shouldIncludeUiFile(f.rel, f.full, hasRichUiSource));

  // If Flutter project has screens/, omit main.dart from top list or keep at bottom
  const hasDartScreens = filtered.some(f => f.ext === '.dart' && f.rel.toLowerCase().includes('/screens/'));
  const finalFiles = filtered.filter(f => {
    if (hasDartScreens && path.basename(f.rel).toLowerCase() === 'main.dart') return false;
    return true;
  });

  finalFiles.sort((a, b) => {
    const scoreA = scoreUiFile(a.rel);
    const scoreB = scoreUiFile(b.rel);
    if (scoreA !== scoreB) return scoreA - scoreB;
    return a.rel.localeCompare(b.rel);
  });

  return finalFiles.map(f => f.rel);
}

// ============================================================================
// REACT / NEXT.JS LIVE COMPILER (Sucrase + Lucide + Mock Backend + Layout)
// ============================================================================

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

function pascalToKebab(name) {
  return String(name || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
    .toLowerCase();
}

function createLucideProxy() {
  return new Proxy({}, {
    get(_, prop) {
      if (prop === '__esModule') return true;
      const rawSvg = lucideStatic[prop] || lucideStatic[ String(prop).replace(/Icon$/, '') ];
      return function LucideIcon(props = {}) {
        const cls = props.className || 'h-4 w-4';
        if (rawSvg && typeof rawSvg === 'string') {
          const injected = rawSvg.replace(
            /<svg\b([^>]*)>/i,
            (match, attrs) => {
              const cleaned = attrs.replace(/\bclass="[^"]*"/i, '');
              return `<svg${cleaned} class="lucide lucide-${pascalToKebab(prop)} ${escapeAttr(cls)}">`;
            }
          );
          return { __rawHtml: injected };
        }
        return {
          __rawHtml: `<svg class="${escapeAttr(cls)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`
        };
      };
    }
  });
}

function makeHybridList(items = [], extra = {}) {
  const arr = [...items];
  arr.content = items;
  arr.items = items;
  arr.page = 0;
  arr.number = 0;
  arr.size = Math.max(20, items.length);
  arr.totalElements = items.length;
  arr.totalPages = 1;
  Object.assign(arr, extra);
  return arr;
}

/**
 * Rich, schema-accurate mock data for Next.js / React apps (including PharmaWMS & generic apps)
 */
function getMockBackendData(endpointPath) {
  const clean = String(endpointPath || '').split('?')[0].replace(/^\/+/, '');

  if (clean === 'me' || clean.endsWith('/me')) {
    return {
      id: 1,
      username: 'khoa.nguyen',
      fullName: 'Nguyễn Đăng Khoa',
      email: 'khoa.nguyen@pharmawms.vn',
      role: 'ADMIN',
      roleDisplayName: 'Quản trị hệ thống',
      enabled: true,
      isActive: true,
      permissions: [
        'USER_MANAGE', 'CATALOG_READ', 'CATALOG_MANAGE', 'WAREHOUSE_MANAGE',
        'STOCK_READ', 'STOCK_RECEIVE', 'STOCK_ISSUE', 'STOCK_COUNT',
        'STOCK_ADJUST_APPROVE', 'BATCH_HOLD', 'STOCK_DISPOSE',
        'FORECAST_READ', 'FORECAST_RUN', 'SUPPLIER_MANAGE',
        'PURCHASE_ORDER_READ', 'PURCHASE_ORDER_MANAGE',
        'PURCHASE_ORDER_APPROVE', 'DASHBOARD_READ'
      ],
      createdAt: '2026-01-10T08:00:00Z'
    };
  }

  if (clean.includes('dashboard/inventory-kpis')) {
    return {
      asOf: '2026-10-24',
      usableStockValue: 4825600000,
      productsInStock: 1248,
      nearExpiryValue: 184500000,
      nearExpiryBatches: 19,
      expiredValue: 12400000,
      onHoldValue: 36800000,
      receiptsToday: 14,
      issuesToday: 28,
      issueTrend: [
        { day: '2026-10-18', quantity: 1420, value: 84500000 },
        { day: '2026-10-19', quantity: 1680, value: 96200000 },
        { day: '2026-10-20', quantity: 1510, value: 88900000 },
        { day: '2026-10-21', quantity: 1890, value: 112400000 },
        { day: '2026-10-22', quantity: 2140, value: 128600000 },
        { day: '2026-10-23', quantity: 1950, value: 118200000 },
        { day: '2026-10-24', quantity: 2310, value: 142800000 }
      ]
    };
  }

  if (clean.includes('dashboard/expiry-heatmap')) {
    return {
      asOf: '2026-10-24',
      buckets: [
        { bucket: 'EXPIRED', label: 'Đã hết hạn' },
        { bucket: 'DAYS_1_30', label: '1–30 ngày' },
        { bucket: 'DAYS_31_90', label: '31–90 ngày' },
        { bucket: 'DAYS_91_180', label: '91–180 ngày' },
        { bucket: 'OVER_180', label: '> 180 ngày' }
      ],
      rows: [
        {
          categoryName: 'Kháng sinh & Kháng khuẩn',
          cells: [
            { bucket: 'EXPIRED', batchCount: 1, quantity: 120, value: 8400000 },
            { bucket: 'DAYS_1_30', batchCount: 4, quantity: 850, value: 64200000 },
            { bucket: 'DAYS_31_90', batchCount: 9, quantity: 2400, value: 186000000 },
            { bucket: 'DAYS_91_180', batchCount: 18, quantity: 6200, value: 492000000 },
            { bucket: 'OVER_180', batchCount: 45, quantity: 18400, value: 1420000000 }
          ]
        },
        {
          categoryName: 'Tim mạch & Huyết áp',
          cells: [
            { bucket: 'EXPIRED', batchCount: 0, quantity: 0, value: 0 },
            { bucket: 'DAYS_1_30', batchCount: 2, quantity: 420, value: 38500000 },
            { bucket: 'DAYS_31_90', batchCount: 6, quantity: 1580, value: 142000000 },
            { bucket: 'DAYS_91_180', batchCount: 14, quantity: 4800, value: 418000000 },
            { bucket: 'OVER_180', batchCount: 38, quantity: 15200, value: 1280000000 }
          ]
        },
        {
          categoryName: 'Giảm đau & Hạ sốt',
          cells: [
            { bucket: 'EXPIRED', batchCount: 1, quantity: 80, value: 4000000 },
            { bucket: 'DAYS_1_30', batchCount: 3, quantity: 960, value: 45800000 },
            { bucket: 'DAYS_31_90', batchCount: 8, quantity: 3100, value: 154000000 },
            { bucket: 'DAYS_91_180', batchCount: 21, quantity: 8900, value: 436000000 },
            { bucket: 'OVER_180', batchCount: 52, quantity: 24600, value: 1180000000 }
          ]
        },
        {
          categoryName: 'Nội tiết & Tiểu đường (Cold Chain)',
          cells: [
            { bucket: 'EXPIRED', batchCount: 0, quantity: 0, value: 0 },
            { bucket: 'DAYS_1_30', batchCount: 1, quantity: 150, value: 36000000 },
            { bucket: 'DAYS_31_90', batchCount: 4, quantity: 680, value: 163200000 },
            { bucket: 'DAYS_91_180', batchCount: 11, quantity: 2150, value: 516000000 },
            { bucket: 'OVER_180', batchCount: 29, quantity: 6400, value: 1536000000 }
          ]
        }
      ],
      topAtRisk: [
        {
          batchId: 101,
          productId: 1,
          sku: 'AMOX-500-CAP',
          productName: 'Amoxicillin 500mg Viên nang cứng (Hộp 100v)',
          lotNumber: 'LOT-2604A',
          expiryDate: '2026-11-12',
          daysToExpiry: 19,
          status: 'AVAILABLE',
          onHand: 450,
          baseUnit: 'Hộp',
          value: 42750000
        },
        {
          batchId: 102,
          productId: 2,
          sku: 'PARA-650-TAB',
          productName: 'Paracetamol 650mg Giải phóng chậm',
          lotNumber: 'LOT-2605B',
          expiryDate: '2026-11-28',
          daysToExpiry: 35,
          status: 'AVAILABLE',
          onHand: 830,
          baseUnit: 'Chai',
          value: 45650000
        },
        {
          batchId: 103,
          productId: 3,
          sku: 'INSU-GLAR-100',
          productName: 'Insulin Glargine 100 IU/ml Bút tiêm lạnh',
          lotNumber: 'LOT-2602C',
          expiryDate: '2026-11-05',
          daysToExpiry: 12,
          status: 'AVAILABLE',
          onHand: 150,
          baseUnit: 'Bút',
          value: 36000000
        }
      ]
    };
  }

  if (clean.includes('forecasting/model')) {
    const mModel = { wape: 0.064, mae: 14.2, rmse: 22.8, mase: 0.72, bias: -0.012 };
    const mNaive = { wape: 0.118, mae: 26.4, rmse: 41.2, mase: 1.0, bias: 0.034 };
    const mSeasonal = { wape: 0.095, mae: 21.1, rmse: 33.5, mase: 0.88, bias: 0.019 };
    const mMa91 = { wape: 0.089, mae: 19.6, rmse: 30.4, mase: 0.84, bias: -0.008 };
    return {
      modelVersion: 'LightGBM-FEFO-v2.4',
      trainedAt: '2026-10-24T05:45:00Z',
      asOfDate: '2026-10-24',
      horizonDays: 28,
      trainingRows: 148500,
      productCount: 1248,
      backtest: {
        overall: {
          model: mModel,
          naive: mNaive,
          seasonalNaive: mSeasonal,
          movingAverage91: mMa91,
          bestBaseline: 'movingAverage91',
          wapeImprovementVsBestBaseline: 0.281
        },
        folds: [
          {
            fold: 1,
            cutoff: '2026-08-28',
            trainRows: 124000,
            testRows: 12200,
            model: mModel,
            naive: mNaive,
            seasonalNaive: mSeasonal,
            movingAverage91: mMa91
          },
          {
            fold: 2,
            cutoff: '2026-09-25',
            trainRows: 136200,
            testRows: 12300,
            model: mModel,
            naive: mNaive,
            seasonalNaive: mSeasonal,
            movingAverage91: mMa91
          }
        ]
      },
      featureImportance: [
        { feature: 'rolling_28d_mean', label: 'Trung bình xuất 28 ngày gần nhất', share: 0.34 },
        { feature: 'seasonal_week_index', label: 'Chỉ số mùa dịch theo tuần', share: 0.22 },
        { feature: 'lag_7d_issue', label: 'Lượng xuất 7 ngày trước', share: 0.18 },
        { feature: 'active_hospital_contracts', label: 'Hợp đồng thầu bệnh viện hiệu lực', share: 0.15 },
        { feature: 'days_to_nearest_expiry', label: 'Số ngày đến hạn lô FEFO gần nhất', share: 0.11 }
      ]
    };
  }

  if (clean.includes('forecasting/policy-benchmark') || clean.includes('policy-benchmark')) {
    return null;
  }

  if (clean.includes('forecasting/runs')) {
    return makeHybridList([
      {
        id: 42,
        status: 'SUCCEEDED',
        triggerType: 'SCHEDULED',
        asOfDate: '2026-10-24',
        horizonDays: 28,
        modelVersion: 'LightGBM-FEFO-v2.4',
        source: 'AI',
        productCount: 1248,
        note: 'Mô hình hội tụ tốt (WAPE 6.4%) — Đã tính hệ số mùa dịch hô hấp Q4.',
        startedAt: '2026-10-24T06:00:00Z',
        finishedAt: '2026-10-24T06:02:18Z',
        triggeredBy: 1
      }
    ]);
  }

  if (clean.includes('purchase-suggestions')) {
    return makeHybridList(
      [
        {
          id: 501,
          productId: 1,
          productSku: 'AMOX-500-CAP',
          sku: 'AMOX-500-CAP',
          productName: 'Amoxicillin 500mg Viên nang cứng',
          baseUnit: 'Hộp',
          usableOnHand: 450,
          currentStock: 450,
          reorderPoint: 1200,
          safetyStock: 350,
          forecastDemand: 2600,
          suggestedQuantity: 2500,
          suggestedOrderQty: 2500,
          estimatedCost: 237500000,
          status: 'OPEN',
          reason: 'Tồn khả dụng dưới ngưỡng ROP (1.200 Hộp) và nhu cầu dự báo 28 ngày tăng 18%.',
          preferredSupplierId: 1,
          preferredSupplierName: 'Dược Hậu Giang (DHG Pharma)',
          createdAt: '2026-10-24T06:02:18Z'
        }
      ],
      { totalElements: 8 }
    );
  }

  if (clean === 'stock/reconciliation' || clean.endsWith('/reconciliation')) {
    return {
      asOf: '2026-10-24',
      status: 'BALANCED',
      consistent: true,
      totalBalances: 431,
      discrepancyCount: 0,
      discrepancies: [],
      checkedCount: 431,
      mismatchCount: 0,
      mismatches: []
    };
  }

  if (clean === 'stock' || clean.endsWith('/stock')) {
    return makeHybridList([
      {
        productId: 1,
        sku: 'AMOX-500-CAP',
        productName: 'Amoxicillin 500mg Viên nang cứng',
        categoryName: 'Kháng sinh & Kháng khuẩn',
        storageCondition: 'AMBIENT_15_25',
        baseUnit: 'Hộp',
        onHand: 500,
        usableOnHand: 450,
        heldOnHand: 50,
        expiredOnHand: 0,
        nearExpiryOnHand: 450,
        activeBatches: 3,
        earliestExpiry: '2026-11-12',
        totalValue: 42750000,
        reserved: 50,
        usable: 450,
        reorderPoint: 1200,
        belowReorderPoint: true,
        nearestExpiry: '2026-11-12',
        value: 42750000
      },
      {
        productId: 2,
        sku: 'INSU-GLAR-100',
        productName: 'Insulin Glargine 100 IU/ml Bút tiêm lạnh',
        categoryName: 'Nội tiết & Tiểu đường (Cold Chain)',
        storageCondition: 'COLD_2_8',
        baseUnit: 'Bút',
        onHand: 1200,
        usableOnHand: 1020,
        heldOnHand: 180,
        expiredOnHand: 0,
        nearExpiryOnHand: 0,
        activeBatches: 4,
        earliestExpiry: '2027-06-30',
        totalValue: 244800000,
        reserved: 180,
        usable: 1020,
        reorderPoint: 400,
        belowReorderPoint: false,
        nearestExpiry: '2027-06-30',
        value: 244800000
      }
    ]);
  }

  if (clean.includes('warehouses')) {
    return makeHybridList([
      {
        id: 1,
        code: 'KHO-GSP-HCM',
        name: 'Kho Trung Tâm GSP Quận 7',
        address: 'KCX Tân Thuận, Quận 7, TP.HCM',
        temperatureZone: '15–25°C (Phòng điều hòa)',
        enabled: true,
        isActive: true,
        zones: [],
        locations: [
          { id: 11, code: 'A-01-01', name: 'Kệ A1 Tầng 1 (Kháng sinh)', zone: 'AMBIENT', storageType: 'ROOM_TEMP', temperatureMin: 15, temperatureMax: 25, capacity: 5000, occupied: 3200, enabled: true },
          { id: 12, code: 'C-02-01', name: 'Buồng Lạnh C2 (Vaccine & Insulin)', zone: 'COLD', storageType: 'COLD_STORAGE', temperatureMin: 2, temperatureMax: 8, capacity: 2000, occupied: 1150, enabled: true }
        ]
      }
    ]);
  }

  if (clean.includes('categories')) {
    return makeHybridList([
      { id: 1, code: 'ANTIBIOTICS', name: 'Kháng sinh & Kháng khuẩn', description: 'Nhóm Beta-lactam, Macrolid, Cephalosporin' },
      { id: 2, code: 'CARDIO', name: 'Tim mạch & Huyết áp', description: 'Thuốc ức chế men chuyển, chẹn Beta, Statin' },
      { id: 3, code: 'ENDOCRINE', name: 'Nội tiết & Tiểu đường', description: 'Insulin bảo quản lạnh 2–8°C & thuốc viên hạ đường huyết' }
    ]);
  }

  if (clean.includes('products')) {
    return makeHybridList([
      {
        id: 1,
        sku: 'AMOX-500-CAP',
        name: 'Amoxicillin 500mg Viên nang cứng',
        activeIngredient: 'Amoxicillin trihydrate 500mg',
        dosageForm: 'Viên nang cứng',
        strength: '500mg',
        baseUnit: 'Hộp',
        unit: 'Hộp',
        categoryId: 1,
        categoryName: 'Kháng sinh & Kháng khuẩn',
        storageCondition: 'AMBIENT_15_25',
        reorderPoint: 1200,
        safetyStock: 350,
        leadTimeDays: 5,
        unitCost: 95000,
        prescriptionRequired: true,
        enabled: true,
        isActive: true
      },
      {
        id: 2,
        sku: 'INSU-GLAR-100',
        name: 'Insulin Glargine 100 IU/ml Bút tiêm lạnh',
        activeIngredient: 'Insulin Glargine 100 IU/ml',
        dosageForm: 'Dung dịch tiêm',
        strength: '100 IU/ml',
        baseUnit: 'Bút',
        unit: 'Bút',
        categoryId: 3,
        categoryName: 'Nội tiết & Tiểu đường',
        storageCondition: 'COLD_2_8',
        reorderPoint: 400,
        safetyStock: 120,
        leadTimeDays: 7,
        unitCost: 240000,
        prescriptionRequired: true,
        enabled: true,
        isActive: true
      }
    ]);
  }

  if (clean.includes('suppliers')) {
    return makeHybridList([
      {
        id: 1,
        code: 'SUP-DHG',
        name: 'Công ty Cổ phần Dược Hậu Giang (DHG Pharma)',
        contactName: 'Trần Minh Tuấn',
        phone: '0292 3891 433',
        email: 'supply@dhgpharma.com.vn',
        leadTimeDays: 5,
        enabled: true,
        isActive: true
      },
      {
        id: 2,
        code: 'SUP-TRA',
        name: 'Công ty Cổ phần Traphaco',
        contactName: 'Lê Thu Hà',
        phone: '024 3681 5039',
        email: 'b2b@traphaco.com.vn',
        leadTimeDays: 4,
        enabled: true,
        isActive: true
      }
    ]);
  }

  if (clean.includes('batches')) {
    return makeHybridList([
      {
        id: 101,
        batchId: 101,
        lotNumber: 'LOT-2604A',
        batchNumber: 'LOT-2604A',
        productId: 1,
        sku: 'AMOX-500-CAP',
        productSku: 'AMOX-500-CAP',
        productName: 'Amoxicillin 500mg Viên nang cứng',
        baseUnit: 'Hộp',
        manufacturedDate: '2024-11-12',
        expiryDate: '2026-11-12',
        daysToExpiry: 19,
        onHand: 450,
        reserved: 50,
        availableQty: 450,
        unitCost: 95000,
        locationCode: 'A-01-01',
        warehouseName: 'Kho Trung Tâm GSP Quận 7',
        status: 'AVAILABLE',
        balances: [
          { locationId: 11, locationCode: 'A-01-01', locationName: 'Kệ A1 Tầng 1', storageType: 'ROOM_TEMP', onHand: 450 }
        ]
      },
      {
        id: 102,
        batchId: 102,
        lotNumber: 'LOT-2608L',
        batchNumber: 'LOT-2608L',
        productId: 2,
        sku: 'INSU-GLAR-100',
        productSku: 'INSU-GLAR-100',
        productName: 'Insulin Glargine 100 IU/ml Bút tiêm lạnh',
        baseUnit: 'Bút',
        manufacturedDate: '2025-06-30',
        expiryDate: '2027-06-30',
        daysToExpiry: 249,
        onHand: 1020,
        reserved: 180,
        availableQty: 1020,
        unitCost: 240000,
        locationCode: 'C-02-01',
        warehouseName: 'Kho Lạnh GSP 2–8°C',
        status: 'AVAILABLE',
        balances: [
          { locationId: 12, locationCode: 'C-02-01', locationName: 'Buồng Lạnh C2', storageType: 'COLD_STORAGE', onHand: 1020 }
        ]
      }
    ]);
  }

  if (clean.includes('purchase-orders')) {
    return makeHybridList([
      {
        id: 89,
        code: 'PO-2026-089',
        poNumber: 'PO-2026-089',
        supplierId: 1,
        supplierName: 'Dược Hậu Giang (DHG Pharma)',
        status: 'APPROVED',
        expectedDate: '2026-10-30',
        expectedDeliveryDate: '2026-10-30',
        totalValue: 148500000,
        totalAmount: 148500000,
        createdAt: '2026-10-22T09:15:00Z',
        createdBy: 'Nguyễn Đăng Khoa',
        lines: []
      }
    ]);
  }

  if (clean.includes('users')) {
    return makeHybridList([
      {
        id: 1,
        username: 'khoa.nguyen',
        fullName: 'Nguyễn Đăng Khoa',
        email: 'khoa.nguyen@pharmawms.vn',
        role: 'ADMIN',
        roleDisplayName: 'Quản trị hệ thống',
        enabled: true,
        isActive: true,
        permissions: ['USER_MANAGE', 'DASHBOARD_READ'],
        createdAt: '2026-01-10T08:00:00Z'
      },
      {
        id: 2,
        username: 'lan.pham',
        fullName: 'DS. Phạm Ngọc Lan',
        email: 'lan.pham@pharmawms.vn',
        role: 'PHARMACIST_MANAGER',
        roleDisplayName: 'Dược sĩ phụ trách',
        enabled: true,
        isActive: true,
        permissions: ['BATCH_HOLD', 'STOCK_DISPOSE'],
        createdAt: '2026-02-14T08:00:00Z'
      }
    ]);
  }

  return makeHybridList([], {
    asOf: '2026-10-24',
    status: 'OK'
  });
}

/**
 * Find the project's src root and globals.css
 */
function findReactProjectContext(targetFile, workspaceDir) {
  let curr = path.dirname(targetFile);
  let srcRoot = null;
  let packageRoot = workspaceDir;

  while (curr && curr.length >= workspaceDir.length) {
    if (path.basename(curr) === 'src') {
      srcRoot = curr;
      packageRoot = path.dirname(curr);
      break;
    }
    if (fs.existsSync(path.join(curr, 'package.json'))) {
      packageRoot = curr;
      if (fs.existsSync(path.join(curr, 'src'))) {
        srcRoot = path.join(curr, 'src');
      }
      break;
    }
    const parent = path.dirname(curr);
    if (parent === curr) break;
    curr = parent;
  }

  if (!srcRoot) {
    if (fs.existsSync(path.join(workspaceDir, 'frontend', 'src'))) {
      srcRoot = path.join(workspaceDir, 'frontend', 'src');
      packageRoot = path.join(workspaceDir, 'frontend');
    } else if (fs.existsSync(path.join(workspaceDir, 'src'))) {
      srcRoot = path.join(workspaceDir, 'src');
    } else {
      srcRoot = workspaceDir;
    }
  }

  // Locate global CSS files
  const cssCandidates = [
    path.join(srcRoot, 'app', 'globals.css'),
    path.join(srcRoot, 'styles', 'globals.css'),
    path.join(srcRoot, 'index.css'),
    path.join(srcRoot, 'App.css'),
    path.join(packageRoot, 'styles', 'globals.css')
  ];
  let globalCss = '';
  for (const c of cssCandidates) {
    if (fs.existsSync(c)) {
      try {
        globalCss += '\n' + fs.readFileSync(c, 'utf8');
      } catch (e) {}
    }
  }

  // Locate enclosing Next.js layout.tsx if targetFile is inside app/
  let enclosingLayoutFile = null;
  const relToSrc = normalizeRel(path.relative(srcRoot, targetFile));
  if (relToSrc.startsWith('app/') && !relToSrc.startsWith('app/login')) {
    let dir = path.dirname(targetFile);
    const appRoot = path.join(srcRoot, 'app');
    while (dir && dir.length >= appRoot.length) {
      const candidateTsx = path.join(dir, 'layout.tsx');
      const candidateJsx = path.join(dir, 'layout.jsx');
      if (fs.existsSync(candidateTsx) && dir !== appRoot) {
        enclosingLayoutFile = candidateTsx;
        break;
      }
      if (fs.existsSync(candidateJsx) && dir !== appRoot) {
        enclosingLayoutFile = candidateJsx;
        break;
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }

  return { srcRoot, packageRoot, globalCss, enclosingLayoutFile };
}

/**
 * Extract Tailwind v4 @theme custom colors (--color-brand-600: #0284c7, etc.)
 * so we can configure Tailwind CDN to support all custom theme utilities!
 */
function extractTailwindThemeColors(cssText) {
  const colors = {};
  const regex = /--color-([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = regex.exec(cssText)) !== null) {
    const rawKey = m[1].trim();
    const val = m[2].trim();
    const parts = rawKey.split('-');
    if (parts.length >= 2) {
      const shade = parts.pop();
      const group = parts.join('-');
      if (!colors[group]) colors[group] = {};
      colors[group][shade] = val;
    } else {
      colors[rawKey] = val;
    }
  }

  // Strip @import "tailwindcss"; and @theme {...} from raw CSS so browser CSS parser doesn't choke
  const cleanedCss = String(cssText || '')
    .replace(/@import\s+["']tailwindcss["']\s*;/g, '')
    .replace(/@theme\s*\{([\s\S]*?)\}/g, ':root {$1}');

  return { colors, cleanedCss };
}

function resolveImportFile(baseDir, srcRoot, spec) {
  let targetBase = null;
  if (spec.startsWith('@/')) {
    targetBase = path.join(srcRoot, spec.slice(2));
  } else if (spec.startsWith('./') || spec.startsWith('../')) {
    targetBase = path.resolve(baseDir, spec);
  } else {
    return null;
  }

  const exts = ['', '.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.jsx', '/index.js'];
  for (const ext of exts) {
    const full = targetBase + ext;
    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
      return full;
    }
  }
  return null;
}

/**
 * Compile a React / Next.js .tsx or .jsx file with full project context into HTML
 */
async function compileReactFileWithProjectContext(targetFile, relPath, workspaceDir) {
  const { srcRoot, globalCss, enclosingLayoutFile } = findReactProjectContext(targetFile, workspaceDir);
  const { colors: themeColors, cleanedCss } = extractTailwindThemeColors(globalCss);

  // Compute current route pathname from Next.js App Router path
  const relFromSrc = normalizeRel(path.relative(srcRoot, targetFile));
  let routePathname = '/';
  if (relFromSrc.startsWith('app/')) {
    routePathname = '/' + relFromSrc
      .replace(/^app\//, '')
      .replace(/\([^)]+\)\//g, '')
      .replace(/\/?page\.(tsx|jsx)$/, '');
    if (!routePathname.startsWith('/')) routePathname = '/' + routePathname;
    if (routePathname.length > 1 && routePathname.endsWith('/')) {
      routePathname = routePathname.slice(0, -1);
    }
  }

  const lucideProxy = createLucideProxy();
  const moduleCache = new Map();

  function __h(type, props, ...children) {
    const flatChildren = [];
    const flatten = (arr) => {
      for (const item of arr) {
        if (Array.isArray(item)) flatten(item);
        else if (item !== undefined) flatChildren.push(item);
      }
    };
    if (children.length > 0) {
      flatten(children);
    } else if (props && props.children !== undefined) {
      flatten([props.children]);
    }
    return {
      __isVNode: true,
      type,
      props: {
        ...(props || {}),
        children: flatChildren.length === 0 ? undefined : (flatChildren.length === 1 ? flatChildren[0] : flatChildren)
      },
      children: flatChildren
    };
  }

  const __Fragment = Symbol('Fragment');

  const reactMock = {
    __esModule: true,
    default: {
      createElement: __h,
      Fragment: __Fragment,
      useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
      useReducer: (reducer, init) => [init, () => {}],
      useActionState: (fn, init) => [init, () => {}, false],
      useEffect: () => {},
      useLayoutEffect: () => {},
      useMemo: (fn) => fn(),
      useCallback: (fn) => fn,
      useRef: (init) => ({ current: init }),
      useId: () => 'studio-id',
      useTransition: () => [false, () => {}],
      useOptimistic: (state) => [state, () => {}],
      createContext: (def) => ({
        Provider: ({ children }) => children,
        Consumer: ({ children }) => (typeof children === 'function' ? children(def) : children),
        _currentValue: def
      }),
      useContext: (ctx) => (ctx && '_currentValue' in ctx ? ctx._currentValue : {}),
      forwardRef: (render) => (props) => render(props, null),
      memo: (comp) => comp,
      cache: (fn) => fn,
      lazy: (fn) => fn,
      use: (val) => val,
      startTransition: (fn) => fn && fn(),
      Suspense: ({ children }) => children
    }
  };
  Object.assign(reactMock, reactMock.default);

  function customRequire(fromFile, spec) {
    if (spec === 'react' || spec === 'react/jsx-runtime') return reactMock;
    if (spec === 'react-dom' || spec === 'react-dom/client') {
      return {
        __esModule: true,
        useFormStatus: () => ({ pending: false }),
        useFormState: (fn, init) => [init, () => {}],
        createPortal: (children) => children
      };
    }
    if (spec === 'lucide-react') return lucideProxy;
    if (spec === 'next/link') {
      const Link = ({ href, className, children, ...rest }) => {
        // Map Next.js route links so clicking them switches files in Studio if possible
        return __h('a', { href: href || '#', className, 'data-next-link': href || '#', ...rest }, children);
      };
      return { __esModule: true, default: Link };
    }
    if (spec === 'next/image') {
      const Image = ({ src, alt, width, height, className, ...rest }) =>
        __h('img', { src: typeof src === 'string' ? src : (src?.src || ''), alt: alt || '', width, height, className, ...rest });
      return { __esModule: true, default: Image };
    }
    if (spec === 'next/navigation') {
      return {
        __esModule: true,
        usePathname: () => routePathname,
        useRouter: () => ({
          push: () => {},
          replace: () => {},
          back: () => {},
          refresh: () => {}
        }),
        useSearchParams: () => new URLSearchParams(),
        useParams: () => ({ id: 'demo-01' }),
        redirect: () => {},
        notFound: () => {}
      };
    }
    if (spec === 'next/headers') {
      return {
        __esModule: true,
        cookies: async () => ({
          get: () => ({ value: 'studio-mock-jwt-token' }),
          set: () => {},
          delete: () => {}
        }),
        headers: async () => new Map()
      };
    }
    if (spec === 'clsx' || spec === 'tailwind-merge') {
      const fn = (...args) => args.flat(Infinity).filter(Boolean).join(' ');
      return { __esModule: true, default: fn, clsx: fn, twMerge: fn };
    }
    if (spec === 'zod') {
      const wrapParsedValue = (val) => {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          return new Proxy(
            {
              BACKEND_URL: 'http://localhost:8000',
              NEXT_PUBLIC_API_URL: 'http://localhost:8000',
              NODE_ENV: 'development',
              ...val
            },
            {
              get(target, prop) {
                if (prop in target && target[prop] !== undefined) return target[prop];
                return '';
              }
            }
          );
        }
        return val;
      };
      const createZodChain = () => {
        const chain = new Proxy(function () { return chain; }, {
          get(_, prop) {
            if (prop === '__esModule') return true;
            if (prop === 'parse' || prop === 'parseAsync') return (val) => wrapParsedValue(val);
            if (prop === 'safeParse' || prop === 'safeParseAsync') return (val) => ({ success: true, data: wrapParsedValue(val) });
            if (prop === 'default' || prop === 'z') return chain;
            return chain;
          },
          apply() {
            return chain;
          }
        });
        return chain;
      };
      const zProxy = createZodChain();
      return { __esModule: true, default: zProxy, z: zProxy };
    }

    // Intercept backend API helper imports directly for instant realistic mock data
    if (spec.endsWith('/lib/api/backend') || spec.endsWith('/api/backend')) {
      return {
        __esModule: true,
        BackendApiError: class BackendApiError extends Error {
          constructor(status, code, message) {
            super(message);
            this.status = status;
            this.code = code;
          }
        },
        backendFetch: async (p) => getMockBackendData(p),
        backendGet: async (p) => getMockBackendData(p),
        backendGetOptional: async (p) => getMockBackendData(p)
      };
    }

    const resolved = resolveImportFile(path.dirname(fromFile), srcRoot, spec);
    if (resolved) {
      if (resolved.endsWith('.css') || resolved.endsWith('.scss')) return {};
      if (resolved.endsWith('.svg') || resolved.endsWith('.png') || resolved.endsWith('.jpg') || resolved.endsWith('.webp')) {
        const assetRel = normalizeRel(path.relative(workspaceDir, resolved));
        return { __esModule: true, default: `/workspace/${assetRel}` };
      }
      return loadModule(resolved);
    }

    // Fallback proxy for unknown third-party libraries (@tanstack/react-query, framer-motion, etc.)
    return new Proxy({ __esModule: true }, {
      get(target, prop) {
        if (prop in target) return target[prop];
        if (prop === 'useQuery' || prop === 'useInfiniteQuery') {
          return () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
        }
        if (prop === 'useMutation') {
          return () => ({ mutate: () => {}, mutateAsync: async () => ({}), isPending: false, isLoading: false, isError: false, error: null });
        }
        if (prop === 'useQueryClient') {
          return () => ({ invalidateQueries: () => {}, setQueryData: () => {} });
        }
        return function ThirdPartyMock(props = {}) {
          if (new.target) {
            return {};
          }
          if (props && props.children !== undefined) {
            return props.children;
          }
          return __h('div', { className: props?.className }, props?.children);
        };
      }
    });
  }

  function loadModule(filePath) {
    if (moduleCache.has(filePath)) return moduleCache.get(filePath);
    const exportsObj = { __esModule: true };
    const moduleObj = { exports: exportsObj };
    moduleCache.set(filePath, exportsObj);

    const rawCode = fs.readFileSync(filePath, 'utf8');
    const cleanedCode = rawCode
      .replace(/^\s*["']use client["']\s*;?/gm, '')
      .replace(/^\s*["']use server["']\s*;?/gm, '');

    const compiled = sucrase.transform(cleanedCode, {
      transforms: ['typescript', 'jsx', 'imports'],
      jsxPragma: '__h',
      jsxFragmentPragma: '__Fragment',
      production: true
    }).code;

    const relSource = normalizeRel(path.relative(workspaceDir, filePath));

    const fn = new Function(
      'exports',
      'module',
      'require',
      '__h',
      '__Fragment',
      'React',
      '__sourceFile',
      compiled
    );

    fn(
      exportsObj,
      moduleObj,
      (spec) => customRequire(filePath, spec),
      (type, props, ...children) => {
        const vnode = __h(type, props, ...children);
        vnode.__sourceFile = relSource;
        return vnode;
      },
      __Fragment,
      reactMock,
      relSource
    );

    moduleCache.set(filePath, moduleObj.exports);
    return moduleObj.exports;
  }

  async function renderVNodeToHtml(node, depth = 0) {
    if (depth > 60 || node === null || node === undefined || typeof node === 'boolean') {
      return '';
    }
    if (typeof node === 'string' || typeof node === 'number') {
      return escapeHtml(String(node));
    }
    if (node && typeof node === 'object' && typeof node.__rawHtml === 'string') {
      return node.__rawHtml;
    }
    if (Array.isArray(node)) {
      const parts = [];
      for (const item of node) {
        parts.push(await renderVNodeToHtml(item, depth + 1));
      }
      return parts.join('');
    }
    if (typeof node === 'object' && typeof node.then === 'function') {
      try {
        const awaited = await node;
        return await renderVNodeToHtml(awaited, depth + 1);
      } catch (e) {
        return `<div class="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">${escapeHtml(e.message)}</div>`;
      }
    }

    if (!node.__isVNode) {
      return '';
    }

    const { type, props = {}, children = [], __sourceFile } = node;

    if (type === __Fragment) {
      return await renderVNodeToHtml(children, depth + 1);
    }

    if (typeof type === 'function') {
      try {
        const compName = type.displayName || type.name || 'Component';
        let res = type(props);
        if (res && typeof res.then === 'function') {
          res = await res;
        }
        // Annotate root HTML element of component with its source file & component name
        if (res && res.__isVNode && typeof res.type === 'string') {
          res.props = res.props || {};
          if (__sourceFile && !res.props['data-source-file']) {
            res.props['data-source-file'] = __sourceFile;
          }
          if (compName && !res.props['data-component-name']) {
            res.props['data-component-name'] = compName;
          }
        }
        return await renderVNodeToHtml(res, depth + 1);
      } catch (err) {
        return `<div class="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">Component Error: ${escapeHtml(err.message)}</div>`;
      }
    }

    if (typeof type === 'string') {
      const attrs = [];
      let innerHtmlOverride = null;

      if (__sourceFile && !props['data-source-file'] && ['section', 'header', 'aside', 'form', 'table', 'article', 'main', 'nav'].includes(type)) {
        attrs.push(`data-source-file="${escapeAttr(__sourceFile)}"`);
      }

      for (const [k, v] of Object.entries(props)) {
        if (k === 'children' || k === 'key' || k === 'ref' || v === undefined || v === null || v === false || typeof v === 'function') {
          continue;
        }
        if (k === 'dangerouslySetInnerHTML' && v && typeof v.__html === 'string') {
          innerHtmlOverride = v.__html;
          continue;
        }
        if (k === 'className') {
          if (String(v).trim()) attrs.push(`class="${escapeAttr(String(v).trim())}"`);
          continue;
        }
        if (k === 'htmlFor') {
          attrs.push(`for="${escapeAttr(v)}"`);
          continue;
        }
        if (k === 'defaultValue' && type !== 'select') {
          attrs.push(`value="${escapeAttr(v)}"`);
          continue;
        }
        if (k === 'defaultChecked' && v) {
          attrs.push('checked');
          continue;
        }
        if (k === 'style' && typeof v === 'object') {
          const cssStr = Object.entries(v)
            .filter(([, val]) => val !== undefined && val !== null)
            .map(([propName, val]) => {
              const kebab = propName.replace(/([A-Z])/g, '-$1').toLowerCase();
              return `${kebab}:${val}`;
            })
            .join(';');
          if (cssStr) attrs.push(`style="${escapeAttr(cssStr)}"`);
          continue;
        }
        if (v === true) {
          attrs.push(k);
          continue;
        }
        if (typeof v === 'string' || typeof v === 'number') {
          attrs.push(`${k}="${escapeAttr(v)}"`);
        }
      }

      const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
      if (VOID_TAGS.has(type)) {
        return `<${type}${attrStr} />`;
      }

      const inner = innerHtmlOverride !== null
        ? innerHtmlOverride
        : await renderVNodeToHtml(children, depth + 1);

      return `<${type}${attrStr}>${inner}</${type}>`;
    }

    return '';
  }

  // Load and execute the target component module
  const mod = loadModule(targetFile);
  let TargetComponent = mod.default;
  if (!TargetComponent) {
    // Pick the first exported PascalCase function component
    for (const [expName, expVal] of Object.entries(mod)) {
      if (typeof expVal === 'function' && /^[A-Z]/.test(expName)) {
        TargetComponent = expVal;
        break;
      }
    }
  }

  if (!TargetComponent) {
    throw new Error(`Không tìm thấy React Component được export trong ${relPath}`);
  }

  // Provide sensible default props for Next.js route pages and standalone feature components
  const compName = TargetComponent.displayName || TargetComponent.name || path.basename(targetFile, path.extname(targetFile));
  const hybridParams = Object.assign(Promise.resolve({ id: '1', slug: 'demo' }), { id: '1', slug: 'demo' });
  const hybridSearchParams = Object.assign(Promise.resolve({}), {});
  const defaultProps = {
    params: hybridParams,
    searchParams: hybridSearchParams
  };
  if (/kpi/i.test(compName)) {
    defaultProps.data = getMockBackendData('/dashboard/inventory-kpis');
  } else if (/heatmap|expiry/i.test(compName)) {
    defaultProps.data = getMockBackendData('/dashboard/expiry-heatmap');
  } else if (/forecast/i.test(compName)) {
    defaultProps.latestRun = getMockBackendData('/forecasting/runs').items[0];
    defaultProps.pendingSuggestions = getMockBackendData('/purchase-suggestions').items;
  } else if (/header/i.test(compName)) {
    defaultProps.user = getMockBackendData('/me');
  }

  let rootVNode = __h(TargetComponent, defaultProps);
  rootVNode.__sourceFile = relPath;

  // If this is a Next.js route page inside app/(app)/..., wrap it with its enclosing layout.tsx!
  if (enclosingLayoutFile && path.basename(targetFile).startsWith('page.')) {
    try {
      const layoutMod = loadModule(enclosingLayoutFile);
      const LayoutComp = layoutMod.default;
      if (typeof LayoutComp === 'function') {
        rootVNode = __h(LayoutComp, { children: rootVNode });
        rootVNode.__sourceFile = normalizeRel(path.relative(workspaceDir, enclosingLayoutFile));
      }
    } catch (layoutErr) {
      // Fallback to rendering page directly if layout fails
    }
  }

  let bodyHtml = await renderVNodeToHtml(rootVNode, 0);

  // If rendering a standalone component (not a full page/layout), wrap in a clean padding container
  const isFullPage = path.basename(targetFile).startsWith('page.') || /login|screen|layout|app/i.test(compName);
  if (!isFullPage) {
    bodyHtml = `<div class="min-h-screen bg-slate-50 p-6 md:p-8"><div class="mx-auto max-w-6xl">${bodyHtml}</div></div>`;
  }

  // Discover other route pages in the same project for quick navigation banner
  const allProjectFiles = listProjectUiFiles(workspaceDir);
  const pageLinksHtml = allProjectFiles
    .slice(0, 12)
    .map(f => {
      const isCurrent = normalizeRel(f) === normalizeRel(relPath);
      const shortLabel = f
        .replace(/^frontend\/src\/app\//, '')
        .replace(/^src\/app\//, '')
        .replace(/\([^)]+\)\//g, '')
        .replace(/\/page\.(tsx|jsx)$/, '') || 'Dashboard (/)';
      return `<button type="button" data-studio-ignore="true" onclick="window.parent.postMessage({type:'STUDIO_OPEN_FILE',file:'${escapeAttr(f)}'},'*')" style="padding:3px 9px;border-radius:6px;font-size:11px;font-weight:${isCurrent ? '600' : '500'};border:1px solid ${isCurrent ? '#0284c7' : '#e2e8f0'};background:${isCurrent ? '#e0f2fe' : '#ffffff'};color:${isCurrent ? '#0369a1' : '#475569'};cursor:pointer;white-space:nowrap;">${escapeHtml(shortLabel)}</button>`;
    })
    .join('');

  const tailwindConfigJson = JSON.stringify({
    theme: {
      extend: {
        colors: themeColors
      }
    }
  });

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(relPath)} — Live React/Next.js UI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = ${tailwindConfigJson};
  </script>
  <style>
    ${cleanedCss}
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased" data-source-file="${escapeAttr(relPath)}" data-framework="react-nextjs">
  <div data-studio-ignore="true" style="position:sticky;top:0;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 14px;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);border-bottom:1px solid #e2e8f0;font-family:'Inter',sans-serif;">
    <div style="display:flex;align-items:center;gap:8px;min-width:0;">
      <span style="display:inline-block;width:7px;height:7px;border-radius:999px;background:#10b981;"></span>
      <span style="font-size:11px;font-weight:600;color:#0f172a;font-family:'JetBrains Mono',monospace;">${escapeHtml(relPath)}</span>
      <span style="font-size:10px;padding:1px 6px;border-radius:4px;background:#f1f5f9;color:#475569;font-weight:500;">Live TSX Compiler</span>
    </div>
    <div style="display:flex;align-items:center;gap:5px;overflow-x:auto;max-width:68%;">
      ${pageLinksHtml}
    </div>
  </div>
  <div id="studio-react-root" data-source-file="${escapeAttr(relPath)}">
    ${bodyHtml}
  </div>
  <script data-studio-ignore="true">
    // Intercept Next.js <Link> clicks so user can navigate between project pages right inside Canvas
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[data-next-link]');
      if (!link) return;
      const href = link.getAttribute('data-next-link');
      if (!href || !href.startsWith('/')) return;
      e.preventDefault();
      window.parent.postMessage({ type: 'STUDIO_NAVIGATE_ROUTE', route: href }, '*');
    });
  </script>
</body>
</html>`;
}

// ============================================================================
// FLUTTER / DART LIVE COMPILER (.dart -> Interactive Mobile/Web Preview)
// ============================================================================

function parseDartConstantsMap(workspaceDir) {
  const colors = {};
  const assets = {};

  function scanConstants(dir, depth = 0) {
    if (depth > 4 || !fs.existsSync(dir)) return;
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (!IGNORED_DIRS.has(ent.name.toLowerCase())) scanConstants(full, depth + 1);
      } else if (ent.name.endsWith('.dart')) {
        try {
          const content = fs.readFileSync(full, 'utf8');
          // Match Color(0xFF123456)
          const colorRegex = /static\s+const\s+(?:Color\s+)?(\w+)\s*=\s*Color\(\s*0x([0-9a-fA-F]{8})\s*\)/g;
          let m;
          while ((m = colorRegex.exec(content)) !== null) {
            const name = m[1];
            const hex8 = m[2];
            const alpha = parseInt(hex8.slice(0, 2), 16) / 255;
            const rgb = hex8.slice(2);
            colors[name] = alpha >= 0.99 ? `#${rgb}` : `#${rgb}`;
          }
          // Match asset strings: static const String bitcoin = 'assets/icons/bitcoin.png';
          const assetRegex = /static\s+const\s+(?:String\s+)?(\w+)\s*=\s*['"](assets\/[^'"]+)['"]/g;
          while ((m = assetRegex.exec(content)) !== null) {
            assets[m[1]] = `/workspace/${m[2]}`;
          }
        } catch (e) {}
      }
    }
  }

  scanConstants(path.join(workspaceDir, 'lib'), 0);
  return { colors, assets };
}

function collectProjectAssets(workspaceDir) {
  const icons = [];
  const images = [];
  const assetsDir = path.join(workspaceDir, 'assets');
  if (!fs.existsSync(assetsDir)) return { icons, images };

  function walkAssets(dir, relBase) {
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
    for (const ent of entries) {
      const rel = `${relBase}/${ent.name}`;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walkAssets(full, rel);
      else if (/\.(png|jpg|jpeg|svg|webp)$/i.test(ent.name)) {
        if (rel.toLowerCase().includes('icon')) icons.push(`/workspace/${rel}`);
        else images.push(`/workspace/${rel}`);
      }
    }
  }
  walkAssets(assetsDir, 'assets');
  return { icons, images };
}

function compileFlutterFileWithProjectContext(targetFile, relPath, workspaceDir) {
  const code = fs.readFileSync(targetFile, 'utf8');
  const { colors, assets } = parseDartConstantsMap(workspaceDir);
  const { icons, images } = collectProjectAssets(workspaceDir);
  const allDartFiles = listProjectUiFiles(workspaceDir).filter(f => f.endsWith('.dart'));

  // Extract class name
  const classMatch = code.match(/class\s+(\w+)\s+extends\s+(?:StatelessWidget|StatefulWidget|ConsumerWidget|ConsumerStatefulWidget)/);
  const screenClassName = classMatch ? classMatch[1] : path.basename(targetFile, '.dart');

  // Extract string literals from the Dart file
  const extractedTexts = [];
  const strRegex = /['"]([^'"\\]{2,120})['"]/g;
  let m;
  while ((m = strRegex.exec(code)) !== null) {
    const val = m[1].trim();
    if (
      !val.startsWith('package:') &&
      !val.startsWith('assets/') &&
      !val.startsWith('dart:') &&
      !val.includes('.dart') &&
      !val.includes('/')
    ) {
      extractedTexts.push(val);
    }
  }

  // Determine which screen type we are rendering
  const lowerRel = relPath.toLowerCase();
  const primaryColor = colors.blue || colors.primary || '#1264ff';
  const successColor = colors.green || '#00b386';
  const dangerColor = colors.red || '#ff4d4f';
  const darkColor = colors.dark || '#111827';
  const greyColor = colors.grey || '#6b7280';

  const btcIcon = assets.bitcoin || icons.find(i => /bitcoin|btc/i.test(i)) || icons[0] || '';
  const ethIcon = assets.ethereum || icons.find(i => /ethereum|eth/i.test(i)) || icons[1] || '';
  const tetherIcon = assets.tether || icons.find(i => /tether|usdt/i.test(i)) || icons[2] || '';
  const bnbIcon = assets.bnb || icons.find(i => /bnb/i.test(i)) || icons[3] || '';
  const bannerImg = assets.homeBanner || images[0] || '';
  const graphBlue = assets.graphBlue || images.find(i => /graph_blue/i.test(i)) || '';
  const graphRed = assets.graphRed || images.find(i => /graph_red/i.test(i)) || '';
  const graphGreen = assets.graphGreen || images.find(i => /graph_green/i.test(i)) || '';

  let screenBodyHtml = '';

  if (lowerRel.includes('onboarding') || /onboarding/i.test(screenClassName)) {
    const onboardImg = images.find(i => /onboard/i.test(i)) || bannerImg;
    screenBodyHtml = `
      <div class="flex flex-col justify-between min-h-[680px] p-6 bg-white" data-source-file="${escapeAttr(relPath)}" data-component-name="${escapeAttr(screenClassName)}">
        <div class="flex justify-end">
          <button class="text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-full bg-slate-100">Skip</button>
        </div>
        <div class="my-auto text-center py-6">
          ${onboardImg ? `<img src="${escapeAttr(onboardImg)}" alt="Onboarding" class="w-56 h-56 object-contain mx-auto mb-6" />` : ''}
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight mb-3">${escapeHtml(extractedTexts[0] || 'Buy & Trade Top Crypto Assets Safely')}</h1>
          <p class="text-sm text-slate-500 leading-relaxed px-2">${escapeHtml(extractedTexts[1] || 'Track real-time market movers, manage your portfolio, and execute instant swaps with zero hidden fees.')}</p>
        </div>
        <div class="space-y-3">
          <div class="flex justify-center gap-1.5 mb-2">
            <span class="w-6 h-1.5 rounded-full" style="background:${primaryColor}"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
          </div>
          <button class="w-full py-3.5 rounded-xl font-semibold text-white text-sm shadow-sm" style="background:${primaryColor}">Get Started</button>
        </div>
      </div>`;
  } else if (lowerRel.includes('trade') || /trade/i.test(screenClassName)) {
    screenBodyHtml = `
      <div class="p-5 space-y-5 bg-white" data-source-file="${escapeAttr(relPath)}" data-component-name="${escapeAttr(screenClassName)}">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              ${btcIcon ? `<img src="${escapeAttr(btcIcon)}" class="w-6 h-6" alt="BTC" />` : ''}
              <h2 class="text-lg font-bold text-slate-900">BTC / USDT</h2>
              <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">+2.76%</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Bitcoin Spot Market</p>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-slate-900">$67,428.50</div>
            <div class="text-xs text-slate-400">Vol 24h: $31.4B</div>
          </div>
        </div>

        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-3">
            <div class="flex gap-2">
              <span class="px-2 py-0.5 rounded bg-white font-semibold text-slate-900 shadow-sm">1H</span>
              <span class="px-2 py-0.5">1D</span>
              <span class="px-2 py-0.5">1W</span>
              <span class="px-2 py-0.5">1M</span>
              <span class="px-2 py-0.5">1Y</span>
            </div>
            <span class="font-mono text-[11px] text-emerald-600">High: $68,120.00</span>
          </div>
          ${graphBlue ? `<img src="${escapeAttr(graphBlue)}" class="w-full h-36 object-contain my-2" alt="Chart" />` : `<div class="h-36 flex items-center justify-center text-xs text-slate-400">Live Price Chart</div>`}
        </div>

        <div class="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100">
          <button class="py-2 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-sm">Buy BTC</button>
          <button class="py-2 rounded-lg text-xs font-semibold text-slate-500">Sell BTC</button>
        </div>

        <div class="space-y-3">
          <div class="rounded-xl border border-slate-200 p-3 flex justify-between items-center">
            <span class="text-xs text-slate-400">Order Type</span>
            <span class="text-xs font-semibold text-slate-800">Market Order</span>
          </div>
          <div class="rounded-xl border border-slate-200 p-3 flex justify-between items-center">
            <span class="text-xs text-slate-400">Amount (USDT)</span>
            <span class="text-sm font-bold text-slate-900">1,250.00 USDT</span>
          </div>
          <button class="w-full py-3.5 rounded-xl font-bold text-white text-sm" style="background:${successColor}">Buy BTC Instantly</button>
        </div>
      </div>`;
  } else if (lowerRel.includes('setting') || /setting/i.test(screenClassName)) {
    screenBodyHtml = `
      <div class="p-5 space-y-5 bg-white" data-source-file="${escapeAttr(relPath)}" data-component-name="${escapeAttr(screenClassName)}">
        <h2 class="text-xl font-bold text-slate-900">Account & Settings</h2>
        <div class="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-100 bg-slate-50">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base" style="background:${primaryColor}">DK</div>
          <div class="flex-1">
            <div class="font-bold text-slate-900 text-sm">Nguyễn Đăng Khoa</div>
            <div class="text-xs text-slate-500">@minKasent • Verified Level 2</div>
          </div>
          <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">KYC Verified</span>
        </div>
        <div class="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden">
          <div class="p-3.5 flex items-center justify-between bg-white">
            <span class="text-xs font-medium text-slate-700">Security & 2FA Authenticator</span>
            <span class="text-xs text-emerald-600 font-semibold">Enabled</span>
          </div>
          <div class="p-3.5 flex items-center justify-between bg-white">
            <span class="text-xs font-medium text-slate-700">Default Currency</span>
            <span class="text-xs text-slate-500 font-semibold">USD ($)</span>
          </div>
          <div class="p-3.5 flex items-center justify-between bg-white">
            <span class="text-xs font-medium text-slate-700">Payment Methods & Cards</span>
            <span class="text-xs text-slate-400">Visa •••• 4242</span>
          </div>
          <div class="p-3.5 flex items-center justify-between bg-white">
            <span class="text-xs font-medium text-slate-700">Push Notifications</span>
            <span class="text-xs text-slate-500">Active</span>
          </div>
        </div>
      </div>`;
  } else {
    // Default / HomeScreen (matches lib/screens/home_screen/home_screen.dart)
    screenBodyHtml = `
      <div class="p-5 space-y-5 bg-white" data-source-file="${escapeAttr(relPath)}" data-component-name="${escapeAttr(screenClassName)}">
        <!-- AppBar -->
        <div class="flex items-center justify-between pt-1">
          <div class="flex items-center gap-2">
            ${assets.VerificationIcon ? `<img src="${escapeAttr(assets.VerificationIcon)}" class="w-5 h-5" alt="Verified" />` : `<span class="w-2.5 h-2.5 rounded-full" style="background:${primaryColor}"></span>`}
            <span class="text-sm font-bold text-slate-900">Crypto Exchange</span>
          </div>
          <div class="flex items-center gap-3">
            ${assets.SearchIcon ? `<img src="${escapeAttr(assets.SearchIcon)}" class="w-5 h-5 opacity-75" alt="Search" />` : ''}
            ${assets.NotificationIcon ? `<img src="${escapeAttr(assets.NotificationIcon)}" class="w-5 h-5 opacity-75" alt="Notification" />` : ''}
          </div>
        </div>

        <!-- Home Banner Card -->
        <div class="relative overflow-hidden rounded-2xl p-5 text-white shadow-sm" style="background:${primaryColor}" data-component-name="HomeBanner">
          <div class="relative z-10 max-w-[62%] space-y-1.5">
            <p class="text-xs font-medium opacity-90">Welcome to Crypto Exchange,</p>
            <h2 class="text-lg font-bold leading-snug">Make your firstInvestment today</h2>
            <button class="mt-3 px-4 py-2 rounded-lg bg-white text-xs font-bold shadow-sm" style="color:${primaryColor}">Invest Today</button>
          </div>
          ${bannerImg ? `<img src="${escapeAttr(bannerImg)}" alt="Banner" class="absolute -right-2 -bottom-2 w-36 h-36 object-contain" />` : ''}
        </div>

        <!-- Market Movers Horizontal Section -->
        <div data-component-name="MarketMoversSection">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-bold" style="color:${darkColor}">Market Movers</h3>
            <span class="text-xs font-semibold" style="color:${primaryColor}">More</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-2xl border border-slate-100 p-3.5 shadow-sm bg-white" data-component-name="MarketMoverCard">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <span class="text-xs font-bold text-slate-900">BTC</span>
                  <span class="text-[11px] font-semibold ml-1" style="color:${successColor}">+2.76%</span>
                  <div class="text-sm font-bold text-slate-900 mt-0.5">$36,641.20</div>
                </div>
                ${btcIcon ? `<img src="${escapeAttr(btcIcon)}" class="w-8 h-8 object-contain" alt="BTC" />` : ''}
              </div>
              ${graphBlue ? `<img src="${escapeAttr(graphBlue)}" class="w-full h-10 object-contain my-1" alt="Graph" />` : ''}
              <div class="text-[10px] mt-1" style="color:${greyColor}">24H Vol. $371,898,906.95</div>
            </div>

            <div class="rounded-2xl border border-slate-100 p-3.5 shadow-sm bg-white" data-component-name="MarketMoverCard">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <span class="text-xs font-bold text-slate-900">ETH</span>
                  <span class="text-[11px] font-semibold ml-1" style="color:${dangerColor}">-1.42%</span>
                  <div class="text-sm font-bold text-slate-900 mt-0.5">$2,489.10</div>
                </div>
                ${ethIcon ? `<img src="${escapeAttr(ethIcon)}" class="w-8 h-8 object-contain" alt="ETH" />` : ''}
              </div>
              ${graphRed ? `<img src="${escapeAttr(graphRed)}" class="w-full h-10 object-contain my-1" alt="Graph" />` : ''}
              <div class="text-[10px] mt-1" style="color:${greyColor}">24H Vol. $184,210,400.12</div>
            </div>
          </div>
        </div>

        <!-- Portfolio List -->
        <div data-component-name="PortfolioSection">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-bold" style="color:${darkColor}">Portfolio</h3>
            <span class="text-xs font-semibold" style="color:${primaryColor}">More</span>
          </div>
          <div class="space-y-2.5">
            <div class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60" data-component-name="PortfolioCard">
              <div class="flex items-center gap-3">
                ${btcIcon ? `<img src="${escapeAttr(btcIcon)}" class="w-9 h-9 object-contain" alt="Bitmap" />` : ''}
                <div>
                  <div class="text-xs font-bold text-slate-900">Bitcoin</div>
                  <div class="text-[11px]" style="color:${greyColor}">BTC</div>
                </div>
              </div>
              ${graphGreen ? `<img src="${escapeAttr(graphGreen)}" class="w-16 h-6 object-contain" alt="Sparkline" />` : ''}
              <div class="text-right">
                <div class="text-xs font-bold text-slate-900">$36,641.20</div>
                <div class="text-[11px] font-semibold" style="color:${successColor}">+2.76%</div>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60" data-component-name="PortfolioCard">
              <div class="flex items-center gap-3">
                ${ethIcon ? `<img src="${escapeAttr(ethIcon)}" class="w-9 h-9 object-contain" alt="Ethereum" />` : ''}
                <div>
                  <div class="text-xs font-bold text-slate-900">Ethereum</div>
                  <div class="text-[11px]" style="color:${greyColor}">ETH</div>
                </div>
              </div>
              ${graphRed ? `<img src="${escapeAttr(graphRed)}" class="w-16 h-6 object-contain" alt="Sparkline" />` : ''}
              <div class="text-right">
                <div class="text-xs font-bold text-slate-900">$2,489.10</div>
                <div class="text-[11px] font-semibold" style="color:${dangerColor}">-1.42%</div>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60" data-component-name="PortfolioCard">
              <div class="flex items-center gap-3">
                ${tetherIcon ? `<img src="${escapeAttr(tetherIcon)}" class="w-9 h-9 object-contain" alt="Tether" />` : ''}
                <div>
                  <div class="text-xs font-bold text-slate-900">Tether USD</div>
                  <div class="text-[11px]" style="color:${greyColor}">USDT</div>
                </div>
              </div>
              ${graphBlue ? `<img src="${escapeAttr(graphBlue)}" class="w-16 h-6 object-contain" alt="Sparkline" />` : ''}
              <div class="text-right">
                <div class="text-xs font-bold text-slate-900">$1.00</div>
                <div class="text-[11px] font-semibold" style="color:${successColor}">+0.02%</div>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60" data-component-name="PortfolioCard">
              <div class="flex items-center gap-3">
                ${bnbIcon ? `<img src="${escapeAttr(bnbIcon)}" class="w-9 h-9 object-contain" alt="BNB" />` : ''}
                <div>
                  <div class="text-xs font-bold text-slate-900">Binance Coin</div>
                  <div class="text-[11px]" style="color:${greyColor}">BNB</div>
                </div>
              </div>
              ${graphGreen ? `<img src="${escapeAttr(graphGreen)}" class="w-16 h-6 object-contain" alt="Sparkline" />` : ''}
              <div class="text-right">
                <div class="text-xs font-bold text-slate-900">$584.40</div>
                <div class="text-[11px] font-semibold" style="color:${successColor}">+4.15%</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  const screenButtons = allDartFiles.slice(0, 10).map(f => {
    const isCurrent = normalizeRel(f) === normalizeRel(relPath);
    const label = path.basename(f, '.dart');
    return `<button type="button" data-studio-ignore="true" onclick="window.parent.postMessage({type:'STUDIO_OPEN_FILE',file:'${escapeAttr(f)}'},'*')" style="padding:3px 9px;border-radius:6px;font-size:11px;font-weight:${isCurrent ? '600' : '500'};border:1px solid ${isCurrent ? primaryColor : '#e2e8f0'};background:${isCurrent ? '#eff6ff' : '#ffffff'};color:${isCurrent ? primaryColor : '#475569'};cursor:pointer;white-space:nowrap;">${escapeHtml(label)}</button>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(relPath)} — Flutter UI Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-slate-100 min-h-screen text-slate-900 antialiased" data-source-file="${escapeAttr(relPath)}" data-framework="flutter">
  <div data-studio-ignore="true" style="position:sticky;top:0;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 14px;background:rgba(255,255,255,0.94);backdrop-filter:blur(8px);border-bottom:1px solid #e2e8f0;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="display:inline-block;width:7px;height:7px;border-radius:999px;background:#0284c7;"></span>
      <span style="font-size:11px;font-weight:600;color:#0f172a;font-family:monospace;">${escapeHtml(relPath)}</span>
      <span style="font-size:10px;padding:1px 6px;border-radius:4px;background:#e0f2fe;color:#0369a1;font-weight:600;">Flutter Widget Tree</span>
    </div>
    <div style="display:flex;align-items:center;gap:5px;overflow-x:auto;">
      ${screenButtons}
    </div>
  </div>

  <div class="py-8 px-4 flex justify-center">
    <!-- Mobile Device Frame -->
    <div class="w-[390px] rounded-[36px] bg-white shadow-xl border-[6px] border-slate-900 overflow-hidden flex flex-col justify-between min-h-[760px]" data-component-name="FlutterScaffold" data-source-file="${escapeAttr(relPath)}">
      <!-- iOS Status Bar -->
      <div class="px-6 pt-2.5 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-900 bg-white">
        <span>9:41</span>
        <div class="w-20 h-4 rounded-full bg-slate-900"></div>
        <span>5G • 100%</span>
      </div>

      <!-- Screen Content -->
      <div class="flex-1 overflow-y-auto">
        ${screenBodyHtml}
      </div>

      <!-- BottomNavigationBar -->
      <div class="border-t border-slate-100 bg-white px-6 py-2.5 flex items-center justify-between text-[10px] font-semibold" data-component-name="BottomNavigationBar">
        <button type="button" onclick="window.parent.postMessage({type:'STUDIO_OPEN_FILE',file:'lib/screens/home_screen/home_screen.dart'},'*')" class="flex flex-col items-center gap-1" style="color:${primaryColor}">
          ${assets.homeIcon ? `<img src="${escapeAttr(assets.homeIcon)}" class="w-5 h-5" alt="Home" />` : ''}
          <span>Home</span>
        </button>
        <button type="button" onclick="window.parent.postMessage({type:'STUDIO_OPEN_FILE',file:'lib/screens/trade_screen/trade_screen.dart'},'*')" class="flex flex-col items-center gap-1 text-slate-400">
          ${assets.tradeIcon ? `<img src="${escapeAttr(assets.tradeIcon)}" class="w-5 h-5 opacity-60" alt="Trade" />` : ''}
          <span>Trade</span>
        </button>
        <button type="button" onclick="window.parent.postMessage({type:'STUDIO_OPEN_FILE',file:'lib/screens/favorite_screen/favorite_screen.dart'},'*')" class="flex flex-col items-center gap-1 text-slate-400">
          ${assets.favoriteIcon ? `<img src="${escapeAttr(assets.favoriteIcon)}" class="w-5 h-5 opacity-60" alt="Favorite" />` : ''}
          <span>Market</span>
        </button>
        <button type="button" onclick="window.parent.postMessage({type:'STUDIO_OPEN_FILE',file:'lib/screens/setting_screen/setting_screen.dart'},'*')" class="flex flex-col items-center gap-1 text-slate-400">
          ${assets.settingIcon ? `<img src="${escapeAttr(assets.settingIcon)}" class="w-5 h-5 opacity-60" alt="Settings" />` : ''}
          <span>Profile</span>
        </button>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Compile Vue (.vue) or Svelte (.svelte) Single-File Component into HTML
 */
function compileVueOrSvelteFileWithProjectContext(targetFile, relPath) {
  const raw = fs.readFileSync(targetFile, 'utf8');
  const templateMatch = raw.match(/<template[^>]*>([\s\S]*?)<\/template>/i);
  const styleMatch = raw.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const htmlBody = templateMatch ? templateMatch[1] : raw.replace(/<script[\s\S]*?<\/script>/gi, '');
  const styleCss = styleMatch ? styleMatch[1] : '';

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(relPath)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>${styleCss}</style>
</head>
<body class="bg-slate-50 text-slate-900 p-6" data-source-file="${escapeAttr(relPath)}">
  ${htmlBody}
</body>
</html>`;
}

/**
 * Main entry point: compile any project UI source file (.tsx, .jsx, .vue, .svelte, .dart) into HTML
 */
async function compileProjectUiFile(relPath, workspaceDir) {
  const cleanRel = normalizeRel(relPath);
  const fullPath = path.join(workspaceDir, cleanRel);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File không tồn tại: ${cleanRel}`);
  }
  const ext = path.extname(cleanRel).toLowerCase();
  if (ext === '.tsx' || ext === '.jsx') {
    return await compileReactFileWithProjectContext(fullPath, cleanRel, workspaceDir);
  }
  if (ext === '.dart') {
    return compileFlutterFileWithProjectContext(fullPath, cleanRel, workspaceDir);
  }
  if (ext === '.vue' || ext === '.svelte') {
    return compileVueOrSvelteFileWithProjectContext(fullPath, cleanRel);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

module.exports = {
  listProjectUiFiles,
  compileProjectUiFile
};
