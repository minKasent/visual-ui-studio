/**
 * VISUAL UI STUDIO PRO v4.0 — UI LIBRARIES & COMPONENT REGISTRY
 * Extracted from the user's curated collection of 38+ modern UI libraries,
 * design systems, animation engines, and component registries.
 *
 * Includes:
 * 1. STUDIO_UI_LIBRARIES: Metadata, official homepage URLs, categories, badges, and optional CDN links
 *    for all 38+ libraries from the user's screenshot.
 * 2. STUDIO_LIB_COMPONENTS_CSS: Self-contained high-craft CSS & @keyframes for Aceternity UI, Magic UI,
 *    Shadcn UI, Hover.dev, Animata, React Bits, KokonutUI, Luxe, Cult UI, Origin UI, AlignUI,
 *    Untitled UI, FlyonUI, SmoothUI, Skiper UI, Eldora UI, Kibo UI, Park UI, Catalyst, Astryx, etc.
 * 3. STUDIO_LIB_COMPONENTS: Searchable, filterable, live-hover-previewable components across categories:
 *    - button (Buttons & CTAs)
 *    - card (Cards, Bento & Containers)
 *    - badge (Badges, Pills & Status)
 *    - input (Inputs, Search & Forms)
 *    - hero (Hero Headers, Text Effects & Callouts)
 *    - pricing (Pricing & Metric Widgets)
 *    - nav (Navbars, Docks & Tabs)
 */

window.STUDIO_UI_LIBRARIES = [
  {
    id: 'shadcn',
    name: 'Shadcn UI',
    url: 'https://ui.shadcn.com',
    category: 'Design System',
    accent: '#fafafa',
    badge: 'Nền tảng số 1',
    desc: 'Hệ thống component chuẩn mực nhất hiện nay với phong cách Zinc tối giản, tinh tế.'
  },
  {
    id: 'aceternity',
    name: 'Aceternity UI',
    url: 'https://ui.aceternity.com',
    category: 'Animated & 3D',
    accent: '#8b5cf6',
    badge: 'Hiệu ứng Đỉnh cao',
    desc: 'Nổi tiếng với nút viền chạy ánh sáng (Moving Border), Aurora, Spotlight và thẻ 3D.'
  },
  {
    id: 'magicui',
    name: 'Magic UI',
    url: 'https://magicui.design',
    category: 'Marketing & Glow',
    accent: '#ec4899',
    badge: 'Landing Page VIP',
    desc: '150+ component lấp lánh: Rainbow Button, Shimmer Sweep, Border Beam, Marquee.'
  },
  {
    id: '21stdev',
    name: '21st.dev',
    url: 'https://21st.dev',
    category: 'Registry Hub',
    accent: '#3b82f6',
    badge: 'Kho Cộng đồng',
    desc: 'Chợ component lớn nhất cho Design Engineer (AI Input, Bento, Pricing, Hero).'
  },
  {
    id: 'hoverdev',
    name: 'Hover.dev',
    url: 'https://www.hover.dev',
    category: 'Micro-Interactions',
    accent: '#6366f1',
    badge: 'Tương tác Độc',
    desc: 'Các hiệu ứng hover cực chất: Neo-Brutalist Pop, Draw Outline, Encrypt Cyber, Wet Paint.'
  },
  {
    id: 'originui',
    name: 'Origin UI (Originkit)',
    url: 'https://originui.com',
    category: 'Inputs & Buttons',
    accent: '#10b981',
    badge: '400+ UI Thực chiến',
    desc: 'Bộ sưu tập nút bấm, ô nhập liệu, thanh tìm kiếm và badge chuẩn mực từng pixel.'
  },
  {
    id: 'reactbits',
    name: 'React Bits',
    url: 'https://www.reactbits.dev',
    category: 'Creative Effects',
    accent: '#06b6d4',
    badge: 'Hiệu ứng Sáng tạo',
    desc: 'Star Border, Glare Hover Card, Iridescent Text, Spotlight & hiệu ứng thị giác.'
  },
  {
    id: 'animata',
    name: 'Animata',
    url: 'https://animata.design',
    category: 'Playful Motion',
    accent: '#f59e0b',
    badge: 'Chuyển động Mượt',
    desc: 'Nút bấm 3D kiểu Duolingo, Shining Button, Arrow Slide, Bento & Blurry Blob.'
  },
  {
    id: 'kokonutui',
    name: 'KokonutUI',
    url: 'https://kokonutui.com',
    category: 'Modern SaaS',
    accent: '#14b8a6',
    badge: 'AI & SaaS UI',
    desc: 'AI Prompt Search, Particle Button, Apple Activity Card, Floating Toolbar hiện đại.'
  },
  {
    id: 'luxe',
    name: 'Luxe UI',
    url: 'https://www.luxeui.com',
    category: 'Luxury Dark',
    accent: '#d4af37',
    badge: 'Sang trọng Dark',
    desc: 'Phong cách kim loại đen tuyền (Obsidian Metallic) với ánh sáng quét ngang tinh xảo.'
  },
  {
    id: 'cultui',
    name: 'Cult UI',
    url: 'https://www.cult-ui.com',
    category: 'Tactile & Minimal',
    accent: '#a855f7',
    badge: 'Neumorphic Tinh tế',
    desc: 'Nút bấm chạm nổi khối mềm mại, Dynamic Island, thẻ bề mặt nhám nghệ thuật.'
  },
  {
    id: 'alignui',
    name: 'AlignUI Design System',
    url: 'https://alignui.com',
    category: 'Enterprise System',
    accent: '#3b82f6',
    badge: 'Chuẩn Enterprise',
    desc: 'Hệ thống thiết kế FinTech & Dashboard chuyên nghiệp: KPI Card, Fancy Button, Status.'
  },
  {
    id: 'untitledui',
    name: 'Untitled UI React',
    url: 'https://www.untitledui.com',
    category: 'Design System',
    accent: '#7f56d9',
    badge: 'UI Kit Lớn nhất',
    desc: 'Chuẩn mực thiết kế SaaS toàn cầu: Pricing Card, Social Button, Metric Widget.'
  },
  {
    id: 'eldoraui',
    name: 'Eldora UI',
    url: 'https://www.eldoraui.site',
    category: 'Animated UI',
    accent: '#c084fc',
    badge: 'Next-Gen Effects',
    desc: 'Shimmer Button, Cyber Grid Card, Morphing Gradient Text cho trang đích hiện đại.'
  },
  {
    id: 'skiperui',
    name: 'Skiper UI',
    url: 'https://skiper-ui.com',
    category: 'Uncommon UI',
    accent: '#38bdf8',
    badge: 'Độc bản cho Shadcn',
    desc: 'Các component phá cách: Magnetic Pill, Floating Action Dock, Stacked Card.'
  },
  {
    id: 'animateui',
    name: 'Animate UI',
    url: 'https://animate-ui.com',
    category: 'Micro-Animation',
    accent: '#818cf8',
    badge: 'Hoạt ảnh Mượt',
    desc: 'Liquid Fill Button, Ripple Effect, Animated Segmented Tabs & số nhảy động.'
  },
  {
    id: 'cossui',
    name: 'coss ui',
    url: 'https://coss.com',
    category: 'Ultra Minimal',
    accent: '#e4e4e7',
    badge: 'Linear Style',
    desc: 'Phong cách tối giản sắc nét kiểu Linear & Vercel với đường viền 1px mảnh.'
  },
  {
    id: 'flyonui',
    name: 'FlyonUI',
    url: 'https://flyonui.com',
    category: 'Tailwind Kit',
    accent: '#6366f1',
    badge: 'Semantic Tailwind',
    desc: 'Thư viện component Tailwind với nút Soft Pill, Glass Alert và Timeline.'
  },
  {
    id: 'smoothui',
    name: 'SmoothUI',
    url: 'https://smoothui.dev',
    category: 'Fluid UI',
    accent: '#f43f5e',
    badge: 'Chuyển động Lỏng',
    desc: 'Dynamic Island Toast, Fluid Morph Button, công tắc chuyển trạng thái siêu mượt.'
  },
  {
    id: 'kiboui',
    name: 'Kibo UI',
    url: 'https://www.kibo-ui.com',
    category: 'Composable UI',
    accent: '#22c55e',
    badge: 'Mở rộng Shadcn',
    desc: 'Status Pill có chấm sáng động, Kanban Card, Announcement Banner & Dropzone.'
  },
  {
    id: 'parkui',
    name: 'Park UI',
    url: 'https://park-ui.com',
    category: 'Design System',
    accent: '#f97316',
    badge: 'Panda & Ark UI',
    desc: 'Thiết kế sắc sảo, chuẩn xác: Accent Button, Rating Group, Segmented Bar.'
  },
  {
    id: 'arkui',
    name: 'Ark UI',
    url: 'https://ark-ui.com',
    category: 'Primitives',
    accent: '#eb5e41',
    badge: 'Headless Chuẩn',
    desc: 'Các khối tương tác chuẩn truy cập: Accordion, Tabs, Toast, Toggle Group.'
  },
  {
    id: 'baseui',
    name: 'Base UI',
    url: 'https://base-ui.com',
    category: 'Primitives',
    accent: '#94a3b8',
    badge: 'Radix & MUI Creators',
    desc: 'Kiến trúc giao diện tinh gọn: Number Stepper, Switch Row, Popover Card.'
  },
  {
    id: 'tailwindplus',
    name: 'Tailwind Plus (UI)',
    url: 'https://tailwindcss.com/plus',
    category: 'Official Tailwind',
    accent: '#38bdf8',
    badge: 'Chính chủ Tailwind',
    desc: 'Bố cục Bento Grid, Hero Section, Pricing Table chuẩn mực từ đội ngũ Tailwind Labs.',
    cdnJs: 'https://cdn.tailwindcss.com'
  },
  {
    id: 'catalyst',
    name: 'Catalyst',
    url: 'https://catalyst.tailwindui.com',
    category: 'App UI Kit',
    accent: '#0ea5e9',
    badge: 'Tailwind App Kit',
    desc: 'Bộ UI ứng dụng cao cấp của Tailwind Labs: Zinc Button, Soft Badge, Stat Box.'
  },
  {
    id: 'astryx',
    name: 'Astryx Design System',
    url: 'https://astryx.design',
    category: 'Sci-Fi & HUD',
    accent: '#00f0ff',
    badge: 'Tương lai Sci-Fi',
    desc: 'Phong cách HUD công nghệ cao: Cyber Button, Telemetry Widget, Dark Command.'
  },
  {
    id: 'buouui',
    name: 'BuouUI',
    url: 'https://buouui.com',
    category: 'Glass & Neon',
    accent: '#a855f7',
    badge: 'SaaS Glass',
    desc: 'Hiệu ứng kính mờ nhiều lớp, viền gradient phát sáng cho trang đích AI/SaaS.'
  },
  {
    id: 'mvpblocks',
    name: 'MVPBlocks',
    url: 'https://blocks.mvp-subha.me',
    category: 'Page Blocks',
    accent: '#ec4899',
    badge: 'Dựng Web Nhanh',
    desc: 'Các khối Hero, Pricing, CTA Banner dựng sẵn giúp ra mắt sản phẩm trong 5 phút.'
  },
  {
    id: 'shadcnblocks',
    name: 'Shadcn Blocks',
    url: 'https://www.shadcnblocks.com',
    category: 'Page Blocks',
    accent: '#e2e8f0',
    badge: 'Section Đầy đủ',
    desc: 'Hàng trăm khối bố cục lớn (Hero, Feature Grid, Testimonial) chuẩn Shadcn.'
  },
  {
    id: 'tweakcn',
    name: 'tweakcn',
    url: 'https://tweakcn.com',
    category: 'Theme Engine',
    accent: '#f43f5e',
    badge: 'Đổi Theme 1-Click',
    desc: 'Bộ phối màu chủ đề nổi tiếng: Neo-Brutalism, Cyberpunk, Claude Warm, Monochrome.'
  },
  {
    id: 'motion',
    name: 'Motion & Primitives',
    url: 'https://motion-primitives.com',
    category: 'Animation Engine',
    accent: '#facc15',
    badge: 'Motion.dev',
    desc: 'Spring Button, Spotlight Card, Morphing Dialog và hiệu ứng chữ chuyển động.'
  },
  {
    id: 'namethatui',
    name: 'NameThatUI',
    url: 'https://namethatui.com',
    category: 'UI Patterns',
    accent: '#60a5fa',
    badge: 'Từ điển Component',
    desc: 'Chuẩn hóa mọi thành phần UI: Breadcrumb, Pagination, Empty State, Avatar Stack.'
  },
  {
    id: 'bootstrap5',
    name: 'Bootstrap v5.3',
    url: 'https://getbootstrap.com',
    category: 'Classic Framework',
    accent: '#7952b3',
    badge: 'Có CDN 1-Click',
    desc: 'Framework UI phổ biến nhất thế giới, hỗ trợ nạp trực tiếp CDN vào trang web.',
    cdnCss: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    cdnJs: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
  },
  {
    id: 'fontawesome',
    name: 'Font Awesome 6',
    url: 'https://fontawesome.com',
    category: 'Icon Library',
    accent: '#538dd7',
    badge: 'Có CDN Icon',
    desc: 'Kho biểu tượng vector lớn nhất thế giới — Bật 1-Click để dùng ngay `<i class="fa-solid ...">`.',
    cdnCss: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
  },
  {
    id: 'swiper',
    name: 'Swiper & Owl Carousel',
    url: 'https://swiperjs.com',
    category: 'Slider / Carousel',
    accent: '#0080ff',
    badge: 'Có CDN Slider',
    desc: 'Thư viện trượt ảnh/thẻ cảm ứng mượt nhất hiện nay (kèm Owl Carousel 2).',
    cdnCss: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
    cdnJs: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
  },
  {
    id: 'gsap',
    name: 'GSAP & Animate.css',
    url: 'https://gsap.com',
    category: 'Animation Engine',
    accent: '#0ae448',
    badge: 'Có CDN Animation',
    desc: 'Động cơ hoạt ảnh chuyên nghiệp GSAP 3 kết hợp bộ class hiệu ứng Animate.css.',
    cdnCss: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    cdnJs: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
  },
  {
    id: 'venobox',
    name: 'VenoBox 2 & Normalize',
    url: 'https://veno.es/venobox/',
    category: 'Lightbox & Reset',
    accent: '#a3e635',
    badge: 'Có CDN Lightbox',
    desc: 'Hộp phóng to ảnh/video VenoBox 2 và chuẩn hóa CSS Normalize trên mọi trình duyệt.',
    cdnCss: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
  }
];

/**
 * Self-contained CSS & Keyframes for all Library Components so they render identically
 * inside the Studio catalog AND inside any user webpage without external build steps.
 */
window.STUDIO_LIB_COMPONENTS_CSS = `
@keyframes uilib-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes uilib-rainbow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes uilib-spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes uilib-pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.45); opacity: 0.55; }
}
@keyframes uilib-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

/* Hover micro-interactions for injected library components */
.uilib-comp {
  box-sizing: border-box;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.uilib-btn-hover-lift:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
}
.uilib-btn-brutal:hover {
  transform: translate(-3px, -3px) !important;
  box-shadow: 7px 7px 0px #09090b !important;
}
.uilib-btn-brutal:active {
  transform: translate(2px, 2px) !important;
  box-shadow: 2px 2px 0px #09090b !important;
}
.uilib-btn-duolingo:active {
  transform: translateY(4px) !important;
  box-shadow: 0 0px 0 #15803d !important;
}
.uilib-card-hover:hover {
  transform: translateY(-4px);
  border-color: rgba(139, 92, 246, 0.5) !important;
}
`;

/**
 * Curated, authentic components representing the signature styles of the libraries in the user's screenshot.
 * Each component includes:
 * - id, name, libId, libName, category ('button' | 'card' | 'badge' | 'input' | 'hero' | 'pricing' | 'nav')
 * - tags: array of search keywords (both English & Vietnamese!)
 * - morphStyles: CSS key-value map so if the user already selected an element (e.g. a button) on their page,
 *   hovering/clicking can MORPH their existing element's style directly!
 * - html: Clean, self-contained HTML snippet to insert as a new element or preview on hover!
 */
window.STUDIO_LIB_COMPONENTS = [
  // ============================================================================
  // 1. BUTTONS (NÚT BẤM TỪ CÁC THƯ VIỆN)
  // ============================================================================
  {
    id: 'aceternity-moving-border-btn',
    name: 'Moving Border Glow Button',
    libId: 'aceternity',
    libName: 'Aceternity UI',
    category: 'button',
    tags: ['button', 'nut bam', 'aceternity', 'glow', 'border', 'neon', 'dark', 'cta'],
    morphStyles: {
      'background': 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
      'color': '#f8fafc',
      'padding': '12px 26px',
      'border-radius': '999px',
      'border': '1.5px solid rgba(139, 92, 246, 0.75)',
      'box-shadow': '0 0 24px rgba(139, 92, 246, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      'font-weight': '600',
      'font-size': '14px',
      'letter-spacing': '0.02em'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:12px 26px;background:linear-gradient(135deg,#09090b 0%,#18181b 100%);color:#f8fafc;border-radius:999px;border:1.5px solid rgba(139,92,246,0.8);box-shadow:0 0 25px rgba(139,92,246,0.45),inset 0 1px 0 rgba(255,255,255,0.2);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;"><span style="width:8px;height:8px;border-radius:50%;background:#a855f7;box-shadow:0 0 10px #a855f7;"></span><span>Khám phá Aceternity</span><span style="opacity:0.7;">→</span></button>`
  },
  {
    id: 'aceternity-shimmer-btn',
    name: 'Shimmer Metallic Button',
    libId: 'aceternity',
    libName: 'Aceternity UI',
    category: 'button',
    tags: ['button', 'nut bam', 'aceternity', 'shimmer', 'lap lanh', 'dark', 'metallic'],
    morphStyles: {
      'background': 'linear-gradient(110deg, #09090b 45%, #3f3f46 50%, #09090b 55%)',
      'background-size': '200% 100%',
      'animation': 'uilib-shimmer 2.5s infinite linear',
      'color': '#e4e4e7',
      'padding': '12px 26px',
      'border-radius': '10px',
      'border': '1px solid #3f3f46',
      'font-weight': '600',
      'box-shadow': '0 8px 20px rgba(0,0,0,0.4)'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:linear-gradient(110deg,#09090b 42%,#3f3f46 50%,#09090b 58%);background-size:200% 100%;animation:uilib-shimmer 2.5s infinite linear;color:#f4f4f5;border:1px solid #3f3f46;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,0.4);">✨ Shimmer Action</button>`
  },
  {
    id: 'magicui-rainbow-btn',
    name: 'Rainbow Glow Button',
    libId: 'magicui',
    libName: 'Magic UI',
    category: 'button',
    tags: ['button', 'nut bam', 'magic ui', 'rainbow', 'cau vong', 'gradient', 'glow', 'cta'],
    morphStyles: {
      'background': 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1)',
      'background-size': '300% 300%',
      'animation': 'uilib-rainbow 4s ease infinite',
      'color': '#ffffff',
      'padding': '12px 28px',
      'border-radius': '12px',
      'border': 'none',
      'font-weight': '700',
      'box-shadow': '0 10px 30px -5px rgba(236, 72, 153, 0.55)'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:12px 28px;background:linear-gradient(90deg,#6366f1,#ec4899,#f59e0b,#10b981,#6366f1);background-size:300% 300%;animation:uilib-rainbow 4s ease infinite;color:#ffffff;border:none;border-radius:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 10px 30px -5px rgba(236,72,153,0.55);">🌈 Magic Rainbow CTA</button>`
  },
  {
    id: 'magicui-shiny-pill-btn',
    name: 'Shiny Glass Pill Button',
    libId: 'magicui',
    libName: 'Magic UI',
    category: 'button',
    tags: ['button', 'nut bam', 'magic ui', 'shiny', 'glass', 'pill'],
    morphStyles: {
      'background': 'radial-gradient(circle at 50% 0%, rgba(129, 140, 248, 0.28) 0%, rgba(15, 23, 42, 0.92) 75%)',
      'color': '#ffffff',
      'padding': '11px 24px',
      'border-radius': '999px',
      'border': '1px solid rgba(165, 180, 252, 0.4)',
      'box-shadow': 'inset 0 1px 1px rgba(255, 255, 255, 0.35), 0 8px 24px rgba(99, 102, 241, 0.28)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:radial-gradient(circle at 50% 0%,rgba(129,140,248,0.32) 0%,rgba(15,23,42,0.95) 75%);color:#ffffff;border-radius:999px;border:1px solid rgba(165,180,252,0.4);box-shadow:inset 0 1px 1px rgba(255,255,255,0.35),0 8px 24px rgba(99,102,241,0.28);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">✦ Bắt đầu miễn phí →</button>`
  },
  {
    id: 'shadcn-primary-btn',
    name: 'Shadcn Primary Zinc Button',
    libId: 'shadcn',
    libName: 'Shadcn UI',
    category: 'button',
    tags: ['button', 'nut bam', 'shadcn', 'primary', 'minimal', 'white', 'zinc'],
    morphStyles: {
      'background': '#fafafa',
      'color': '#09090b',
      'padding': '10px 20px',
      'border-radius': '8px',
      'border': '1px solid #e4e4e7',
      'font-weight': '600',
      'font-size': '14px',
      'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.08)'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;background:#fafafa;color:#09090b;border:1px solid #e4e4e7;border-radius:8px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,0.1);">Shadcn Primary</button>`
  },
  {
    id: 'shadcn-outline-dark-btn',
    name: 'Shadcn Dark Outline Button',
    libId: 'shadcn',
    libName: 'Shadcn UI',
    category: 'button',
    tags: ['button', 'nut bam', 'shadcn', 'outline', 'dark', 'secondary'],
    morphStyles: {
      'background': '#09090b',
      'color': '#fafafa',
      'padding': '10px 20px',
      'border-radius': '8px',
      'border': '1px solid #27272a',
      'font-weight': '500',
      'font-size': '14px',
      'box-shadow': 'inset 0 1px 0 rgba(255,255,255,0.06)'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;background:#09090b;color:#fafafa;border:1px solid #27272a;border-radius:8px;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);">Xem tài liệu ↗</button>`
  },
  {
    id: 'hoverdev-neobrutal-btn',
    name: 'Neo-Brutalist Pop Button',
    libId: 'hoverdev',
    libName: 'Hover.dev',
    category: 'button',
    tags: ['button', 'nut bam', 'hover.dev', 'brutalism', 'retro', 'pop', 'yellow', 'shadow'],
    morphStyles: {
      'background': '#facc15',
      'color': '#09090b',
      'padding': '12px 24px',
      'border-radius': '8px',
      'border': '2.5px solid #09090b',
      'box-shadow': '5px 5px 0px #09090b',
      'font-weight': '800',
      'text-transform': 'uppercase',
      'letter-spacing': '0.04em'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-brutal" style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:#facc15;color:#09090b;border:2.5px solid #09090b;border-radius:8px;box-shadow:5px 5px 0px #09090b;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;cursor:pointer;">⚡ Neo-Brutal Click</button>`
  },
  {
    id: 'hoverdev-cyber-encrypt-btn',
    name: 'Cyber Terminal Glow Button',
    libId: 'hoverdev',
    libName: 'Hover.dev',
    category: 'button',
    tags: ['button', 'nut bam', 'hover.dev', 'cyber', 'matrix', 'hacker', 'neon', 'green'],
    morphStyles: {
      'background': 'rgba(6, 78, 59, 0.35)',
      'color': '#34d399',
      'padding': '11px 22px',
      'border-radius': '6px',
      'border': '1px solid #10b981',
      'box-shadow': '0 0 18px rgba(16, 185, 129, 0.35), inset 0 0 12px rgba(16, 185, 129, 0.15)',
      'font-family': "'JetBrains Mono', monospace",
      'font-weight': '600',
      'letter-spacing': '0.06em'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:11px 22px;background:rgba(6,78,59,0.4);color:#34d399;border:1px solid #10b981;border-radius:6px;box-shadow:0 0 18px rgba(16,185,129,0.35),inset 0 0 12px rgba(16,185,129,0.15);font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;letter-spacing:0.06em;cursor:pointer;"><span>[ENCRYPT_ACCESS]</span><span>→</span></button>`
  },
  {
    id: 'animata-duolingo-3d-btn',
    name: '3D Tactile Push Button',
    libId: 'animata',
    libName: 'Animata',
    category: 'button',
    tags: ['button', 'nut bam', 'animata', '3d', 'duolingo', 'game', 'green', 'push'],
    morphStyles: {
      'background': '#22c55e',
      'color': '#ffffff',
      'padding': '12px 26px',
      'border-radius': '14px',
      'border': 'none',
      'box-shadow': '0 5px 0 #15803d, 0 10px 20px rgba(34, 197, 94, 0.3)',
      'font-weight': '800',
      'letter-spacing': '0.03em'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-duolingo" style="display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:#22c55e;color:#ffffff;border:none;border-radius:14px;box-shadow:0 5px 0 #15803d,0 10px 20px rgba(34,197,94,0.3);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:800;letter-spacing:0.03em;cursor:pointer;">🚀 BẮT ĐẦU NGAY</button>`
  },
  {
    id: 'luxe-obsidian-gold-btn',
    name: 'Luxe Obsidian Gold Button',
    libId: 'luxe',
    libName: 'Luxe UI',
    category: 'button',
    tags: ['button', 'nut bam', 'luxe', 'luxury', 'gold', 'vang', 'sang trong', 'dark'],
    morphStyles: {
      'background': 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
      'color': '#fbbf24',
      'padding': '12px 26px',
      'border-radius': '999px',
      'border': '1px solid rgba(251, 191, 36, 0.5)',
      'box-shadow': '0 10px 25px -5px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(254, 243, 199, 0.25)',
      'font-weight': '600',
      'letter-spacing': '0.04em'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:12px 26px;background:linear-gradient(135deg,#18181b 0%,#09090b 100%);color:#fbbf24;border:1px solid rgba(251,191,36,0.5);border-radius:999px;box-shadow:0 10px 25px -5px rgba(245,158,11,0.25),inset 0 1px 0 rgba(254,243,199,0.25);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;letter-spacing:0.04em;cursor:pointer;">✦ LUXE EXCLUSIVE</button>`
  },
  {
    id: 'originui-split-pill-btn',
    name: 'Split Badge Action Button',
    libId: 'originui',
    libName: 'Origin UI (Originkit)',
    category: 'button',
    tags: ['button', 'nut bam', 'origin ui', 'badge', 'counter', 'indigo', 'saas'],
    morphStyles: {
      'background': '#4f46e5',
      'color': '#ffffff',
      'padding': '10px 20px',
      'border-radius': '10px',
      'border': '1px solid rgba(255, 255, 255, 0.15)',
      'box-shadow': '0 4px 12px rgba(79, 70, 229, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:9px 14px 9px 18px;background:#4f46e5;color:#ffffff;border:1px solid rgba(255,255,255,0.18);border-radius:10px;box-shadow:0 4px 12px rgba(79,70,229,0.35),inset 0 1px 0 rgba(255,255,255,0.25);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;"><span>Triển khai ngay</span><span style="padding:2px 8px;background:rgba(0,0,0,0.28);border-radius:6px;font-size:11px;font-weight:700;">v4.0</span></button>`
  },
  {
    id: 'kokonut-gradient-aurora-btn',
    name: 'Kokonut Emerald Aurora Button',
    libId: 'kokonutui',
    libName: 'KokonutUI',
    category: 'button',
    tags: ['button', 'nut bam', 'kokonut', 'emerald', 'teal', 'gradient', 'ai'],
    morphStyles: {
      'background': 'linear-gradient(135deg, #0d9488 0%, #10b981 50%, #34d399 100%)',
      'color': '#042f2e',
      'padding': '11px 24px',
      'border-radius': '12px',
      'border': 'none',
      'box-shadow': '0 8px 25px -4px rgba(16, 185, 129, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.45)',
      'font-weight': '700'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:linear-gradient(135deg,#0d9488 0%,#10b981 50%,#34d399 100%);color:#042f2e;border:none;border-radius:12px;box-shadow:0 8px 25px -4px rgba(16,185,129,0.5),inset 0 1px 1px rgba(255,255,255,0.45);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">🥥 Kokonut AI Action</button>`
  },
  {
    id: 'cultui-neumorphic-btn',
    name: 'Tactile Neumorphic Button',
    libId: 'cultui',
    libName: 'Cult UI',
    category: 'button',
    tags: ['button', 'nut bam', 'cult ui', 'neumorphic', 'soft', 'tactile', 'light'],
    morphStyles: {
      'background': 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
      'color': '#0f172a',
      'padding': '11px 24px',
      'border-radius': '14px',
      'border': '1px solid #cbd5e1',
      'box-shadow': '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 0 #cbd5e1, inset 0 1px 0 #ffffff',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:linear-gradient(180deg,#ffffff 0%,#f1f5f9 100%);color:#0f172a;border:1px solid #cbd5e1;border-radius:14px;box-shadow:0 4px 6px -1px rgba(15,23,42,0.08),0 2px 0 #cbd5e1,inset 0 1px 0 #ffffff;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">◉ Tactile Studio</button>`
  },
  {
    id: 'untitledui-enterprise-btn',
    name: 'Untitled UI Violet Brand CTA',
    libId: 'untitledui',
    libName: 'Untitled UI React',
    category: 'button',
    tags: ['button', 'nut bam', 'untitled ui', 'violet', 'purple', 'enterprise', 'saas'],
    morphStyles: {
      'background': '#7f56d9',
      'color': '#ffffff',
      'padding': '11px 22px',
      'border-radius': '8px',
      'border': '1px solid #7f56d9',
      'box-shadow': '0 1px 2px rgba(16, 24, 40, 0.05), 0 0 0 4px rgba(127, 86, 217, 0.18)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 22px;background:#7f56d9;color:#ffffff;border:1px solid #7f56d9;border-radius:8px;box-shadow:0 1px 2px rgba(16,24,40,0.05),0 0 0 4px rgba(127,86,217,0.18);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;"><span>Đăng ký dùng thử</span><span>→</span></button>`
  },
  {
    id: 'alignui-fancy-blue-btn',
    name: 'AlignUI Specular FinTech Button',
    libId: 'alignui',
    libName: 'AlignUI Design System',
    category: 'button',
    tags: ['button', 'nut bam', 'alignui', 'blue', 'fintech', 'dashboard'],
    morphStyles: {
      'background': 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
      'color': '#ffffff',
      'padding': '10px 20px',
      'border-radius': '10px',
      'border': '1px solid #1d4ed8',
      'box-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 4px 12px rgba(37, 99, 235, 0.3)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:linear-gradient(180deg,#3b82f6 0%,#2563eb 100%);color:#ffffff;border:1px solid #1d4ed8;border-radius:10px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.35),0 4px 12px rgba(37,99,235,0.3);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;">💳 Thanh toán nhanh</button>`
  },
  {
    id: 'astryx-cyber-hud-btn',
    name: 'Astryx Cyber HUD Button',
    libId: 'astryx',
    libName: 'Astryx Design System',
    category: 'button',
    tags: ['button', 'nut bam', 'astryx', 'cyber', 'hud', 'scifi', 'cyan', 'neon'],
    morphStyles: {
      'background': 'rgba(8, 51, 68, 0.65)',
      'color': '#22d3ee',
      'padding': '11px 24px',
      'border-radius': '4px',
      'border': '1px solid #06b6d4',
      'box-shadow': '0 0 20px rgba(6, 182, 212, 0.35), inset 0 0 10px rgba(6, 182, 212, 0.2)',
      'font-weight': '700',
      'text-transform': 'uppercase',
      'letter-spacing': '0.08em'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:11px 24px;background:rgba(8,51,68,0.65);color:#22d3ee;border:1px solid #06b6d4;border-radius:4px;box-shadow:0 0 20px rgba(6,182,212,0.35),inset 0 0 10px rgba(6,182,212,0.2);font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;cursor:pointer;">◢ LAUNCH SYSTEM</button>`
  },
  {
    id: 'flyonui-soft-glass-btn',
    name: 'FlyonUI Soft Indigo Pill',
    libId: 'flyonui',
    libName: 'FlyonUI',
    category: 'button',
    tags: ['button', 'nut bam', 'flyonui', 'soft', 'pill', 'indigo', 'pastel'],
    morphStyles: {
      'background': 'rgba(99, 102, 241, 0.16)',
      'color': '#818cf8',
      'padding': '10px 22px',
      'border-radius': '999px',
      'border': '1px solid rgba(99, 102, 241, 0.35)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:rgba(99,102,241,0.16);color:#818cf8;border:1px solid rgba(99,102,241,0.35);border-radius:999px;font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;">✨ Flyon Soft Action</button>`
  },
  {
    id: 'reactbits-star-border-btn',
    name: 'React Bits Starlight Button',
    libId: 'reactbits',
    libName: 'React Bits',
    category: 'button',
    tags: ['button', 'nut bam', 'react bits', 'star', 'glow', 'cyan', 'space'],
    morphStyles: {
      'background': 'radial-gradient(circle at 50% 120%, rgba(6, 182, 212, 0.45), #09090b 70%)',
      'color': '#ecfeff',
      'padding': '12px 26px',
      'border-radius': '999px',
      'border': '1px solid rgba(34, 211, 238, 0.5)',
      'box-shadow': '0 0 24px rgba(6, 182, 212, 0.3)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:radial-gradient(circle at 50% 120%,rgba(6,182,212,0.45),#09090b 70%);color:#ecfeff;border:1px solid rgba(34,211,238,0.5);border-radius:999px;box-shadow:0 0 24px rgba(6,182,212,0.3);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">✶ Star Border CTA</button>`
  },
  {
    id: 'bootstrap-gradient-btn',
    name: 'Bootstrap 5 Primary Pill',
    libId: 'bootstrap5',
    libName: 'Bootstrap v5.3',
    category: 'button',
    tags: ['button', 'nut bam', 'bootstrap', 'blue', 'primary', 'classic'],
    morphStyles: {
      'background': '#0d6efd',
      'color': '#ffffff',
      'padding': '10px 22px',
      'border-radius': '50rem',
      'border': '1px solid #0d6efd',
      'box-shadow': '0 4px 10px rgba(13, 110, 253, 0.3)',
      'font-weight': '500'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:#0d6efd;color:#ffffff;border:1px solid #0d6efd;border-radius:50rem;box-shadow:0 4px 10px rgba(13,110,253,0.3);font-family:system-ui,-apple-system,sans-serif;font-size:14px;font-weight:500;cursor:pointer;">Bootstrap Primary</button>`
  },

  // ============================================================================
  // 2. BADGES & PILLS (NHÃN TRẠNG THÁI & HUY HIỆU)
  // ============================================================================
  {
    id: 'magicui-animated-gradient-badge',
    name: 'Animated Announcement Pill',
    libId: 'magicui',
    libName: 'Magic UI',
    category: 'badge',
    tags: ['badge', 'pill', 'nhan', 'magic ui', 'announcement', 'hero', 'gradient'],
    morphStyles: {
      'background': 'rgba(15, 23, 42, 0.85)',
      'color': '#e2e8f0',
      'padding': '6px 14px',
      'border-radius': '999px',
      'border': '1px solid rgba(139, 92, 246, 0.45)',
      'box-shadow': '0 0 18px rgba(139, 92, 246, 0.22)'
    },
    html: `<div class="uilib-comp" style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(15,23,42,0.85);border:1px solid rgba(139,92,246,0.45);border-radius:999px;box-shadow:0 0 18px rgba(139,92,246,0.22);font-family:'Inter',sans-serif;font-size:12.5px;color:#e2e8f0;"><span>🎉</span><span style="background:linear-gradient(90deg,#c084fc,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:700;">Ra mắt Phiên bản 4.0</span><span style="color:#94a3b8;">→</span></div>`
  },
  {
    id: 'kiboui-live-status-badge',
    name: 'Live Pulsing Status Pill',
    libId: 'kiboui',
    libName: 'Kibo UI',
    category: 'badge',
    tags: ['badge', 'pill', 'status', 'kibo ui', 'live', 'online', 'green', 'nhan'],
    morphStyles: {
      'background': 'rgba(16, 185, 129, 0.12)',
      'color': '#34d399',
      'padding': '5px 12px',
      'border-radius': '999px',
      'border': '1px solid rgba(16, 185, 129, 0.3)',
      'font-size': '12px',
      'font-weight': '600'
    },
    html: `<span class="uilib-comp" style="display:inline-flex;align-items:center;gap:8px;padding:5px 12px;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);border-radius:999px;font-family:'Inter',sans-serif;font-size:12px;font-weight:600;"><span style="width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;animation:uilib-pulse-dot 1.8s infinite;"></span><span>Hệ thống hoạt động 99.9%</span></span>`
  },
  {
    id: 'luxe-gold-shine-badge',
    name: 'Luxe Metallic Gold Badge',
    libId: 'luxe',
    libName: 'Luxe UI',
    category: 'badge',
    tags: ['badge', 'pill', 'luxe', 'gold', 'vip', 'pro', 'nhan'],
    morphStyles: {
      'background': 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(15, 23, 42, 0.9))',
      'color': '#fde68a',
      'padding': '5px 12px',
      'border-radius': '999px',
      'border': '1px solid rgba(251, 191, 36, 0.45)',
      'font-weight': '600',
      'font-size': '12px'
    },
    html: `<span class="uilib-comp" style="display:inline-flex;align-items:center;gap:6px;padding:5px 13px;background:linear-gradient(135deg,rgba(251,191,36,0.16),rgba(9,9,11,0.92));color:#fde68a;border:1px solid rgba(251,191,36,0.45);border-radius:999px;font-family:'Inter',sans-serif;font-size:11.5px;font-weight:600;letter-spacing:0.04em;">✦ PRO ENTERPRISE</span>`
  },

  // ============================================================================
  // 3. CARDS & BENTO (THẺ NỘI DUNG, BENTO GRID, PRICING, METRICS)
  // ============================================================================
  {
    id: 'aceternity-spotlight-card',
    name: 'Spotlight Aurora Feature Card',
    libId: 'aceternity',
    libName: 'Aceternity UI',
    category: 'card',
    tags: ['card', 'the', 'bento', 'aceternity', 'spotlight', 'dark', 'feature', 'box'],
    morphStyles: {
      'background': 'radial-gradient(400px circle at 20% 0%, rgba(139, 92, 246, 0.18), rgba(9, 9, 11, 0.96) 80%)',
      'color': '#f4f4f5',
      'padding': '28px',
      'border-radius': '20px',
      'border': '1px solid rgba(255, 255, 255, 0.1)',
      'box-shadow': '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
    },
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:360px;padding:28px;background:radial-gradient(400px circle at 20% 0%,rgba(139,92,246,0.22),rgba(9,9,11,0.96) 80%);color:#f4f4f5;border:1px solid rgba(255,255,255,0.1);border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.12);font-family:'Inter',sans-serif;">
      <div style="width:42px;height:42px;border-radius:12px;background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.4);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:16px;">⚡</div>
      <h3 style="margin:0 0 8px;font-size:18px;font-weight:700;color:#ffffff;">Aceternity Spotlight</h3>
      <p style="margin:0 0 18px;font-size:13.5px;line-height:1.6;color:#a1a1aa;">Hiệu ứng ánh sáng hội tụ góc trên kết hợp đường viền kính siêu mảnh chuẩn SaaS thế hệ mới.</p>
      <span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#c084fc;">Tìm hiểu thêm →</span>
    </div>`
  },
  {
    id: 'magicui-border-beam-card',
    name: 'Border Beam Glow Card',
    libId: 'magicui',
    libName: 'Magic UI',
    category: 'card',
    tags: ['card', 'the', 'magic ui', 'border beam', 'glow', 'bento', 'feature'],
    morphStyles: {
      'background': 'linear-gradient(180deg, rgba(24, 24, 27, 0.9) 0%, rgba(9, 9, 11, 0.98) 100%)',
      'color': '#f8fafc',
      'padding': '28px',
      'border-radius': '18px',
      'border': '1px solid rgba(236, 72, 153, 0.45)',
      'box-shadow': '0 0 35px -5px rgba(236, 72, 153, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
    },
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:360px;padding:28px;background:linear-gradient(180deg,rgba(24,24,27,0.92) 0%,rgba(9,9,11,0.98) 100%);color:#f8fafc;border:1px solid rgba(236,72,153,0.45);border-radius:18px;box-shadow:0 0 35px -5px rgba(236,72,153,0.28),inset 0 1px 0 rgba(255,255,255,0.15);font-family:'Inter',sans-serif;">
      <div style="display:inline-block;padding:4px 10px;border-radius:999px;background:rgba(236,72,153,0.15);color:#f472b6;font-size:11px;font-weight:700;margin-bottom:14px;">✨ MAGIC BENTO</div>
      <h3 style="margin:0 0 8px;font-size:18px;font-weight:700;">Tự động hóa Giao diện AI</h3>
      <p style="margin:0;font-size:13.5px;line-height:1.6;color:#94a3b8;">Biến mọi ý tưởng thiết kế thành giao diện sống động chỉ bằng thao tác kéo thả trực quan.</p>
    </div>`
  },
  {
    id: 'shadcn-clean-card',
    name: 'Shadcn Zinc Surface Card',
    libId: 'shadcn',
    libName: 'Shadcn UI',
    category: 'card',
    tags: ['card', 'the', 'shadcn', 'minimal', 'zinc', 'form', 'box'],
    morphStyles: {
      'background': '#09090b',
      'color': '#fafafa',
      'padding': '24px',
      'border-radius': '12px',
      'border': '1px solid #27272a',
      'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.25)'
    },
    html: `<div class="uilib-comp" style="max-width:350px;padding:24px;background:#09090b;color:#fafafa;border:1px solid #27272a;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.25);font-family:'Inter',sans-serif;">
      <h4 style="margin:0 0 4px;font-size:16px;font-weight:600;color:#fafafa;">Khởi tạo Dự án Mới</h4>
      <p style="margin:0 0 16px;font-size:13px;color:#a1a1aa;">Triển khai ứng dụng web của bạn chỉ với 1 cú nhấp chuột.</p>
      <div style="display:flex;justify-content:flex-end;gap:8px;">
        <button type="button" style="padding:8px 14px;background:transparent;color:#e4e4e7;border:1px solid #27272a;border-radius:6px;font-size:13px;cursor:pointer;">Hủy</button>
        <button type="button" style="padding:8px 14px;background:#fafafa;color:#09090b;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">Tiếp tục</button>
      </div>
    </div>`
  },
  {
    id: 'alignui-kpi-metric-card',
    name: 'AlignUI FinTech KPI Metric Card',
    libId: 'alignui',
    libName: 'AlignUI Design System',
    category: 'pricing',
    tags: ['card', 'metric', 'kpi', 'alignui', 'stats', 'thong ke', 'dashboard', 'fintech'],
    morphStyles: {
      'background': '#0c0c0f',
      'color': '#f8fafc',
      'padding': '22px',
      'border-radius': '16px',
      'border': '1px solid rgba(255,255,255,0.08)'
    },
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:300px;padding:22px;background:#0c0c0f;color:#f8fafc;border:1px solid rgba(255,255,255,0.08);border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,0.3);font-family:'Inter',sans-serif;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:12.5px;color:#94a3b8;font-weight:500;">Tổng Doanh Thu Tháng</span>
        <span style="padding:3px 8px;background:rgba(16,185,129,0.15);color:#34d399;border-radius:999px;font-size:11px;font-weight:700;">+28.4% ↑</span>
      </div>
      <div style="font-size:28px;font-weight:800;letter-spacing:-0.02em;margin-bottom:6px;">$128,450</div>
      <div style="font-size:12px;color:#64748b;">Tăng +$24,100 so với tháng trước</div>
    </div>`
  },
  {
    id: '21stdev-pricing-pro-card',
    name: '21st.dev SaaS Pro Pricing Card',
    libId: '21stdev',
    libName: '21st.dev',
    category: 'pricing',
    tags: ['pricing', 'bang gia', 'card', '21st.dev', 'pro', 'saas'],
    morphStyles: {
      'background': 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
      'color': '#ffffff',
      'padding': '28px',
      'border-radius': '20px',
      'border': '1.5px solid #6366f1',
      'box-shadow': '0 20px 50px rgba(99, 102, 241, 0.22)'
    },
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:320px;padding:28px;background:linear-gradient(180deg,#18181b 0%,#09090b 100%);color:#ffffff;border:1.5px solid #6366f1;border-radius:20px;box-shadow:0 20px 50px rgba(99,102,241,0.22);font-family:'Inter',sans-serif;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:14px;font-weight:700;color:#818cf8;text-transform:uppercase;">Gói Studio Pro</span>
        <span style="padding:3px 10px;background:#4f46e5;color:#fff;border-radius:999px;font-size:11px;font-weight:700;">Phổ biến nhất</span>
      </div>
      <div style="font-size:36px;font-weight:800;margin-bottom:16px;">$29<span style="font-size:14px;color:#94a3b8;font-weight:400;">/tháng</span></div>
      <ul style="list-style:none;padding:0;margin:0 0 22px;font-size:13.5px;color:#d4d4d8;line-height:2;">
        <li>✓ Không giới hạn Component UI</li>
        <li>✓ Xuất HTML & AI Prompt tự động</li>
        <li>✓ Hỗ trợ 38+ Thư viện thiết kế</li>
      </ul>
      <button type="button" style="width:100%;padding:11px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Nâng cấp ngay →</button>
    </div>`
  },

  // ============================================================================
  // 4. INPUTS & SEARCH BARS (Ô NHẬP LIỆU, AI PROMPT BAR, COMMAND SEARCH)
  // ============================================================================
  {
    id: '21stdev-ai-prompt-input',
    name: '21st.dev AI Command Prompt Box',
    libId: '21stdev',
    libName: '21st.dev',
    category: 'input',
    tags: ['input', 'search', 'ai', 'prompt', 'chat', '21st.dev', 'o nhap'],
    morphStyles: {
      'background': 'rgba(24, 24, 27, 0.9)',
      'color': '#f4f4f5',
      'padding': '12px 16px',
      'border-radius': '16px',
      'border': '1px solid rgba(139, 92, 246, 0.45)',
      'box-shadow': '0 10px 30px rgba(0, 0, 0, 0.35)'
    },
    html: `<div class="uilib-comp" style="display:flex;align-items:center;gap:10px;max-width:440px;padding:10px 12px 10px 18px;background:rgba(24,24,27,0.92);border:1px solid rgba(139,92,246,0.45);border-radius:16px;box-shadow:0 12px 32px rgba(0,0,0,0.4);font-family:'Inter',sans-serif;">
      <span style="color:#a855f7;font-size:16px;">✦</span>
      <input type="text" placeholder="Hỏi AI hoặc tìm kiếm bất kỳ tính năng nào..." style="flex:1;background:transparent;border:none;color:#f4f4f5;font-size:13.5px;outline:none;" />
      <button type="button" style="padding:8px 14px;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none;border-radius:10px;font-size:12.5px;font-weight:600;cursor:pointer;">Gửi ↵</button>
    </div>`
  },
  {
    id: 'originui-kbd-search-input',
    name: 'Origin UI Command Search Input',
    libId: 'originui',
    libName: 'Origin UI (Originkit)',
    category: 'input',
    tags: ['input', 'search', 'tim kiem', 'origin ui', 'kbd', 'shortcut'],
    morphStyles: {
      'background': '#09090b',
      'color': '#e4e4e7',
      'padding': '10px 14px',
      'border-radius': '10px',
      'border': '1px solid #27272a'
    },
    html: `<div class="uilib-comp" style="display:inline-flex;align-items:center;gap:10px;min-width:280px;padding:9px 12px;background:#09090b;border:1px solid #27272a;border-radius:10px;font-family:'Inter',sans-serif;">
      <span style="color:#71717a;font-size:14px;">🔍</span>
      <input type="text" placeholder="Tìm nhanh component..." style="flex:1;background:transparent;border:none;color:#f4f4f5;font-size:13px;outline:none;" />
      <kbd style="padding:2px 6px;background:#18181b;color:#a1a1aa;border:1px solid #27272a;border-radius:5px;font-family:monospace;font-size:11px;">⌘K</kbd>
    </div>`
  },

  // ============================================================================
  // 5. NAV & DOCKS (THANH ĐIỀU HƯỚNG, FLOATING DOCK, TABS)
  // ============================================================================
  {
    id: 'skiperui-floating-dock',
    name: 'Skiper Floating Glass Dock',
    libId: 'skiperui',
    libName: 'Skiper UI',
    category: 'nav',
    tags: ['nav', 'dock', 'menu', 'skiper ui', 'floating', 'glass', 'tabs'],
    morphStyles: {
      'background': 'rgba(15, 23, 42, 0.78)',
      'backdrop-filter': 'blur(16px)',
      'padding': '8px 14px',
      'border-radius': '999px',
      'border': '1px solid rgba(255, 255, 255, 0.14)',
      'box-shadow': '0 16px 40px rgba(0, 0, 0, 0.45)'
    },
    html: `<nav class="uilib-comp" style="display:inline-flex;align-items:center;gap:6px;padding:7px 10px;background:rgba(9,9,11,0.85);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);border-radius:999px;box-shadow:0 16px 40px rgba(0,0,0,0.45);font-family:'Inter',sans-serif;">
      <a href="#home" style="padding:7px 14px;background:#27272a;color:#ffffff;border-radius:999px;font-size:13px;font-weight:600;text-decoration:none;">Trang chủ</a>
      <a href="#features" style="padding:7px 14px;color:#a1a1aa;border-radius:999px;font-size:13px;font-weight:500;text-decoration:none;">Tính năng</a>
      <a href="#pricing" style="padding:7px 14px;color:#a1a1aa;border-radius:999px;font-size:13px;font-weight:500;text-decoration:none;">Bảng giá</a>
      <a href="#cta" style="padding:7px 16px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;border-radius:999px;font-size:13px;font-weight:600;text-decoration:none;">Bắt đầu</a>
    </nav>`
  },

  // ============================================================================
  // 6. HERO & TEXT EFFECTS (TIÊU ĐỀ GRADIENT, BANNER HERO)
  // ============================================================================
  {
    id: 'eldora-morph-gradient-heading',
    name: 'Aurora Gradient Display Heading',
    libId: 'eldoraui',
    libName: 'Eldora UI',
    category: 'hero',
    tags: ['hero', 'heading', 'tieu de', 'title', 'gradient', 'eldora', 'text'],
    morphStyles: {
      'background': 'linear-gradient(135deg, #ffffff 20%, #a5b4fc 60%, #c084fc 100%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'font-weight': '800',
      'letter-spacing': '-0.03em'
    },
    html: `<h2 class="uilib-comp" style="margin:12px 0;font-family:'Plus Jakarta Sans',sans-serif;font-size:40px;font-weight:800;letter-spacing:-0.03em;line-height:1.15;background:linear-gradient(135deg,#ffffff 15%,#a5b4fc 55%,#ec4899 95%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Thiết kế Giao diện Thế hệ Mới</h2>`
  },
  {
    id: 'skiper-magnetic-pill-btn',
    name: 'Skiper Magnetic Neon Pill Button',
    libId: 'skiperui',
    libName: 'Skiper UI',
    category: 'button',
    tags: ['button', 'nut bam', 'skiper ui', 'magnetic', 'pill', 'sky', 'cyan'],
    morphStyles: {
      'background': 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
      'color': '#ffffff',
      'padding': '11px 24px',
      'border-radius': '999px',
      'border': '1px solid rgba(186, 230, 253, 0.5)',
      'box-shadow': '0 8px 25px rgba(56, 189, 248, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:linear-gradient(135deg,#0284c7 0%,#38bdf8 100%);color:#ffffff;border:1px solid rgba(186,230,253,0.5);border-radius:999px;box-shadow:0 8px 25px rgba(56,189,248,0.4),inset 0 1px 1px rgba(255,255,255,0.4);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">✦ Skiper Magnetic</button>`
  },
  {
    id: 'animateui-liquid-btn',
    name: 'Animate UI Liquid Indigo Button',
    libId: 'animateui',
    libName: 'Animate UI',
    category: 'button',
    tags: ['button', 'nut bam', 'animate ui', 'liquid', 'ripple', 'indigo'],
    morphStyles: {
      'background': 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #818cf8 100%)',
      'color': '#ffffff',
      'padding': '11px 25px',
      'border-radius': '12px',
      'border': '1px solid rgba(165, 180, 252, 0.35)',
      'box-shadow': '0 10px 25px -5px rgba(99, 102, 241, 0.5)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 25px;background:linear-gradient(135deg,#4338ca 0%,#6366f1 50%,#818cf8 100%);color:#ffffff;border:1px solid rgba(165,180,252,0.35);border-radius:12px;box-shadow:0 10px 25px -5px rgba(99,102,241,0.5);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">💧 Liquid Motion CTA</button>`
  },
  {
    id: 'cossui-linear-dark-btn',
    name: 'coss ui Linear Hairline Button',
    libId: 'cossui',
    libName: 'coss ui',
    category: 'button',
    tags: ['button', 'nut bam', 'coss ui', 'linear', 'minimal', 'dark', 'kbd'],
    morphStyles: {
      'background': 'linear-gradient(180deg, #27272a 0%, #18181b 100%)',
      'color': '#f4f4f5',
      'padding': '9px 18px',
      'border-radius': '7px',
      'border': '1px solid rgba(255, 255, 255, 0.12)',
      'box-shadow': '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      'font-size': '13px',
      'font-weight': '500'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:9px 16px;background:linear-gradient(180deg,#27272a 0%,#18181b 100%);color:#f4f4f5;border:1px solid rgba(255,255,255,0.12);border-radius:7px;box-shadow:0 1px 2px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.1);font-family:'Inter',sans-serif;font-size:13px;font-weight:500;cursor:pointer;"><span>Tạo Issue mới</span><kbd style="padding:1px 5px;background:#09090b;color:#a1a1aa;border:1px solid #3f3f46;border-radius:4px;font-size:10px;">C</kbd></button>`
  },
  {
    id: 'smoothui-island-btn',
    name: 'SmoothUI Dynamic Island Pill',
    libId: 'smoothui',
    libName: 'SmoothUI',
    category: 'button',
    tags: ['button', 'nut bam', 'smoothui', 'dynamic island', 'apple', 'pill', 'dark'],
    morphStyles: {
      'background': '#000000',
      'color': '#ffffff',
      'padding': '10px 22px',
      'border-radius': '999px',
      'border': '1px solid rgba(255,255,255,0.14)',
      'box-shadow': '0 12px 28px rgba(0,0,0,0.55)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:10px 20px;background:#000000;color:#ffffff;border:1px solid rgba(255,255,255,0.15);border-radius:999px;box-shadow:0 12px 28px rgba(0,0,0,0.55);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;"><span style="width:8px;height:8px;border-radius:50%;background:#f43f5e;animation:uilib-pulse-dot 1.5s infinite;"></span><span>Dynamic Island Action</span></button>`
  },
  {
    id: 'parkui-orange-accent-btn',
    name: 'Park UI Precision Coral Button',
    libId: 'parkui',
    libName: 'Park UI',
    category: 'button',
    tags: ['button', 'nut bam', 'park ui', 'orange', 'coral', 'accent'],
    morphStyles: {
      'background': '#ea580c',
      'color': '#ffffff',
      'padding': '10px 22px',
      'border-radius': '8px',
      'border': '1px solid #c2410c',
      'box-shadow': '0 2px 8px rgba(234, 88, 12, 0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:#ea580c;color:#ffffff;border:1px solid #c2410c;border-radius:8px;box-shadow:0 2px 8px rgba(234,88,12,0.35),inset 0 1px 0 rgba(255,255,255,0.25);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">Park Precision CTA</button>`
  },
  {
    id: 'catalyst-zinc-app-btn',
    name: 'Catalyst Tailwind App Button',
    libId: 'catalyst',
    libName: 'Catalyst',
    category: 'button',
    tags: ['button', 'nut bam', 'catalyst', 'tailwind', 'app', 'sky'],
    morphStyles: {
      'background': '#0284c7',
      'color': '#ffffff',
      'padding': '9px 18px',
      'border-radius': '8px',
      'border': '1px solid rgba(255,255,255,0.15)',
      'box-shadow': 'inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 2px rgba(0,0,0,0.2)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:9px 18px;background:#0284c7;color:#ffffff;border:1px solid rgba(255,255,255,0.15);border-radius:8px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.25),0 1px 2px rgba(0,0,0,0.2);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;">+ Thêm bản ghi mới</button>`
  },
  {
    id: 'buouui-frosted-neon-btn',
    name: 'BuouUI Frosted Glass Neon Button',
    libId: 'buouui',
    libName: 'BuouUI',
    category: 'button',
    tags: ['button', 'nut bam', 'buouui', 'glass', 'frosted', 'purple', 'neon'],
    morphStyles: {
      'background': 'rgba(168, 85, 247, 0.18)',
      'backdrop-filter': 'blur(12px)',
      'color': '#f3e8ff',
      'padding': '11px 24px',
      'border-radius': '12px',
      'border': '1px solid rgba(192, 132, 252, 0.45)',
      'box-shadow': '0 8px 24px rgba(168, 85, 247, 0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:rgba(168,85,247,0.18);backdrop-filter:blur(12px);color:#f3e8ff;border:1px solid rgba(192,132,252,0.45);border-radius:12px;box-shadow:0 8px 24px rgba(168,85,247,0.25),inset 0 1px 0 rgba(255,255,255,0.25);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">✨ Buou Glass Action</button>`
  },
  {
    id: 'tweakcn-claude-warm-btn',
    name: 'tweakcn Claude Terracotta Button',
    libId: 'tweakcn',
    libName: 'tweakcn',
    category: 'button',
    tags: ['button', 'nut bam', 'tweakcn', 'claude', 'warm', 'terracotta', 'theme'],
    morphStyles: {
      'background': '#d97757',
      'color': '#faf9f5',
      'padding': '10px 22px',
      'border-radius': '10px',
      'border': '1px solid #c46345',
      'box-shadow': '0 4px 12px rgba(217, 119, 87, 0.3)',
      'font-family': "'Lora', Georgia, serif",
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:#d97757;color:#faf9f5;border:1px solid #c46345;border-radius:10px;box-shadow:0 4px 12px rgba(217,119,87,0.3);font-family:'Lora',Georgia,serif;font-size:14px;font-weight:600;cursor:pointer;">✻ Claude Warm Style</button>`
  },
  {
    id: 'motion-spring-glow-btn',
    name: 'Motion Spring Magnetic Button',
    libId: 'motion',
    libName: 'Motion & Primitives',
    category: 'button',
    tags: ['button', 'nut bam', 'motion', 'spring', 'yellow', 'animation'],
    morphStyles: {
      'background': '#facc15',
      'color': '#09090b',
      'padding': '11px 24px',
      'border-radius': '999px',
      'border': 'none',
      'box-shadow': '0 8px 25px rgba(250, 204, 21, 0.35)',
      'font-weight': '700'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:#facc15;color:#09090b;border:none;border-radius:999px;box-shadow:0 8px 25px rgba(250,204,21,0.35);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">⚡ Motion Spring</button>`
  },
  {
    id: 'fontawesome-social-btn',
    name: 'Font Awesome Icon CTA Button',
    libId: 'fontawesome',
    libName: 'Font Awesome 6',
    category: 'button',
    tags: ['button', 'nut bam', 'font awesome', 'icon', 'social'],
    morphStyles: {
      'background': '#1e293b',
      'color': '#f8fafc',
      'padding': '10px 20px',
      'border-radius': '10px',
      'border': '1px solid #334155',
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:10px 20px;background:#1e293b;color:#f8fafc;border:1px solid #334155;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;"><span style="color:#38bdf8;">★</span><span>Font Awesome Action</span></button>`
  },
  {
    id: 'mvpblocks-hero-banner',
    name: 'MVPBlocks SaaS Launch Hero Banner',
    libId: 'mvpblocks',
    libName: 'MVPBlocks',
    category: 'hero',
    tags: ['hero', 'banner', 'mvpblocks', 'saas', 'landing', 'header'],
    morphStyles: {
      'background': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.25), #09090b 75%)',
      'color': '#ffffff',
      'padding': '40px 32px',
      'border-radius': '24px',
      'border': '1px solid rgba(255,255,255,0.1)',
      'text-align': 'center'
    },
    html: `<section class="uilib-comp" style="max-width:680px;margin:16px auto;padding:40px 32px;background:radial-gradient(circle at 50% 0%,rgba(99,102,241,0.25),#09090b 75%);color:#ffffff;border:1px solid rgba(255,255,255,0.1);border-radius:24px;text-align:center;font-family:'Inter',sans-serif;">
      <span style="display:inline-block;padding:5px 14px;background:rgba(99,102,241,0.15);color:#818cf8;border:1px solid rgba(99,102,241,0.35);border-radius:999px;font-size:12px;font-weight:600;margin-bottom:16px;">🚀 MVPBlocks Launch Kit</span>
      <h1 style="margin:0 0 14px;font-size:34px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Ra mắt Sản phẩm SaaS Nhanh Gấp 10 Lần</h1>
      <p style="margin:0 auto 24px;max-width:480px;font-size:15px;color:#94a3b8;line-height:1.6;">Kết hợp các khối giao diện dựng sẵn từ 38+ thư viện UI hàng đầu thế giới ngay trong trình kéo thả trực quan.</p>
      <div style="display:inline-flex;gap:12px;">
        <button type="button" style="padding:12px 24px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer;">Bắt đầu ngay →</button>
        <button type="button" style="padding:12px 24px;background:rgba(255,255,255,0.06);color:#e2e8f0;border:1px solid rgba(255,255,255,0.12);border-radius:10px;font-weight:600;cursor:pointer;">Xem bản mẫu</button>
      </div>
    </section>`
  },
  {
    id: 'tailwindplus-bento-card',
    name: 'Tailwind Plus Bento Grid Showcase',
    libId: 'tailwindplus',
    libName: 'Tailwind Plus (UI)',
    category: 'card',
    tags: ['card', 'bento', 'grid', 'tailwind', 'feature', 'the'],
    morphStyles: {
      'background': '#0f172a',
      'color': '#f8fafc',
      'padding': '28px',
      'border-radius': '24px',
      'border': '1px solid rgba(56, 189, 248, 0.25)',
      'box-shadow': '0 20px 40px rgba(0,0,0,0.4)'
    },
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:380px;padding:28px;background:linear-gradient(160deg,#0f172a 0%,#09090b 100%);color:#f8fafc;border:1px solid rgba(56,189,248,0.25);border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.4);font-family:'Inter',sans-serif;">
      <div style="font-size:12px;font-weight:700;color:#38bdf8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Hiệu suất Tức thì</div>
      <h3 style="margin:0 0 10px;font-size:20px;font-weight:700;">Kiến trúc Bento Hiện Đại</h3>
      <p style="margin:0 0 18px;font-size:13.5px;color:#94a3b8;line-height:1.6;">Bố cục lưới thông minh lấy cảm hứng từ Apple & Tailwind Plus giúp làm nổi bật các tính năng cốt lõi.</p>
      <div style="padding:14px;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.2);border-radius:14px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:12.5px;color:#bae6fd;font-weight:600;">⚡ Tốc độ phản hồi</span>
        <span style="font-size:14px;font-weight:800;color:#38bdf8;">0.4ms</span>
      </div>
    </div>`
  },
  {
    id: 'swiper-testimonial-slide-card',
    name: 'Swiper Interactive Testimonial Card',
    libId: 'swiper',
    libName: 'Swiper & Owl Carousel',
    category: 'card',
    tags: ['swiper', 'carousel', 'slider', 'testimonial', 'card', 'review'],
    morphStyles: {
      'background': 'rgba(24, 24, 27, 0.92)',
      'color': '#f4f4f5',
      'padding': '26px',
      'border-radius': '18px',
      'border': '1px solid rgba(255,255,255,0.1)'
    },
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:360px;padding:26px;background:rgba(24,24,27,0.92);color:#f4f4f5;border:1px solid rgba(255,255,255,0.1);border-radius:18px;box-shadow:0 16px 36px rgba(0,0,0,0.35);font-family:'Inter',sans-serif;">
      <div style="color:#facc15;font-size:14px;margin-bottom:12px;">★★★★★</div>
      <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#e4e4e7;font-style:italic;">"Chỉ cần gõ tìm button và rê chuột qua là thấy ngay nút của Aceternity và Magic UI áp thẳng lên web của tôi. Quá đỉnh!"</p>
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:13.5px;font-weight:700;color:#ffffff;">Alex Nguyễn</div>
          <div style="font-size:12px;color:#71717a;">Founder @ DesignStudio</div>
        </div>
        <div style="display:flex;gap:6px;">
          <span style="width:24px;height:6px;border-radius:99px;background:#6366f1;"></span>
          <span style="width:6px;height:6px;border-radius:99px;background:#3f3f46;"></span>
          <span style="width:6px;height:6px;border-radius:99px;background:#3f3f46;"></span>
        </div>
      </div>
    </div>`
  }
];

