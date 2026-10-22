# 🪄 Visual UI Studio Pro v3.0

> **Kéo thả giao diện Web tự do theo tọa độ thời gian thực — Dành cho cả người không biết lập trình (Non-IT) & Lập trình viên toàn cầu.**  
> **Zero-Dependency WYSIWYG DOM & Real-Time Coordinate Web UI Editor — Built for Non-IT Users & Developers Worldwide.**

[![License: MIT](https://img.shields.io/badge/License-MIT-00f5d4.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.0-6366f1.svg)](./package.json)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-10b981.svg)](./package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ec4899.svg)](https://github.com/minKasent/visual-ui-studio)

---

## 🇻🇳 Dành Cho Người Dùng Việt Nam (Không Cần Biết IT)

Bạn có một trang web (Portfolio, Landing Page, Shop bán hàng...) và muốn **dịch nút sang trái một chút, đổi màu chữ, thay ảnh, thêm nút mới hoặc xóa phần tử thừa** ngay lập tức mà không phải chờ đợi hay mô tả dài dòng cho AI?

**Visual UI Studio Pro v3.0** biến bất kỳ file `.html` hay thư mục web nào của bạn thành một bảng vẽ kéo-thả trực quan như Canva / Figma!

### ✨ Điểm Nổi Bật Nhất Phiên Bản v3.0
1. **🎯 Kéo thả & Đổi kích thước 60fps theo tọa độ thật (`X, Y, W, H`)**: Nhấn giữ chuột vào bất kỳ nút, tiêu đề, hình ảnh hay khung nào để kéo đi. Có đường gióng hồng thông minh (Smart Guides) tự bắt điểm giữa.
2. **🗑️ Thêm phần tử mới & Xóa cực dễ chỉ với 1 nút bấm**:
   - Bấm vào kho **Thêm mới** ở cột trái để chèn Nút bấm, Tiêu đề, Ảnh, Thẻ kính mờ (Glass Card), Khung Giá (Pricing), Hero Banner...
   - **Thêm nhầm muốn xóa thì sao?** Ngay trên thanh nổi sát phần tử đang chọn có nút **`🗑️ Xóa`** màu đỏ (hoặc bấm phím `Delete` trên bàn phím / bấm `Ctrl+Z` hoàn tác) — xóa sạch sẽ 100%, không để lại rác!
3. **🎨 Đổi màu / Gradient & Nút `↺ Màu gốc` tức thì**:
   - Đổi màu chữ, màu nền hoặc chọn màu chuyển sắc (Gradient) chỉ với 1 cú click.
   - **Chọn màu khác rồi muốn quay lại màu gốc ban đầu của web thì sao?** Ngay cạnh mục Màu chữ, Màu nền và Gradient đều có nút **`↺ Màu gốc`** màu vàng cam — bấm vào là trả về đúng màu ban đầu của trang web ngay lập tức!
4. **✍️ Sửa chữ thông minh (Bảo toàn Icon)**: Nhấp đúp chuột (`Double-click`) thẳng vào nút hoặc tiêu đề trên trang để gõ chữ mới mà **không làm mất icon** bên trong nút. Có nút **`↺ Chữ gốc`** để quay lại chữ ban đầu.
5. **💾 Lưu thẳng vào File gốc (`Ctrl+S`) hoặc Xuất Lệnh Cho AI**:
   - Tự động tạo file sao lưu `.bak` an toàn trước khi lưu.
   - Xuất câu lệnh Tiếng Việt + mã CSS chuẩn từng pixel để gửi cho ChatGPT / Claude / Cursor / Antigravity nếu cần.

---

### 🚀 Cách Cài Đặt & Sử Dụng Dễ Nhất (Ai Cũng Làm Được Trong 10 Giây)

#### Cách 1: Dành cho người không rành IT (Bấm đúp là chạy!)
1. Bấm nút màu xanh **`<> Code`** ở góc trên trang GitHub này -> Chọn **`Download ZIP`** và giải nén ra máy tính.
2. Mở thư mục vừa giải nén:
   - **Trên Windows**: Nhấp đúp chuột vào file **`START-UI-STUDIO.bat`**.
   - **Trên Mac / Linux**: Nhấp đúp chuột vào file **`START-UI-STUDIO.command`**.
3. Trình duyệt sẽ tự động mở công cụ lên! Bạn chỉ cần bấm nút **"Mở file .html"** (hoặc kéo thả file `.html` từ máy tính vào giữa màn hình) để bắt đầu chỉnh sửa!
   *(Ngay cả khi máy bạn chưa cài Node.js, file `.bat` sẽ tự động mở trực tiếp giao diện trên trình duyệt cho bạn dùng ngay!)*

#### Cách 2: Dành cho Lập trình viên (Chạy qua Terminal / `npx`)
```bash
# Clone kho mã nguồn về máy
git clone https://github.com/minKasent/visual-ui-studio.git
cd visual-ui-studio

# Khởi động ngay (Không cần npm install vì 0 phụ thuộc ngoài!)
npm start

# Hoặc truyền đường dẫn thư mục dự án web của bạn vào:
node server.js "D:\Du-An-Web-Cua-Ban" --open
```

---

## 🌍 English Documentation (For Global Users & Developers)

**Visual UI Studio Pro v3.0** is a zero-dependency, lightweight WYSIWYG DOM & Real-Time Coordinate Editor. Drop in any `.html` file or connect a local web project folder to visually drag, resize, restyle, add, or delete elements in real time — then save directly to your source file or export an AI-ready CSS/HTML diff prompt.

### 🔥 Key Features
- **Freehand Drag & 8-Handle Resize**: Moves elements smoothly via hardware-accelerated `transform: translate3d(X, Y, 0)` while preserving existing transforms.
- **1-Click Add & Instant Delete (`🗑️ Delete`)**: Insert buttons, cards, badges, and full sections. Delete any added or existing element immediately via the floating on-canvas HUD bar (`🗑️ Xóa`), `Delete`/`Backspace` key, Layers Tree `🗑️` button, or `Ctrl+Z`.
- **Non-Destructive Color & Gradient Engine with `↺ Original Color` Reset**:
  - Automatically resolves CSS `background-image: linear-gradient(...)` vs `background-color` conflicts.
  - Dedicated **`↺ Màu gốc` (Original Color)** reset buttons on Text Color, Background Color, and Gradient restore the element's original stylesheet/inline appearance in one click.
- **Icon-Safe Inline Text Editing**: Double-click any button or heading to edit text inline without overwriting nested `<svg>` or `<i>` icons.
- **Full Atomic Undo/Redo (`Ctrl+Z` / `Ctrl+Y`)**: Every drag, resize, color tweak, preset application, element insertion, duplication, or deletion is recorded on an atomic snapshot stack.
- **Responsive Breakpoint & `:hover` State Editor**: Switch between **Desktop**, **Tablet (`768px`)**, and **Mobile (`390px`)** or style `:hover` states directly.
- **Bilingual UI (`VI` / `EN`)**: Switch between Vietnamese and English anytime from the top bar.

### ⌨️ Keyboard Shortcuts / Phím Tắt Nhanh

| Phím tắt / Shortcut | Tác dụng / Action |
| :--- | :--- |
| `Click` | Chọn phần tử / Select element |
| `Double-Click` | Sửa chữ trực tiếp trên trang / Inline text edit |
| `Drag` (`Shift + Drag`) | Kéo thả tự do (Giữ `Shift` để khóa trục thẳng hàng) |
| `Arrow Keys` (`+Shift`) | Nhích từng `1px` (Giữ `Shift` để nhích `10px`) |
| `Delete` / `Backspace` | Xóa phần tử đang chọn / Delete selected element |
| `Ctrl + D` | Nhân bản phần tử đang chọn / Duplicate element |
| `Ctrl + Z` / `Ctrl + Y` | Hoàn tác / Làm lại (Undo / Redo) |
| `Esc` | Chọn khung cha bao ngoài / Select parent container |
| `Ctrl + S` | Lưu trực tiếp vào file gốc / Save directly |

---

## 📁 Cấu Trúc Thư Mục / Project Structure

```text
visual-ui-studio/
├── START-UI-STUDIO.bat       # 1-Click Launcher cho Windows
├── START-UI-STUDIO.command   # 1-Click Launcher cho macOS / Linux
├── server.js                 # Zero-dependency Node.js Local Server & File Saver
├── package.json              # Cấu hình gói & CLI
├── PROMPT-NANG-CAP.md        # Master System Prompt v3.0 (Kiến trúc & QA/QC)
└── public/                   # Giao diện Studio (Chạy được cả độc lập & GitHub Pages)
    ├── index.html            # Giao diện 3 cột chuẩn Figma / Webflow
    ├── css/
    │   └── studio.css        # Hệ thống giao diện Dark Mode & Reset Pills
    └── js/
        ├── templates.js      # Kho thành phần, Phép thuật 1-Click, Mẫu Web & Đa ngôn ngữ
        └── studio.js         # Nhân xử lý Kéo thả, Tọa độ, Undo/Redo, Màu gốc & Xuất AI
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.
