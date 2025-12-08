# Phân Tích Yêu Cầu - Dự Án Bio Affiliate

**Tạo:** 8 tháng 12, 2025
**Dự án:** TikTok Bio Affiliate với Tùy Chỉnh Chủ Đề & Bố Cục
**Tổng Tính Năng:** 82 yêu cầu

---

## Tóm Tắt Hành Động

### Tổng Quan Dự Án
- **2 Trang Chính**: Bảng Điều Khiển Admin (Trình Chỉnh Sửa) + Trang Bio Công Khai (Người Xem)
- **3 Trụ Cột Cốt Lõi**:
  1. Cửa Hàng Liên Kết Bio TikTok (Cơ Bản)
  2. Tùy Chỉnh Chủ Đề Hoàn Chỉnh (Phân Biệt)
  3. Trình Tạo Bố Cục Kéo-Thả (Phân Biệt)

### Phân Bố Tính Năng
- **Tính Năng Admin**: 48 mục (58%)
- **Tính Năng Công Khai**: 34 mục (42%)

### Phân Tách Cách Triển Khai
- **Frontend**: 65 mục (79%)
- **Backend**: 12 mục (15%)
- **Cơ Sở Dữ Liệu**: 5 mục (6%)

### Phân Bố Ưu Tiên (MVP)
- **P0 (Phải Có)**: 35 mục (43%)
- **P1 (Nên Có)**: 28 mục (34%)
- **P2 (Tốt Nếu Có)**: 19 mục (23%)

---

## Danh Sách Tính Năng Hoàn Chỉnh

### Chú Giải
| Cột | Mô Tả |
|--------|-------------|
| **ID** | Định danh duy nhất (ID_<số>) |
| **Tính Năng** | Tên tính năng/Yêu cầu |
| **Vai Trò** | Admin / Công Khai |
| **Lớp** | FE (Frontend), BE (Backend), DB (Cơ Sở Dữ Liệu) |
| **Loại** | Loại tính năng (CRUD, UI, Auth, v.v.) |
| **Ưu Tiên** | P0 (MVP), P1 (Giai Đoạn 1), P2 (Giai Đoạn 2+) |
| **Phần** | Phần yêu cầu nào |

---

## Bảng Tính Năng

| ID | Tính Năng | Vai Trò | Lớp | Loại | Ưu Tiên | Phần | Mô Tả |
|---|---------|------|-------|------|----------|---------|-------------|
| ID_001 | Đăng Nhập TikTok | Admin | FE+BE | Auth | P0 | 2.1 | Nút & luồng OAuth TikTok giả lập |
| ID_002 | Tải Thông Tin Kênh | Admin | BE | API | P0 | 2.1 | Lấy tên, ID, avatar từ TikTok |
| ID_003 | Hiển Thị Xem Trước Kênh | Admin | FE | UI | P0 | 2.1 | Hiển thị thông tin kênh đã tải |
| ID_004 | Ngắt Kết Nối Tài Khoản | Admin | FE | Auth | P1 | 2.1 | Nút đăng xuất TikTok |
| ID_005 | Chỉnh Sửa Bio Kênh | Admin | FE+BE | CRUD | P1 | 2.1 | Cập nhật mô tả bio kênh |
| ID_006 | Lưu Kênh Vào DB | Admin | BE+DB | CRUD | P0 | 2.1 | Lưu trữ thông tin kênh trong Supabase |
| ID_007 | Biểu Mẫu Thêm Danh Mục | Admin | FE | UI | P0 | 2.2 | Biểu mẫu với tên (bắt buộc), mô tả (tuỳ chọn) |
| ID_008 | Xác Thực Danh Mục | Admin | FE+BE | Validation | P0 | 2.2 | Đảm bảo tên bắt buộc, không có danh mục trống |
| ID_009 | Lưu Danh Mục Vào DB | Admin | BE+DB | CRUD | P0 | 2.2 | Chèn danh mục vào Supabase |
| ID_010 | Hiển Thị Danh Sách Danh Mục | Admin | FE | UI | P0 | 2.2 | Hiển thị tất cả danh mục trong bảng/danh sách |
| ID_011 | Chỉnh Sửa Danh Mục | Admin | FE+BE | CRUD | P0 | 2.2 | Cập nhật tên danh mục, mô tả |
| ID_012 | Xóa Danh Mục | Admin | FE+BE | CRUD | P0 | 2.2 | Loại bỏ danh mục với modal xác nhận |
| ID_013 | Sắp Xếp Danh Mục Kéo-Thả | Admin | FE | UI | P1 | 2.2 | Sắp xếp lại danh mục qua kéo-thả |
| ID_014 | Chuyển Đổi Hiện/Ẩn Danh Mục | Admin | FE+BE | CRUD | P1 | 2.2 | Chuyển đổi hiển thị danh mục trên trang bio |
| ID_015 | Tìm Kiếm/Lọc Danh Mục | Admin | FE | UI | P1 | 2.2 | Tìm kiếm danh mục theo tên |
| ID_016 | Hiển Thị Số Lượng Danh Mục | Admin | FE | UI | P1 | 2.2 | Hiển thị số lượng sản phẩm trong mỗi danh mục |
| ID_017 | Biểu Mẫu Thêm Sản Phẩm | Admin | FE | UI | P0 | 2.3 | Các trường: hình ảnh, tiêu đề, mô tả, danh mục, liên kết, trạng thái, thẻ |
| ID_018 | Tải Lên Hình Ảnh Sản Phẩm | Admin | FE+BE | Upload | P0 | 2.3 | Hỗ trợ tải lên tệp hoặc nhập URL |
| ID_019 | Xem Trước Hình Ảnh | Admin | FE | UI | P0 | 2.3 | Hiển thị xem trước hình ảnh trước khi gửi |
| ID_020 | Thả Xuống Danh Mục (Bắt Buộc) | Admin | FE | UI | P0 | 2.3 | Thả xuống để chọn danh mục (trường bắt buộc) |
| ID_021 | Cảnh Báo Vô Hiệu Hóa Thêm Sản Phẩm | Admin | FE | UI | P0 | 2.3 | Cảnh báo/vô hiệu hóa biểu mẫu nếu không có danh mục |
| ID_022 | Xác Thực Biểu Mẫu Sản Phẩm | Admin | FE+BE | Validation | P0 | 2.3 | Xác thực tiêu đề (bắt buộc), liên kết (định dạng URL) |
| ID_023 | Lưu Sản Phẩm Vào DB | Admin | BE+DB | CRUD | P0 | 2.3 | Chèn sản phẩm vào Supabase |
| ID_024 | Hiển Thị Danh Sách Sản Phẩm | Admin | FE | UI | P0 | 2.3 | Hiển thị tất cả sản phẩm với bộ lọc/tìm kiếm |
| ID_025 | Chỉnh Sửa Sản Phẩm | Admin | FE+BE | CRUD | P0 | 2.3 | Cập nhật các trường sản phẩm |
| ID_026 | Xóa Sản Phẩm | Admin | FE+BE | CRUD | P0 | 2.3 | Loại bỏ sản phẩm với xác nhận |
| ID_027 | Sắp Xếp Sản Phẩm Kéo-Thả | Admin | FE | UI | P1 | 2.3 | Sắp xếp lại sản phẩm trong danh mục |
| ID_028 | Nhân Bản Sản Phẩm | Admin | FE+BE | CRUD | P1 | 2.3 | Nhân bản sản phẩm để tạo biến thể |
| ID_029 | Chuyển Đổi Trạng Thái Sản Phẩm | Admin | FE+BE | CRUD | P1 | 2.3 | Chuyển đổi Hoạt Động/Không Hoạt Động |
| ID_030 | Thẻ Sản Phẩm | Admin | FE+BE | CRUD | P2 | 2.3 | Thêm thẻ/ghi chú nội bộ cho sản phẩm |
| ID_031 | Tìm Kiếm Sản Phẩm | Admin | FE | UI | P1 | 2.3 | Tìm kiếm theo tiêu đề hoặc mô tả |
| ID_032 | Lọc Theo Danh Mục | Admin | FE | UI | P1 | 2.3 | Lọc sản phẩm theo danh mục được chọn |
| ID_033 | Lọc Theo Trạng Thái | Admin | FE | UI | P1 | 2.3 | Hiển thị tất cả / chỉ sản phẩm hoạt động |
| ID_034 | Lựa Chọn Chủ Đề Cài Đặt Sẵn | Admin | FE | UI | P0 | 2.4 | Hiển thị 10+ chủ đề cài đặt sẵn pastel |
| ID_035 | Xem Trước Chủ Đề Trực Tiếp | Admin | FE | UI | P0 | 2.4 | Hiển thị xem trước chủ đề trên trang bio trực tiếp |
| ID_036 | Bộ Chọn Màu Tùy Chỉnh | Admin | FE | UI | P0 | 2.4 | Bộ chọn 5 màu (Chính, Phụ, BG, Văn Bản, Nhấn) |
| ID_037 | Xác Thực Tương Phản Màu | Admin | FE | Validation | P0 | 2.4 | Kiểm tra tương phản WCAG (≥4.5:1) |
| ID_038 | Lưu Chủ Đề Tùy Chỉnh | Admin | BE+DB | CRUD | P0 | 2.4 | Lưu chủ đề tùy chỉnh vào Supabase |
| ID_039 | Quản Lý Thư Viện Chủ Đề | Admin | FE+BE | CRUD | P1 | 2.4 | Xem, xóa, đặt hoạt động, nhân bản chủ đề |
| ID_040 | Xuất Chủ Đề JSON | Admin | FE | Export | P1 | 2.4 | Tải xuống chủ đề dưới dạng tệp JSON |
| ID_041 | Nhập Chủ Đề JSON | Admin | FE+BE | Import | P1 | 2.4 | Tải chủ đề từ tệp JSON |
| ID_042 | Vải Trình Tạo Bố Cục | Admin | FE | UI | P0 | 2.4 | Bố cục 3 cột (thư viện, vải, cài đặt) |
| ID_043 | Kéo-Thả Khối Vào Vải | Admin | FE | UI | P0 | 2.4 | Thêm khối từ thư viện vào vải |
| ID_044 | Sắp Xếp Lại Khối Trên Vải | Admin | FE | UI | P0 | 2.4 | Kéo khối để thay đổi thứ tự |
| ID_045 | Chỉnh Sửa Cài Đặt Khối | Admin | FE | UI | P0 | 2.4 | Nhấp vào khối để tùy chỉnh cài đặt |
| ID_046 | Xóa Khối | Admin | FE | UI | P0 | 2.4 | Loại bỏ khối khỏi vải |
| ID_047 | Nhân Bản Khối | Admin | FE | UI | P0 | 2.4 | Nhân bản khối trên vải |
| ID_048 | Xem Trước Đáp Ứng (Di Động) | Admin | FE | UI | P0 | 2.4 | Xem trước bố cục ở 375px, 768px, 1024px |
| ID_049 | Cài Đặt Sẵn Bố Cục | Admin | FE | UI | P0 | 2.4 | 5-7 mẫu bố cục được xây dựng trước |
| ID_050 | Lưu Bản Nháp Bố Cục | Admin | BE+DB | CRUD | P0 | 2.4 | Lưu cấu hình bố cục mà không xuất bản |
| ID_051 | Xuất Bản Bố Cục | Admin | BE+DB | CRUD | P0 | 2.4 | Làm cho bố cục trực tiếp trên trang công khai |
| ID_052 | Tự Động Lưu Bố Cục | Admin | FE | UI | P0 | 2.4 | Tự động lưu mỗi 30 giây |
| ID_053 | Chỉ Báo Thay Đổi Chưa Lưu | Admin | FE | UI | P0 | 2.4 | Hiển thị chỉ báo khi chưa lưu |
| ID_054 | Khối: Thông Tin Kênh | Admin | FE | Component | P0 | 2.4 | Avatar kênh, tên, người theo dõi, bio |
| ID_055 | Khối: Lưới Sản Phẩm | Admin | FE | Component | P0 | 2.4 | Bố cục lưới (1/2/3 cột, có thể tùy chỉnh) |
| ID_056 | Khối: Danh Sách Sản Phẩm | Admin | FE | Component | P1 | 2.4 | Bố cục danh sách/xoay vòng |
| ID_057 | Khối: Danh Mục Thu Gọn | Admin | FE | Component | P0 | 2.4 | Danh mục có thể mở rộng |
| ID_058 | Khối: Thẻ Danh Mục | Admin | FE | Component | P0 | 2.4 | Điều hướng thẻ giữa các danh mục |
| ID_059 | Khối: Xoay Vòng | Admin | FE | Component | P0 | 2.4 | Trượt sản phẩm |
| ID_060 | Khối: Biểu Ngữ Hero | Admin | FE | Component | P1 | 2.4 | Phần tiêu đề tùy chỉnh |
| ID_061 | Khối: Khoảng Trắng Tùy Chỉnh | Admin | FE | Component | P1 | 2.4 | Khoảng cách giữa các khối |
| ID_062 | Khối: Chân Trang | Admin | FE | Component | P1 | 2.4 | Liên kết xã hội, thông tin liên hệ |
| ID_063 | Lựa Chọn Phông Chữ | Admin | FE | UI | P1 | 2.4 | Chọn phông chữ cho tiêu đề, nội dung, CTA (Google Fonts) |
| ID_064 | Chia Tỷ Lệ Kích Thước Phông Chữ | Admin | FE | UI | P1 | 2.4 | Chia tỷ lệ kích thước phông chữ (-20% đến +40%) |
| ID_065 | Tải Lên Logo | Admin | FE+BE | Upload | P1 | 2.4 | Tải lên logo tùy chỉnh |
| ID_066 | Tải Lên Favicon | Admin | FE+BE | Upload | P1 | 2.4 | Tải lên favicon tùy chỉnh |
| ID_067 | Liên Kết Xã Hội | Admin | FE+BE | CRUD | P1 | 2.4 | Thêm liên kết TikTok, Instagram, YouTube, Facebook |
| ID_068 | Kiểu Đường Viền Nâng Cao | Admin | FE | UI | P2 | 2.4 | Tùy chọn bán kính, độ rộng, màu đường viền |
| ID_069 | Kiểu Bóng Nâng Cao | Admin | FE | UI | P2 | 2.4 | Cường độ bóng, màu |
| ID_070 | Khoảng Đệm/Khoảng Cách Toàn Cục | Admin | FE | UI | P2 | 2.4 | Tùy chọn Nhỏ gọn, bình thường, rộng rãi |
| ID_071 | Tùy Chọn Hoạt Ảnh | Admin | FE | UI | P2 | 2.4 | Hiệu ứng Mờ, Trượt, Hover |
| ID_072 | Thời Lượng Hoạt Ảnh | Admin | FE | UI | P2 | 2.4 | Tốc độ Nhanh, bình thường, chậm |
| ID_073 | Nút Xem Trước Bio | Admin | FE | UI | P0 | 2.4 | Nút để mở xem trước bio trực tiếp |
| ID_074 | Nút Đặt Lại Tất Cả Dữ Liệu | Admin | FE+BE | Danger | P1 | 2.4 | Xóa tất cả dữ liệu kênh, danh mục, sản phẩm |
| ID_075 | Hiển Thị Thông Tin Kênh | Công Khai | FE | UI | P0 | 3.1 | Hiển thị avatar, tên, ID, người theo dõi |
| ID_076 | Kết Xuất Khối Động | Công Khai | FE | UI | P0 | 3.1 | Kết xuất khối dựa trên cấu hình bố cục |
| ID_077 | Áp Dụng Màu Chủ Đề | Công Khai | FE | UI | P0 | 3.1 | Áp dụng các biến CSS từ chủ đề |
| ID_078 | Khối: Thông Tin Kênh (Công Khai) | Công Khai | FE | Component | P0 | 3.1 | Hiển thị kênh trong bố cục tùy chỉnh |
| ID_079 | Khối: Lưới Sản Phẩm (Công Khai) | Công Khai | FE | Component | P0 | 3.1 | Hiển thị sản phẩm trong lưới |
| ID_080 | Khối: Danh Mục Thu Gọn (Công Khai) | Công Khai | FE | Component | P0 | 3.1 | Danh mục có thể mở rộng |
| ID_081 | Khối: Thẻ Danh Mục (Công Khai) | Công Khai | FE | Component | P0 | 3.1 | Điều hướng thẻ |
| ID_082 | Khối: Xoay Vòng (Công Khai) | Công Khai | FE | Component | P0 | 3.1 | Trượt sản phẩm |
| ID_083 | Khối: Danh Sách (Công Khai) | Công Khai | FE | Component | P1 | 3.1 | Bố cục danh sách sản phẩm |
| ID_084 | Khối: Biểu Ngữ Hero (Công Khai) | Công Khai | FE | Component | P1 | 3.1 | Phần hero tùy chỉnh |
| ID_085 | Khối: Chân Trang (Công Khai) | Công Khai | FE | Component | P1 | 3.1 | Liên kết xã hội, bản quyền |
| ID_086 | Tải Hình Ảnh Lười Biếng | Công Khai | FE | Performance | P0 | 3.2 | Tải hình ảnh khi cuộn |
| ID_087 | Dự Phòng Hình Ảnh | Công Khai | FE | Error Handling | P0 | 3.2 | Hiển thị trình giữ chỗ cho hình ảnh bị hỏng |
| ID_088 | Lưới Đáp Ứng (Di Động) | Công Khai | FE | Responsive | P0 | 3.2 | 1 cột ở 375px, 2+ cột ở 640px+ |
| ID_089 | Kích Thước Thân Thiện Di Động | Công Khai | FE | Responsive | P0 | 3.2 | Nút ≥48x48px, khoảng cách ≥16px |
| ID_090 | Định Dạng Hình Ảnh WebP | Công Khai | FE | Performance | P1 | 3.2 | Sử dụng WebP với dự phòng PNG |
| ID_091 | Xử Lý Liên Kết Liên Kết | Công Khai | FE | UX | P0 | 3.3 | Mở trong thẻ mới, không có tên nền tảng |
| ID_092 | Thẻ Meta | Công Khai | FE | SEO | P1 | 3.5 | Tiêu đề, mô tả, thẻ OG |
| ID_093 | Dữ Liệu Có Cấu Trúc (JSON-LD) | Công Khai | FE | SEO | P1 | 3.5 | Đánh dấu lược đồ sản phẩm |
| ID_094 | Chia Sẻ Mã QR | Công Khai | FE | UX | P2 | 3.5 | Tạo mã QR cho liên kết bio |
| ID_095 | Nút Chia Sẻ Xã Hội | Công Khai | FE | UX | P2 | 3.5 | Chia sẻ lên mạng xã hội |
| ID_096 | Chế Độ Tối | Công Khai | FE | UI | P2 | 3.3 | Hỗ trợ chủ đề tối tuỳ chọn |
| ID_097 | Tải Dữ Liệu Kênh | Công Khai | FE+BE | API | P0 | 3.2 | Tải từ Supabase |
| ID_098 | Tải Dữ Liệu Sản Phẩm | Công Khai | FE+BE | API | P0 | 3.2 | Tải từ Supabase |
| ID_099 | Tải Cấu Hình Chủ Đề | Công Khai | FE+BE | API | P0 | 3.2 | Tải từ Supabase |
| ID_100 | Tải Cấu Hình Bố Cục | Công Khai | FE+BE | API | P0 | 3.2 | Tải từ Supabase |

---

## Tính Năng Theo Ưu Tiên (MVP Trước)

### P0: Phải Có (MVP - Tuần 1-2) - 35 mục

**Bảng Điều Khiển Admin**
- ID_001: Đăng Nhập TikTok
- ID_002: Tải Thông Tin Kênh
- ID_003: Hiển Thị Xem Trước Kênh
- ID_006: Lưu Kênh Vào DB
- ID_007: Biểu Mẫu Thêm Danh Mục
- ID_008: Xác Thực Danh Mục
- ID_009: Lưu Danh Mục Vào DB
- ID_010: Hiển Thị Danh Sách Danh Mục
- ID_011: Chỉnh Sửa Danh Mục
- ID_012: Xóa Danh Mục
- ID_017: Biểu Mẫu Thêm Sản Phẩm
- ID_018: Tải Lên Hình Ảnh Sản Phẩm
- ID_019: Xem Trước Hình Ảnh
- ID_020: Thả Xuống Danh Mục (Bắt Buộc)
- ID_021: Cảnh Báo Vô Hiệu Hóa Thêm Sản Phẩm
- ID_022: Xác Thực Biểu Mẫu Sản Phẩm
- ID_023: Lưu Sản Phẩm Vào DB
- ID_024: Hiển Thị Danh Sách Sản Phẩm
- ID_025: Chỉnh Sửa Sản Phẩm
- ID_026: Xóa Sản Phẩm

**Chủ Đề & Bố Cục (Phân Biệt Cốt Lõi)**
- ID_034: Lựa Chọn Chủ Đề Cài Đặt Sẵn
- ID_035: Xem Trước Chủ Đề Trực Tiếp
- ID_036: Bộ Chọn Màu Tùy Chỉnh
- ID_037: Xác Thực Tương Phản Màu
- ID_038: Lưu Chủ Đề Tùy Chỉnh
- ID_042: Vải Trình Tạo Bố Cục
- ID_043: Kéo-Thả Khối Vào Vải
- ID_044: Sắp Xếp Lại Khối Trên Vải
- ID_045: Chỉnh Sửa Cài Đặt Khối
- ID_046: Xóa Khối
- ID_047: Nhân Bản Khối
- ID_048: Xem Trước Đáp Ứng (Di Động)
- ID_049: Cài Đặt Sẵn Bố Cục
- ID_050: Lưu Bản Nháp Bố Cục
- ID_051: Xuất Bản Bố Cục
- ID_052: Tự Động Lưu Bố Cục
- ID_053: Chỉ Báo Thay Đổi Chưa Lưu
- ID_054-ID_059: Khối Cốt Lõi (Thông Tin Kênh, Lưới, Thu Gọn, Thẻ, Xoay Vòng)
- ID_073: Nút Xem Trước Bio

**Trang Công Khai**
- ID_075: Hiển Thị Thông Tin Kênh
- ID_076: Kết Xuất Khối Động
- ID_077: Áp Dụng Màu Chủ Đề
- ID_078-ID_085: Thành Phần Khối (Công Khai)
- ID_086: Tải Hình Ảnh Lười Biếng
- ID_087: Dự Phòng Hình Ảnh
- ID_088: Lưới Đáp Ứng (Di Động)
- ID_089: Kích Thước Thân Thiện Di Động
- ID_091: Xử Lý Liên Kết Liên Kết
- ID_097-ID_100: Tải Dữ Liệu từ Supabase

---

### P1: Nên Có (Giai Đoạn 1 - Phát Triển Thêm) - 28 mục

**Tính Năng Admin**
- ID_004: Ngắt Kết Nối Tài Khoản
- ID_005: Chỉnh Sửa Bio Kênh
- ID_013: Sắp Xếp Danh Mục Kéo-Thả
- ID_014: Chuyển Đổi Hiện/Ẩn Danh Mục
- ID_015: Tìm Kiếm/Lọc Danh Mục
- ID_016: Hiển Thị Số Lượng Danh Mục
- ID_027: Sắp Xếp Sản Phẩm Kéo-Thả
- ID_028: Nhân Bản Sản Phẩm
- ID_029: Chuyển Đổi Trạng Thái Sản Phẩm
- ID_031: Tìm Kiếm Sản Phẩm
- ID_032: Lọc Theo Danh Mục
- ID_033: Lọc Theo Trạng Thái
- ID_039: Quản Lý Thư Viện Chủ Đề
- ID_040: Xuất Chủ Đề JSON
- ID_041: Nhập Chủ Đề JSON
- ID_063: Lựa Chọn Phông Chữ
- ID_064: Chia Tỷ Lệ Kích Thước Phông Chữ
- ID_065: Tải Lên Logo
- ID_066: Tải Lên Favicon
- ID_067: Liên Kết Xã Hội
- ID_074: Nút Đặt Lại Tất Cả Dữ Liệu

**Tính Năng Công Khai**
- ID_083: Khối: Danh Sách (Công Khai)
- ID_084: Khối: Biểu Ngữ Hero (Công Khai)
- ID_085: Khối: Chân Trang (Công Khai)
- ID_090: Định Dạng Hình Ảnh WebP
- ID_092: Thẻ Meta
- ID_093: Dữ Liệu Có Cấu Trúc (JSON-LD)

---

### P2: Tốt Nếu Có (Giai Đoạn 2+) - 19 mục

**Tính Năng Admin**
- ID_030: Thẻ Sản Phẩm
- ID_060: Khối: Biểu Ngữ Hero
- ID_061: Khối: Khoảng Trắng Tùy Chỉnh
- ID_062: Khối: Chân Trang
- ID_068: Kiểu Đường Viền Nâng Cao
- ID_069: Kiểu Bóng Nâng Cao
- ID_070: Khoảng Đệm/Khoảng Cách Toàn Cục
- ID_071: Tùy Chọn Hoạt Ảnh
- ID_072: Thời Lượng Hoạt Ảnh

**Tính Năng Công Khai**
- ID_056: Khối: Danh Sách Sản Phẩm
- ID_094: Chia Sẻ Mã QR
- ID_095: Nút Chia Sẻ Xã Hội
- ID_096: Chế Độ Tối

---

## Tính Năng Theo Vai Trò

### Tính Năng Bảng Điều Khiển Admin (48 mục)
Tất cả ID_001 đến ID_074

Lĩnh vực trọng tâm:
- **Quản Lý Dữ Liệu**: 33 mục (Hoạt động CRUD)
- **Tùy Chỉnh Chủ Đề**: 24 mục (Màu, Phông Chữ, Kiểu Dáng)
- **Trình Tạo Bố Cục**: 22 mục (Khối, Vải, Xem Trước)
- **UI/UX**: 15 mục (Biểu Mẫu, Xác Thực, Phản Hồi)

### Tính Năng Trang Công Khai (34 mục)
Tất cả ID_075 đến ID_100

Lĩnh vực trọng tâm:
- **Thành Phần Khối**: 10 mục (Kênh, Lưới, Danh Sách, Thu Gọn, Thẻ, Xoay Vòng, Hero, Chân Trang)
- **Thiết Kế Đáp Ứng**: 4 mục (Bố cục di động, thân thiện di động, WebP, tải lười biếng)
- **Hiệu Năng**: 2 mục (Tải lười biếng, tối ưu hóa hình ảnh)
- **SEO & Chia Sẻ**: 6 mục (Thẻ Meta, dữ liệu có cấu trúc, mã QR, chia sẻ xã hội)
- **Tải Dữ Liệu**: 4 mục (Tải từ Supabase)
- **Xử Lý Lỗi**: 2 mục (Dự Phòng, thông báo lỗi)

---

## Tính Năng Theo Lớp Triển Khai

### Frontend (65 mục - 79%)

**Thành Phần UI & Trang**
- ID_001, ID_003, ID_007, ID_010, ID_017, ID_024, ID_034, ID_042

**Biểu Mẫu & Xác Thực (Phía Máy Khách)**
- ID_008, ID_019, ID_022, ID_037, ID_043, ID_045

**Bố Cục & Đáp Ứng**
- ID_013, ID_027, ID_044, ID_048, ID_088, ID_089

**Tương Tác & Trạng Thái**
- ID_035, ID_052, ID_053, ID_073, ID_076, ID_086

**Kiểu Dáng & Chủ Đề**
- ID_036, ID_040, ID_041, ID_063, ID_064, ID_077

**Hiệu Năng & SEO**
- ID_087, ID_090, ID_092, ID_093

**Thành Phần (Hệ Thống Khối)**
- ID_054-ID_062, ID_078-ID_085

### Backend (12 mục - 15%)

**Xác Thực & OAuth**
- ID_001, ID_002, ID_004

**Hoạt động API & Dữ Liệu**
- ID_006, ID_009, ID_011, ID_012, ID_023, ID_025, ID_026

**Hoạt Động Tệp**
- ID_018, ID_065, ID_066

**Tải Dữ Liệu (Trang Công Khai)**
- ID_097, ID_098, ID_099, ID_100

### Cơ Sở Dữ Liệu (5 mục - 6%)

**Lược Đồ & Bảng**
- ID_006, ID_009, ID_023, ID_038, ID_050, ID_051

**Bảng Chính**
- channels
- categories
- products
- color_themes
- bio_layouts

---

## Trình Tự Triển Khai (Được Đề Xuất)

### Giai Đoạn 1: Nền Tảng (Ngày 1-3)
1. **Thiết Lập & Xác Thực**
   - ID_001, ID_002, ID_006: Đăng nhập TikTok & lưu trữ kênh
   
2. **CRUD Cốt Lõi**
   - ID_007-012: Quản lý danh mục
   - ID_017-026: Quản lý sản phẩm

3. **Chủ Đề Cơ Bản**
   - ID_034-038: Chủ đề cài đặt sẵn & màu tùy chỉnh

### Giai Đoạn 2: Trình Tạo (Ngày 4-8)
4. **Nền Tảng Trình Tạo Bố Cục**
   - ID_042-053: Vải, kéo-thả, lưu/xuất bản
   - ID_054-059: Khối cốt lõi (5 loại)

5. **Kết Xuất Trang Công Khai**
   - ID_076-100: Kết xuất khối, áp dụng chủ đề, đáp ứng

### Giai Đoạn 3: Phát Triển Thêm & Tính Năng (Ngày 9-14)
6. **Phát Triển Thêm Admin**
   - ID_004, ID_005, ID_013-016: Quản lý danh mục/sản phẩm nâng cao
   - ID_063-067: Phông chữ, thương hiệu, kiểu dáng nâng cao

7. **Nâng Cao Trang Công Khai**
   - ID_087-095: Tối ưu hóa hình ảnh, SEO, chia sẻ

---

## Phân Tích Rủi Ro & Độ Phức Tạp

### Độ Phức Tạp Cao (Cần Chú Ý)
- **ID_042-053**: Trình Tạo Bố Cục (kéo-thả, xem trước thời gian thực)
- **ID_043-048**: Kết Xuất Khối & Xem Trước Đáp Ứng
- **ID_076**: Logic Kết Xuất Khối Động
- **ID_086**: Triển Khai Tải Lười Biếng

### Rủi Ro Cao (Nhiều Phụ Thuộc)
- **ID_001, ID_002**: TikTok OAuth (API Bên Ngoài)
- **ID_042-053**: Trình tạo bố cục (UX cốt lõi)
- **ID_076**: Kết Xuất Khối Ảnh Hưởng Đến Tất Cả Trang Công Khai

### Sự Phụ Thuộc
- Hệ thống chủ đề (ID_034-041) → Trình tạo bố cục (ID_042-053)
- Trình tạo bố cục → Kết Xuất Trang Công Khai (ID_076-100)
- Quản lý sản phẩm → Hiển Thị Trang Công Khai
- Quản lý danh mục → Kết Xuất Khối

---

## Yêu Cầu Lược Đồ Cơ Sở Dữ Liệu

### Bảng Cần Thiết
1. **channels** - Thông tin người dùng TikTok
2. **categories** - Danh mục sản phẩm
3. **products** - Sản phẩm liên kết
4. **color_themes** - Cấu hình chủ đề
5. **bio_layouts** - Cấu hình khối bố cục

### Mối Quan Hệ
```
channels (1) ──→ (nhiều) categories
channels (1) ──→ (nhiều) products
channels (1) ──→ (1) bio_layouts
channels (1) ──→ (nhiều) color_themes
categories (1) ──→ (nhiều) products
```

---

## Các Chỉ Số Thành Công Theo Tính Năng

| Nhóm Tính Năng | Chỉ Số Chính | Mục Tiêu |
|---------------|-----------|--------|
| **Admin CRUD** | Tỷ lệ gửi biểu mẫu | 100% |
| **Hệ Thống Chủ Đề** | Tỷ lệ áp dụng chủ đề tùy chỉnh của người dùng | 80%+ |
| **Trình Tạo Bố Cục** | Thời gian phiên | 10+ phút |
| **Trang Công Khai** | Thời gian tải | <2s |
| **Đáp Ứng** | Điểm di động | 90+ Lighthouse |
| **Hiệu Năng** | Hình ảnh được tối ưu hóa | 100% |
| **SEO** | Thẻ meta hoàn chỉnh | 100% |

---

## Ghi Chú

### Giả Định
1. OAuth TikTok có sẵn (Giai Đoạn 1 sử dụng giả lập)
2. Supabase được thiết lập với các bảng thích hợp & RLS
3. Frontend sử dụng Vanilla JS (không có React/Vue)
4. Sortable.js được sử dụng cho kéo-thả

### Nâng Cao Trong Tương Lai (Không có trong MVP)
- Bảng điều khiển phân tích (Giai Đoạn 2)
- OAuth TikTok Thực (Giai Đoạn 2)
- Quản lý đa người dùng (Giai Đoạn 3)
- Thông báo Email (Giai Đoạn 3)
- API Công Khai (Giai Đoạn 3)

---

## Phụ Lục: Danh Sách Kiểm Tra Tính Năng

Sử dụng danh sách kiểm tra này trong quá trình triển khai:

### Bảng Điều Khiển Admin
- [ ] Đăng Nhập TikTok (ID_001-006)
- [ ] Quản Lý Danh Mục (ID_007-016)
- [ ] Quản Lý Sản Phẩm (ID_017-033)
- [ ] Hệ Thống Chủ Đề (ID_034-041)
- [ ] Trình Tạo Bố Cục (ID_042-073)

### Trang Công Khai
- [ ] Kết Xuất Khối (ID_076-085)
- [ ] Thiết Kế Đáp Ứng (ID_086-089)
- [ ] Hiệu Năng (ID_090-091)
- [ ] SEO (ID_092-093)
- [ ] Tải Dữ Liệu (ID_097-100)

### Thử Nghiệm
- [ ] Tất cả hoạt động CRUD hoạt động
- [ ] Xem trước chủ đề cập nhật trực tiếp
- [ ] Khối kết xuất chính xác trong tất cả bố cục
- [ ] Đáp ứng di động (375px, 640px, 1024px)
- [ ] Hiệu Năng: Lighthouse ≥90
- [ ] Không có liên kết hoặc hình ảnh bị hỏng

---

**Kết Thúc Phân Tích**
