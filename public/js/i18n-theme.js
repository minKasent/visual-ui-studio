/**
 * VISUAL UI STUDIO PRO v6.4 — ORIGIN UI (COSS.COM) + SHADCN SONNER DESIGN SYSTEM,
 * LUCIDE VECTOR SVG UPGRADE ENGINE, BILINGUAL I18N (EN ⇄ VI) & UNIFIED DARK/LIGHT MODE
 */
(function () {
  let currentLang = localStorage.getItem('studio_lang') || 'vi';
  let lastDarkTheme = localStorage.getItem('studio_last_dark_theme') || 'obsidian';
  let canvasDarkActive = false;
  let canvasOriginKitActive = false;

  window.getStudioLang = () => currentLang;

  // Official Lucide 13.5px Vector SVG Icons for Origin UI Controls (Zero Cartoon Emojis!)
  const SVG = {
    folder: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
    upload: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
    layout: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    search: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    sliders: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>',
    monitor: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
    tablet: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>',
    smartphone: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
    pen: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>',
    eye: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
    moon: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    sun: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    sparkles: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>',
    download: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    save: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>',
    grid: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    layers: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
    plus: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    wand: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/></svg>',
    clock: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    checkSquare: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
    maximize: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>',
    code: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    external: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
    arrowUp: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>',
    copy: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    reset: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    trash: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    palette: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    move: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/></svg>',
    zap: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
    globe: '<svg class="ui-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>'
  };

  // Selector-based exact text / HTML / attribute translation table (with Lucide SVGs!)
  const SELECTOR_TRANSLATIONS = [
    // ==================== TOPBAR ====================
    {
      sel: '#brand-home-logo',
      attr: 'title',
      en: 'Click Logo to return to Home Page',
      vi: 'Click vào Logo để quay về Trang Chủ'
    },
    {
      sel: '#btn-change-folder',
      attr: 'title',
      en: 'Switch local project workspace directory',
      vi: 'Đổi thư mục dự án trên máy tính'
    },
    {
      sel: '#page-selector',
      attr: 'title',
      en: 'Select HTML page in workspace',
      vi: 'Chọn file HTML trong dự án'
    },
    {
      sel: '#btn-open-local-file',
      html: { en: SVG.folder, vi: SVG.folder },
      attr: 'title',
      en: 'Open HTML file or switch project folder from your computer',
      vi: 'Mở file HTML hoặc đổi thư mục dự án từ máy tính'
    },
    {
      sel: '#btn-open-url-cloner',
      html: { en: SVG.globe, vi: SVG.globe },
      attr: 'title',
      en: 'Enter any Website URL -> Auto-analyze, clone to Local & edit visually',
      vi: 'Nhập Link Website bất kỳ -> Tự phân tích, tải về Local & chỉnh sửa trực tiếp'
    },
    {
      sel: '#btn-load-demo',
      html: { en: SVG.layout, vi: SVG.layout },
      attr: 'title',
      en: 'Load interactive Demo UI template',
      vi: 'Mở giao diện mẫu (Demo UI) để thử nghiệm'
    },
    {
      sel: '#btn-open-uilib-explorer .cmd-search-trigger__icon',
      html: { en: SVG.search, vi: SVG.search }
    },
    {
      sel: '#btn-open-uilib-explorer .cmd-search-trigger__text',
      text: {
        en: 'Search UI...',
        vi: 'Tìm UI...'
      }
    },
    {
      sel: '.topbar__center .btn-toggle-rb-dock',
      html: { en: SVG.sliders, vi: SVG.sliders },
      attr: 'title',
      en: 'Open 3-Column ReactBits.dev Customize Dock (218 Schemas & 3,960 Controls)',
      vi: 'Mở Bảng Customize 3 cột chuẩn ReactBits.dev (218 Bộ & 3,960 thanh kéo)'
    },
    {
      sel: '#viewport-switcher [data-viewport="100%"]',
      html: { en: SVG.monitor, vi: SVG.monitor },
      attr: 'title',
      en: 'Desktop Viewport (100%)',
      vi: 'Màn hình máy tính (Desktop 100%)'
    },
    {
      sel: '#viewport-switcher [data-viewport="768px"]',
      html: { en: SVG.tablet, vi: SVG.tablet },
      attr: 'title',
      en: 'Tablet Viewport (768px)',
      vi: 'Máy tính bảng (Tablet 768px)'
    },
    {
      sel: '#viewport-switcher [data-viewport="390px"]',
      html: { en: SVG.smartphone, vi: SVG.smartphone },
      attr: 'title',
      en: 'Mobile Viewport (390px)',
      vi: 'Điện thoại (Mobile 390px)'
    },
    {
      sel: '#mode-edit-btn',
      html: { en: SVG.pen + ' <span>Edit</span>', vi: SVG.pen + ' <span>Sửa</span>' },
      attr: 'title',
      en: 'Direct Visual Manipulation & Drag-and-Drop Mode',
      vi: 'Chế độ kéo thả & chỉnh sửa trực tiếp'
    },
    {
      sel: '#mode-preview-btn',
      html: { en: SVG.eye + ' <span>Preview</span>', vi: SVG.eye + ' <span>Xem</span>' },
      attr: 'title',
      en: 'Interactive Live Preview Mode (test links, hover states & scrolling)',
      vi: 'Chế độ xem thử như trang web thật (bấm link, cuộn mượt)'
    },
    {
      sel: '#txt-bypass-loader',
      html: { en: SVG.zap, vi: SVG.zap }
    },
    {
      sel: '#lbl-bypass-loader',
      attr: 'title',
      en: 'Bypass Preloader & Reveal Hidden Sections Automatically',
      vi: 'Tự động ẩn màn hình chờ (Loader) và hiện các khối ẩn'
    },
    {
      sel: '#btn-ai-prompt',
      html: {
        en: SVG.sparkles + ' <span id="change-count-badge" class="badge-count">0</span>',
        vi: SVG.sparkles + ' <span id="change-count-badge" class="badge-count">0</span>'
      },
      attr: 'title',
      en: 'Export AI Prompt & CSS Patch for Cursor / Claude / ChatGPT',
      vi: 'Xuất câu lệnh Prompt chi tiết mọi thay đổi để gửi cho AI'
    },
    {
      sel: '#btn-download-html',
      html: { en: SVG.download, vi: SVG.download },
      attr: 'title',
      en: 'Download edited standalone HTML file',
      vi: 'Tải file HTML đã chỉnh sửa về máy'
    },
    {
      sel: '#btn-save-direct',
      html: { en: SVG.save + ' <span>Save</span>', vi: SVG.save + ' <span>Lưu</span>' },
      attr: 'title',
      en: 'Save changes directly to the source HTML file on disk (Ctrl+S)',
      vi: 'Lưu trực tiếp vào file gốc trên máy (Ctrl+S)'
    },

    // ==================== LEFT SIDEBAR TABS & ASSETS HUB ====================
    {
      sel: '.sidebar-tab[data-tab="tab-uilibs"]',
      html: {
        en: SVG.grid + ' <span>Assets</span>',
        vi: SVG.grid + ' <span>Kho UI</span>'
      },
      attr: 'title',
      en: 'Component Assets from 38+ UI Libraries',
      vi: 'Kho Component từ 38+ Thư viện UI'
    },
    {
      sel: '.sidebar-tab[data-tab="tab-layers"]',
      html: { en: SVG.layers + ' <span>Layers</span>', vi: SVG.layers + ' <span>Cây UI</span>' }
    },
    {
      sel: '.sidebar-tab[data-tab="tab-add"]',
      html: { en: SVG.plus + ' <span>Add</span>', vi: SVG.plus + ' <span>Thêm</span>' }
    },
    {
      sel: '.sidebar-tab[data-tab="tab-magic"]',
      html: { en: SVG.wand + ' <span>Styles</span>', vi: SVG.wand + ' <span>Style</span>' }
    },
    {
      sel: '.sidebar-tab[data-tab="tab-history"]',
      html: { en: SVG.clock + ' <span>History</span>', vi: SVG.clock + ' <span>Lịch Sử</span>' }
    },
    {
      sel: '.uilib-search-icon',
      html: { en: SVG.search, vi: SVG.search }
    },
    {
      sel: '#uilib-search-input',
      attr: 'placeholder',
      en: 'Search: button, card, input...',
      vi: 'Tìm: button, card, input...'
    },
    {
      sel: '.namethat-panel__header > span',
      html: {
        en: '<strong>UI Taxonomy</strong> (NameThat Standard)',
        vi: '<strong>Checklist Loại UI</strong> (Chuẩn NameThat)'
      }
    },
    {
      sel: '#btn-reset-namethat',
      html: { en: SVG.reset + ' <span>Clear All</span>', vi: SVG.reset + ' <span>Bỏ chọn hết</span>' }
    },
    {
      sel: '#uilib-lib-filter option[value="all"]',
      text: { en: 'All 38+ UI Libraries', vi: 'Tất cả 38+ Thư viện' }
    },
    {
      sel: '#uilib-lib-filter option[value="custom"]',
      text: { en: 'Imported (.TSX)', vi: 'Đã Import (.TSX)' }
    },
    {
      sel: '#uilib-hover-mode option[value="auto"]',
      text: { en: 'Hover: Smart Auto', vi: 'Hover: Tự động' }
    },
    {
      sel: '#uilib-hover-mode option[value="morph"]',
      text: { en: 'Hover: Apply Style', vi: 'Hover: Áp Style' }
    },
    {
      sel: '#uilib-hover-mode option[value="insert"]',
      text: { en: 'Hover: Insert New', vi: 'Hover: Chèn mới' }
    },
    {
      sel: '#chk-auto-match-el + span',
      text: { en: 'Auto-Filter', vi: 'Tự lọc theo thẻ' }
    },
    {
      sel: '#chk-morph-with-fx + span',
      text: { en: 'With FX/SVG', vi: 'Kèm FX/SVG' }
    },
    {
      sel: '#btn-expand-uilib-modal',
      html: { en: SVG.maximize, vi: SVG.maximize },
      attr: 'title',
      en: 'Expand Full-Screen Component Hub (Ctrl+K)',
      vi: 'Mở kho thư viện toàn màn hình (Ctrl+K)'
    },
    {
      sel: '#btn-open-custom-import',
      html: { en: SVG.code, vi: SVG.code },
      attr: 'title',
      en: 'Import .TSX / JSX / HTML or Registry JSON URL',
      vi: 'Dán code .TSX / JSX / HTML hoặc URL Registry JSON'
    },
    {
      sel: '#btn-clear-custom-imports',
      html: { en: SVG.trash, vi: SVG.trash }
    },
    {
      sel: '.uilib-cdn-summary',
      html: {
        en: SVG.sliders + ' <span>Advanced Filters &amp; CDN (Tailwind, GSAP...)</span>',
        vi: SVG.sliders + ' <span>Bộ lọc nâng cao &amp; Nạp CDN (Tailwind, GSAP...)</span>'
      }
    },
    {
      sel: '#btn-show-all-uilibs',
      text: { en: 'Show All', vi: 'Xem tất cả' }
    },
    {
      sel: '#layer-search',
      attr: 'placeholder',
      en: 'Filter layers by tag, class, or text...',
      vi: 'Tìm thẻ, class, nội dung chữ...'
    },

    // ==================== LEFT SIDEBAR: ADD PRIMITIVES & MAGIC & HISTORY ====================
    {
      sel: '#tab-add .section-hint',
      html: {
        en: '<strong>Hover over any block</strong> to preview live on canvas, <strong>Click</strong> to insert (Press <strong>Delete</strong> or <strong>Ctrl+Z</strong> to undo):',
        vi: '<strong>Rê chuột vào khối</strong> để xem trước trực tiếp trên trang web, <strong>Bấm chuột</strong> để chèn vào (Bấm <strong>Delete</strong> hoặc <strong>Ctrl+Z</strong> để hoàn tác):'
      }
    },
    {
      sel: '.add-block-card[data-add-type="button"] .add-block-title',
      text: { en: 'Button', vi: 'Nút Bấm (Button)' }
    },
    {
      sel: '.add-block-card[data-add-type="button"] .add-block-desc',
      text: { en: 'Interactive CTA button', vi: 'Nút kêu gọi hành động' }
    },
    {
      sel: '.add-block-card[data-add-type="heading"] .add-block-title',
      text: { en: 'Heading', vi: 'Tiêu Đề (Heading)' }
    },
    {
      sel: '.add-block-card[data-add-type="heading"] .add-block-desc',
      text: { en: 'Display section title', vi: 'Tiêu đề lớn nổi bật' }
    },
    {
      sel: '.add-block-card[data-add-type="paragraph"] .add-block-title',
      text: { en: 'Paragraph', vi: 'Đoạn Văn (Text)' }
    },
    {
      sel: '.add-block-card[data-add-type="paragraph"] .add-block-desc',
      text: { en: 'Body copy block', vi: 'Văn bản mô tả chi tiết' }
    },
    {
      sel: '.add-block-card[data-add-type="badge"] .add-block-title',
      text: { en: 'Badge / Pill', vi: 'Nhãn (Badge / Pill)' }
    },
    {
      sel: '.add-block-card[data-add-type="badge"] .add-block-desc',
      text: { en: 'Status tag or chip', vi: 'Tag nhỏ trang trí' }
    },
    {
      sel: '.add-block-card[data-add-type="image"] .add-block-title',
      text: { en: 'Image Frame', vi: 'Hình Ảnh (Image)' }
    },
    {
      sel: '.add-block-card[data-add-type="image"] .add-block-desc',
      text: { en: 'Rounded media element', vi: 'Khung ảnh bo góc' }
    },
    {
      sel: '.add-block-card[data-add-type="card"] .add-block-title',
      text: { en: 'Surface Card', vi: 'Khối Card (Box)' }
    },
    {
      sel: '.add-block-card[data-add-type="card"] .add-block-desc',
      text: { en: 'Content container box', vi: 'Hộp chứa nội dung' }
    },
    {
      sel: '.add-block-card[data-add-type="flex-row"] .add-block-title',
      text: { en: 'Flex Row', vi: 'Hàng Ngang (Flex)' }
    },
    {
      sel: '.add-block-card[data-add-type="flex-row"] .add-block-desc',
      text: { en: 'Horizontal auto-layout', vi: 'Chia cột ngang tự động' }
    },
    {
      sel: '.add-block-card[data-add-type="divider"] .add-block-title',
      text: { en: 'Divider', vi: 'Đường Kẻ Ngang' }
    },
    {
      sel: '.add-block-card[data-add-type="divider"] .add-block-desc',
      text: { en: 'Section separator rule', vi: 'Phân cách các phần' }
    },
    {
      sel: '#tab-magic .section-hint',
      html: {
        en: 'Select any element on canvas and <strong>hover over these Origin UI presets</strong> for an instant live preview:',
        vi: 'Chọn 1 phần tử trên web rồi <strong>rê chuột qua các phong cách Origin UI dưới đây</strong> để xem trước ngay lập tức:'
      }
    },
    {
      sel: '#btn-clear-all-edits',
      html: { en: SVG.reset + ' <span>Revert All</span>', vi: SVG.reset + ' <span>Khôi phục tất cả</span>' }
    },
    {
      sel: '#tab-history .section-hint',
      html: {
        en: 'Every edit can be reverted individually or via <strong>Ctrl+Z</strong>.',
        vi: 'Mọi thao tác đều có thể hoàn tác từng phần hoặc bấm <strong>Ctrl+Z</strong>.'
      }
    },

    // ==================== CENTER CANVAS STATUSBAR & DROPZONE ====================
    {
      sel: '.statusbar-center',
      html: {
        en: '<span id="live-preview-badge" class="live-preview-badge hidden">Live Previewing...</span>',
        vi: '<span id="live-preview-badge" class="live-preview-badge hidden">Đang xem thử trực tiếp...</span>'
      }
    },
    {
      sel: '#dropzone-overlay h3',
      text: {
        en: 'Drop HTML File or Web Project Folder Here',
        vi: 'Thả File HTML hoặc Thư Mục Web vào đây'
      }
    },

    // ==================== RIGHT SIDEBAR: INSPECTOR HEADER & EMPTY STATE ====================
    {
      sel: '#btn-el-parent',
      html: { en: SVG.arrowUp, vi: SVG.arrowUp },
      attr: 'title',
      en: 'Select Parent Container Element',
      vi: 'Chọn phần tử cha (Bao ngoài)'
    },
    {
      sel: '#btn-el-duplicate',
      html: { en: SVG.copy, vi: SVG.copy },
      attr: 'title',
      en: 'Duplicate Selected Element (Ctrl+D)',
      vi: 'Nhân bản phần tử này (Ctrl+D)'
    },
    {
      sel: '#btn-el-reset',
      html: { en: SVG.reset, vi: SVG.reset },
      attr: 'title',
      en: 'Restore Element to Initial State',
      vi: 'Khôi phục phần tử này về nguyên trạng ban đầu'
    },
    {
      sel: '#btn-el-delete',
      html: { en: SVG.trash, vi: SVG.trash },
      attr: 'title',
      en: 'Remove Element from DOM (Delete Key)',
      vi: 'Xóa phần tử này khỏi trang (Phím Delete)'
    },
    {
      sel: '#inspector-empty h3',
      text: {
        en: 'Select any element on the canvas',
        vi: 'Chọn bất kỳ phần tử nào trên trang web'
      }
    },
    {
      sel: '#inspector-empty p',
      html: {
        en: 'Click any button, alert, toast, heading, card, or image on the canvas — or open the <strong>ReactBits Customize Dock</strong>:',
        vi: 'Click vào nút bấm, thông báo, dòng chữ, hình ảnh ở giữa màn hình hoặc mở <strong>Bảng Customize (ReactBits.dev)</strong>:'
      }
    },
    {
      sel: '#inspector-empty .btn-toggle-rb-dock',
      html: {
        en: SVG.sliders + ' <span>Open 3-Column Customize Dock (ReactBits.dev — 218 Schemas)</span>',
        vi: SVG.sliders + ' <span>Mở Bảng Customize 3 Cột (ReactBits.dev — 218 Bộ)</span>'
      }
    },
    {
      sel: '#inspector-empty .inspector-feature-list',
      html: {
        en: '<li><strong>Origin UI (coss.com) + Shadcn Sonner Design System</strong> — Unified specular buttons, Sonner stacked toasts, inline alerts, and Lucide vector SVGs.</li>' +
            '<li><strong>218 Official ReactBits.dev Customize Schemas</strong> (3,960 Scrubber Sliders, Switches, Selects &amp; Color Pickers).</li>' +
            '<li><strong>282+ Official .TSX Registry Components</strong> from Origin UI, coss ui, Shadcn UI, Magic UI, Aceternity UI, KokonutUI.</li>' +
            '<li><strong>Instant Property Reset</strong> or full Undo/Redo via <code>Ctrl+Z</code> / <code>Ctrl+Y</code> at any time.</li>',
        vi: '<li><strong>Hệ thống UI/UX chuẩn Origin UI (coss.com) + Shadcn Sonner</strong> — Đồng bộ hoàn toàn Button, Sonner Toast, Alert, Input và Vector SVG Lucide.</li>' +
            '<li><strong>218 Bộ Customize chính chủ từ ReactBits.dev</strong> (3,960 thanh kéo Scrubber, Switch, Dropdown, Color Picker).</li>' +
            '<li><strong>282+ Component .TSX chính chủ</strong> từ Origin UI, coss ui, Shadcn UI, Magic UI, Aceternity UI, KokonutUI.</li>' +
            '<li><strong>Quay lại Màu gốc / Vị trí gốc</strong> hoặc bấm <code>Ctrl+Z</code> / <code>Ctrl+Y</code> bất cứ lúc nào.</li>'
      }
    },

    // ==================== RIGHT SIDEBAR: 3-TAB INSPECTOR ====================
    {
      sel: '.insp-mode-tab[data-insp-tab="insp-pane-reactbits"]',
      html: { en: SVG.sliders + ' <span>Customize</span>', vi: SVG.sliders + ' <span>Customize</span>' },
      attr: 'title',
      en: 'Official ReactBits.dev Scrubber Controls (218 Schemas & 3,960 Parameters)',
      vi: 'Bảng thanh kéo Scrubber chuẩn ReactBits.dev (218 Bộ & 3,960 thông số)'
    },
    {
      sel: '.insp-mode-tab[data-insp-tab="insp-pane-design"]',
      html: { en: SVG.palette + ' <span>Design</span>', vi: SVG.palette + ' <span>Giao Diện</span>' },
      attr: 'title',
      en: 'Typography, Fill & Stroke Swatches, Corner Radius, Shadows & Lucide Vector Icons',
      vi: 'Màu sắc, Kiểu chữ Live-Hover, Viền, Bóng & Icon SVG Lucide'
    },
    {
      sel: '.insp-mode-tab[data-insp-tab="insp-pane-layout"]',
      html: { en: SVG.move + ' <span>Layout</span>', vi: SVG.move + ' <span>Bố Cục</span>' },
      attr: 'title',
      en: 'Coordinates X/Y, Dimensions W/H, Transform, Padding, Margin & Auto Layout (Flexbox)',
      vi: 'Tọa độ X/Y, Kích thước W/H, Padding, Margin & Flexbox'
    },

    // Pane 1: ReactBits Customize
    {
      sel: '#insp-pane-reactbits .prop-group__header > span',
      html: { en: SVG.sliders + ' <span>Customize</span>', vi: SVG.sliders + ' <span>Customize</span>' }
    },
    {
      sel: '#insp-pane-reactbits .btn-rb-reset-props',
      html: { en: SVG.reset, vi: SVG.reset },
      attr: 'title',
      en: 'Reset all Customize controls to default',
      vi: 'Đặt lại toàn bộ thông số Customize về mặc định'
    },
    {
      sel: '#btn-sidebar-rb-dock',
      html: { en: SVG.maximize, vi: SVG.maximize },
      attr: 'title',
      en: 'Expand 3-Column Customize Dock',
      vi: 'Mở rộng Bảng Customize 3 Cột'
    },
    {
      sel: '#btn-sidebar-rb-insert',
      html: { en: SVG.plus, vi: SVG.plus },
      attr: 'title',
      en: 'Insert customized component onto webpage',
      vi: 'Chèn mẫu đã tùy chỉnh vào trang web'
    },
    {
      sel: '.rb-group-chip[data-rb-group="all"]',
      text: { en: 'All', vi: 'Tất cả' }
    },
    {
      sel: '.rb-group-chip[data-rb-group="ticket"]',
      text: { en: 'Ticket & Frame', vi: 'Ticket & Khung' }
    },
    {
      sel: '.rb-group-chip[data-rb-group="cinema"]',
      text: { en: 'Cinema & Type', vi: 'Cinema & Chữ' }
    },
    {
      sel: '.rb-group-chip[data-rb-group="motion"]',
      text: { en: '3D & Tilt', vi: '3D & Tilt' }
    },

    // Pane 2: Design & Typography
    {
      sel: '#insp-pane-design .prop-group:nth-of-type(1) .prop-group__header > span',
      html: { en: SVG.pen + ' <span>Content &amp; Typography</span>', vi: SVG.pen + ' <span>Nội Dung &amp; Kiểu Chữ</span>' }
    },
    {
      sel: '#btn-font-reset',
      text: { en: '↺ Reset', vi: '↺ Gốc' }
    },
    {
      sel: '#text-content-group .label-row-between > label',
      text: { en: 'Text Content (or double-click on canvas)', vi: 'Văn bản (Hoặc nhấp đúp trên web)' }
    },
    {
      sel: '#btn-text-reset',
      text: { en: '↺ Original', vi: '↺ Chữ gốc' }
    },
    {
      sel: '#prop-text-content',
      attr: 'placeholder',
      en: 'Enter text content...',
      vi: 'Nhập nội dung chữ...'
    },
    {
      sel: '#image-src-group .label-row-between > label',
      text: { en: 'Image Source (URL / Upload)', vi: 'Ảnh (URL / Tải lên)' }
    },
    {
      sel: '#btn-img-reset',
      text: { en: '↺ Original', vi: '↺ Ảnh gốc' }
    },
    {
      sel: '#link-href-group > label',
      text: { en: 'Link URL (href)', vi: 'Liên kết (Href URL)' }
    },
    {
      sel: '#prop-font-family option[value=""]',
      text: { en: 'Default', vi: 'Mặc định' }
    },
    {
      sel: '#prop-font-weight option[value=""]',
      text: { en: 'Default', vi: 'Mặc định' }
    },
    {
      sel: '#prop-fontsize-slider',
      prevLabel: { en: 'Font Size (px)', vi: 'Cỡ chữ (px)' }
    },
    {
      sel: '#prop-letter-spacing',
      prevLabel: { en: 'Letter Spacing', vi: 'Giãn chữ (px)' }
    },
    {
      sel: '#insp-pane-design .prop-group:nth-of-type(2) .prop-group__header > span',
      html: { en: SVG.palette + ' <span>Fill, Text Color &amp; Gradients</span>', vi: SVG.palette + ' <span>Màu Sắc &amp; Gradient</span>' }
    },
    {
      sel: '#btn-all-colors-reset',
      text: { en: '↺ Reset Colors', vi: '↺ Màu gốc' }
    },
    {
      sel: '#insp-pane-design .color-control-block:nth-of-type(1) .color-row > label',
      text: { en: 'Text Color', vi: 'Màu chữ' }
    },
    {
      sel: '#insp-pane-design .color-control-block:nth-of-type(2) .color-row > label',
      text: { en: 'Background Fill', vi: 'Màu nền' }
    },
    {
      sel: '#btn-grad-reset',
      text: { en: '↺ Clear', vi: '↺ Bỏ' }
    },
    {
      sel: '#insp-pane-design .prop-group:nth-of-type(3) .prop-group__header > span',
      html: { en: SVG.layout + ' <span>Corner Radius, Stroke &amp; Shadow</span>', vi: SVG.layout + ' <span>Bo Góc, Viền &amp; Bóng</span>' }
    },
    {
      sel: '#btn-border-reset',
      text: { en: '↺ Reset', vi: '↺ Gốc' }
    },
    {
      sel: '#prop-border-width',
      prevLabel: { en: 'Width (px)', vi: 'Dày (px)' }
    },
    {
      sel: '#prop-border-style',
      prevLabel: { en: 'Style', vi: 'Kiểu' }
    },
    {
      sel: '#prop-border-color',
      prevLabel: { en: 'Stroke', vi: 'Màu viền' }
    },
    {
      sel: '.lucide-icon-btn[data-fx-icon="clear"]',
      text: { en: '✕ Clear', vi: '✕ Gỡ' }
    },

    // Pane 3: Layout & Coordinates
    {
      sel: '#insp-pane-layout .prop-group:nth-of-type(1) .prop-group__header > span',
      html: { en: SVG.move + ' <span>Position &amp; Dimensions</span>', vi: SVG.move + ' <span>Tọa Độ &amp; Kích Thước</span>' }
    },
    {
      sel: '#btn-pos-reset',
      text: { en: '↺ Reset', vi: '↺ Gốc' }
    },
    {
      sel: '#insp-pane-layout .coord-box:nth-of-type(1) > label',
      text: { en: 'Offset X (px)', vi: 'Ngang X (px)' }
    },
    {
      sel: '#insp-pane-layout .coord-box:nth-of-type(2) > label',
      text: { en: 'Offset Y (px)', vi: 'Dọc Y (px)' }
    },
    {
      sel: '#btn-spacing-reset',
      text: { en: '↺ Reset', vi: '↺ Gốc' }
    },
    {
      sel: '#insp-pane-layout .prop-group:nth-of-type(2) > label.sub-label:nth-of-type(1)',
      text: { en: 'Padding (Inner Spacing)', vi: 'Padding (Trong)' }
    },
    {
      sel: '#insp-pane-layout .prop-group:nth-of-type(2) > label.sub-label:nth-of-type(2)',
      text: { en: 'Margin (Outer Spacing)', vi: 'Margin (Ngoài)' }
    },
    {
      sel: '#insp-pane-layout .prop-group:nth-of-type(3) .prop-group__header > span',
      html: { en: SVG.layout + ' <span>Auto Layout (Flexbox)</span>', vi: SVG.layout + ' <span>Flexbox Alignment</span>' }
    },

    // ==================== 3-COLUMN REACTBITS DOCK ====================
    {
      sel: '.rb-quick-pill[data-rb-quick-schema="rb-micro-tearticket"]',
      text: { en: 'Tear Ticket (Preset 1)', vi: 'Tear Ticket (Ảnh 1)' }
    },
    {
      sel: '.rb-quick-pill[data-rb-quick-schema="rb-textanimations-maskedheading"]',
      text: { en: 'Masked Heading (Preset 2)', vi: 'Masked Heading (Ảnh 2)' }
    },
    {
      sel: '.rb-quick-pill[data-rb-quick-schema="master-all"]',
      text: { en: 'All Master (50+)', vi: 'All Master (50+)' }
    },
    {
      sel: '#rb-schema-search',
      attr: 'placeholder',
      en: 'Search 218 schemas...',
      vi: 'Tìm trong 218 bộ...'
    },
    {
      sel: '#btn-dock-rb-insert',
      html: { en: SVG.plus + ' <span>Insert to Canvas</span>', vi: SVG.plus + ' <span>Chèn Lên Web</span>' }
    },

    // ==================== MODALS 1, 2, 3 ====================
    {
      sel: '#modal-open-web .modal-header h3',
      text: {
        en: 'Import Web Page or Connect Project Workspace',
        vi: 'Đưa Giao Diện Web Của Bạn Vào Studio'
      }
    },
    {
      sel: '#card-pick-html h4',
      html: { en: '1. Choose Local <code>.html</code> File', vi: '1. Chọn File <code>.html</code> từ máy' }
    },
    {
      sel: '#card-pick-html p',
      text: {
        en: 'Open any standalone HTML file and export or overwrite it after editing.',
        vi: 'Mở trực tiếp bất kỳ file HTML nào và lưu đè lại ngay khi sửa xong.'
      }
    },
    {
      sel: '#btn-trigger-file-picker',
      text: { en: 'Select .HTML File', vi: 'Chọn File .HTML' }
    },
    {
      sel: '#card-pick-folder h4',
      text: { en: '2. Import Project Folder', vi: '2. Thả Nguyên Thư Mục Web' }
    },
    {
      sel: '#card-pick-folder p',
      text: {
        en: 'Automatically bundles HTML, CSS stylesheets, and local image assets.',
        vi: 'Tự động nạp cả file HTML, CSS và Hình ảnh đi kèm trong thư mục.'
      }
    },
    {
      sel: '#btn-apply-workspace-path',
      text: { en: 'Connect Workspace', vi: 'Kết nối Thư mục' }
    },
    {
      sel: '#btn-load-pasted-html',
      text: { en: 'Load HTML Snippet', vi: 'Nạp Mã HTML Này' }
    },
    {
      sel: '#modal-ai-prompt .modal-header h3',
      text: {
        en: 'Structured AI Prompt & Generated CSS Patch',
        vi: 'Prompt Chuẩn Cho AI & Mã CSS Đã Tinh Chỉnh'
      }
    },
    {
      sel: '.prompt-tab[data-ptab="ptab-prompt"]',
      text: { en: 'AI Prompt Instructions', vi: 'Prompt Gửi Cho AI' }
    },
    {
      sel: '.prompt-tab[data-ptab="ptab-css"]',
      text: { en: 'Generated CSS Patch', vi: 'Mã CSS Đã Sinh Tự Động' }
    },
    {
      sel: '#btn-copy-ai-prompt',
      html: { en: SVG.copy + ' <span>Copy AI Prompt</span>', vi: SVG.copy + ' <span>Copy Prompt Cho AI</span>' }
    },
    {
      sel: '#btn-copy-css-patch',
      html: { en: SVG.copy + ' <span>Copy CSS Code</span>', vi: SVG.copy + ' <span>Copy Mã CSS</span>' }
    },
    {
      sel: '#modal-uilib-explorer .uilib-modal-title h3',
      text: {
        en: 'UI Component Hub & Official .TSX Registry Importer',
        vi: 'Trung Tâm Thư Viện UI & Trình Import Component Thông Minh'
      }
    },
    {
      sel: '.uilib-mtab[data-umtab="umtab-catalog"]',
      html: {
        en: SVG.search + ' <span>Browse 282+ Official Components &amp; 38 UI Libraries</span>',
        vi: SVG.search + ' <span>Kho Component &amp; 38 Trang Chủ UI Library</span>'
      }
    },
    {
      sel: '.uilib-mtab[data-umtab="umtab-import"]',
      html: {
        en: SVG.code + ' <span>Import Code (.TSX / JSX / HTML / Tailwind / Registry JSON)</span>',
        vi: SVG.code + ' <span>Tự Dán Code (HTML / React JSX / Tailwind) Từ Web Bất Kỳ</span>'
      }
    },
    {
      sel: '.uilib-dir-header',
      text: {
        en: 'Directory of 38+ UI Libraries',
        vi: 'Danh sách 38 Thư viện từ ảnh của bạn'
      }
    },
    {
      sel: '#uilib-modal-search',
      attr: 'placeholder',
      en: 'Search components: button, card, badge, input, pricing, aceternity, magic ui, shadcn...',
      vi: 'Tìm kiếm: button, card, badge, input, pricing, aceternity, magic ui, hover.dev, shadcn...'
    },
    {
      sel: '#btn-save-and-insert-comp',
      html: {
        en: SVG.sparkles + ' <span>Save to Library &amp; Insert to Canvas</span>',
        vi: SVG.sparkles + ' <span>Lưu Vào Kho UI &amp; Chèn Ngay Lên Web</span>'
      }
    },
    {
      sel: '#btn-only-save-comp',
      html: {
        en: SVG.save + ' <span>Save to Library Only (for Hover Preview)</span>',
        vi: SVG.save + ' <span>Chỉ Lưu Vào Kho UI (Để Rê Chuột Xem Thử)</span>'
      }
    }
  ];

  // Translate dynamic cards, counters, and lists rendered by studio.js with Origin UI SVG icons
  function translateDynamicDomNodes(lang) {
    // 1. Component Cards (.uilib-comp-card) — skip cards already translated for this language!
    document.querySelectorAll('.uilib-comp-card').forEach(card => {
      if (card.dataset.i18nLang === lang) return;
      card.dataset.i18nLang = lang;

      const btnMorph = card.querySelector('.btn-morph-comp');
      if (btnMorph) {
        btnMorph.innerHTML = lang === 'en'
          ? SVG.wand + ' <span>Apply Style &amp; FX</span>'
          : SVG.wand + ' <span>Áp Style &amp; FX</span>';
        btnMorph.title = lang === 'en'
          ? 'Hover to preview & click to apply Style, Animation, Hover FX & SVG Icon to selected element'
          : 'Rê chuột để xem thử & Áp cả Style, Animation, Hiệu ứng Hover + Icon vào thẻ đang chọn';
      }
      const btnInsert = card.querySelector('.btn-insert-comp');
      if (btnInsert) {
        btnInsert.innerHTML = lang === 'en'
          ? SVG.plus + ' <span>Insert</span>'
          : SVG.plus + ' <span>Chèn Mới</span>';
        btnInsert.title = lang === 'en'
          ? 'Hover to preview & click to insert this component onto the canvas'
          : 'Rê chuột để xem thử & Chèn Component này vào trang web';
      }
      const btnTsx = card.querySelector('.btn-view-official-tsx');
      if (btnTsx) {
        btnTsx.innerHTML = SVG.code + ' <span>.TSX</span>';
      }
      const siteLink = card.querySelector('.uilib-site-link');
      if (siteLink) {
        siteLink.innerHTML = lang === 'en' ? 'Docs ↗' : 'Web ↗';
      }
      const btnEdit = card.querySelector('.btn-edit-custom');
      if (btnEdit) {
        btnEdit.innerHTML = lang === 'en' ? SVG.pen + ' <span>Edit</span>' : SVG.pen + ' <span>Sửa</span>';
      }
      card.querySelectorAll('.btn-del-custom, .btn-del-custom-bottom').forEach(btnDel => {
        btnDel.innerHTML = lang === 'en' ? SVG.trash + ' <span>Delete</span>' : SVG.trash + ' <span>Xóa</span>';
      });
    });

    // 2. Results counter (#uilib-results-count) — only mutate if text actually differs
    const resCount = document.getElementById('uilib-results-count');
    if (resCount && resCount.textContent) {
      const txt = resCount.textContent;
      let nextTxt = txt;
      if (lang === 'en') {
        nextTxt = txt
          .replace(/Tìm thấy (\d+) Component từ (\d+) Thư viện/, 'Showing $1 Components across $2 Libraries')
          .replace(/🎯?\s*Gợi ý theo thẻ chọn: (\d+) mẫu từ (\d+) Thư viện/, 'Smart Match: $1 Components across $2 Libraries')
          .replace(/☑️?\s*Checklist \((\d+) loại\): (\d+) mẫu từ (\d+) Thư viện/, 'Taxonomy ($1 types): $2 Components across $3 Libraries')
          .replace(/Danh bạ (\d+) Thư viện UI \(Click Logo mở Web\)/, 'Directory of $1 UI Libraries (Click Logo to open Docs)');
      } else {
        nextTxt = txt
          .replace(/Showing (\d+) Components across (\d+) Libraries/, 'Tìm thấy $1 Component từ $2 Thư viện')
          .replace(/Smart Match: (\d+) Components across (\d+) Libraries/, 'Gợi ý theo thẻ chọn: $1 mẫu từ $2 Thư viện')
          .replace(/Taxonomy \((\d+) types\): (\d+) Components across (\d+) Libraries/, 'Checklist ($1 loại): $2 mẫu từ $3 Thư viện')
          .replace(/Directory of (\d+) UI Libraries \(Click Logo to open Docs\)/, 'Danh bạ $1 Thư viện UI (Click Logo mở Web)');
      }
      if (nextTxt !== txt) {
        resCount.textContent = nextTxt;
      }
    }

    // 3. Selected Element Label & Status Breadcrumb when nothing is selected
    const selLabel = document.getElementById('selected-selector-label');
    const selBadge = document.getElementById('selected-tag-badge');
    if (selLabel && selBadge && selBadge.textContent === 'NONE') {
      const nextLbl = lang === 'en' ? 'Select an element on canvas' : 'Hãy chọn 1 phần tử trên web';
      if (selLabel.textContent !== nextLbl) selLabel.textContent = nextLbl;
    }
    const breadcrumb = document.getElementById('status-breadcrumb');
    if (breadcrumb && (breadcrumb.textContent.includes('Chưa chọn') || breadcrumb.textContent.includes('No element'))) {
      const nextBc = lang === 'en' ? 'No element selected' : 'Chưa chọn phần tử nào';
      if (breadcrumb.textContent !== nextBc) breadcrumb.textContent = nextBc;
    }

    // 4. Page Selector default option
    const pageSel = document.getElementById('page-selector');
    if (pageSel && pageSel.options.length > 0 && pageSel.options[0].value === '') {
      const m = pageSel.options[0].textContent.match(/\d+/);
      const count = m ? m[0] : '';
      const nextOpt = count
        ? (lang === 'en' ? `-- Select HTML Page (${count} pages) --` : `-- Chọn file HTML (${count} trang) --`)
        : (lang === 'en' ? '-- Select HTML Page --' : '-- Chọn trang web --');
      if (pageSel.options[0].textContent !== nextOpt) {
        pageSel.options[0].textContent = nextOpt;
      }
    }

    // 5. History Header & Empty State
    const histHeader = document.querySelector('#tab-history .section-header-row h4');
    const histTotal = document.getElementById('history-total');
    if (histHeader && histTotal && histHeader.dataset.i18nLang !== lang) {
      histHeader.dataset.i18nLang = lang;
      const num = histTotal.textContent || '0';
      histHeader.innerHTML = lang === 'en'
        ? 'Edit History (<span id="history-total">' + num + '</span>)'
        : 'Nhật ký chỉnh sửa (<span id="history-total">' + num + '</span>)';
    }
    const emptyHist = document.querySelector('#change-log-list .empty-state-sm');
    if (emptyHist) {
      const nextEmpty = lang === 'en'
        ? 'No changes recorded yet. Click any element on the canvas to start designing!'
        : 'Chưa có thay đổi nào. Hãy click vào một phần tử trên trang để bắt đầu kéo thả!';
      if (emptyHist.textContent !== nextEmpty) emptyHist.textContent = nextEmpty;
    }

    // 6. Modal All Libraries item
    const modalFirstDir = document.querySelector('#uilib-modal-sites-list .uilib-dir-item:first-child > span:first-child');
    if (modalFirstDir) {
      const nextDir = lang === 'en' ? 'All 38+ UI Libraries' : 'Tất cả 38+ Thư viện';
      if (modalFirstDir.textContent !== nextDir) modalFirstDir.textContent = nextDir;
    }

    // 7. Live-Hover Custom Select Triggers (Default vs Mặc định)
    document.querySelectorAll('.ui-live-select-label, .ui-live-select-trigger__text').forEach(lbl => {
      if (lang === 'en' && lbl.textContent.trim() === 'Mặc định') lbl.textContent = 'Default';
      if (lang === 'vi' && lbl.textContent.trim() === 'Default') lbl.textContent = 'Mặc định';
    });
  }

  window.translateDynamicStudioNodes = () => translateDynamicDomNodes(currentLang);

  function applyStudioLanguage(lang, showNotification = false) {
    currentLang = lang === 'en' ? 'en' : 'vi';
    localStorage.setItem('studio_lang', currentLang);
    document.documentElement.lang = currentLang;

    // Update #lang-switcher buttons
    document.querySelectorAll('#lang-switcher [data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });

    // Apply selector translation table
    SELECTOR_TRANSLATIONS.forEach(item => {
      document.querySelectorAll(item.sel).forEach(el => {
        if (item.text && item.text[currentLang] !== undefined) {
          el.textContent = item.text[currentLang];
        }
        if (item.html && item.html[currentLang] !== undefined) {
          el.innerHTML = item.html[currentLang];
        }
        if (item.attr && item[currentLang] !== undefined) {
          el.setAttribute(item.attr, item[currentLang]);
        }
        if (item.prevLabel && item.prevLabel[currentLang] !== undefined) {
          const prev = el.previousElementSibling;
          if (prev && prev.tagName === 'LABEL') {
            prev.textContent = item.prevLabel[currentLang];
          }
        }
      });
    });

    // Update #btn-change-folder icon while keeping #current-folder-label intact
    const btnFolder = document.getElementById('btn-change-folder');
    const folderLbl = document.getElementById('current-folder-label');
    if (btnFolder && folderLbl) {
      const currentPath = folderLbl.textContent;
      btnFolder.innerHTML = SVG.folder + ' <span id="current-folder-label">' + currentPath + '</span>';
    }

    // Update #btn-toggle-namethat-checklist icon while preserving badge
    const chkBtn = document.getElementById('btn-toggle-namethat-checklist');
    if (chkBtn) {
      const badge = document.getElementById('namethat-checked-badge');
      const badgeHtml = badge ? badge.outerHTML : '<span id="namethat-checked-badge" class="namethat-badge hidden">0</span>';
      chkBtn.innerHTML = SVG.checkSquare + badgeHtml;
      chkBtn.title = currentLang === 'en' ? 'UI Taxonomy Checklist (NameThat Standard)' : 'Checklist phân loại Component chuẩn NameThat UI';
    }

    // Update ReactBits Customize Panel labels & dropdowns
    if (window.refreshReactBitsLang && typeof window.refreshReactBitsLang === 'function') {
      window.refreshReactBitsLang();
    }

    // Translate dynamic nodes
    translateDynamicDomNodes(currentLang);
    syncDarkModeButtonsUI();

    if (showNotification && window.showOriginToast) {
      window.showOriginToast(
        currentLang === 'en'
          ? 'Switched Studio interface to English (Origin UI / Figma Standard)'
          : 'Đã chuyển ngôn ngữ Studio sang Tiếng Việt (Chuẩn Origin UI)',
        'info'
      );
    }
  }

  window.setStudioLang = applyStudioLanguage;

  // ==================== UNIFIED DARK / LIGHT MODE CONTROLLER ====================
  function isStudioInDarkMode() {
    const theme = document.documentElement.getAttribute('data-studio-theme') || 'obsidian';
    return theme !== 'daylight';
  }

  function syncDarkModeButtonsUI() {
    const isDark = isStudioInDarkMode();
    const btnDarkToggle = document.getElementById('btn-dark-mode-toggle');
    if (btnDarkToggle) {
      btnDarkToggle.innerHTML = isDark ? SVG.moon : SVG.sun;
      btnDarkToggle.title = currentLang === 'en'
        ? (isDark ? 'Dark Mode Active (Click for Light Mode)' : 'Light Mode Active (Click for Dark Mode)')
        : (isDark ? 'Đang ở chế độ Tối (Bấm để sang Sáng)' : 'Đang ở chế độ Sáng (Bấm để sang Tối)');
    }
    const btnCanvasDark = document.getElementById('btn-canvas-dark-mode');
    if (btnCanvasDark) {
      btnCanvasDark.classList.toggle('active', canvasDarkActive);
      btnCanvasDark.innerHTML = canvasDarkActive ? SVG.moon : SVG.sun;
      btnCanvasDark.title = currentLang === 'en'
        ? (canvasDarkActive ? 'Webpage Dark Mode: ON' : 'Simulate Dark Mode on Webpage Canvas')
        : (canvasDarkActive ? 'Đang bật Dark Mode cho trang web' : 'Bật/Tắt giả lập Dark Mode cho trang web trên Canvas');
    }
    const btnOriginKit = document.getElementById('btn-apply-origin-system');
    if (btnOriginKit) {
      btnOriginKit.classList.toggle('active', canvasOriginKitActive);
      btnOriginKit.innerHTML = SVG.sparkles;
      btnOriginKit.title = currentLang === 'en'
        ? (canvasOriginKitActive ? 'Origin UI Kit: Active on Webpage' : 'Apply Origin UI + Sonner Design System to Webpage')
        : (canvasOriginKitActive ? 'Origin UI Kit: Đang bật trên trang web' : 'Đồng bộ chuẩn Origin UI + Sonner lên toàn bộ trang web');
    }
  }

  function setUnifiedStudioDarkMode(enableDark) {
    const themeSelect = document.getElementById('studio-theme-select');
    const currentTheme = document.documentElement.getAttribute('data-studio-theme') || 'obsidian';
    if (currentTheme !== 'daylight') {
      lastDarkTheme = currentTheme;
      localStorage.setItem('studio_last_dark_theme', lastDarkTheme);
    }

    const nextStudioTheme = enableDark ? (lastDarkTheme || 'obsidian') : 'daylight';
    document.documentElement.setAttribute('data-studio-theme', nextStudioTheme);
    localStorage.setItem('studio_ui_theme', nextStudioTheme);
    if (themeSelect) {
      themeSelect.value = nextStudioTheme;
    }

    // Sync ReactBits Customize Panel theme (dark <-> light)
    const nextRbTheme = enableDark ? 'dark' : 'light';
    if (window.setReactBitsTheme && typeof window.setReactBitsTheme === 'function') {
      window.setReactBitsTheme(nextRbTheme);
    } else {
      document.querySelectorAll('.rb-customize-scope').forEach(el => {
        el.setAttribute('data-rb-theme', nextRbTheme);
      });
    }

    syncDarkModeButtonsUI();
    if (window.showOriginToast) {
      window.showOriginToast(
        currentLang === 'en'
          ? `Switched workspace to ${enableDark ? 'Dark Mode (Obsidian Zinc)' : 'Light Mode (Daylight Zinc)'}`
          : `Đã chuyển giao diện sang ${enableDark ? 'Chế độ Tối (Dark Mode)' : 'Chế độ Sáng (Light Mode)'}`,
        'info'
      );
    }
  }

  // Apply or remove Dark Mode simulation inside the live Canvas Iframe
  function applyCanvasDarkSimulation() {
    const iframe = document.getElementById('canvas-iframe');
    if (!iframe || !iframe.contentDocument || !iframe.contentDocument.head) return;
    const doc = iframe.contentDocument;
    let styleEl = doc.getElementById('studio-canvas-dark-sim-style');

    if (!canvasDarkActive) {
      if (styleEl) styleEl.remove();
      doc.documentElement.removeAttribute('data-studio-canvas-dark');
      return;
    }

    doc.documentElement.setAttribute('data-studio-canvas-dark', 'true');
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = 'studio-canvas-dark-sim-style';
      doc.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      html[data-studio-canvas-dark="true"],
      html[data-studio-canvas-dark="true"] body {
        background-color: #09090b !important;
        color: #f4f4f5 !important;
        transition: background-color 0.25s ease, color 0.25s ease;
      }
      html[data-studio-canvas-dark="true"] section,
      html[data-studio-canvas-dark="true"] header,
      html[data-studio-canvas-dark="true"] footer,
      html[data-studio-canvas-dark="true"] main,
      html[data-studio-canvas-dark="true"] nav,
      html[data-studio-canvas-dark="true"] article,
      html[data-studio-canvas-dark="true"] aside {
        background-color: #0c0c10 !important;
        color: #f4f4f5 !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
      }
      html[data-studio-canvas-dark="true"] h1,
      html[data-studio-canvas-dark="true"] h2,
      html[data-studio-canvas-dark="true"] h3,
      html[data-studio-canvas-dark="true"] h4,
      html[data-studio-canvas-dark="true"] h5,
      html[data-studio-canvas-dark="true"] h6 {
        color: #fafafa !important;
      }
      html[data-studio-canvas-dark="true"] p,
      html[data-studio-canvas-dark="true"] li,
      html[data-studio-canvas-dark="true"] label {
        color: #d4d4d8 !important;
      }
    `;
  }

  // ==================== 1-CLICK ORIGIN UI + SONNER GLOBAL SYSTEM FOR WEBPAGE CANVAS ====================
  function applyCanvasOriginDesignSystem() {
    const iframe = document.getElementById('canvas-iframe');
    if (!iframe || !iframe.contentDocument || !iframe.contentDocument.head) return;
    const doc = iframe.contentDocument;
    let styleEl = doc.getElementById('studio-origin-ui-global-system');

    if (!canvasOriginKitActive) {
      if (styleEl) styleEl.remove();
      doc.documentElement.removeAttribute('data-origin-ui-system');
      return;
    }

    doc.documentElement.setAttribute('data-origin-ui-system', 'true');
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = 'studio-origin-ui-global-system';
      doc.head.appendChild(styleEl);
    }

    // Complete Origin UI (coss.com) + Shadcn Sonner UI/UX System for Buttons, Alerts, Toasts, Inputs, Badges & Cards
    styleEl.textContent = `
      /* Origin UI + Shadcn Geist Global UI/UX System */
      html[data-origin-ui-system="true"] button:not([role="switch"]),
      html[data-origin-ui-system="true"] .btn,
      html[data-origin-ui-system="true"] input[type="submit"],
      html[data-origin-ui-system="true"] input[type="button"],
      html[data-origin-ui-system="true"] a.btn {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        border-radius: 8px !important;
        font-weight: 600 !important;
        letter-spacing: -0.012em !important;
        border: 1px solid rgba(255, 255, 255, 0.14) !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.22) !important;
        transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), filter 0.15s ease, box-shadow 0.15s ease !important;
      }
      html[data-origin-ui-system="true"] button:hover,
      html[data-origin-ui-system="true"] .btn:hover,
      html[data-origin-ui-system="true"] a.btn:hover {
        transform: translateY(-1px) !important;
        filter: brightness(1.06) !important;
      }
      html[data-origin-ui-system="true"] button:active,
      html[data-origin-ui-system="true"] .btn:active {
        transform: scale(0.98) !important;
      }
      html[data-origin-ui-system="true"] input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),
      html[data-origin-ui-system="true"] select,
      html[data-origin-ui-system="true"] textarea {
        border-radius: 8px !important;
        border: 1px solid rgba(161, 161, 170, 0.28) !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08) !important;
        transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
      }
      html[data-origin-ui-system="true"] input:focus,
      html[data-origin-ui-system="true"] select:focus,
      html[data-origin-ui-system="true"] textarea:focus {
        outline: none !important;
        border-color: #8b5cf6 !important;
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.22) !important;
      }
      html[data-origin-ui-system="true"] .alert,
      html[data-origin-ui-system="true"] [role="alert"] {
        border-radius: 10px !important;
        border: 1px solid rgba(161, 161, 170, 0.24) !important;
        border-left: 3px solid #10b981 !important;
        box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.25) !important;
      }
    `;
  }

  function initI18nAndThemeSystem() {
    // 1. Bind Language Switcher (#lang-switcher)
    document.querySelectorAll('#lang-switcher [data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextLang = btn.getAttribute('data-lang') || 'vi';
        applyStudioLanguage(nextLang, true);
      });
    });

    // 2. Bind 1-Click Dark / Light Mode Toggle (#btn-dark-mode-toggle)
    const btnDarkToggle = document.getElementById('btn-dark-mode-toggle');
    if (btnDarkToggle) {
      btnDarkToggle.addEventListener('click', () => {
        const currentlyDark = isStudioInDarkMode();
        setUnifiedStudioDarkMode(!currentlyDark);
      });
    }

    // 3. Sync when user changes #studio-theme-select dropdown
    const themeSelect = document.getElementById('studio-theme-select');
    if (themeSelect) {
      themeSelect.addEventListener('change', e => {
        const val = e.target.value;
        if (val !== 'daylight') {
          lastDarkTheme = val;
          localStorage.setItem('studio_last_dark_theme', val);
          if (window.setReactBitsTheme) window.setReactBitsTheme('dark');
        } else {
          if (window.setReactBitsTheme) window.setReactBitsTheme('light');
        }
        syncDarkModeButtonsUI();
      });
    }

    // 4. Bind Canvas Webpage Dark Mode Toggle (#btn-canvas-dark-mode)
    const btnCanvasDark = document.getElementById('btn-canvas-dark-mode');
    if (btnCanvasDark) {
      btnCanvasDark.addEventListener('click', () => {
        canvasDarkActive = !canvasDarkActive;
        applyCanvasDarkSimulation();
        syncDarkModeButtonsUI();
        if (window.showOriginToast) {
          window.showOriginToast(
            currentLang === 'en'
              ? (canvasDarkActive ? 'Enabled Dark Mode simulation on webpage canvas' : 'Disabled webpage canvas Dark Mode')
              : (canvasDarkActive ? 'Đã bật chế độ Dark Mode cho trang web trên Canvas' : 'Đã tắt chế độ Dark Mode trên Canvas'),
            'info'
          );
        }
      });
    }

    // 5. Bind 1-Click Apply Origin UI + Sonner Design System to Webpage (#btn-apply-origin-system)
    const btnOriginKit = document.getElementById('btn-apply-origin-system');
    if (btnOriginKit) {
      btnOriginKit.addEventListener('click', () => {
        canvasOriginKitActive = !canvasOriginKitActive;
        applyCanvasOriginDesignSystem();
        syncDarkModeButtonsUI();
        if (window.showOriginToast) {
          window.showOriginToast(
            currentLang === 'en'
              ? (canvasOriginKitActive ? 'Applied Origin UI (coss.com) + Sonner Design System to all Buttons, Alerts, Inputs & Cards on page!' : 'Restored original webpage styles')
              : (canvasOriginKitActive ? 'Đã đồng bộ chuẩn UI/UX Origin UI (coss.com) + Sonner lên toàn bộ Button, Alert, Input & Card của trang web!' : 'Đã tắt bộ đồng bộ Origin UI Kit trên trang web'),
            canvasOriginKitActive ? 'success' : 'warning'
          );
        }
      });
    }

    // Re-apply Canvas Dark Mode & Origin UI Kit if iframe reloads
    const iframe = document.getElementById('canvas-iframe');
    if (iframe) {
      iframe.addEventListener('load', () => {
        if (canvasDarkActive) applyCanvasDarkSimulation();
        if (canvasOriginKitActive) applyCanvasOriginDesignSystem();
      });
    }

    // 6. Observe dynamic DOM lists so newly rendered cards/history translate & upgrade to Lucide SVGs automatically
    const obsTargets = [
      document.getElementById('uilib-components-list'),
      document.getElementById('uilib-modal-grid'),
      document.getElementById('change-log-list')
    ].filter(Boolean);

    if (obsTargets.length > 0 && window.MutationObserver) {
      let rafId = null;
      const observer = new MutationObserver(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          rafId = null;
          observer.disconnect();
          translateDynamicDomNodes(currentLang);
          obsTargets.forEach(t => observer.observe(t, { childList: true, subtree: false }));
        });
      });
      obsTargets.forEach(t => observer.observe(t, { childList: true, subtree: false }));
    }

    // Initial language & theme synchronization
    const initDark = isStudioInDarkMode();
    if (window.setReactBitsTheme) {
      window.setReactBitsTheme(initDark ? 'dark' : 'light');
    }
    applyStudioLanguage(currentLang, false);
    syncDarkModeButtonsUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18nAndThemeSystem);
  } else {
    initI18nAndThemeSystem();
  }
})();
