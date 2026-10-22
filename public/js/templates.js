/**
 * Visual UI Studio v3.0 — Internationalization (VI/EN), Starter Templates, Pro UI Sections & Magic Style Presets
 */

window.STUDIO_I18N = {
  vi: {
    brandSub: 'Kéo Thả Realtime & Cầu Nối AI',
    btnImportWeb: '📥 Thả Web / Mở File',
    btnTemplates: '🎨 Kho Mẫu ▾',
    tplHeader: 'Chọn Giao Diện Mẫu Để Thử Ngay',
    modeEdit: '✏️ Sửa',
    modePreview: '👁️ Xem Thử',
    btnCompare: '🌗 Giữ Xem Gốc',
    chkBypass: 'Tắt Loader',
    btnAiPrompt: 'Prompt AI',
    btnDownload: '⬇️ Tải HTML',
    btnSaveDirect: '💾 Lưu File Gốc',
    tabLayers: '📑 Cây DOM',
    tabAdd: '➕ Thêm Khối',
    tabHistory: '🕒 Lịch Sử',
    searchPlaceholder: '🔍 Tìm thẻ, class, nội dung chữ...',
    addHint: 'Bấm vào bất kỳ phần tử hoặc Section mẫu nào để chèn ngay vào vị trí đang chọn:',
    catBasic: 'PHẦN TỬ CƠ BẢN (ELEMENTS)',
    catSections: 'SECTION & COMPONENT DỰNG SẴN (PRO UI)',
    historyTitle: 'Nhật ký chỉnh sửa',
    btnResetAll: 'Khôi phục gốc',
    historyHint: 'Mọi thao tác kéo thả, thêm khối, đổi màu, hiệu ứng :hover và responsive đều được lưu tự động.',
    emptyTitle: 'Chọn bất kỳ phần tử nào trên trang web',
    emptyDesc: 'Click vào nút bấm, dòng chữ, hình ảnh hoặc khung giao diện ở giữa màn hình để chỉnh sửa ngay:'
  },
  en: {
    brandSub: 'Realtime WYSIWYG & AI Bridge',
    btnImportWeb: '📥 Drop Web / Open File',
    btnTemplates: '🎨 Templates ▾',
    tplHeader: 'Choose a Starter Template',
    modeEdit: '✏️ Edit',
    modePreview: '👁️ Preview',
    btnCompare: '🌗 Hold for Original',
    chkBypass: 'Bypass Loader',
    btnAiPrompt: 'AI Prompt',
    btnDownload: '⬇️ Export HTML',
    btnSaveDirect: '💾 Save to Source',
    tabLayers: '📑 Layers',
    tabAdd: '➕ Add Blocks',
    tabHistory: '🕒 History',
    searchPlaceholder: '🔍 Search tag, class, or text...',
    addHint: 'Click any element or ready-made section below to insert at the selected element:',
    catBasic: 'BASIC ELEMENTS',
    catSections: 'PRO UI SECTIONS & COMPONENTS',
    historyTitle: 'Edit History',
    btnResetAll: 'Reset All',
    historyHint: 'All drag-and-drop coordinates, added blocks, colors, :hover states, and responsive rules are tracked live.',
    emptyTitle: 'Click any element on the canvas',
    emptyDesc: 'Select any button, text, image, or card in the center viewport to customize in real time:'
  }
};

window.STUDIO_MAGIC_PRESETS = {
  glass: {
    name: 'Kính Mờ (Glassmorphism)',
    normal: {
      'background': 'rgba(255, 255, 255, 0.08)',
      'background-color': 'rgba(255, 255, 255, 0.08)',
      'background-image': 'none',
      'backdrop-filter': 'blur(16px)',
      '-webkit-backdrop-filter': 'blur(16px)',
      'border': '1px solid rgba(255, 255, 255, 0.22)',
      'box-shadow': '0 16px 36px rgba(0, 0, 0, 0.28)',
      'border-radius': '18px'
    }
  },
  neon: {
    name: 'Phát Sáng Neon (Cyber Glow)',
    normal: {
      'background': 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
      'color': '#ffffff',
      'border': '1px solid rgba(255, 255, 255, 0.35)',
      'box-shadow': '0 0 28px rgba(168, 85, 247, 0.65), 0 8px 20px rgba(0, 0, 0, 0.35)',
      'border-radius': '14px'
    }
  },
  brutal: {
    name: 'Neo-Brutalism 3D',
    normal: {
      'background': 'none',
      'background-color': '#facc15',
      'background-image': 'none',
      'color': '#0f172a',
      'border': '3px solid #0f172a',
      'box-shadow': '6px 6px 0px #0f172a',
      'border-radius': '10px',
      'font-weight': '800'
    }
  },
  softcard: {
    name: 'Card Nổi Mềm (Soft Elevation)',
    normal: {
      'background': 'none',
      'background-color': '#1e293b',
      'background-image': 'none',
      'color': '#f8fafc',
      'border': '1px solid rgba(148, 163, 184, 0.18)',
      'box-shadow': '0 20px 45px rgba(2, 6, 23, 0.55)',
      'border-radius': '20px',
      'padding-top': '24px',
      'padding-right': '24px',
      'padding-bottom': '24px',
      'padding-left': '24px'
    }
  },
  pillcta: {
    name: 'Nút Pill Gradient',
    normal: {
      'background': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      'color': '#ffffff',
      'border-radius': '999px',
      'padding-top': '12px',
      'padding-right': '28px',
      'padding-bottom': '12px',
      'padding-left': '28px',
      'font-weight': '700',
      'box-shadow': '0 10px 25px rgba(6, 182, 212, 0.4)'
    }
  },
  lift: {
    name: 'Hiệu ứng Nổi Lên Khi Rê Chuột (:hover)',
    normal: {
      'transition': 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    hover: {
      'translate': '0px -6px',
      'scale': '1.03',
      'box-shadow': '0 20px 40px rgba(99, 102, 241, 0.45)'
    }
  }
};

window.STUDIO_ELEMENT_BLOCKS = {
  button: `<button data-ui-custom-id="__ID__" style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);color:#ffffff;padding:12px 26px;border-radius:12px;border:none;font-weight:700;font-size:15px;cursor:pointer;display:inline-block;box-shadow:0 8px 20px rgba(99,102,241,0.35);">Nút Bấm Mới</button>`,
  heading: `<h2 data-ui-custom-id="__ID__" style="font-size:34px;font-weight:800;line-height:1.2;margin:14px 0;">Tiêu đề mới nổi bật</h2>`,
  paragraph: `<p data-ui-custom-id="__ID__" style="font-size:16px;line-height:1.65;margin:10px 0;opacity:0.88;">Nhấp đúp chuột vào đoạn văn bản này để gõ nội dung mới của bạn trực tiếp trên giao diện.</p>`,
  badge: `<span data-ui-custom-id="__ID__" style="display:inline-block;background:rgba(99,102,241,0.18);color:#818cf8;border:1px solid rgba(99,102,241,0.35);padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;">✨ Nhãn Nổi Bật</span>`,
  image: `<img data-ui-custom-id="__ID__" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" alt="Hình ảnh" style="width:320px;height:200px;object-fit:cover;border-radius:16px;display:block;box-shadow:0 12px 30px rgba(0,0,0,0.25);" />`,
  divider: `<hr data-ui-custom-id="__ID__" style="border:none;height:1px;background:rgba(148,163,184,0.25);margin:28px 0;width:100%;" />`,

  'sec-hero': `<section data-ui-custom-id="__ID__" style="padding:56px 40px;background:linear-gradient(145deg,#0f172a 0%,#1e1b4b 100%);color:#f8fafc;border-radius:24px;border:1px solid rgba(255,255,255,0.1);margin:24px 0;display:grid;grid-template-columns:1.2fr 0.8fr;gap:36px;align-items:center;">
    <div>
      <span style="display:inline-block;background:rgba(99,102,241,0.25);color:#a5b4fc;padding:6px 14px;border-radius:99px;font-size:12px;font-weight:700;margin-bottom:16px;">🚀 NEXT-GEN PLATFORM</span>
      <h1 style="font-size:40px;font-weight:800;line-height:1.15;margin-bottom:16px;">Xây dựng sản phẩm số nhanh gấp 10 lần</h1>
      <p style="font-size:16px;color:#cbd5e1;line-height:1.6;margin-bottom:24px;">Click vào bất kỳ chữ, nút bấm hoặc hình ảnh nào trong khối Hero này để kéo thả và đổi màu theo ý thích của bạn.</p>
      <div style="display:flex;gap:12px;">
        <button style="background:#6366f1;color:#fff;padding:13px 26px;border-radius:12px;border:none;font-weight:700;cursor:pointer;">Bắt Đầu Ngay</button>
        <button style="background:rgba(255,255,255,0.08);color:#fff;padding:13px 24px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);font-weight:600;cursor:pointer;">Xem Demo</button>
      </div>
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80" alt="Hero Preview" style="width:100%;height:260px;object-fit:cover;border-radius:18px;box-shadow:0 20px 40px rgba(0,0,0,0.4);" />
    </div>
  </section>`,

  'sec-features': `<section data-ui-custom-id="__ID__" style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:24px 0;">
    <div style="background:#1e293b;color:#f8fafc;padding:26px;border-radius:18px;border:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:28px;margin-bottom:12px;">⚡</div>
      <h3 style="font-size:19px;font-weight:700;margin-bottom:8px;">Tốc Độ Tức Thì</h3>
      <p style="font-size:14px;color:#94a3b8;line-height:1.5;">Mọi thao tác kéo thả đều phản hồi ở tốc độ 60 khung hình/giây.</p>
    </div>
    <div style="background:#1e293b;color:#f8fafc;padding:26px;border-radius:18px;border:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:28px;margin-bottom:12px;">🎨</div>
      <h3 style="font-size:19px;font-weight:700;margin-bottom:8px;">Tuỳ Biến Đa Chiều</h3>
      <p style="font-size:14px;color:#94a3b8;line-height:1.5;">Đổi màu, bo góc, hiệu ứng kính mờ và đổ bóng chỉ với 1 cú nhấp chuột.</p>
    </div>
    <div style="background:#1e293b;color:#f8fafc;padding:26px;border-radius:18px;border:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:28px;margin-bottom:12px;">🤖</div>
      <h3 style="font-size:19px;font-weight:700;margin-bottom:8px;">Đồng Bộ AI</h3>
      <p style="font-size:14px;color:#94a3b8;line-height:1.5;">Lưu thẳng vào file gốc hoặc xuất Prompt chuẩn chỉnh cho AI.</p>
    </div>
  </section>`,

  'sec-pricing': `<div data-ui-custom-id="__ID__" style="max-width:360px;background:linear-gradient(160deg,#1e293b 0%,#0f172a 100%);color:#f8fafc;padding:32px;border-radius:24px;border:2px solid #6366f1;box-shadow:0 20px 50px rgba(99,102,241,0.25);margin:20px 0;">
    <span style="background:#6366f1;color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:99px;">PHỔ BIẾN NHẤT</span>
    <h3 style="font-size:24px;font-weight:800;margin-top:14px;">Gói Pro Creator</h3>
    <div style="font-size:38px;font-weight:800;margin:14px 0;">$29<span style="font-size:15px;color:#94a3b8;font-weight:500;">/tháng</span></div>
    <p style="font-size:14px;color:#94a3b8;margin-bottom:20px;">Dành cho nhà sáng tạo và doanh nghiệp muốn làm chủ hoàn toàn giao diện web.</p>
    <button style="width:100%;background:linear-gradient(135deg,#6366f1 0%,#ec4899 100%);color:#fff;padding:13px;border-radius:12px;border:none;font-weight:700;font-size:15px;cursor:pointer;">Đăng Ký Ngay</button>
  </div>`,

  'sec-testimonial': `<div data-ui-custom-id="__ID__" style="max-width:460px;background:rgba(30,41,59,0.9);color:#f8fafc;padding:28px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);margin:18px 0;">
    <div style="color:#facc15;font-size:16px;margin-bottom:10px;">★★★★★</div>
    <p style="font-size:15px;line-height:1.6;font-style:italic;margin-bottom:18px;">"Trước đây muốn nhích 1 cái nút sang trái 10px tôi phải nhắn AI sửa mất 5 phút. Giờ chỉ cần cầm chuột kéo 1 giây và bấm Ctrl+S là xong!"</p>
    <div style="display:flex;align-items:center;gap:12px;">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="Avatar" style="width:44px;height:44px;border-radius:50%;object-fit:cover;" />
      <div>
        <div style="font-weight:700;font-size:14px;">Minh Anh Nguyễn</div>
        <div style="font-size:12px;color:#94a3b8;">Product Designer @ StudioX</div>
      </div>
    </div>
  </div>`,

  'sec-cta': `<section data-ui-custom-id="__ID__" style="padding:40px;background:linear-gradient(135deg,#4f46e5 0%,#06b6d4 100%);color:#ffffff;border-radius:24px;text-align:center;margin:24px 0;">
    <h2 style="font-size:30px;font-weight:800;margin-bottom:10px;">Sẵn sàng nâng cấp trang web của bạn?</h2>
    <p style="font-size:15px;opacity:0.9;margin-bottom:22px;">Để lại email để nhận thông báo và ưu đãi sớm nhất từ chúng tôi.</p>
    <div style="display:flex;gap:10px;max-width:440px;margin:0 auto;">
      <input type="email" placeholder="Nhập email của bạn..." style="flex:1;padding:12px 16px;border-radius:10px;border:none;font-size:14px;color:#0f172a;" />
      <button style="background:#0f172a;color:#fff;padding:12px 24px;border-radius:10px;border:none;font-weight:700;cursor:pointer;">Gửi Ngay</button>
    </div>
  </section>`,

  'sec-navbar': `<nav data-ui-custom-id="__ID__" style="display:flex;align-items:center;justify-content:space-between;padding:14px 26px;background:rgba(15,23,42,0.82);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.12);border-radius:16px;color:#f8fafc;margin-bottom:28px;">
    <div style="font-weight:800;font-size:18px;color:#38bdf8;">✦ BRAND.IO</div>
    <div style="display:flex;gap:24px;font-size:14px;font-weight:600;color:#cbd5e1;">
      <span>Trang chủ</span>
      <span>Tính năng</span>
      <span>Bảng giá</span>
      <span>Liên hệ</span>
    </div>
    <button style="background:#6366f1;color:#fff;padding:9px 20px;border-radius:99px;border:none;font-weight:700;cursor:pointer;">Bắt đầu</button>
  </nav>`
};

window.STUDIO_STARTER_TEMPLATES = {
  saas: {
    fileName: 'template-saas-ai.html',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>NovaAI — SaaS Landing Page</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #090d16; color: #f8fafc; padding: 36px 28px; }
    .wrap { max-width: 1080px; margin: 0 auto; }
    .nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 26px; background: rgba(30,41,59,0.65); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; margin-bottom: 48px; }
    .logo { font-weight: 800; font-size: 20px; color: #38bdf8; }
    .nav-links { display: flex; gap: 24px; font-size: 14px; color: #cbd5e1; }
    .btn-cta { background: #6366f1; color: #fff; padding: 10px 22px; border-radius: 99px; font-weight: 700; border: none; cursor: pointer; }
    .hero { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 40px; align-items: center; padding: 52px; background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; margin-bottom: 40px; }
    .pill { display: inline-block; background: rgba(99,102,241,0.2); color: #818cf8; padding: 6px 14px; border-radius: 99px; font-size: 12px; font-weight: 700; margin-bottom: 18px; }
    h1 { font-size: 44px; line-height: 1.15; margin-bottom: 18px; }
    .sub { font-size: 16.5px; color: #94a3b8; line-height: 1.6; margin-bottom: 28px; }
    .actions { display: flex; gap: 14px; }
    .btn-grad { background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color: #fff; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 15px; border: none; cursor: pointer; }
    .btn-ghost { background: #1e293b; color: #e2e8f0; padding: 14px 26px; border-radius: 12px; font-weight: 600; font-size: 15px; border: 1px solid #334155; cursor: pointer; }
    .card-preview { background: #0b1120; border: 1px solid #334155; border-radius: 20px; padding: 24px; text-align: center; }
    .card-preview img { width: 100%; height: 220px; object-fit: cover; border-radius: 14px; margin-bottom: 14px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .feat-card { background: #131b2e; border: 1px solid rgba(255,255,255,0.07); padding: 26px; border-radius: 20px; }
    .feat-card h3 { margin: 10px 0 8px; font-size: 18px; }
    .feat-card p { color: #94a3b8; font-size: 14px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="wrap">
    <nav class="nav">
      <div class="logo">✦ NOVA.AI</div>
      <div class="nav-links"><span>Sản phẩm</span><span>Giải pháp</span><span>Bảng giá</span></div>
      <button class="btn-cta">Dùng Thử Miễn Phí</button>
    </nav>
    <section class="hero">
      <div>
        <span class="pill">⚡ VISUAL UI STUDIO v3.0</span>
        <h1>Click vào bất kỳ nút nào và kéo thử sang trái!</h1>
        <p class="sub">Thanh công cụ nổi ngay trên nút cho phép bạn Xóa, Nhân bản, Đổi chỗ hoặc bấm ↺ Gốc trong 0.5 giây. Giữ phím Alt và rê chuột qua nút bên cạnh để đo khoảng cách giống Figma!</p>
        <div class="actions">
          <button class="btn-grad">Kéo Thử Nút Này</button>
          <button class="btn-ghost">Đổi Màu Nút Này</button>
        </div>
      </div>
      <div class="card-preview">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" alt="Preview" />
        <h3>Khối Giao Diện Tương Tác</h3>
        <p style="color:#94a3b8;font-size:13.5px;margin-top:6px;">Thử áp dụng mẫu Kính Mờ (Glass) ở cột phải!</p>
      </div>
    </section>
    <section class="grid-3">
      <div class="feat-card"><div>🚀</div><h3>Kéo Thả Tọa Độ 60fps</h3><p>Di chuyển tự do từng pixel hoặc dùng phím mũi tên mà không làm vỡ bố cục.</p></div>
      <div class="feat-card"><div>📱</div><h3>Responsive Độc Lập</h3><p>Chỉnh riêng giao diện cho Desktop, Tablet và Mobile hoàn toàn tách biệt.</p></div>
      <div class="feat-card"><div>🤖</div><h3>Xuất Prompt AI & Lưu Gốc</h3><p>Bấm Ctrl+S lưu thẳng vào file hoặc xuất câu lệnh kỹ thuật cho AI.</p></div>
    </section>
  </div>
</body>
</html>`
  },

  portfolio: {
    fileName: 'template-creative-portfolio.html',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Creative Portfolio Template</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #111111; color: #f5f5f4; padding: 48px 32px; }
    .container { max-width: 1000px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 64px; }
    .badge-avail { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.35); padding: 6px 16px; border-radius: 99px; font-size: 13px; font-weight: 600; }
    h1 { font-family: 'Syne', sans-serif; font-size: 56px; line-height: 1.08; margin-bottom: 24px; }
    .bio { font-size: 18px; color: #a8a29e; max-width: 640px; line-height: 1.6; margin-bottom: 36px; }
    .cta-row { display: flex; gap: 16px; margin-bottom: 64px; }
    .btn-light { background: #f5f5f4; color: #111; padding: 14px 30px; border-radius: 99px; font-weight: 700; border: none; cursor: pointer; }
    .btn-dark { background: #1c1917; color: #f5f5f4; padding: 14px 28px; border-radius: 99px; font-weight: 600; border: 1px solid #44403c; cursor: pointer; }
    .works { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .work-card { background: #1c1917; border: 1px solid #292524; border-radius: 24px; padding: 20px; }
    .work-card img { width: 100%; height: 240px; object-fit: cover; border-radius: 16px; margin-bottom: 16px; }
    .work-card h3 { font-size: 20px; margin-bottom: 6px; }
    .work-card p { color: #a8a29e; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <div style="font-weight:800;font-size:20px;">KHOA.DEV</div>
      <span class="badge-avail">● Sẵn sàng nhận dự án mới</span>
    </header>
    <h1>Creative Engineer &amp; Digital Craftsman.</h1>
    <p class="bio">Thiết kế và xây dựng hệ thống Web, Mobile &amp; AI hiệu năng cao với kiến trúc hiện đại.</p>
    <div class="cta-row">
      <button class="btn-light">Xem Dự Án Nổi Bật</button>
      <button class="btn-dark">Tải Hồ Sơ (CV)</button>
    </div>
    <div class="works">
      <div class="work-card">
        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80" alt="Work 1" />
        <h3>Hệ Thống Quản Trị Kho Thông Minh</h3>
        <p>Spring Boot Modulith • Next.js • AI Forecasting</p>
      </div>
      <div class="work-card">
        <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80" alt="Work 2" />
        <h3>Ứng Dụng Di Động Đa Nền Tảng</h3>
        <p>Flutter Clean Architecture • Realtime Sync</p>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  ecommerce: {
    fileName: 'template-ecommerce-product.html',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>E-Commerce Product Showcase</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #0f172a; padding: 48px 28px; }
    .product-box { max-width: 980px; margin: 0 auto; background: #ffffff; border-radius: 28px; box-shadow: 0 24px 60px rgba(15,23,42,0.08); padding: 44px; display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: center; }
    .prod-img { width: 100%; height: 380px; object-fit: cover; border-radius: 20px; }
    .tag { display: inline-block; background: #fef3c7; color: #d97706; font-weight: 700; font-size: 12px; padding: 5px 12px; border-radius: 99px; margin-bottom: 14px; }
    h1 { font-size: 36px; font-weight: 800; line-height: 1.2; margin-bottom: 14px; }
    .price { font-size: 32px; font-weight: 800; color: #4f46e5; margin-bottom: 18px; }
    .desc { color: #475569; line-height: 1.6; margin-bottom: 28px; }
    .buy-row { display: flex; gap: 14px; }
    .btn-buy { flex: 1; background: #0f172a; color: #fff; padding: 15px 24px; border-radius: 14px; font-weight: 700; font-size: 15px; border: none; cursor: pointer; }
    .btn-cart { background: #e2e8f0; color: #0f172a; padding: 15px 22px; border-radius: 14px; font-weight: 700; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <div class="product-box">
    <img class="prod-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80" alt="Headphones" />
    <div>
      <span class="tag">🔥 PHIÊN BẢN GIỚI HẠN 2026</span>
      <h1>Tai Nghe Không Dây Studio Pro X</h1>
      <div class="price">4.990.000₫</div>
      <p class="desc">Chống ồn chủ động thông minh AI, thời lượng pin 48 giờ liên tục cùng chất âm chuẩn phòng thu chuyên nghiệp.</p>
      <div class="buy-row">
        <button class="btn-buy">Mua Ngay — Giao Nhanh 2H</button>
        <button class="btn-cart">🛒 Thêm Giỏ Hàng</button>
      </div>
    </div>
  </div>
</body>
</html>`
  },

  biolink: {
    fileName: 'template-bio-link.html',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Personal Bio & Links</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: #fff; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 32px; }
    .bio-card { width: 100%; max-width: 440px; background: rgba(255,255,255,0.07); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.15); border-radius: 28px; padding: 36px 28px; text-align: center; }
    .avatar { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 3px solid #6366f1; margin-bottom: 14px; }
    h1 { font-size: 24px; font-weight: 800; margin-bottom: 6px; }
    .role { color: #a5b4fc; font-size: 14px; margin-bottom: 24px; }
    .links { display: flex; flex-direction: column; gap: 12px; }
    .link-btn { display: block; width: 100%; padding: 14px 20px; background: rgba(255,255,255,0.1); color: #fff; text-decoration: none; border-radius: 14px; font-weight: 700; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; }
  </style>
</head>
<body>
  <div class="bio-card">
    <img class="avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80" alt="Profile" />
    <h1>Nguyễn Đăng Khoa</h1>
    <p class="role">Fullstack &amp; Mobile Systems Engineer</p>
    <div class="links">
      <button class="link-btn">🌐 Website Portfolio Chính Thức</button>
      <button class="link-btn">💻 GitHub (@minKasent)</button>
      <button class="link-btn">💼 Kết Nối LinkedIn</button>
      <button class="link-btn" style="background:linear-gradient(135deg,#6366f1 0%,#ec4899 100%);border:none;">📬 Liên Hệ Hợp Tác Dự Án</button>
    </div>
  </div>
</body>
</html>`
  }
};
