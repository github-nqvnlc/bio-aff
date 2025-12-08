# Yêu cầu chi tiết cho dự án Bio pastel

## 1. Mục tiêu chung

- Xây 2 trang tách biệt:
  - Trang nhập/quản trị: cho phép đăng nhập TikTok, lấy thông tin kênh, nhập danh mục sản phẩm, nhập sản phẩm affiliate.
  - Trang bio hiển thị: công khai, hiển thị thông tin kênh và danh sách sản phẩm theo danh mục, tối ưu cho mobile.
- Tông màu hồng pastel, ưu tiên trải nghiệm trên màn hình 375–640px.

## 2. Trang nhập/quản trị (form)

- Đăng nhập TikTok:
  - Nút/luồng “Đăng nhập với TikTok”.
  - Sau khi login, lấy được: tên kênh (display name), ID kênh (unique id), avatar URL.
  - Hiển thị xem trước thông tin kênh đã lấy.
- Danh mục sản phẩm (bắt buộc nhập trước khi nhập sản phẩm):
  - Form thêm danh mục với các trường: tên danh mục (bắt buộc), mô tả ngắn (tùy chọn).
  - Danh sách danh mục đã tạo; có thể chọn danh mục khi thêm sản phẩm.
- Sản phẩm affiliate:
  - Trường: hình ảnh (URL hoặc upload), tiêu đề, mô tả ngắn/nội dung, phân loại/danh mục (bắt buộc, chọn từ danh mục có sẵn), link liên kết sản phẩm.
  - Không hiển thị/tồn tại trường tên platform affiliate trên UI.
  - Có danh sách xem trước sản phẩm đã nhập theo danh mục.
- UX form:
  - Sắp xếp theo thứ tự: thông tin kênh -> danh mục -> sản phẩm.
  - Cảnh báo/disabled khi chưa có danh mục mà cố thêm sản phẩm.
  - Lưu dữ liệu tạm thời (localStorage) để tránh mất form khi reload, cho tới khi có backend.

## 3. Trang bio hiển thị (public)

- Thông tin kênh:
  - Hiển thị avatar tròn, tên kênh, ID kênh.
  - Canh giữa, block nằm trên cùng.
- Danh mục & sản phẩm:
  - Mỗi danh mục là một khối có tiêu đề, hỗ trợ collapse/expand.
  - Bên trong mỗi danh mục, sản phẩm hiển thị dạng lưới 2 cột tối đa (2 sản phẩm mỗi hàng).
  - Thẻ sản phẩm: ảnh, tiêu đề, mô tả ngắn, nút/link CTA tới link affiliate (không nêu tên platform).
- Tối ưu mobile (375–640px):
  - Layout một cột cho khung nhỏ, lưới 2 cột cho sản phẩm nếu đủ rộng.
  - Kích thước touch-friendly, khoảng cách padding/border-radius mềm, màu chủ đạo hồng pastel.
  - Collapse phải dễ bấm, có trạng thái mở/đóng rõ ràng.

## 4. Dữ liệu & lưu trữ tạm

- Nguồn dữ liệu: kết quả login TikTok (thông tin kênh), danh mục và sản phẩm do người dùng nhập.
- Lưu tạm client-side (localStorage) cho cả thông tin kênh, danh mục, sản phẩm.
- Cấu trúc dữ liệu gợi ý:
  - channel: { name, id, avatar }
  - categories: [{ id, name, description }]
  - products: [{ id, title, description, image, categoryId, link }]

## 5. Kỹ thuật & triển khai

- Tách file: HTML, CSS, JS riêng cho từng trang (vd: `admin.html` + `admin.css` + `admin.js`; `bio.html` + `bio.css` + `bio.js`).
- Không cần backend trước mắt; chuẩn bị sẵn điểm gắn cho API TikTok login (mock/placeholder).
- Đảm bảo link giữa hai trang: trang bio đọc dữ liệu từ localStorage (hoặc JSON export) do trang nhập tạo.

## 6. UI/UX & brand

- Chủ đạo hồng pastel; card bo tròn, shadow nhẹ, nền gradient nhẹ.
- Typography dễ đọc, khoảng trắng đủ rộng; nút rõ ràng, có trạng thái hover/active.
- Hỗ trợ ảnh fallback khi thiếu avatar/sản phẩm.

## 7. Kiểm thử tối thiểu

- Mobile viewport 375–640px: kiểm tra hiển thị kênh, lưới 2 cột sản phẩm, collapse danh mục.
- Thêm danh mục trước sản phẩm: không cho thêm sản phẩm khi chưa có danh mục.
- Lưu/khôi phục localStorage: nhập dữ liệu, reload, dữ liệu vẫn còn; xóa dữ liệu (nút reset).
- Link sản phẩm mở đúng URL, không hiển thị tên platform.
