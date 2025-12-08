# TODO đơn giản theo req.md

1. Khởi tạo cấu trúc

- Tạo các file: admin.html, admin.css, admin.js, bio.html, bio.css, bio.js.
- Thêm shared assets nếu cần (fonts, màu pastel).

2. Trang admin: khung giao diện

- Dựng layout mobile-first (375–640px), tông hồng pastel.
- Khu vực thông tin kênh, danh mục, sản phẩm (theo thứ tự).

3. TikTok login (mock điểm nối)

- Thêm nút “Đăng nhập với TikTok”.
- Tạo hàm giả lập lấy {name, id, avatar} và hiển thị preview; đặt chỗ để sau này gọi API thật.
- Lưu thông tin kênh vào localStorage.

4. Danh mục sản phẩm

- Form thêm danh mục (tên bắt buộc, mô tả tùy chọn).
- Lưu danh mục vào localStorage; render danh sách để chọn.
- Ngăn thêm sản phẩm khi chưa có danh mục; hiện cảnh báo rõ.

5. Sản phẩm affiliate

- Form nhập: ảnh (URL/upload), tiêu đề, mô tả, danh mục (bắt buộc, chọn từ danh mục), link sản phẩm.
- Lưu sản phẩm vào localStorage; render preview theo danh mục.
- Không hiển thị tên platform affiliate trên UI.

6. Lưu/khôi phục dữ liệu

- Hàm load/save localStorage cho channel, categories, products.
- Nút reset/xóa dữ liệu demo để thử nghiệm.

7. Trang bio hiển thị

- Đọc dữ liệu từ localStorage; fallback khi thiếu dữ liệu.
- Block thông tin kênh căn giữa (avatar tròn, tên, ID).
- Danh mục dạng collapse; mỗi danh mục có lưới sản phẩm tối đa 2 cột/hàng.
- Card sản phẩm: ảnh, tiêu đề, mô tả ngắn, nút/link CTA mở link affiliate.

8. Responsive & UI polish

- Mobile-first 375–640px; lưới 2 cột khi đủ rộng.
- Pastel gradient nền, card bo tròn, shadow nhẹ; trạng thái hover/active.
- Fallback ảnh khi thiếu avatar/sản phẩm.

9. Kiểm thử nhanh

- Thêm danh mục trước sản phẩm: thử chặn và cảnh báo.
- Nhập dữ liệu, reload: dữ liệu còn (localStorage).
- Collapse hoạt động; lưới hiển thị tối đa 2 sản phẩm/hàng.
- Liên kết CTA mở đúng URL.
