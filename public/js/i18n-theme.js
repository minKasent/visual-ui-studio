/**
 * VISUAL UI STUDIO PRO v6.3 — BILINGUAL I18N (EN ⇄ VI) & UNIFIED DARK/LIGHT MODE ENGINE
 * Terminology modeled after industry standards: Figma, Framer, Webflow, Shadcn Studio & ReactBits.dev
 */
(function () {
  let currentLang = localStorage.getItem('studio_lang') || 'vi';
  let lastDarkTheme = localStorage.getItem('studio_last_dark_theme') || 'obsidian';
  let canvasDarkActive = false;

  window.getStudioLang = () => currentLang;

  // Selector-based exact text / HTML / attribute translation table
  const SELECTOR_TRANSLATIONS = [
    // ==================== TOPBAR ====================
    {
      sel: '#brand-home-logo',
      attr: 'title',
      en: '🏠 Click Logo to return to Home Page',
      vi: '🏠 Click vào Logo để quay về Trang Chủ'
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
      text: { en: '📥 Open Web', vi: '📥 Mở Web' },
      attr: 'title',
      en: 'Open or drop any HTML file or project folder from your computer',
      vi: 'Thả hoặc chọn file HTML / Thư mục bất kỳ từ máy tính'
    },
    {
      sel: '#btn-load-demo',
      text: { en: '🎨 Demo Page', vi: '🎨 Trang Mẫu' },
      attr: 'title',
      en: 'Load interactive demo template',
      vi: 'Mở giao diện mẫu để thử nghiệm'
    },
    {
      sel: '#btn-open-uilib-explorer .cmd-search-trigger__text',
      text: {
        en: 'Search Components (Button, Card, Aceternity, Magic UI...)',
        vi: 'Tìm Component (button, card, Aceternity, Magic UI...)'
      }
    },
    {
      sel: '#btn-open-uilib-explorer',
      attr: 'title',
      en: 'Quick Search across 38+ UI Libraries & 282+ Official .TSX Components (Ctrl+K)',
      vi: 'Tìm kiếm nhanh Button, Card, Input từ 38+ Thư viện UI (Ctrl+K)'
    },
    {
      sel: '.topbar__center .btn-toggle-rb-dock',
      text: { en: '🎛️ Customize (ReactBits)', vi: '🎛️ Customize (ReactBits)' },
      attr: 'title',
      en: 'Open 3-Column ReactBits.dev Customize Dock (218 Component Schemas & 3,960 Scrubber Controls)',
      vi: 'Mở Bảng Customize 3 cột chuẩn ReactBits.dev (218 Component Schemas & 3,960 thanh kéo Scrubber)'
    },
    {
      sel: '#btn-zoom-out',
      attr: 'title',
      en: 'Zoom Out',
      vi: 'Thu nhỏ'
    },
    {
      sel: '#btn-zoom-in',
      attr: 'title',
      en: 'Zoom In',
      vi: 'Phóng to'
    },
    {
      sel: '#btn-zoom-reset',
      attr: 'title',
      en: 'Reset Zoom to 100%',
      vi: 'Đặt lại 100%'
    },
    {
      sel: '#mode-edit-btn',
      text: { en: '✏️ Design', vi: '✏️ Sửa UI' },
      attr: 'title',
      en: 'Direct Visual Manipulation & Drag-and-Drop Mode',
      vi: 'Chế độ kéo thả & chỉnh sửa trực tiếp'
    },
    {
      sel: '#mode-preview-btn',
      text: { en: '👁️ Preview', vi: '👁️ Xem Thử' },
      attr: 'title',
      en: 'Interactive Live Preview Mode (test links, hover states & scrolling)',
      vi: 'Chế độ xem thử như trang web thật (bấm link, cuộn mượt)'
    },
    {
      sel: '#txt-bypass-loader',
      text: { en: 'Bypass Loader', vi: 'Tắt Loader' }
    },
    {
      sel: '#lbl-bypass-loader',
      attr: 'title',
      en: 'Automatically bypass page preloaders and reveal scroll-hidden sections for editing',
      vi: 'Tự động ẩn màn hình chờ (Loader) và hiện đầy đủ các khối ẩn để dễ chỉnh sửa'
    },
    {
      sel: '#btn-canvas-dark-mode',
      attr: 'title',
      en: 'Toggle Dark Mode simulation on the live webpage canvas',
      vi: 'Bật/Tắt chế độ Dark Mode cho trang web đang chỉnh sửa trong khung Canvas'
    },
    {
      sel: '#btn-dark-mode-toggle',
      attr: 'title',
      en: 'Toggle Dark Mode / Light Mode across Studio & ReactBits Customize Panel',
      vi: 'Chuyển đổi nhanh chế độ Dark Mode / Light Mode cho toàn bộ Studio & Bảng Customize'
    },
    {
      sel: '#studio-theme-select',
      attr: 'title',
      en: 'Switch Studio Workspace Theme (Inspired by tweakcn & Shadcn UI)',
      vi: 'Đổi giao diện của công cụ Studio (Cảm hứng từ tweakcn & Shadcn)'
    },
    {
      sel: '#btn-undo',
      attr: 'title',
      en: 'Undo (Ctrl+Z)',
      vi: 'Hoàn tác (Ctrl+Z)'
    },
    {
      sel: '#btn-redo',
      attr: 'title',
      en: 'Redo (Ctrl+Y)',
      vi: 'Làm lại (Ctrl+Y)'
    },
    {
      sel: '#btn-ai-prompt',
      html: {
        en: '🤖 AI Prompt <span id="change-count-badge" class="badge-count">0</span>',
        vi: '🤖 Prompt AI <span id="change-count-badge" class="badge-count">0</span>'
      },
      attr: 'title',
      en: 'Generate structured AI Prompt & CSS Patch for Cursor / Claude / ChatGPT',
      vi: 'Tự động tạo câu lệnh Prompt chi tiết mọi thay đổi để gửi cho AI'
    },
    {
      sel: '#btn-download-html',
      text: { en: '⬇️ Export HTML', vi: '⬇️ Tải HTML' },
      attr: 'title',
      en: 'Download edited standalone HTML file',
      vi: 'Tải file HTML đã chỉnh sửa về máy'
    },
    {
      sel: '#btn-save-direct',
      text: { en: '💾 Save Source', vi: '💾 Lưu File Gốc' },
      attr: 'title',
      en: 'Save changes directly to the source HTML file on disk (Ctrl+S)',
      vi: 'Lưu trực tiếp vào file gốc trên máy (Ctrl+S)'
    },

    // ==================== LEFT SIDEBAR TABS & ASSETS HUB ====================
    {
      sel: '.sidebar-tab[data-tab="tab-uilibs"]',
      html: {
        en: '🌐 Assets <span class="tab-hot-dot"></span>',
        vi: '🌐 Kho UI <span class="tab-hot-dot"></span>'
      },
      attr: 'title',
      en: 'Component Assets from 38+ UI Libraries (Aceternity, Magic UI, Shadcn, Origin UI...)',
      vi: 'Kho Component từ 38+ Thư viện UI (Aceternity, Magic UI, Shadcn, Hover.dev...)'
    },
    {
      sel: '.sidebar-tab[data-tab="tab-layers"]',
      text: { en: '📑 Layers', vi: '📑 Cây UI' },
      attr: 'title',
      en: 'DOM Layer Hierarchy Tree',
      vi: 'Cây cấu trúc các thẻ trên trang'
    },
    {
      sel: '.sidebar-tab[data-tab="tab-add"]',
      text: { en: '➕ Elements', vi: '➕ Cơ Bản' },
      attr: 'title',
      en: 'Insert Basic UI Primitives & Layout Containers',
      vi: 'Thêm nhanh các khối cơ bản'
    },
    {
      sel: '.sidebar-tab[data-tab="tab-magic"]',
      text: { en: '✨ Styles', vi: '✨ Style' },
      attr: 'title',
      en: '1-Click Visual Style Presets & Live Hover Preview',
      vi: 'Biến hình phong cách 1-Click'
    },
    {
      sel: '.sidebar-tab[data-tab="tab-history"]',
      text: { en: '🕒 History', vi: '🕒 Lịch Sử' },
      attr: 'title',
      en: 'Version History & Activity Log',
      vi: 'Nhật ký chỉnh sửa & Khôi phục'
    },
    {
      sel: '#uilib-search-input',
      attr: 'placeholder',
      en: 'Search: button, switch, card, magic...',
      vi: 'Gõ: button, switch, card, magic...'
    },
    {
      sel: '#btn-toggle-namethat-checklist',
      attr: 'title',
      en: 'Open UI Component Taxonomy Checklist (NameThat UI Standard)',
      vi: 'Mở bảng Checklist các loại Component chuẩn NameThat UI (Button, Switch, Card, Checkbox, Modal, Tabs...)'
    },
    {
      sel: '.namethat-panel__header > span',
      html: {
        en: '📋 <strong>UI Taxonomy</strong> (NameThat Standard)',
        vi: '📋 <strong>Checklist Loại UI</strong> (Chuẩn NameThat)'
      }
    },
    {
      sel: '#btn-reset-namethat',
      text: { en: '↺ Clear All', vi: '↺ Bỏ chọn hết' }
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
      text: { en: 'Auto-Filter', vi: 'Tự lọc' }
    },
    {
      sel: '#chk-morph-with-fx + span',
      text: { en: 'With FX/SVG', vi: 'Kèm FX/SVG' }
    },
    {
      sel: '#btn-expand-uilib-modal',
      text: { en: '⤢ Explore', vi: '⤢ Mở rộng' },
      attr: 'title',
      en: 'Open Full-Screen Component Hub (Ctrl+K)',
      vi: 'Mở kho thư viện toàn màn hình (Ctrl+K)'
    },
    {
      sel: '.uilib-cdn-summary',
      text: {
        en: '⚡ Inject CDN Libraries (Tailwind, Bootstrap, GSAP, Swiper...)',
        vi: '⚡ Nạp thư viện CDN (Tailwind, Bootstrap, GSAP, Swiper...)'
      }
    },
    {
      sel: '#btn-show-all-uilibs',
      text: { en: 'Show All', vi: 'Xem tất cả' }
    },
    {
      sel: '#layer-search',
      attr: 'placeholder',
      en: '🔍 Filter layers by tag, class, or text...',
      vi: '🔍 Tìm thẻ, class, nội dung chữ...'
    },

    // ==================== LEFT SIDEBAR: ADD PRIMITIVES & MAGIC & HISTORY ====================
    {
      sel: '#tab-add .section-hint',
      html: {
        en: '💡 <strong>Hover over any block</strong> to preview live on canvas, <strong>Click</strong> to insert! (Press <strong>🗑️ Delete</strong> or <strong>Ctrl+Z</strong> to undo):',
        vi: '💡 <strong>Rê chuột vào khối</strong> để xem trước trực tiếp trên trang web, <strong>Bấm chuột</strong> để chèn vào! (Thêm nhầm có thể bấm <strong>🗑️ Xóa</strong> hoặc <strong>Ctrl+Z</strong>):'
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
        en: '✨ Select any element on canvas and <strong>hover over these presets</strong> for an instant live preview:',
        vi: '✨ Chọn 1 phần tử trên web rồi <strong>rê chuột qua các phong cách dưới đây</strong> để xem trước hiệu ứng ngay lập tức!'
      }
    },
    {
      sel: '#btn-clear-all-edits',
      text: { en: '↺ Revert All', vi: '↺ Khôi phục tất cả' }
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
        en: '<span id="live-preview-badge" class="live-preview-badge hidden">👁️ Live Previewing...</span>' +
            '<span class="shortcut-tip"><kbd>Drag</kbd> Move</span>' +
            '<span class="shortcut-tip"><kbd>← ↑ → ↓</kbd> Nudge 1px</span>' +
            '<span class="shortcut-tip"><kbd>Double-Click</kbd> Edit Text</span>' +
            '<span class="shortcut-tip"><kbd>Ctrl+K</kbd> Component Hub</span>' +
            '<span class="shortcut-tip"><kbd>Delete</kbd> Remove</span>',
        vi: '<span id="live-preview-badge" class="live-preview-badge hidden">👁️ Đang xem thử trực tiếp...</span>' +
            '<span class="shortcut-tip"><kbd>Click + Kéo</kbd> Di chuyển</span>' +
            '<span class="shortcut-tip"><kbd>← ↑ → ↓</kbd> Nhích 1px</span>' +
            '<span class="shortcut-tip"><kbd>Double-Click</kbd> Sửa chữ</span>' +
            '<span class="shortcut-tip"><kbd>Ctrl+K</kbd> Kho 38 Lib UI</span>' +
            '<span class="shortcut-tip"><kbd>Delete</kbd> Xóa</span>'
      }
    },
    {
      sel: '#dropzone-overlay h3',
      text: {
        en: 'Drop HTML File or Web Project Folder Here!',
        vi: 'Thả File HTML hoặc Thư Mục Web vào đây!'
      }
    },
    {
      sel: '#dropzone-overlay p',
      html: {
        en: 'Supports dropping a single <code>.html</code> file or an entire project directory with HTML, CSS &amp; assets',
        vi: 'Hỗ trợ thả 1 file <code>.html</code> hoặc nguyên cả thư mục chứa HTML, CSS, Hình ảnh'
      }
    },

    // ==================== RIGHT SIDEBAR: INSPECTOR HEADER & EMPTY STATE ====================
    {
      sel: '#btn-el-parent',
      text: { en: '⬆️ Parent', vi: '⬆️ Khối Cha' },
      attr: 'title',
      en: 'Select Parent Container Element',
      vi: 'Chọn phần tử cha (Bao ngoài)'
    },
    {
      sel: '#btn-el-duplicate',
      text: { en: '📋 Duplicate', vi: '📋 Nhân Bản' },
      attr: 'title',
      en: 'Duplicate Selected Element (Ctrl+D)',
      vi: 'Nhân bản phần tử này (Ctrl+D)'
    },
    {
      sel: '#btn-el-reset',
      text: { en: '↺ Reset', vi: '↺ Về Gốc' },
      attr: 'title',
      en: 'Restore Element to Initial State',
      vi: 'Khôi phục phần tử này về nguyên trạng ban đầu'
    },
    {
      sel: '#btn-el-delete',
      text: { en: '🗑️ Delete', vi: '🗑️ Xóa' },
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
        en: 'Click any button, heading, card, or image on the canvas — or open the <strong>🎛️ ReactBits Customize Dock</strong>:',
        vi: 'Click vào nút bấm, dòng chữ, hình ảnh ở giữa màn hình hoặc mở <strong>🎛️ Bảng Customize (ReactBits.dev)</strong> để chỉnh sửa:'
      }
    },
    {
      sel: '#inspector-empty .btn-toggle-rb-dock',
      text: {
        en: '🎛️ Open 3-Column Customize Dock (ReactBits.dev — 218 Schemas)',
        vi: '🎛️ Mở Bảng Customize 3 Cột (ReactBits.dev — 218 Bộ)'
      }
    },
    {
      sel: '#inspector-empty .inspector-feature-list',
      html: {
        en: '<li>🎛️ <strong>218 Official ReactBits.dev Customize Schemas</strong> (3,960 Scrubber Sliders, Switches, Selects &amp; Color Pickers like <em>Tear Ticket</em>, <em>Masked Heading</em>, <em>Tilted Card</em>, <em>Spotlight Card</em>...).</li>' +
            '<li>🌐 <strong>247+ Official .TSX Registry Components</strong> from Origin UI, coss ui, Shadcn UI, Magic UI, Aceternity UI, KokonutUI.</li>' +
            '<li>👁️ <strong>Real-Time Hover Preview</strong> across Fonts, Swatches, Gradients, Shadows &amp; Lucide Vector SVGs before committing!</li>' +
            '<li>↺ <strong>Instant Property Reset</strong> or full Undo/Redo via <code>Ctrl+Z</code> / <code>Ctrl+Y</code> at any time.</li>',
        vi: '<li>🎛️ <strong>218 Bộ Customize chính chủ từ ReactBits.dev</strong> (3,960 thanh kéo Scrubber, Switch, Dropdown, Color Picker như <em>Tear Ticket</em>, <em>Masked Heading</em>, <em>Tilted Card</em>, <em>Spotlight Card</em>...).</li>' +
            '<li>🌐 <strong>247+ Component .TSX chính chủ</strong> từ Origin UI, coss ui, Shadcn UI, Magic UI, Aceternity UI, KokonutUI.</li>' +
            '<li>👁️ <strong>Rê chuột xem trước tức thì (Live Hover Preview)</strong> trên mọi Font chữ, Màu sắc, Gradient, Đổ bóng trước khi chọn!</li>' +
            '<li>↺ <strong>Quay lại Màu gốc / Vị trí gốc</strong> hoặc bấm <code>Ctrl+Z</code> / <code>Ctrl+Y</code> bất cứ lúc nào.</li>'
      }
    },

    // ==================== RIGHT SIDEBAR: 3-TAB INSPECTOR ====================
    {
      sel: '.insp-mode-tab[data-insp-tab="insp-pane-reactbits"]',
      text: { en: '🎛️ Customize', vi: '🎛️ Customize' },
      attr: 'title',
      en: 'Official ReactBits.dev Scrubber Controls (218 Schemas & 3,960 Parameters)',
      vi: 'Bảng thanh kéo Scrubber chuẩn ReactBits.dev (218 Bộ & 3,960 thông số)'
    },
    {
      sel: '.insp-mode-tab[data-insp-tab="insp-pane-design"]',
      text: { en: '🎨 Design & Type', vi: '🎨 Giao Diện & Chữ' },
      attr: 'title',
      en: 'Typography, Fill & Stroke Swatches, Corner Radius, Shadows & Lucide Vector Icons',
      vi: 'Màu sắc, Kiểu chữ Live-Hover, Viền, Bóng & Icon SVG Lucide'
    },
    {
      sel: '.insp-mode-tab[data-insp-tab="insp-pane-layout"]',
      text: { en: '📐 Layout & Pos', vi: '📐 Bố Cục & Tọa Độ' },
      attr: 'title',
      en: 'Coordinates X/Y, Dimensions W/H, Transform, Padding, Margin & Auto Layout (Flexbox)',
      vi: 'Tọa độ X/Y, Kích thước W/H, Padding, Margin & Flexbox'
    },

    // Pane 1: ReactBits Customize
    {
      sel: '#btn-sidebar-rb-dock',
      text: { en: '⤢ 3-Col Dock', vi: '⤢ Bảng 3 Cột' }
    },
    {
      sel: '#btn-sidebar-rb-insert',
      text: { en: '➕ Insert', vi: '➕ Chèn' }
    },
    {
      sel: '.rb-group-chip[data-rb-group="all"]',
      text: { en: 'All', vi: 'Tất cả' }
    },
    {
      sel: '.rb-group-chip[data-rb-group="ticket"]',
      text: { en: '🎫 Ticket & Frame', vi: '🎫 Ticket & Khung' }
    },
    {
      sel: '.rb-group-chip[data-rb-group="cinema"]',
      text: { en: '🎬 Cinema & Type', vi: '🎬 Cinema & Chữ' }
    },
    {
      sel: '.rb-group-chip[data-rb-group="motion"]',
      text: { en: '🌀 3D & Tilt', vi: '🌀 3D & Tilt' }
    },

    // Pane 2: Design & Typography
    {
      sel: '#insp-pane-design .prop-group:nth-of-type(1) .prop-group__header > span',
      text: { en: '✍️ Content & Typography', vi: '✍️ Nội Dung & Kiểu Chữ' }
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
      text: { en: '🎨 Fill, Text Color & Gradients', vi: '🎨 Màu Sắc & Gradient' }
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
      text: { en: '🔲 Corner Radius, Stroke & Shadow', vi: '🔲 Bo Góc, Viền & Bóng' }
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
      text: { en: '📍 Position & Dimensions', vi: '📍 Tọa Độ & Kích Thước' }
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
      text: { en: '⚡ Auto Layout (Flexbox)', vi: '⚡ Flexbox Alignment' }
    },

    // ==================== 3-COLUMN REACTBITS DOCK ====================
    {
      sel: '.rb-quick-pill[data-rb-quick-schema="rb-micro-tearticket"]',
      text: { en: '🎫 Tear Ticket (Preset 1)', vi: '🎫 Tear Ticket (Ảnh 1)' }
    },
    {
      sel: '.rb-quick-pill[data-rb-quick-schema="rb-textanimations-maskedheading"]',
      text: { en: '🎬 Masked Heading (Preset 2)', vi: '🎬 Masked Heading (Ảnh 2)' }
    },
    {
      sel: '.rb-quick-pill[data-rb-quick-schema="master-all"]',
      text: { en: '⚡ All Master (50+)', vi: '⚡ All Master (50+)' }
    },
    {
      sel: '#rb-schema-search',
      attr: 'placeholder',
      en: '🔍 Search 218 schemas...',
      vi: '🔍 Tìm trong 218 bộ...'
    },
    {
      sel: '#btn-dock-rb-insert',
      text: { en: '➕ Insert to Canvas', vi: '➕ Chèn Lên Web' }
    },

    // ==================== MODALS 1, 2, 3 ====================
    {
      sel: '#modal-open-web .modal-header h3',
      text: {
        en: '📥 Import Web Page or Connect Project Workspace',
        vi: '📥 Đưa Giao Diện Web Của Bạn Vào Studio'
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
        en: '🤖 Structured AI Prompt & Generated CSS Patch',
        vi: '🤖 Prompt Chuẩn Cho AI & Mã CSS Đã Tinh Chỉnh'
      }
    },
    {
      sel: '.prompt-tab[data-ptab="ptab-prompt"]',
      text: { en: '📋 AI Prompt Instructions', vi: '📋 Prompt Gửi Cho AI' }
    },
    {
      sel: '.prompt-tab[data-ptab="ptab-css"]',
      text: { en: '🎨 Generated CSS Patch', vi: '🎨 Mã CSS Đã Sinh Tự Động' }
    },
    {
      sel: '#btn-copy-ai-prompt',
      text: { en: '📋 Copy AI Prompt', vi: '📋 Copy Prompt Cho AI' }
    },
    {
      sel: '#btn-copy-css-patch',
      text: { en: '📋 Copy CSS Code', vi: '📋 Copy Mã CSS' }
    },
    {
      sel: '#modal-uilib-explorer .uilib-modal-title h3',
      text: {
        en: '🌐 UI Component Hub & Official .TSX Registry Importer',
        vi: '🌐 Trung Tâm Thư Viện UI & Trình Import Component Thông Minh'
      }
    },
    {
      sel: '.uilib-mtab[data-umtab="umtab-catalog"]',
      text: {
        en: '🔍 Browse 282+ Official Components & 38 UI Libraries',
        vi: '🔍 Kho Component & 38 Trang Chủ UI Library'
      }
    },
    {
      sel: '.uilib-mtab[data-umtab="umtab-import"]',
      text: {
        en: '📥 Import Code (.TSX / JSX / HTML / Tailwind / Registry JSON)',
        vi: '📥 Tự Dán Code (HTML / React JSX / Tailwind) Từ Web Bất Kỳ'
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
      en: '🔍 Search components: button, card, badge, input, pricing, aceternity, magic ui, shadcn...',
      vi: '🔍 Tìm kiếm: button, card, badge, input, pricing, aceternity, magic ui, hover.dev, shadcn...'
    },
    {
      sel: '#btn-save-and-insert-comp',
      text: {
        en: '✨ Save to Library & Insert to Canvas',
        vi: '✨ Lưu Vào Kho UI & Chèn Ngay Lên Web'
      }
    },
    {
      sel: '#btn-only-save-comp',
      text: {
        en: '💾 Save to Library Only (for Hover Preview)',
        vi: '💾 Chỉ Lưu Vào Kho UI (Để Rê Chuột Xem Thử)'
      }
    }
  ];

  // Translate dynamic cards, counters, and lists rendered by studio.js
  function translateDynamicDomNodes(lang) {
    // 1. Component Cards (.uilib-comp-card)
    document.querySelectorAll('.uilib-comp-card').forEach(card => {
      const btnMorph = card.querySelector('.btn-morph-comp');
      if (btnMorph) {
        btnMorph.innerHTML = lang === 'en' ? '✨ Apply Style &amp; FX' : '✨ Áp Style &amp; FX';
        btnMorph.title = lang === 'en'
          ? 'Hover to preview & click to apply Style, Animation, Hover FX & SVG Icon to selected element'
          : 'Rê chuột để xem thử & Áp cả Style, Animation, Hiệu ứng Hover + Icon vào thẻ đang chọn';
      }
      const btnInsert = card.querySelector('.btn-insert-comp');
      if (btnInsert) {
        btnInsert.innerHTML = lang === 'en' ? '➕ Insert' : '➕ Chèn Mới';
        btnInsert.title = lang === 'en'
          ? 'Hover to preview & click to insert this component onto the canvas'
          : 'Rê chuột để xem thử & Chèn Component này vào trang web';
      }
      const siteLink = card.querySelector('.uilib-site-link');
      if (siteLink) {
        siteLink.textContent = lang === 'en' ? '↗ Docs' : '↗ Web';
      }
      const btnEdit = card.querySelector('.btn-edit-custom');
      if (btnEdit) {
        btnEdit.textContent = lang === 'en' ? '✏️ Edit' : '✏️ Sửa';
      }
      card.querySelectorAll('.btn-del-custom, .btn-del-custom-bottom').forEach(btnDel => {
        btnDel.textContent = lang === 'en' ? '🗑️ Delete' : '🗑️ Xóa';
      });
    });

    // 2. Results counter (#uilib-results-count)
    const resCount = document.getElementById('uilib-results-count');
    if (resCount && resCount.textContent) {
      const txt = resCount.textContent;
      if (lang === 'en') {
        resCount.textContent = txt
          .replace(/Tìm thấy (\d+) Component từ (\d+) Thư viện/, 'Showing $1 Components across $2 Libraries')
          .replace(/🎯 Gợi ý theo thẻ chọn: (\d+) mẫu từ (\d+) Thư viện/, '🎯 Smart Match: $1 Components across $2 Libraries')
          .replace(/☑️ Checklist \((\d+) loại\): (\d+) mẫu từ (\d+) Thư viện/, '☑️ Taxonomy ($1 types): $2 Components across $3 Libraries')
          .replace(/Danh bạ (\d+) Thư viện UI \(Click Logo mở Web\)/, 'Directory of $1 UI Libraries (Click Logo to open Docs)');
      } else {
        resCount.textContent = txt
          .replace(/Showing (\d+) Components across (\d+) Libraries/, 'Tìm thấy $1 Component từ $2 Thư viện')
          .replace(/🎯 Smart Match: (\d+) Components across (\d+) Libraries/, '🎯 Gợi ý theo thẻ chọn: $1 mẫu từ $2 Thư viện')
          .replace(/☑️ Taxonomy \((\d+) types\): (\d+) Components across (\d+) Libraries/, '☑️ Checklist ($1 loại): $2 mẫu từ $3 Thư viện')
          .replace(/Directory of (\d+) UI Libraries \(Click Logo to open Docs\)/, 'Danh bạ $1 Thư viện UI (Click Logo mở Web)');
      }
    }

    // 3. Selected Element Label & Status Breadcrumb when nothing is selected
    const selLabel = document.getElementById('selected-selector-label');
    const selBadge = document.getElementById('selected-tag-badge');
    if (selLabel && selBadge && selBadge.textContent === 'NONE') {
      selLabel.textContent = lang === 'en' ? 'Select an element on canvas' : 'Hãy chọn 1 phần tử trên web';
    }
    const breadcrumb = document.getElementById('status-breadcrumb');
    if (breadcrumb && (breadcrumb.textContent.includes('Chưa chọn') || breadcrumb.textContent.includes('No element'))) {
      breadcrumb.textContent = lang === 'en' ? 'No element selected' : 'Chưa chọn phần tử nào';
    }

    // 4. Page Selector default option
    const pageSel = document.getElementById('page-selector');
    if (pageSel && pageSel.options.length > 0 && pageSel.options[0].value === '') {
      const m = pageSel.options[0].textContent.match(/\d+/);
      const count = m ? m[0] : '';
      if (count) {
        pageSel.options[0].textContent = lang === 'en'
          ? `-- Select HTML Page (${count} pages) --`
          : `-- Chọn file HTML (${count} trang) --`;
      } else {
        pageSel.options[0].textContent = lang === 'en' ? '-- Select HTML Page --' : '-- Chọn trang web --';
      }
    }

    // 5. History Header & Empty State
    const histHeader = document.querySelector('#tab-history .section-header-row h4');
    const histTotal = document.getElementById('history-total');
    if (histHeader && histTotal) {
      const num = histTotal.textContent || '0';
      histHeader.innerHTML = lang === 'en'
        ? 'Edit History (<span id="history-total">' + num + '</span>)'
        : 'Nhật ký chỉnh sửa (<span id="history-total">' + num + '</span>)';
    }
    const emptyHist = document.querySelector('#change-log-list .empty-state-sm');
    if (emptyHist) {
      emptyHist.textContent = lang === 'en'
        ? 'No changes recorded yet. Click any element on the canvas to start designing!'
        : 'Chưa có thay đổi nào. Hãy click vào một phần tử trên trang để bắt đầu kéo thả!';
    }

    // 6. Modal All Libraries item
    const modalFirstDir = document.querySelector('#uilib-modal-sites-list .uilib-dir-item:first-child > span:first-child');
    if (modalFirstDir) {
      modalFirstDir.textContent = lang === 'en' ? '🌐 All 38+ UI Libraries' : '🌐 Tất cả 38+ Thư viện';
    }

    // 7. Live-Hover Custom Select Triggers (Default vs Mặc định)
    document.querySelectorAll('.ui-live-select-label, .ui-live-select-trigger__text').forEach(lbl => {
      if (lang === 'en' && lbl.textContent.trim() === 'Mặc định') lbl.textContent = 'Default';
      if (lang === 'vi' && lbl.textContent.trim() === 'Default') lbl.textContent = 'Mặc định';
    });
  }

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

    // Update #btn-toggle-namethat-checklist text while preserving badge
    const chkBtn = document.getElementById('btn-toggle-namethat-checklist');
    if (chkBtn) {
      const badge = document.getElementById('namethat-checked-badge');
      const badgeHtml = badge ? badge.outerHTML : '<span id="namethat-checked-badge" class="namethat-badge hidden">0</span>';
      chkBtn.innerHTML = (currentLang === 'en' ? '☑️ Taxonomy ' : '☑️ Checklist ') + badgeHtml;
    }

    // Update ReactBits Customize Panel labels & dropdowns
    if (window.refreshReactBitsLang && typeof window.refreshReactBitsLang === 'function') {
      window.refreshReactBitsLang();
    }

    // Translate dynamic nodes
    translateDynamicDomNodes(currentLang);
    syncDarkModeButtonsUI();

    if (showNotification) {
      const toastContainer = document.getElementById('toast-container');
      if (toastContainer) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = currentLang === 'en'
          ? '<span>🌐</span><span>Switched Studio language to <strong>English (Industry Standard UI/UX)</strong></span>'
          : '<span>🌐</span><span>Đã chuyển ngôn ngữ Studio sang <strong>Tiếng Việt</strong></span>';
        toastContainer.appendChild(t);
        setTimeout(() => t.remove(), 2600);
      }
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
      if (isDark) {
        btnDarkToggle.textContent = '🌙 Dark';
      } else {
        btnDarkToggle.textContent = '☀️ Light';
      }
    }
    const btnCanvasDark = document.getElementById('btn-canvas-dark-mode');
    if (btnCanvasDark) {
      btnCanvasDark.classList.toggle('active', canvasDarkActive);
      btnCanvasDark.textContent = currentLang === 'en'
        ? (canvasDarkActive ? '🌙 Canvas: Dark' : '🌓 Canvas Dark')
        : (canvasDarkActive ? '🌙 Web: Tối' : '🌓 Web Dark');
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
      });
    }

    // Re-apply Canvas Dark Mode if iframe reloads
    const iframe = document.getElementById('canvas-iframe');
    if (iframe) {
      iframe.addEventListener('load', () => {
        if (canvasDarkActive) applyCanvasDarkSimulation();
      });
    }

    // 5. Observe dynamic DOM lists so newly rendered cards/history translate automatically when in EN mode
    const obsTargets = [
      document.getElementById('uilib-components-list'),
      document.getElementById('uilib-modal-grid'),
      document.getElementById('change-log-list'),
      document.getElementById('uilib-results-count'),
      document.getElementById('selected-selector-label')
    ].filter(Boolean);

    if (obsTargets.length > 0 && window.MutationObserver) {
      let rafId = null;
      const observer = new MutationObserver(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          translateDynamicDomNodes(currentLang);
        });
      });
      obsTargets.forEach(t => observer.observe(t, { childList: true, subtree: false, characterData: true }));
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
