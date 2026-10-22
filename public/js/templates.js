/**
 * Visual UI Studio Pro v3.1 — Templates, Magic Presets, Fonts & UI Blocks Catalog
 */

window.STUDIO_GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=Dancing+Script:wght@600;700&family=Fira+Code:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700;900&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap';

window.STUDIO_FONTS_CATALOG = [
  { value: '', label: 'Mặc định của trang (Gốc)', sample: 'Aa Tiếng Việt', category: 'Gốc' },
  { value: "'Plus Jakarta Sans', sans-serif", label: 'Plus Jakarta Sans', sample: 'Hiện đại & Tinh tế', category: 'Sans-serif' },
  { value: "'Be Vietnam Pro', sans-serif", label: 'Be Vietnam Pro', sample: 'Tối ưu Tiếng Việt', category: 'Sans-serif' },
  { value: "'Inter', sans-serif", label: 'Inter', sample: 'Chuẩn UI/UX Quốc tế', category: 'Sans-serif' },
  { value: "'Syne', sans-serif", label: 'Syne', sample: 'Nghệ thuật & Phá cách', category: 'Display' },
  { value: "'Space Grotesk', sans-serif", label: 'Space Grotesk', sample: 'Công nghệ & Web3', category: 'Tech' },
  { value: "'Outfit', sans-serif", label: 'Outfit', sample: 'Trẻ trung & Bo tròn', category: 'Sans-serif' },
  { value: "'Montserrat', sans-serif", label: 'Montserrat', sample: 'Mạnh mẽ & Nổi bật', category: 'Sans-serif' },
  { value: "'Roboto', sans-serif", label: 'Roboto', sample: 'Cổ điển & Rõ nét', category: 'Sans-serif' },
  { value: "'Playfair Display', serif", label: 'Playfair Display', sample: 'Sang trọng & Quý phái', category: 'Serif' },
  { value: "'Lora', serif", label: 'Lora', sample: 'Tạp chí & Văn chương', category: 'Serif' },
  { value: "'Dancing Script', cursive", label: 'Dancing Script', sample: 'Chữ ký & Viết tay', category: 'Handwriting' },
  { value: "'JetBrains Mono', monospace", label: 'JetBrains Mono', sample: 'Lập trình & Số liệu', category: 'Monospace' }
];

window.STUDIO_MAGIC_PRESETS = [
  {
    id: 'neon-cyber',
    name: '⚡ Nút Phát Sáng Neon',
    desc: 'Viền xanh ánh sáng Neon + nền tối công nghệ cao',
    previewStyle: 'background:#0f172a;color:#00f5d4;border:1px solid #00f5d4;box-shadow:0 0 14px rgba(0,245,212,0.5);',
    styles: {
      'background': 'rgba(15, 23, 42, 0.92)',
      'background-color': 'rgba(15, 23, 42, 0.92)',
      'background-image': 'none',
      'color': '#00f5d4',
      'border': '1.5px solid #00f5d4',
      'border-radius': '12px',
      'box-shadow': '0 0 22px rgba(0, 245, 212, 0.45), inset 0 0 10px rgba(0, 245, 212, 0.15)',
      'font-weight': '700'
    }
  },
  {
    id: 'glassmorphism',
    name: '💎 Khung Kính Mờ (Glass)',
    desc: 'Hiệu ứng kính trong suốt mờ ảo chuẩn Apple iOS',
    previewStyle: 'background:rgba(255,255,255,0.14);color:#fff;border:1px solid rgba(255,255,255,0.3);',
    styles: {
      'background': 'rgba(255, 255, 255, 0.09)',
      'background-color': 'rgba(255, 255, 255, 0.09)',
      'background-image': 'none',
      'backdrop-filter': 'blur(16px)',
      '-webkit-backdrop-filter': 'blur(16px)',
      'border': '1px solid rgba(255, 255, 255, 0.22)',
      'border-radius': '18px',
      'box-shadow': '0 12px 32px rgba(0, 0, 0, 0.28)'
    }
  },
  {
    id: 'aurora-pill',
    name: '🚀 Nút Gradient Vũ Trụ',
    desc: 'Màu chuyển sắc Tím - Hồng rực rỡ, bo tròn viên thuốc',
    previewStyle: 'background:linear-gradient(135deg,#6366f1 0%,#a855f7 50%,#ec4899 100%);color:#fff;',
    styles: {
      'background': 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
      'color': '#ffffff',
      'border': 'none',
      'border-radius': '999px',
      'box-shadow': '0 10px 28px -4px rgba(168, 85, 247, 0.6)',
      'font-weight': '700'
    }
  },
  {
    id: 'emerald-glow',
    name: '🌿 Nút Ngọc Lục Bảo',
    desc: 'Tông xanh Emerald sang trọng, nổi bật lời kêu gọi',
    previewStyle: 'background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#fff;',
    styles: {
      'background': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'color': '#ffffff',
      'border': 'none',
      'border-radius': '12px',
      'box-shadow': '0 10px 24px -4px rgba(16, 185, 129, 0.5)',
      'font-weight': '700'
    }
  },
  {
    id: 'sunset-gold',
    name: '🔥 Nút Hoàng Hôn Rực Lửa',
    desc: 'Gradient Cam - Đỏ ấm áp, thu hút mọi ánh nhìn',
    previewStyle: 'background:linear-gradient(135deg,#f97316 0%,#ef4444 100%);color:#fff;',
    styles: {
      'background': 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
      'color': '#ffffff',
      'border': 'none',
      'border-radius': '14px',
      'box-shadow': '0 12px 26px -4px rgba(239, 68, 68, 0.5)',
      'font-weight': '700'
    }
  },
  {
    id: 'soft-3d-card',
    name: '🧊 Khung Nổi 3D Hiện Đại',
    desc: 'Đổ bóng sâu đa tầng + viền sáng mảnh tinh tế',
    previewStyle: 'background:#1e293b;color:#f8fafc;border:1px solid rgba(255,255,255,0.15);box-shadow:0 10px 25px rgba(0,0,0,0.4);',
    styles: {
      'background': 'linear-gradient(180deg, rgba(30, 41, 59, 0.92) 0%, rgba(15, 23, 42, 0.96) 100%)',
      'border': '1px solid rgba(255, 255, 255, 0.14)',
      'border-radius': '20px',
      'box-shadow': '0 24px 48px -12px rgba(0, 0, 0, 0.55)'
    }
  }
];

// Fallback UI Libraries Registry
if (!window.STUDIO_UI_LIBRARIES || window.STUDIO_UI_LIBRARIES.length === 0) {
/**
 * VISUAL UI STUDIO PRO v4.0 â€” UI LIBRARIES & COMPONENT REGISTRY
 * Extracted from the user's curated collection of 38+ modern UI libraries,
 * design systems, animation engines, and component registries.
 */

window.STUDIO_UI_LIBRARIES = [
  {
    id: 'shadcn',
    name: 'Shadcn UI',
    url: 'https://ui.shadcn.com',
    category: 'Design System',
    accent: '#fafafa',
    badge: 'Ná»n táº£ng sá»‘ 1',
    desc: 'Há»‡ thá»‘ng component chuáº©n má»±c nháº¥t hiá»‡n nay vá»›i phong cÃ¡ch Zinc tá»‘i giáº£n, tinh táº¿.'
  },
  {
    id: 'aceternity',
    name: 'Aceternity UI',
    url: 'https://ui.aceternity.com',
    category: 'Animated & 3D',
    accent: '#8b5cf6',
    badge: 'Hiá»‡u á»©ng Äá»‰nh cao',
    desc: 'Ná»•i tiáº¿ng vá»›i nÃºt viá»n cháº¡y Ã¡nh sÃ¡ng (Moving Border), Aurora, Spotlight vÃ  tháº» 3D.'
  },
  {
    id: 'magicui',
    name: 'Magic UI',
    url: 'https://magicui.design',
    category: 'Marketing & Glow',
    accent: '#ec4899',
    badge: 'Landing Page VIP',
    desc: '150+ component láº¥p lÃ¡nh: Rainbow Button, Shimmer Sweep, Border Beam, Marquee.'
  },
  {
    id: '21stdev',
    name: '21st.dev',
    url: 'https://21st.dev',
    category: 'Registry Hub',
    accent: '#3b82f6',
    badge: 'Kho Cá»™ng Ä‘á»“ng',
    desc: 'Chá»£ component lá»›n nháº¥t cho Design Engineer (AI Input, Bento, Pricing, Hero).'
  },
  {
    id: 'hoverdev',
    name: 'Hover.dev',
    url: 'https://www.hover.dev',
    category: 'Micro-Interactions',
    accent: '#6366f1',
    badge: 'TÆ°Æ¡ng tÃ¡c Äá»™c',
    desc: 'CÃ¡c hiá»‡u á»©ng hover cá»±c cháº¥t: Neo-Brutalist Pop, Draw Outline, Encrypt Cyber, Wet Paint.'
  },
  {
    id: 'originui',
    name: 'Origin UI (Originkit)',
    url: 'https://originui.com',
    category: 'Inputs & Buttons',
    accent: '#10b981',
    badge: '400+ UI Thá»±c chiáº¿n',
    desc: 'Bá»™ sÆ°u táº­p nÃºt báº¥m, Ã´ nháº­p liá»‡u, thanh tÃ¬m kiáº¿m vÃ  badge chuáº©n má»±c tá»«ng pixel.'
  },
  {
    id: 'reactbits',
    name: 'React Bits',
    url: 'https://www.reactbits.dev',
    category: 'Creative Effects',
    accent: '#06b6d4',
    badge: 'Hiá»‡u á»©ng SÃ¡ng táº¡o',
    desc: 'Star Border, Glare Hover Card, Iridescent Text, Spotlight & hiá»‡u á»©ng thá»‹ giÃ¡c.'
  },
  {
    id: 'animata',
    name: 'Animata',
    url: 'https://animata.design',
    category: 'Playful Motion',
    accent: '#f59e0b',
    badge: 'Chuyá»ƒn Ä‘á»™ng MÆ°á»£t',
    desc: 'NÃºt báº¥m 3D kiá»ƒu Duolingo, Shining Button, Arrow Slide, Bento & Blurry Blob.'
  },
  {
    id: 'kokonutui',
    name: 'KokonutUI',
    url: 'https://kokonutui.com',
    category: 'Modern SaaS',
    accent: '#14b8a6',
    badge: 'AI & SaaS UI',
    desc: 'AI Prompt Search, Particle Button, Apple Activity Card, Floating Toolbar hiá»‡n Ä‘áº¡i.'
  },
  {
    id: 'luxe',
    name: 'Luxe UI',
    url: 'https://www.luxeui.com',
    category: 'Luxury Dark',
    accent: '#fbbf24',
    badge: 'Sang trá»ng Dark',
    desc: 'Phong cÃ¡ch kim loáº¡i Ä‘en tuyá»n (Obsidian Metallic) vá»›i Ã¡nh sÃ¡ng quÃ©t ngang tinh xáº£o.'
  },
  {
    id: 'cultui',
    name: 'Cult UI',
    url: 'https://www.cult-ui.com',
    category: 'Tactile & Minimal',
    accent: '#a855f7',
    badge: 'Neumorphic Tinh táº¿',
    desc: 'NÃºt báº¥m cháº¡m ná»•i khá»‘i má»m máº¡i, Dynamic Island, tháº» bá» máº·t nhÃ¡m nghá»‡ thuáº­t.'
  },
  {
    id: 'alignui',
    name: 'AlignUI Design System',
    url: 'https://alignui.com',
    category: 'Enterprise System',
    accent: '#3b82f6',
    badge: 'Chuáº©n Enterprise',
    desc: 'Há»‡ thá»‘ng thiáº¿t káº¿ FinTech & Dashboard chuyÃªn nghiá»‡p: KPI Card, Fancy Button, Status.'
  },
  {
    id: 'untitledui',
    name: 'Untitled UI React',
    url: 'https://www.untitledui.com',
    category: 'Design System',
    accent: '#7f56d9',
    badge: 'UI Kit Lá»›n nháº¥t',
    desc: 'Chuáº©n má»±c thiáº¿t káº¿ SaaS toÃ n cáº§u: Pricing Card, Social Button, Metric Widget.'
  },
  {
    id: 'eldoraui',
    name: 'Eldora UI',
    url: 'https://www.eldoraui.site',
    category: 'Animated UI',
    accent: '#c084fc',
    badge: 'Next-Gen Effects',
    desc: 'Shimmer Button, Cyber Grid Card, Morphing Gradient Text cho trang Ä‘Ã­ch hiá»‡n Ä‘áº¡i.'
  },
  {
    id: 'skiperui',
    name: 'Skiper UI',
    url: 'https://skiper-ui.com',
    category: 'Uncommon UI',
    accent: '#38bdf8',
    badge: 'Äá»™c báº£n cho Shadcn',
    desc: 'CÃ¡c component phÃ¡ cÃ¡ch: Magnetic Pill, Floating Action Dock, Stacked Card.'
  },
  {
    id: 'animateui',
    name: 'Animate UI',
    url: 'https://animate-ui.com',
    category: 'Micro-Animation',
    accent: '#818cf8',
    badge: 'Hoáº¡t áº£nh MÆ°á»£t',
    desc: 'Liquid Fill Button, Ripple Effect, Animated Segmented Tabs & sá»‘ nháº£y Ä‘á»™ng.'
  },
  {
    id: 'cossui',
    name: 'coss ui',
    url: 'https://coss.com',
    category: 'Ultra Minimal',
    accent: '#e4e4e7',
    badge: 'Linear Style',
    desc: 'Phong cÃ¡ch tá»‘i giáº£n sáº¯c nÃ©t kiá»ƒu Linear & Vercel vá»›i Ä‘Æ°á»ng viá»n 1px máº£nh.'
  },
  {
    id: 'flyonui',
    name: 'FlyonUI',
    url: 'https://flyonui.com',
    category: 'Tailwind Kit',
    accent: '#6366f1',
    badge: 'Semantic Tailwind',
    desc: 'ThÆ° viá»‡n component Tailwind vá»›i nÃºt Soft Pill, Glass Alert vÃ  Timeline.'
  },
  {
    id: 'smoothui',
    name: 'SmoothUI',
    url: 'https://smoothui.dev',
    category: 'Fluid UI',
    accent: '#f43f5e',
    badge: 'Chuyá»ƒn Ä‘á»™ng Lá»ng',
    desc: 'Dynamic Island Toast, Fluid Morph Button, cÃ´ng táº¯c chuyá»ƒn tráº¡ng thÃ¡i siÃªu mÆ°á»£t.'
  },
  {
    id: 'kiboui',
    name: 'Kibo UI',
    url: 'https://www.kibo-ui.com',
    category: 'Composable UI',
    accent: '#22c55e',
    badge: 'Má»Ÿ rá»™ng Shadcn',
    desc: 'Status Pill cÃ³ cháº¥m sÃ¡ng Ä‘á»™ng, Kanban Card, Announcement Banner & Dropzone.'
  },
  {
    id: 'parkui',
    name: 'Park UI',
    url: 'https://park-ui.com',
    category: 'Design System',
    accent: '#f97316',
    badge: 'Panda & Ark UI',
    desc: 'Thiáº¿t káº¿ sáº¯c sáº£o, chuáº©n xÃ¡c: Accent Button, Rating Group, Segmented Bar.'
  },
  {
    id: 'arkui',
    name: 'Ark UI',
    url: 'https://ark-ui.com',
    category: 'Primitives',
    accent: '#eb5e41',
    badge: 'Headless Chuáº©n',
    desc: 'CÃ¡c khá»‘i tÆ°Æ¡ng tÃ¡c chuáº©n truy cáº­p: Accordion, Tabs, Toast, Toggle Group.'
  },
  {
    id: 'baseui',
    name: 'Base UI',
    url: 'https://base-ui.com',
    category: 'Primitives',
    accent: '#94a3b8',
    badge: 'Radix & MUI Creators',
    desc: 'Kiáº¿n trÃºc giao diá»‡n tinh gá»n: Number Stepper, Switch Row, Popover Card.'
  },
  {
    id: 'tailwindplus',
    name: 'Tailwind Plus (UI)',
    url: 'https://tailwindcss.com/plus',
    category: 'Official Tailwind',
    accent: '#38bdf8',
    badge: 'ChÃ­nh chá»§ Tailwind',
    desc: 'Bá»‘ cá»¥c Bento Grid, Hero Section, Pricing Table chuáº©n má»±c tá»« Ä‘á»™i ngÅ© Tailwind Labs.'
  },
  {
    id: 'catalyst',
    name: 'Catalyst',
    url: 'https://catalyst.tailwindui.com',
    category: 'App UI Kit',
    accent: '#0ea5e9',
    badge: 'Tailwind App Kit',
    desc: 'Bá»™ UI á»©ng dá»¥ng cao cáº¥p cá»§a Tailwind Labs: Zinc Button, Soft Badge, Stat Box.'
  },
  {
    id: 'astryx',
    name: 'Astryx Design System',
    url: 'https://astryx.design',
    category: 'Sci-Fi & HUD',
    accent: '#00f0ff',
    badge: 'TÆ°Æ¡ng lai Sci-Fi',
    desc: 'Phong cÃ¡ch HUD cÃ´ng nghá»‡ cao: Cyber Button, Telemetry Widget, Dark Command.'
  },
  {
    id: 'buouui',
    name: 'BuouUI',
    url: 'https://buouui.com',
    category: 'Glass & Neon',
    accent: '#a855f7',
    badge: 'SaaS Glass',
    desc: 'Hiá»‡u á»©ng kÃ­nh má» nhiá»u lá»›p, viá»n gradient phÃ¡t sÃ¡ng cho trang Ä‘Ã­ch AI/SaaS.'
  },
  {
    id: 'mvpblocks',
    name: 'MVPBlocks',
    url: 'https://blocks.mvp-subha.me',
    category: 'Page Blocks',
    accent: '#ec4899',
    badge: 'Dá»±ng Web Nhanh',
    desc: 'CÃ¡c khá»‘i Hero, Pricing, CTA Banner dá»±ng sáºµn giÃºp ra máº¯t sáº£n pháº©m trong 5 phÃºt.'
  },
  {
    id: 'shadcnblocks',
    name: 'Shadcn Blocks',
    url: 'https://www.shadcnblocks.com',
    category: 'Page Blocks',
    accent: '#e2e8f0',
    badge: 'Section Äáº§y Ä‘á»§',
    desc: 'HÃ ng trÄƒm khá»‘i bá»‘ cá»¥c lá»›n (Hero, Feature Grid, Testimonial) chuáº©n Shadcn.'
  },
  {
    id: 'tweakcn',
    name: 'tweakcn',
    url: 'https://tweakcn.com',
    category: 'Theme Engine',
    accent: '#f43f5e',
    badge: 'Äá»•i Theme 1-Click',
    desc: 'Bá»™ phá»‘i mÃ u chá»§ Ä‘á» ná»•i tiáº¿ng: Neo-Brutalism, Cyberpunk, Claude Warm, Monochrome.'
  },
  {
    id: 'motion',
    name: 'Motion & Primitives',
    url: 'https://motion-primitives.com',
    category: 'Animation Engine',
    accent: '#facc15',
    badge: 'Motion.dev',
    desc: 'Spring Button, Spotlight Card, Morphing Dialog vÃ  hiá»‡u á»©ng chá»¯ chuyá»ƒn Ä‘á»™ng.'
  },
  {
    id: 'namethatui',
    name: 'NameThatUI',
    url: 'https://namethatui.com',
    category: 'UI Patterns',
    accent: '#60a5fa',
    badge: 'Tá»« Ä‘iá»ƒn Component',
    desc: 'Chuáº©n hÃ³a má»i thÃ nh pháº§n UI: Breadcrumb, Pagination, Empty State, Avatar Stack.'
  },
  {
    id: 'bootstrap5',
    name: 'Bootstrap v5.3',
    url: 'https://getbootstrap.com',
    category: 'Classic Framework',
    accent: '#7952b3',
    badge: 'CÃ³ CDN 1-Click',
    desc: 'Framework UI phá»• biáº¿n nháº¥t tháº¿ giá»›i, há»— trá»£ náº¡p trá»±c tiáº¿p CDN vÃ o trang web.'
  },
  {
    id: 'fontawesome',
    name: 'Font Awesome 6',
    url: 'https://fontawesome.com',
    category: 'Icon Library',
    accent: '#538dd7',
    badge: 'CÃ³ CDN Icon',
    desc: 'Kho biá»ƒu tÆ°á»£ng vector lá»›n nháº¥t tháº¿ giá»›i â€” Báº­t 1-Click Ä‘á»ƒ dÃ¹ng ngay icon.'
  },
  {
    id: 'swiper',
    name: 'Swiper & Owl Carousel',
    url: 'https://swiperjs.com',
    category: 'Slider / Carousel',
    accent: '#0080ff',
    badge: 'CÃ³ CDN Slider',
    desc: 'ThÆ° viá»‡n trÆ°á»£t áº£nh/tháº» cáº£m á»©ng mÆ°á»£t nháº¥t hiá»‡n nay (kÃ¨m Owl Carousel 2).'
  },
  {
    id: 'gsap',
    name: 'GSAP & Animate.css',
    url: 'https://gsap.com',
    category: 'Animation Engine',
    accent: '#0ae448',
    badge: 'CÃ³ CDN Animation',
    desc: 'Äá»™ng cÆ¡ hoáº¡t áº£nh chuyÃªn nghiá»‡p GSAP 3 káº¿t há»£p bá»™ class hiá»‡u á»©ng Animate.css.'
  },
  {
    id: 'venobox',
    name: 'VenoBox 2 & Normalize',
    url: 'https://veno.es/venobox/',
    category: 'Lightbox & Reset',
    accent: '#a3e635',
    badge: 'CÃ³ CDN Lightbox',
    desc: 'Há»™p phÃ³ng to áº£nh/video VenoBox 2 vÃ  chuáº©n hÃ³a CSS Normalize trÃªn má»i trÃ¬nh duyá»‡t.'
  }
];

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
@keyframes uilib-pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.45); opacity: 0.55; }
}
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
.uilib-btn-duolingo:active {
  transform: translateY(4px) !important;
  box-shadow: 0 0px 0 #15803d !important;
}
.uilib-card-hover:hover {
  transform: translateY(-4px);
  border-color: rgba(139, 92, 246, 0.5) !important;
}
`;

window.STUDIO_LIB_COMPONENTS = [
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
      'border': '1.5px solid rgba(139, 92, 246, 0.8)',
      'box-shadow': '0 0 24px rgba(139, 92, 246, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      'font-weight': '600',
      'font-size': '14px'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:12px 26px;background:linear-gradient(135deg,#09090b 0%,#18181b 100%);color:#f8fafc;border-radius:999px;border:1.5px solid rgba(139,92,246,0.8);box-shadow:0 0 25px rgba(139,92,246,0.45),inset 0 1px 0 rgba(255,255,255,0.2);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;"><span style="width:8px;height:8px;border-radius:50%;background:#a855f7;box-shadow:0 0 10px #a855f7;"></span><span>KhÃ¡m phÃ¡ Aceternity</span><span style="opacity:0.7;">â†’</span></button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:linear-gradient(110deg,#09090b 42%,#3f3f46 50%,#09090b 58%);background-size:200% 100%;animation:uilib-shimmer 2.5s infinite linear;color:#f4f4f5;border:1px solid #3f3f46;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,0.4);">âœ¨ Shimmer Action</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:12px 28px;background:linear-gradient(90deg,#6366f1,#ec4899,#f59e0b,#10b981,#6366f1);background-size:300% 300%;animation:uilib-rainbow 4s ease infinite;color:#ffffff;border:none;border-radius:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 10px 30px -5px rgba(236,72,153,0.55);">ðŸŒˆ Magic Rainbow CTA</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:radial-gradient(circle at 50% 0%,rgba(129,140,248,0.32) 0%,rgba(15,23,42,0.95) 75%);color:#ffffff;border-radius:999px;border:1px solid rgba(165,180,252,0.4);box-shadow:inset 0 1px 1px rgba(255,255,255,0.35),0 8px 24px rgba(99,102,241,0.28);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">âœ¦ Báº¯t Ä‘áº§u miá»…n phÃ­ â†’</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;background:#09090b;color:#fafafa;border:1px solid #27272a;border-radius:8px;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);">Xem tÃ i liá»‡u â†—</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-brutal" style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:#facc15;color:#09090b;border:2.5px solid #09090b;border-radius:8px;box-shadow:5px 5px 0px #09090b;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;cursor:pointer;">âš¡ Neo-Brutal Click</button>`
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
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:11px 22px;background:rgba(6,78,59,0.4);color:#34d399;border:1px solid #10b981;border-radius:6px;box-shadow:0 0 18px rgba(16,185,129,0.35),inset 0 0 12px rgba(16,185,129,0.15);font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;letter-spacing:0.06em;cursor:pointer;"><span>[ENCRYPT_ACCESS]</span><span>â†’</span></button>`
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
      'font-weight': '800'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-duolingo" style="display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:#22c55e;color:#ffffff;border:none;border-radius:14px;box-shadow:0 5px 0 #15803d,0 10px 20px rgba(34,197,94,0.3);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:800;letter-spacing:0.03em;cursor:pointer;">ðŸš€ Báº®T Äáº¦U NGAY</button>`
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
      'font-weight': '600'
    },
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:12px 26px;background:linear-gradient(135deg,#18181b 0%,#09090b 100%);color:#fbbf24;border:1px solid rgba(251,191,36,0.5);border-radius:999px;box-shadow:0 10px 25px -5px rgba(245,158,11,0.25),inset 0 1px 0 rgba(254,243,199,0.25);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;letter-spacing:0.04em;cursor:pointer;">âœ¦ LUXE EXCLUSIVE</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:9px 14px 9px 18px;background:#4f46e5;color:#ffffff;border:1px solid rgba(255,255,255,0.18);border-radius:10px;box-shadow:0 4px 12px rgba(79,70,229,0.35),inset 0 1px 0 rgba(255,255,255,0.25);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;"><span>Triá»ƒn khai ngay</span><span style="padding:2px 8px;background:rgba(0,0,0,0.28);border-radius:6px;font-size:11px;font-weight:700;">v4.0</span></button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:linear-gradient(135deg,#0d9488 0%,#10b981 50%,#34d399 100%);color:#042f2e;border:none;border-radius:12px;box-shadow:0 8px 25px -4px rgba(16,185,129,0.5),inset 0 1px 1px rgba(255,255,255,0.45);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">ðŸ¥¥ Kokonut AI Action</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:linear-gradient(180deg,#ffffff 0%,#f1f5f9 100%);color:#0f172a;border:1px solid #cbd5e1;border-radius:14px;box-shadow:0 4px 6px -1px rgba(15,23,42,0.08),0 2px 0 #cbd5e1,inset 0 1px 0 #ffffff;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">â—‰ Tactile Studio</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 22px;background:#7f56d9;color:#ffffff;border:1px solid #7f56d9;border-radius:8px;box-shadow:0 1px 2px rgba(16,24,40,0.05),0 0 0 4px rgba(127,86,217,0.18);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;"><span>ÄÄƒng kÃ½ dÃ¹ng thá»­</span><span>â†’</span></button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:linear-gradient(180deg,#3b82f6 0%,#2563eb 100%);color:#ffffff;border:1px solid #1d4ed8;border-radius:10px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.35),0 4px 12px rgba(37,99,235,0.3);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;">ðŸ’³ Thanh toÃ¡n nhanh</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:10px;padding:11px 24px;background:rgba(8,51,68,0.65);color:#22d3ee;border:1px solid #06b6d4;border-radius:4px;box-shadow:0 0 20px rgba(6,182,212,0.35),inset 0 0 10px rgba(6,182,212,0.2);font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;cursor:pointer;">â—¢ LAUNCH SYSTEM</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:rgba(99,102,241,0.16);color:#818cf8;border:1px solid rgba(99,102,241,0.35);border-radius:999px;font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;">âœ¨ Flyon Soft Action</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:radial-gradient(circle at 50% 120%,rgba(6,182,212,0.45),#09090b 70%);color:#ecfeff;border:1px solid rgba(34,211,238,0.5);border-radius:999px;box-shadow:0 0 24px rgba(6,182,212,0.3);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">âœ¶ Star Border CTA</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:linear-gradient(135deg,#0284c7 0%,#38bdf8 100%);color:#ffffff;border:1px solid rgba(186,230,253,0.5);border-radius:999px;box-shadow:0 8px 25px rgba(56,189,248,0.4),inset 0 1px 1px rgba(255,255,255,0.4);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">âœ¦ Skiper Magnetic</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 25px;background:linear-gradient(135deg,#4338ca 0%,#6366f1 50%,#818cf8 100%);color:#ffffff;border:1px solid rgba(165,180,252,0.35);border-radius:12px;box-shadow:0 10px 25px -5px rgba(99,102,241,0.5);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">ðŸ’§ Liquid Motion CTA</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:9px 16px;background:linear-gradient(180deg,#27272a 0%,#18181b 100%);color:#f4f4f5;border:1px solid rgba(255,255,255,0.12);border-radius:7px;box-shadow:0 1px 2px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.1);font-family:'Inter',sans-serif;font-size:13px;font-weight:500;cursor:pointer;"><span>Táº¡o Issue má»›i</span><kbd style="padding:1px 5px;background:#09090b;color:#a1a1aa;border:1px solid #3f3f46;border-radius:4px;font-size:10px;">C</kbd></button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:9px 18px;background:#0284c7;color:#ffffff;border:1px solid rgba(255,255,255,0.15);border-radius:8px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.25),0 1px 2px rgba(0,0,0,0.2);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;">+ ThÃªm báº£n ghi má»›i</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:rgba(168,85,247,0.18);backdrop-filter:blur(12px);color:#f3e8ff;border:1px solid rgba(192,132,252,0.45);border-radius:12px;box-shadow:0 8px 24px rgba(168,85,247,0.25),inset 0 1px 0 rgba(255,255,255,0.25);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">âœ¨ Buou Glass Action</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:#d97757;color:#faf9f5;border:1px solid #c46345;border-radius:10px;box-shadow:0 4px 12px rgba(217,119,87,0.3);font-family:'Lora',Georgia,serif;font-size:14px;font-weight:600;cursor:pointer;">âœ» Claude Warm Style</button>`
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
    html: `<button type="button" class="uilib-comp uilib-btn-hover-lift" style="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:#facc15;color:#09090b;border:none;border-radius:999px;box-shadow:0 8px 25px rgba(250,204,21,0.35);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">âš¡ Motion Spring</button>`
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
    html: `<div class="uilib-comp" style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(15,23,42,0.85);border:1px solid rgba(139,92,246,0.45);border-radius:999px;box-shadow:0 0 18px rgba(139,92,246,0.22);font-family:'Inter',sans-serif;font-size:12.5px;color:#e2e8f0;"><span>ðŸŽ‰</span><span style="background:linear-gradient(90deg,#c084fc,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:700;">Ra máº¯t PhiÃªn báº£n 4.0</span><span style="color:#94a3b8;">â†’</span></div>`
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
    html: `<span class="uilib-comp" style="display:inline-flex;align-items:center;gap:8px;padding:5px 12px;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);border-radius:999px;font-family:'Inter',sans-serif;font-size:12px;font-weight:600;"><span style="width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;animation:uilib-pulse-dot 1.8s infinite;"></span><span>Há»‡ thá»‘ng hoáº¡t Ä‘á»™ng 99.9%</span></span>`
  },
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
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:360px;padding:24px;background:radial-gradient(400px circle at 20% 0%,rgba(139,92,246,0.22),rgba(9,9,11,0.96) 80%);color:#f4f4f5;border:1px solid rgba(255,255,255,0.1);border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.12);font-family:'Inter',sans-serif;"><div style="width:38px;height:38px;border-radius:10px;background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.4);display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:12px;">âš¡</div><h3 style="margin:0 0 6px;font-size:17px;font-weight:700;color:#ffffff;">Aceternity Spotlight</h3><p style="margin:0;font-size:13px;line-height:1.55;color:#a1a1aa;">Hiá»‡u á»©ng Ã¡nh sÃ¡ng há»™i tá»¥ gÃ³c trÃªn káº¿t há»£p Ä‘Æ°á»ng viá»n kÃ­nh siÃªu máº£nh chuáº©n SaaS.</p></div>`
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
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:360px;padding:24px;background:linear-gradient(180deg,rgba(24,24,27,0.92) 0%,rgba(9,9,11,0.98) 100%);color:#f8fafc;border:1px solid rgba(236,72,153,0.45);border-radius:18px;box-shadow:0 0 35px -5px rgba(236,72,153,0.28),inset 0 1px 0 rgba(255,255,255,0.15);font-family:'Inter',sans-serif;"><div style="display:inline-block;padding:3px 9px;border-radius:999px;background:rgba(236,72,153,0.15);color:#f472b6;font-size:10.5px;font-weight:700;margin-bottom:10px;">âœ¨ MAGIC BENTO</div><h3 style="margin:0 0 6px;font-size:17px;font-weight:700;">Tá»± Ä‘á»™ng hÃ³a Giao diá»‡n AI</h3><p style="margin:0;font-size:13px;line-height:1.55;color:#94a3b8;">Biáº¿n má»i Ã½ tÆ°á»Ÿng thiáº¿t káº¿ thÃ nh giao diá»‡n sá»‘ng Ä‘á»™ng chá»‰ báº±ng thao tÃ¡c kÃ©o tháº£ trá»±c quan.</p></div>`
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
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:310px;padding:22px;background:linear-gradient(180deg,#18181b 0%,#09090b 100%);color:#ffffff;border:1.5px solid #6366f1;border-radius:20px;box-shadow:0 20px 50px rgba(99,102,241,0.22);font-family:'Inter',sans-serif;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-size:12px;font-weight:700;color:#818cf8;text-transform:uppercase;">Studio Pro</span><span style="padding:2px 8px;background:#4f46e5;color:#fff;border-radius:999px;font-size:10px;font-weight:700;">Hot</span></div><div style="font-size:30px;font-weight:800;margin-bottom:10px;">$29<span style="font-size:13px;color:#94a3b8;font-weight:400;">/thÃ¡ng</span></div><button type="button" style="width:100%;padding:9px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;">NÃ¢ng cáº¥p ngay â†’</button></div>`
  },
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
    html: `<div class="uilib-comp" style="display:flex;align-items:center;gap:8px;min-width:260px;padding:8px 10px 8px 14px;background:rgba(24,24,27,0.92);border:1px solid rgba(139,92,246,0.45);border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,0.4);font-family:'Inter',sans-serif;"><span style="color:#a855f7;font-size:14px;">âœ¦</span><input type="text" placeholder="Há»i AI hoáº·c tÃ¬m kiáº¿m..." style="flex:1;background:transparent;border:none;color:#f4f4f5;font-size:12.5px;outline:none;" /><button type="button" style="padding:6px 12px;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">Gá»­i â†µ</button></div>`
  },
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
    html: `<nav class="uilib-comp" style="display:inline-flex;align-items:center;gap:4px;padding:6px 8px;background:rgba(9,9,11,0.85);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);border-radius:999px;box-shadow:0 16px 40px rgba(0,0,0,0.45);font-family:'Inter',sans-serif;"><a href="#home" style="padding:6px 12px;background:#27272a;color:#ffffff;border-radius:999px;font-size:12px;font-weight:600;text-decoration:none;">Trang chá»§</a><a href="#features" style="padding:6px 12px;color:#a1a1aa;border-radius:999px;font-size:12px;font-weight:500;text-decoration:none;">TÃ­nh nÄƒng</a><a href="#cta" style="padding:6px 14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;border-radius:999px;font-size:12px;font-weight:600;text-decoration:none;">Báº¯t Ä‘áº§u</a></nav>`
  }
];

}

// ====== EMBEDDED UI LIBRARIES REGISTRY FALLBACK (v5.0) ======
if (!window.STUDIO_UI_LIBRARIES || !window.STUDIO_LIB_COMPONENTS || !window.STUDIO_NAMETHAT_CATEGORIES) {
/**
 * VISUAL UI STUDIO PRO v4.0 — UI LIBRARIES & COMPONENT REGISTRY
 * Extracted from the user's curated collection of 38+ modern UI libraries,
 * design systems, animation engines, and component registries.
 */

window.STUDIO_UI_LIBRARIES = [
  {
    id: 'shadcn',
    name: 'Shadcn UI',
    url: 'https://ui.shadcn.com',
    category: 'Design System',
    accent: '#6366f1',
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
    accent: '#d97706',
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
    accent: '#0284c7',
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
    desc: 'Bố cục Bento Grid, Hero Section, Pricing Table chuẩn mực từ đội ngũ Tailwind Labs.'
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
    accent: '#4f46e5',
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
    accent: '#d97706',
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
    desc: 'Framework UI phổ biến nhất thế giới, hỗ trợ nạp trực tiếp CDN vào trang web.'
  },
  {
    id: 'fontawesome',
    name: 'Font Awesome 6',
    url: 'https://fontawesome.com',
    category: 'Icon Library',
    accent: '#538dd7',
    badge: 'Có CDN Icon',
    desc: 'Kho biểu tượng vector lớn nhất thế giới — Bật 1-Click để dùng ngay icon.'
  },
  {
    id: 'swiper',
    name: 'Swiper & Owl Carousel',
    url: 'https://swiperjs.com',
    category: 'Slider / Carousel',
    accent: '#0080ff',
    badge: 'Có CDN Slider',
    desc: 'Thư viện trượt ảnh/thẻ cảm ứng mượt nhất hiện nay (kèm Owl Carousel 2).'
  },
  {
    id: 'gsap',
    name: 'GSAP & Animate.css',
    url: 'https://gsap.com',
    category: 'Animation Engine',
    accent: '#0ae448',
    badge: 'Có CDN Animation',
    desc: 'Động cơ hoạt ảnh chuyên nghiệp GSAP 3 kết hợp bộ class hiệu ứng Animate.css.'
  },
  {
    id: 'venobox',
    name: 'VenoBox 2 & Normalize',
    url: 'https://veno.es/venobox/',
    category: 'Lightbox & Reset',
    accent: '#a3e635',
    badge: 'Có CDN Lightbox',
    desc: 'Hộp phóng to ảnh/video VenoBox 2 và chuẩn hóa CSS Normalize trên mọi trình duyệt.'
  }
];

window.STUDIO_NAMETHAT_CATEGORIES = [
  { id: 'button', name: 'Button', vnName: 'Nút bấm / CTA', icon: '🔘', related: ['button', 'badge'] },
  { id: 'card', name: 'Card & Bento', vnName: 'Thẻ nội dung / Bento', icon: '🃏', related: ['card', 'pricing', 'modal', 'testimonial'] },
  { id: 'switch', name: 'Switch / Toggle', vnName: 'Công tắc Bật/Tắt', icon: '🎚️', related: ['switch', 'checkbox', 'input'] },
  { id: 'checkbox', name: 'Checkbox / Radio', vnName: 'Ô tích chọn', icon: '☑️', related: ['checkbox', 'switch', 'input'] },
  { id: 'input', name: 'Input / Combobox', vnName: 'Ô nhập / Tìm kiếm', icon: '⌨️', related: ['input', 'switch', 'checkbox'] },
  { id: 'badge', name: 'Badge / Pill', vnName: 'Nhãn trạng thái', icon: '🏷️', related: ['badge', 'button', 'alert'] },
  { id: 'nav', name: 'Navbar / Dock', vnName: 'Thanh điều hướng', icon: '🧭', related: ['nav', 'tabs', 'hero'] },
  { id: 'hero', name: 'Hero / Banner', vnName: 'Khối mở đầu trang', icon: '🚀', related: ['hero', 'nav', 'card'] },
  { id: 'pricing', name: 'Pricing / KPI Stat', vnName: 'Bảng giá & Số liệu', icon: '💎', related: ['pricing', 'card'] },
  { id: 'modal', name: 'Modal / Dialog', vnName: 'Hộp thoại nổi', icon: '🪟', related: ['modal', 'alert', 'card'] },
  { id: 'tabs', name: 'Tabs / Accordion', vnName: 'Chuyển Tab & FAQ', icon: '🗂️', related: ['tabs', 'nav'] },
  { id: 'avatar', name: 'Avatar / Profile', vnName: 'Ảnh đại diện / Nhóm', icon: '👤', related: ['avatar', 'badge', 'testimonial'] },
  { id: 'alert', name: 'Alert / Toast', vnName: 'Thông báo / Cảnh báo', icon: '🔔', related: ['alert', 'badge', 'modal'] },
  { id: 'slider', name: 'Slider / Progress', vnName: 'Thanh trượt & Tiến độ', icon: '📊', related: ['slider', 'input'] },
  { id: 'tooltip', name: 'Tooltip / Popover', vnName: 'Chú thích nổi', icon: '💬', related: ['tooltip', 'badge'] },
  { id: 'skeleton', name: 'Skeleton / Loader', vnName: 'Khung chờ tải (Loading)', icon: '⏳', related: ['skeleton', 'card'] },
  { id: 'testimonial', name: 'Testimonial / Review', vnName: 'Đánh giá khách hàng', icon: '🌟', related: ['testimonial', 'card', 'avatar'] },
  { id: 'custom', name: 'Custom Import', vnName: 'Mẫu tự dán Code', icon: '📥', related: ['custom'] }
];

window.STUDIO_LIB_COMPONENTS_CSS = `
@keyframes uilib-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes uilib-rainbow {
  0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
  50% { background-position: 100% 50%; filter: hue-rotate(25deg); }
  100% { background-position: 0% 50%; filter: hue-rotate(0deg); }
}
@keyframes uilib-pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.45); opacity: 0.55; }
}
@keyframes uilib-pulse-glow {
  0%, 100% { box-shadow: 0 0 18px rgba(139, 92, 246, 0.5), 0 0 36px rgba(236, 72, 153, 0.25); }
  50% { box-shadow: 0 0 28px rgba(139, 92, 246, 0.85), 0 0 55px rgba(236, 72, 153, 0.55); }
}
@keyframes uilib-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
@keyframes uilib-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.uilib-comp {
  box-sizing: border-box;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.uilib-anim-rainbow {
  background-image: linear-gradient(90deg, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1) !important;
  background-size: 300% 300% !important;
  animation: uilib-rainbow 2.6s linear infinite !important;
}
.uilib-anim-shimmer {
  background-image: linear-gradient(110deg, #09090b 40%, #52525b 50%, #09090b 60%) !important;
  background-size: 200% 100% !important;
  animation: uilib-shimmer 2.2s infinite linear !important;
}
.uilib-anim-glow {
  animation: uilib-pulse-glow 2.2s ease-in-out infinite !important;
}
.uilib-anim-float {
  animation: uilib-float 2.6s ease-in-out infinite !important;
}
.uilib-btn-hover-lift:hover {
  transform: translateY(-3px) scale(1.02) !important;
  filter: brightness(1.1) !important;
}
.uilib-btn-brutal:hover {
  transform: translate(-3px, -3px) !important;
  box-shadow: 7px 7px 0px #09090b !important;
}
.uilib-btn-duolingo:active {
  transform: translateY(4px) !important;
  box-shadow: 0 0px 0 #15803d !important;
}
.uilib-card-hover:hover {
  transform: translateY(-4px);
  border-color: rgba(139, 92, 246, 0.5) !important;
}
/* Shadcn UI & Tailwind Smart Importer Compatibility Layer */
.uilib-shadcn-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #6366f1;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px 0 0 0;
  flex-shrink: 0;
}
.uilib-shadcn-switch {
  width: 34px;
  height: 18px;
  accent-color: #6366f1;
  cursor: pointer;
  flex-shrink: 0;
}
.uilib-shadcn-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 8px;
  background: #6366f1;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.14);
  cursor: pointer;
  transition: all 0.16s ease;
}
.uilib-shadcn-btn:hover {
  background: #4f46e5;
}
.uilib-shadcn-input, .uilib-shadcn-textarea {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #27272a;
  background: #09090b;
  color: #f8fafc;
  font-size: 13.5px;
  outline: none;
}
.uilib-shadcn-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.18);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.35);
}
.uilib-shadcn-card {
  border-radius: 12px;
  border: 1px solid #27272a;
  background: #09090b;
  color: #f8fafc;
  padding: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.35);
}
.uilib-comp-stage .flex, .import-live-preview-stage .flex { display: flex; }
.uilib-comp-stage .inline-flex, .import-live-preview-stage .inline-flex { display: inline-flex; }
.uilib-comp-stage .grid, .import-live-preview-stage .grid { display: grid; }
.uilib-comp-stage .items-center, .import-live-preview-stage .items-center { align-items: center; }
.uilib-comp-stage .items-start, .uilib-comp-stage .items-top, .import-live-preview-stage .items-start, .import-live-preview-stage .items-top { align-items: flex-start; }
.uilib-comp-stage .justify-between, .import-live-preview-stage .justify-between { justify-content: space-between; }
.uilib-comp-stage .justify-center, .import-live-preview-stage .justify-center { justify-content: center; }
.uilib-comp-stage .space-x-2 > * + *, .import-live-preview-stage .space-x-2 > * + * { margin-left: 0.5rem; }
.uilib-comp-stage .space-x-3 > * + *, .import-live-preview-stage .space-x-3 > * + * { margin-left: 0.75rem; }
.uilib-comp-stage .space-y-2 > * + *, .import-live-preview-stage .space-y-2 > * + * { margin-top: 0.5rem; }
.uilib-comp-stage .gap-1\\.5, .import-live-preview-stage .gap-1\\.5 { gap: 0.375rem; }
.uilib-comp-stage .gap-2, .import-live-preview-stage .gap-2 { gap: 0.5rem; }
.uilib-comp-stage .gap-3, .import-live-preview-stage .gap-3 { gap: 0.75rem; }
.uilib-comp-stage .gap-4, .import-live-preview-stage .gap-4 { gap: 1rem; }
.uilib-comp-stage .text-sm, .import-live-preview-stage .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.uilib-comp-stage .text-xs, .import-live-preview-stage .text-xs { font-size: 0.75rem; line-height: 1rem; }
.uilib-comp-stage .font-medium, .import-live-preview-stage .font-medium { font-weight: 500; }
.uilib-comp-stage .font-semibold, .import-live-preview-stage .font-semibold { font-weight: 600; }
.uilib-comp-stage .leading-none, .import-live-preview-stage .leading-none { line-height: 1; }
.uilib-comp-stage .text-muted-foreground, .import-live-preview-stage .text-muted-foreground { color: #a1a1aa; }
`;

window.STUDIO_LIB_COMPONENTS = [
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
      'border': '1.5px solid rgba(139, 92, 246, 0.8)',
      'box-shadow': '0 0 24px rgba(139, 92, 246, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      'font-weight': '600',
      'font-size': '14px'
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
      'font-weight': '600'
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
      'font-weight': '800'
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
      'font-weight': '600'
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
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:360px;padding:24px;background:radial-gradient(400px circle at 20% 0%,rgba(139,92,246,0.22),rgba(9,9,11,0.96) 80%);color:#f4f4f5;border:1px solid rgba(255,255,255,0.1);border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.12);font-family:'Inter',sans-serif;"><div style="width:38px;height:38px;border-radius:10px;background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.4);display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:12px;">⚡</div><h3 style="margin:0 0 6px;font-size:17px;font-weight:700;color:#ffffff;">Aceternity Spotlight</h3><p style="margin:0;font-size:13px;line-height:1.55;color:#a1a1aa;">Hiệu ứng ánh sáng hội tụ góc trên kết hợp đường viền kính siêu mảnh chuẩn SaaS.</p></div>`
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
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:360px;padding:24px;background:linear-gradient(180deg,rgba(24,24,27,0.92) 0%,rgba(9,9,11,0.98) 100%);color:#f8fafc;border:1px solid rgba(236,72,153,0.45);border-radius:18px;box-shadow:0 0 35px -5px rgba(236,72,153,0.28),inset 0 1px 0 rgba(255,255,255,0.15);font-family:'Inter',sans-serif;"><div style="display:inline-block;padding:3px 9px;border-radius:999px;background:rgba(236,72,153,0.15);color:#f472b6;font-size:10.5px;font-weight:700;margin-bottom:10px;">✨ MAGIC BENTO</div><h3 style="margin:0 0 6px;font-size:17px;font-weight:700;">Tự động hóa Giao diện AI</h3><p style="margin:0;font-size:13px;line-height:1.55;color:#94a3b8;">Biến mọi ý tưởng thiết kế thành giao diện sống động chỉ bằng thao tác kéo thả trực quan.</p></div>`
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
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:310px;padding:22px;background:linear-gradient(180deg,#18181b 0%,#09090b 100%);color:#ffffff;border:1.5px solid #6366f1;border-radius:20px;box-shadow:0 20px 50px rgba(99,102,241,0.22);font-family:'Inter',sans-serif;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-size:12px;font-weight:700;color:#818cf8;text-transform:uppercase;">Studio Pro</span><span style="padding:2px 8px;background:#4f46e5;color:#fff;border-radius:999px;font-size:10px;font-weight:700;">Hot</span></div><div style="font-size:30px;font-weight:800;margin-bottom:10px;">$29<span style="font-size:13px;color:#94a3b8;font-weight:400;">/tháng</span></div><button type="button" style="width:100%;padding:9px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Nâng cấp ngay →</button></div>`
  },
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
    html: `<div class="uilib-comp" style="display:flex;align-items:center;gap:8px;min-width:260px;padding:8px 10px 8px 14px;background:rgba(24,24,27,0.92);border:1px solid rgba(139,92,246,0.45);border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,0.4);font-family:'Inter',sans-serif;"><span style="color:#a855f7;font-size:14px;">✦</span><input type="text" placeholder="Hỏi AI hoặc tìm kiếm..." style="flex:1;background:transparent;border:none;color:#f4f4f5;font-size:12.5px;outline:none;" /><button type="button" style="padding:6px 12px;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">Gửi ↵</button></div>`
  },
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
    html: `<nav class="uilib-comp" style="display:inline-flex;align-items:center;gap:4px;padding:6px 8px;background:rgba(9,9,11,0.85);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);border-radius:999px;box-shadow:0 16px 40px rgba(0,0,0,0.45);font-family:'Inter',sans-serif;"><a href="#home" style="padding:6px 12px;background:#27272a;color:#ffffff;border-radius:999px;font-size:12px;font-weight:600;text-decoration:none;">Trang chủ</a><a href="#features" style="padding:6px 12px;color:#a1a1aa;border-radius:999px;font-size:12px;font-weight:500;text-decoration:none;">Tính năng</a><a href="#cta" style="padding:6px 14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;border-radius:999px;font-size:12px;font-weight:600;text-decoration:none;">Bắt đầu</a></nav>`
  },
  // ==================== NAMETHAT UI EXPANDED TAXONOMY COMPONENTS (Switch, Checkbox, Modal, Tabs, Avatar, Alert, Slider, Tooltip, Skeleton, Testimonial) ====================
  {
    id: 'shadcn-ios-switch',
    name: 'Shadcn Animated Toggle Switch',
    libId: 'shadcn',
    libName: 'Shadcn UI',
    category: 'switch',
    tags: ['switch', 'toggle', 'cong tac', 'bat tat', 'shadcn', 'form', 'namethat'],
    morphStyles: {
      'display': 'inline-flex',
      'align-items': 'center',
      'gap': '10px',
      'padding': '8px 14px',
      'background': '#18181b',
      'border': '1px solid #27272a',
      'border-radius': '999px',
      'color': '#f8fafc'
    },
    html: `<label class="uilib-comp" style="display:inline-flex;align-items:center;gap:10px;padding:8px 14px;background:#18181b;border:1px solid #27272a;border-radius:999px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;color:#f8fafc;font-weight:500;"><span style="width:38px;height:22px;background:#6366f1;border-radius:999px;position:relative;display:inline-flex;align-items:center;padding:2px;box-shadow:0 0 12px rgba(99,102,241,0.45);"><span style="width:18px;height:18px;background:#ffffff;border-radius:50%;margin-left:auto;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></span></span><span>Chế độ AI Tự động</span></label>`
  },
  {
    id: 'originui-neon-switch',
    name: 'Origin UI Dual Icon Switch',
    libId: 'originui',
    libName: 'Origin UI (Originkit)',
    category: 'switch',
    tags: ['switch', 'toggle', 'dark mode', 'origin ui', 'cong tac', 'namethat'],
    morphStyles: {
      'display': 'inline-flex',
      'align-items': 'center',
      'gap': '10px',
      'padding': '8px 16px',
      'background': 'rgba(16, 185, 129, 0.14)',
      'border': '1px solid rgba(16, 185, 129, 0.4)',
      'border-radius': '12px',
      'color': '#ecfdf5'
    },
    html: `<label class="uilib-comp" style="display:inline-flex;align-items:center;gap:10px;padding:8px 14px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.35);border-radius:12px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;color:#ecfdf5;font-weight:600;"><span style="width:36px;height:20px;background:#10b981;border-radius:999px;display:inline-flex;align-items:center;padding:2px;"><span style="width:16px;height:16px;background:#fff;border-radius:50%;margin-left:auto;"></span></span><span>⚡ Tăng tốc GPU</span></label>`
  },
  {
    id: 'shadcn-checkbox-card',
    name: 'Shadcn Checkbox With Description',
    libId: 'shadcn',
    libName: 'Shadcn UI',
    category: 'checkbox',
    tags: ['checkbox', 'radio', 'o tich', 'shadcn', 'terms', 'form', 'namethat'],
    morphStyles: {
      'display': 'flex',
      'align-items': 'flex-start',
      'gap': '10px',
      'padding': '12px 16px',
      'background': '#09090b',
      'border': '1px solid #27272a',
      'border-radius': '10px',
      'color': '#f8fafc'
    },
    html: `<div class="uilib-comp" style="display:flex;align-items:flex-start;gap:10px;padding:12px 14px;background:#09090b;border:1px solid #27272a;border-radius:10px;font-family:'Inter',sans-serif;color:#f8fafc;"><input type="checkbox" checked class="uilib-shadcn-checkbox" /><div style="display:grid;gap:4px;"><label style="font-size:13.5px;font-weight:600;line-height:1;cursor:pointer;">Đồng ý điều khoản dịch vụ</label><p style="margin:0;font-size:12px;color:#a1a1aa;">Bạn đồng ý với chính sách bảo mật &amp; điều khoản sử dụng.</p></div></div>`
  },
  {
    id: 'originui-plan-checkbox',
    name: 'Origin UI Rich Choice Checkbox',
    libId: 'originui',
    libName: 'Origin UI (Originkit)',
    category: 'checkbox',
    tags: ['checkbox', 'radio', 'choice', 'origin ui', 'o tich', 'namethat'],
    morphStyles: {
      'padding': '12px 16px',
      'background': 'rgba(99, 102, 241, 0.12)',
      'border': '1.5px solid #6366f1',
      'border-radius': '12px',
      'color': '#ffffff'
    },
    html: `<label class="uilib-comp" style="display:flex;align-items:center;justify-content:space-between;gap:14px;min-width:240px;padding:11px 14px;background:rgba(99,102,241,0.12);border:1.5px solid #6366f1;border-radius:12px;color:#ffffff;font-family:'Inter',sans-serif;cursor:pointer;"><span style="display:flex;align-items:center;gap:9px;"><input type="checkbox" checked class="uilib-shadcn-checkbox" /><span style="font-size:13px;font-weight:700;">Gói Vĩnh Viễn (Lifetime)</span></span><span style="padding:2px 7px;background:#6366f1;border-radius:6px;font-size:11px;font-weight:700;">-40%</span></label>`
  },
  {
    id: 'shadcn-glass-modal',
    name: 'Shadcn Glass Confirmation Dialog',
    libId: 'shadcn',
    libName: 'Shadcn UI',
    category: 'modal',
    tags: ['modal', 'dialog', 'popup', 'hop thoai', 'shadcn', 'namethat'],
    morphStyles: {
      'background': 'rgba(9, 9, 11, 0.96)',
      'border': '1px solid #27272a',
      'border-radius': '16px',
      'padding': '24px',
      'box-shadow': '0 25px 60px rgba(0,0,0,0.65)',
      'color': '#f8fafc'
    },
    html: `<div class="uilib-comp" style="max-width:320px;padding:20px;background:#09090b;border:1px solid #27272a;border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,0.65);font-family:'Inter',sans-serif;color:#f8fafc;"><h4 style="margin:0 0 6px;font-size:15px;font-weight:700;">Xác nhận xuất bản dự án?</h4><p style="margin:0 0 14px;font-size:12.5px;color:#a1a1aa;line-height:1.5;">Giao diện của bạn sẽ được cập nhật trực tiếp lên hệ thống.</p><div style="display:flex;justify-content:flex-end;gap:8px;"><button type="button" style="padding:6px 12px;background:#18181b;color:#e4e4e7;border:1px solid #27272a;border-radius:8px;font-size:12px;cursor:pointer;">Hủy</button><button type="button" style="padding:6px 14px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">Xuất bản ngay</button></div></div>`
  },
  {
    id: 'aceternity-animated-tabs',
    name: 'Aceternity Sliding Pill Tabs',
    libId: 'aceternity',
    libName: 'Aceternity UI',
    category: 'tabs',
    tags: ['tabs', 'accordion', 'faq', 'menu', 'chuyen tab', 'aceternity', 'namethat'],
    morphStyles: {
      'display': 'inline-flex',
      'padding': '5px',
      'background': '#09090b',
      'border': '1px solid #27272a',
      'border-radius': '999px'
    },
    html: `<div class="uilib-comp" style="display:inline-flex;align-items:center;gap:4px;padding:5px;background:#09090b;border:1px solid #27272a;border-radius:999px;font-family:'Inter',sans-serif;"><button type="button" style="padding:6px 14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(99,102,241,0.4);">Tổng quan</button><button type="button" style="padding:6px 14px;background:transparent;color:#a1a1aa;border:none;border-radius:999px;font-size:12px;font-weight:500;cursor:pointer;">Tích hợp</button><button type="button" style="padding:6px 14px;background:transparent;color:#a1a1aa;border:none;border-radius:999px;font-size:12px;font-weight:500;cursor:pointer;">Báo cáo</button></div>`
  },
  {
    id: 'magicui-avatar-stack',
    name: 'Magic UI Trusted Avatar Stack',
    libId: 'magicui',
    libName: 'Magic UI',
    category: 'avatar',
    tags: ['avatar', 'profile', 'users', 'social proof', 'magic ui', 'anh dai dien', 'namethat'],
    morphStyles: {
      'display': 'inline-flex',
      'align-items': 'center',
      'gap': '10px',
      'padding': '6px 14px',
      'background': 'rgba(24, 24, 27, 0.9)',
      'border-radius': '999px',
      'border': '1px solid rgba(255,255,255,0.1)'
    },
    html: `<div class="uilib-comp" style="display:inline-flex;align-items:center;gap:10px;padding:6px 14px 6px 8px;background:rgba(24,24,27,0.9);border:1px solid rgba(255,255,255,0.12);border-radius:999px;font-family:'Inter',sans-serif;"><div style="display:flex;align-items:center;"><span style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);border:2px solid #09090b;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">K</span><span style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#ec4899,#f43f5e);border:2px solid #09090b;margin-left:-8px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;">A</span><span style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#10b981,#06b6d4);border:2px solid #09090b;margin-left:-8px;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;">+9k</span></div><span style="font-size:12px;color:#e4e4e7;font-weight:600;">⭐⭐⭐⭐⭐ 12,000+ Designer tin dùng</span></div>`
  },
  {
    id: 'kokonut-glow-alert',
    name: 'KokonutUI Toast Notification Banner',
    libId: 'kokonutui',
    libName: 'KokonutUI',
    category: 'alert',
    tags: ['alert', 'toast', 'notification', 'thong bao', 'kokonutui', 'namethat'],
    morphStyles: {
      'display': 'flex',
      'align-items': 'center',
      'gap': '12px',
      'padding': '12px 16px',
      'background': 'rgba(16, 185, 129, 0.12)',
      'border': '1px solid rgba(16, 185, 129, 0.35)',
      'border-radius': '12px',
      'color': '#ecfdf5'
    },
    html: `<div class="uilib-comp" style="display:flex;align-items:center;gap:10px;padding:11px 16px;background:rgba(9,9,11,0.95);border:1px solid rgba(16,185,129,0.45);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.4);font-family:'Inter',sans-serif;color:#f8fafc;"><span style="width:24px;height:24px;border-radius:50%;background:rgba(16,185,129,0.2);color:#34d399;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">✓</span><div style="font-size:12.5px;"><strong style="color:#34d399;">Đã đồng bộ thành công!</strong> Mọi thay đổi UI đã được lưu realtime.</div></div>`
  },
  {
    id: 'alignui-range-slider',
    name: 'AlignUI Progress & Range Meter',
    libId: 'alignui',
    libName: 'AlignUI Design System',
    category: 'slider',
    tags: ['slider', 'progress', 'range', 'thanh truot', 'alignui', 'namethat'],
    morphStyles: {
      'padding': '14px 18px',
      'background': '#09090b',
      'border': '1px solid #27272a',
      'border-radius': '12px',
      'color': '#f8fafc'
    },
    html: `<div class="uilib-comp" style="min-width:240px;padding:12px 16px;background:#09090b;border:1px solid #27272a;border-radius:12px;font-family:'Inter',sans-serif;color:#f8fafc;"><div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:8px;"><span>⚡ Dung lượng AI Pro</span><span style="color:#818cf8;">85%</span></div><div style="width:100%;height:8px;background:#27272a;border-radius:999px;overflow:hidden;"><div style="width:85%;height:100%;background:linear-gradient(90deg,#6366f1,#ec4899);border-radius:999px;"></div></div></div>`
  },
  {
    id: 'cultui-floating-tooltip',
    name: 'Cult UI Glass Popover Tooltip',
    libId: 'cultui',
    libName: 'Cult UI',
    category: 'tooltip',
    tags: ['tooltip', 'popover', 'hint', 'chu thich', 'cult ui', 'namethat'],
    morphStyles: {
      'padding': '8px 14px',
      'background': 'rgba(24, 24, 27, 0.95)',
      'border': '1px solid rgba(168, 85, 247, 0.45)',
      'border-radius': '10px',
      'box-shadow': '0 12px 28px rgba(0,0,0,0.45)',
      'color': '#f8fafc'
    },
    html: `<div class="uilib-comp uilib-anim-float" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(24,24,27,0.95);border:1px solid rgba(168,85,247,0.45);border-radius:10px;box-shadow:0 12px 28px rgba(0,0,0,0.45);font-family:'Inter',sans-serif;font-size:12px;color:#f8fafc;"><span style="color:#c084fc;">💬</span><span>Mẹo: Nhấp đúp để sửa chữ trực tiếp!</span><kbd style="padding:2px 5px;background:#27272a;border-radius:4px;font-size:10px;color:#a1a1aa;">Pro</kbd></div>`
  },
  {
    id: 'shadcn-shimmer-skeleton',
    name: 'Shadcn Shimmer Loading Skeleton',
    libId: 'shadcn',
    libName: 'Shadcn UI',
    category: 'skeleton',
    tags: ['skeleton', 'loader', 'spinner', 'loading', 'shadcn', 'namethat'],
    morphStyles: {
      'padding': '16px',
      'background': '#09090b',
      'border': '1px solid #27272a',
      'border-radius': '14px'
    },
    html: `<div class="uilib-comp" style="display:flex;align-items:center;gap:12px;min-width:250px;padding:14px;background:#09090b;border:1px solid #27272a;border-radius:14px;"><div class="uilib-anim-shimmer" style="width:42px;height:42px;border-radius:50%;flex-shrink:0;"></div><div style="flex:1;display:grid;gap:8px;"><div class="uilib-anim-shimmer" style="height:12px;width:75%;border-radius:6px;"></div><div class="uilib-anim-shimmer" style="height:10px;width:50%;border-radius:6px;"></div></div></div>`
  },
  {
    id: '21stdev-review-testimonial',
    name: '21st.dev Verified Testimonial Card',
    libId: '21stdev',
    libName: '21st.dev',
    category: 'testimonial',
    tags: ['testimonial', 'review', 'quote', 'danh gia', '21st.dev', 'card', 'namethat'],
    morphStyles: {
      'padding': '20px',
      'background': 'linear-gradient(145deg, #18181b 0%, #09090b 100%)',
      'border': '1px solid rgba(99, 102, 241, 0.35)',
      'border-radius': '16px',
      'color': '#f8fafc'
    },
    html: `<div class="uilib-comp uilib-card-hover" style="max-width:320px;padding:18px;background:linear-gradient(145deg,#18181b 0%,#09090b 100%);border:1px solid rgba(99,102,241,0.35);border-radius:16px;font-family:'Inter',sans-serif;color:#f8fafc;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;"><span style="font-size:12px;font-weight:700;color:#e4e4e7;">🌟 Minh Khoa — Founder</span><span style="font-size:11px;color:#facc15;">★★★★★</span></div><p style="margin:0;font-size:12.5px;color:#a1a1aa;line-height:1.5;">"Chỉ cần thả web vào, chọn nút bấm rồi áp style Aceternity/Magic UI là web đẹp như студия triệu đô!"</p></div>`
  }
];

}
