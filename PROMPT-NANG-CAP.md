# 🎯 Master Prompt v3.0 (5-Agent QA/QC & Global Open-Source Edition): Visual Web UI Studio

Bản **Master Prompt v3.0** này được tổng hợp sau quá trình kiểm định gắt gao của **5 Agent chuyên gia** (Non-IT End-User Critic, Master QA/QC Auditor, Principal UI/UX Designer, CSS/DOM Engine Architect, và Open-Source DevOps Engineer).

---

## 📋 Nội dung Prompt Đã Nâng Cấp Toàn Diện (v3.0)

```markdown
Hãy đóng vai một Hội đồng Kỹ thuật gồm 5 chuyên gia: Principal Frontend Architect, Staff Product Designer (UI/UX), Master QA/QC Engineer, CSS Rendering Specialist, và Open-Source Release Engineer.

### 1. Bối cảnh & Mục tiêu Sản phẩm (Product Vision)
Xây dựng **Visual Web UI Studio v3.0** — công cụ chỉnh sửa giao diện web trực quan (Realtime WYSIWYG DOM & Coordinate Editor) dành cho cả người không biết IT (No-code user) lẫn lập trình viên trên toàn thế giới.
Người dùng chỉ cần thả bất kỳ file `.html` hoặc thư mục web nào vào để kéo thả vị trí (tọa độ X/Y nhảy realtime), kéo 8 góc đổi kích thước, đổi màu/gradient, sửa chữ/ảnh trực tiếp, thiết kế hiệu ứng `:hover` và chỉnh riêng Responsive (Desktop / Tablet / Mobile), sau đó bấm `Ctrl+S` lưu thẳng vào file gốc hoặc xuất Prompt kỹ thuật chuẩn xác cho AI.

### 2. Các Yêu Cầu Kỹ Thuật & Trải Nghiệm Cốt Lõi (Đã Kiểm Chứng Qua Thực Tế)

#### A. Trải Nghiệm "Sửa Sai & Khôi Phục Trong 0.5 Giây" Cho Người Không Biết IT
1. **Thanh Công Cụ Nổi Thông Minh Ngay Trên Khung Chọn (Smart 4-Edge Viewport-Collision HUD)**:
   - Ngay trên khung chọn màu xanh của phần tử đang chọn trên Canvas, tích hợp trực tiếp cả thông số tọa độ (`tag • X, Y • W×H`) lẫn cụm nút thao tác nhanh có thể click ngay:
     `[⬆️ Cha]  [⬅ Đẩy Trước]  [➡ Đẩy Sau]  [✍️ Sửa chữ]  [📋 Nhân bản]  [↺ Gốc]  [🗑️ Xóa]`
   - Tự động tính toán chống tràn 4 cạnh màn hình (Top / Bottom / Left / Right / Inside fallback cho các section lớn) để thanh công cụ không bao giờ bị khuất khỏi khung nhìn.
2. **Hệ Thống Nút `↺ Màu gốc` / `↺ Gốc` Riêng Biệt Cho Từng Thuộc Tính (Per-Property Reset)**:
   - Tuyệt đối không đánh đồng nút `Trong suốt (transparent)` với `↺ Màu gốc`.
   - Phải có nút **`↺ Màu gốc`** riêng ở cả 3 nơi: **Màu chữ**, **Màu nền**, và **Màu nền chuyển sắc (Gradient 1 chạm)**.
   - Phải có nút **`↺ Gốc`** ở tiêu đề của từng nhóm trong Inspector:
     - `📍 Tọa độ & Kích thước` (kèm nút `0` riêng cho trục X và trục Y)
     - `🎨 Màu sắc & Nền` (kèm nút reset riêng cho Opacity và Blur)
     - `✍️ Nội dung & Kiểu chữ` (kèm nút `↺ Chữ gốc` bảo toàn icon `<svg>`/`<i>` và `↺ Ảnh gốc`)
     - `🔲 Bo góc, Viền & Đổ bóng` (kèm nút `↺ Bo góc gốc`, `↺ Viền gốc`, `↺ Bóng gốc`)
     - `📏 Khoảng cách Padding & Margin`
     - `⚡ Bố cục Flexbox & Gap`
3. **Hiển thị trạng thái đang chọn (`Active State Highlight`)**:
   - Các ô màu (Swatches), ô Gradient, nút Đổ bóng, Căn lề khi đang được áp dụng phải có viền sáng nổi bật và dấu `✓`; khi bấm `↺ Màu gốc` thì gỡ trạng thái active.

#### B. Kiến Trúc CSS & DOM Engine Chống Lỗi Tuyệt Đối
1. **Giải quyết xung đột giữa Gradient (`background-image`) và Màu đơn (`background-color`)**:
   - Trong CSS, `background-image: linear-gradient(...)` nằm đè lên trên `background-color`. Do đó, khi người dùng chọn một màu nền đơn sắc (`solid color`), engine bắt buộc phải gán đồng thời `background-color: <màu>` VÀ `background-image: none` để đè được lên các nút vốn có Gradient trong file CSS gốc.
   - Khi người dùng chọn Gradient, xóa `background-color` và `background-image: none`, chỉ gán `background: <gradient>`.
   - Khi người dùng bấm `↺ Màu gốc`, xóa cả 3 thuộc tính `background`, `background-color`, `background-image` khỏi bảng ghi đè (và khôi phục `data-ui-init-style` nếu là phần tử mới chèn có inline style gốc).
2. **Chống nhảy kích thước khi Resize (`box-sizing: border-box`) & Bảo toàn Icon khi sửa chữ**:
   - Khi kéo 8 điểm neo Resize, tự động đảm bảo `box-sizing: border-box`, chuyển `display: inline` sang `inline-block`, bù trừ tỷ lệ `scale`/`zoom`, và khóa `dx`/`dy` khi chạm ngưỡng kích thước tối thiểu `16px`.
   - Khi sửa văn bản của nút có chứa icon (`<i class="ph...">`, `<svg>`), chỉ cập nhật Text Node hoặc `.btn-caption` để không làm mất icon; khi bấm `↺ Chữ gốc`, khôi phục từ `initialInnerHTML`.

#### C. Hệ Thống Undo / Redo (`Ctrl+Z` / `Ctrl+Y`) Nguyên Tử Cho 100% Thao Tác
1. **Bao phủ toàn bộ thao tác**:
   - Mọi hành động: **Thêm khối mới (`insertNewElement`)**, **Nhân bản (`duplicate`)**, **Xóa phần tử vừa thêm hoặc phần tử gốc (`delete`)**, **Kéo tọa độ (`move`)**, **Kéo kích thước (`resize`)**, **Nhích nút `+10/-10/◀/▶`**, **Đổi chỗ DOM (`⬅`/`➡`)**, **Đổi màu/Gradient/Preset**, **Sửa chữ/Đổi ảnh**, và **Reset** đều phải lưu Snapshot giao dịch vào `undoStack`.
   - Gom nhóm (debounce) các sự kiện kéo thanh trượt (`input`) để 1 lần kéo thanh trượt = 1 lần bấm `Ctrl+Z`.
2. **Xử lý sạch khi xóa phần tử vừa thêm (`addedNodes`)**:
   - Nếu người dùng thêm 1 Button mới rồi bấm `🗑️ Xóa` (hoặc `Ctrl+Z`), hệ thống phải gỡ bỏ hoàn toàn phần tử đó khỏi danh sách xuất HTML và AI Prompt (bộ đếm thay đổi về `0`, không sinh mã thừa), đồng thời xóa sạch các ID trùng lặp khi nhân bản sâu (`cloneNode(true)`).
   - Bấm `Ctrl+S` nhiều lần liên tiếp không bao giờ nhân đôi các phần tử mới thêm.

#### D. Đóng Gói Đa Nền Tảng & Phát Hành GitHub (Zero-Friction Open Source)
1. **Chế độ Kép (Local Server Mode & Static GitHub Pages Mode)**:
   - Dùng đường dẫn tương đối (`./css/...`, `./js/...`) để chạy mượt cả trên Local Server (`http://localhost:4567`) lẫn **GitHub Pages** (`https://<user>.github.io/<repo>/`).
   - Tự động phát hiện môi trường: nếu có Local Server thì lưu thẳng vào file gốc qua `/api/save` (kèm bản sao lưu `.bak`); nếu chạy trên GitHub Pages hoặc mở file rời thì lưu qua `File System Access API` hoặc tải file `.html` sạch về máy.
2. **Cài đặt & Chạy 1 Chạm**:
   - Windows: Nhấp đúp `START-UI-STUDIO.bat`
   - macOS / Linux: Nhấp đúp `START-UI-STUDIO.command`
   - CLI toàn cầu: `npx visual-ui-studio` hoặc `npm start`
```
