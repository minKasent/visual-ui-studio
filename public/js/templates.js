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

