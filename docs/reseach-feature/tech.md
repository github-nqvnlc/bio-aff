# Tech Stack cho dự án Bio TikTok

## Tổng quan
Dự án là ứng dụng web nhẹ với 2 trang tách biệt: quản trị (admin) và hiển thị công khai (bio). Không cần backend ban đầu, tập trung vào client-side và sẵn sàng để tích hợp API TikTok.

## Frontend Stack

### HTML & Templating
- **HTML5** (không cần framework templating)
  - Lý do: Dự án nhỏ, 2 trang riêng biệt, không cần dynamic rendering phức tạp
  - Cấu trúc: `admin.html` và `bio.html` riêng biệt

### CSS & Styling
- **CSS3 + CSS Variables**
  - Lý do: Xây dựng thiết kế pastel consistent, dễ bảo trì
  - Hỗ trợ gradients, shadows nhẹ, responsive design
  - Biến màu cho chủ đề hồng pastel: `--pastel-pink`, `--light-bg`, etc.

- **Responsive Framework** (tuỳ chọn)
  - **CSS Grid + Flexbox** (khuyên dùng): Quản lý layout lưới 2 cột sản phẩm, canh giữa thông tin kênh
  - **Bootstrap / Tailwind CSS** (không cần thiết): Dự án đơn giản, custom CSS đủ dùng

### JavaScript
- **Vanilla JavaScript (ES6+)**
  - Lý do: Dự án nhỏ, không cần bundler phức tạp, tải nhanh
  - Tính năng cần thiết:
    - DOM manipulation: thêm/xóa danh mục, sản phẩm
    - localStorage API: lưu/khôi phục dữ liệu
    - Event handling: collapse/expand danh mục, form submission

### Storage & Database
- **Supabase (PostgreSQL + Real-time)**
  - **Miễn phí**: 500MB storage, 1GB bandwidth/month, unlimited API calls
  - **Ưu điểm**:
    - PostgreSQL (database quen thuộc)
    - Real-time subscriptions
    - Auto-generated REST API
    - Hỗ trợ Storage bucket cho ảnh sản phẩm
    - Open source, portable (có thể self-host)
    - Rẻ nhất khi scale lên
  - **Setup**:
    ```bash
    npm install @supabase/supabase-js
    ```
  - **Cấu trúc dữ liệu:**
    ```javascript
    {
      channel: { name: '', id: '', avatar: '' },
      categories: [{ id: '', name: '', description: '' }],
      products: [{ id: '', title: '', description: '', image: '', categoryId: '', link: '' }]
    }
    ```

---

---

## 🎯 Storage: SUPABASE ⭐

**Tại sao chọn Supabase:**
1. ⚡ **Tốc độ**: REST API nhanh, pagination built-in, CDN toàn cầu
2. 📦 **Dung lượng**: 500MB data + Storage bucket unlimited cho ảnh
3. 🖼️ **Ảnh dễ**: Upload ảnh chỉ 1 dòng code, free tier tốt hơn các option khác
4. 🔧 **Tích hợp**: JS SDK nhẹ, docs rõ ràng, Postgres quen thuộc
5. 💰 **Rẻ nhất**: Long-term cost thấp nhất khi scale up
6. 🔓 **Open source**: Có thể self-host nếu cần

### Setup Supabase trong 5 phút:

**1. Tạo project:**
```bash
# Đăng ký miễn phí https://supabase.com
# Tạo new project (chọn region gần bạn)
```

**2. Tạo tables trong Supabase:**
```sql
-- Table: categories
CREATE TABLE categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: products
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  category_id BIGINT REFERENCES categories(id),
  link TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: channels
CREATE TABLE channels (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tiktok_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**3. Cấu hình Storage bucket:**
- Vào Supabase dashboard → Storage
- Tạo bucket `product-images` (public)
- Set RLS policy: allow public read, authenticated write

**4. Code integration:**
```javascript
// src/shared/storage.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'YOUR_URL';
const SUPABASE_KEY = 'YOUR_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch products
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)');
  return data || [];
}

// Upload image
export async function uploadImage(file) {
  const filename = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filename, file);
  
  if (error) throw error;
  
  // Return public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path);
  
  return publicUrl;
}

// Add product
export async function addProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product]);
  return data?.[0];
}

// Delete product
export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  return error === null;
}

// Update product
export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id);
  return data?.[0];
}
```

**5. Sử dụng trong admin.js:**
```javascript
import { uploadImage, addProduct, getProducts, deleteProduct } from './storage.js';

// Form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Upload ảnh
  const imageUrl = await uploadImage(fileInput.files[0]);
  
  // Insert product
  await addProduct({
    title: titleInput.value,
    description: descInput.value,
    image: imageUrl,
    category_id: categorySelect.value,
    link: linkInput.value
  });
  
  // Refresh list
  const products = await getProducts();
  renderProducts(products);
  
  // Clear form
  form.reset();
});

// Delete product
deleteButton.addEventListener('click', async (e) => {
  const productId = e.target.dataset.id;
  await deleteProduct(productId);
  const products = await getProducts();
  renderProducts(products);
});
```

**6. Sử dụng trong bio.js (hiển thị):**
```javascript
import { getProducts } from './storage.js';

// Load products on page load
async function loadBio() {
  const products = await getProducts();
  
  // Group by category
  const grouped = products.reduce((acc, product) => {
    const cat = product.category_id;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});
  
  // Render categories
  Object.entries(grouped).forEach(([catId, products]) => {
    const section = createCategorySection(products);
    bioContainer.appendChild(section);
  });
}

loadBio();
```

---

## Migration từ localStorage sang Supabase

Nếu bắt đầu với localStorage, việc migrate sang Supabase cũng dễ:
1. Cấu trúc data JSON giống nhau
2. Tạo script import: localStorage → Supabase
3. Thay đổi `storage.js` từ localStorage → Supabase API calls
4. UI không cần thay đổi (abstraction layer)

## API & Tích hợp

### TikTok OAuth
- **TikTok Official OAuth 2.0 API**
  - Endpoint: https://auth.tiktok.com/authorize
  - Scope: user.info.basic (lấy display name, unique id, avatar)
  - Callback: Redirect về trang admin (`admin.html?code=...`)
  - Implementation: Tạo file `tiktok-auth.js` để handle flow

### Mock/Placeholder (ban đầu)
- Tạo `mock-auth.js` để test login TikTok trước khi tích hợp API thật

## Build & Development

### Development Server
- **Live Server / Python SimpleHTTPServer**
  - Lý do: Dự án tĩnh, không cần build process phức tạp
  - Command: `python3 -m http.server 8000`

### Optional: Build Tools (future)
- **Vite / Webpack** (nếu mở rộng)
  - Khi cần: Minify, bundling, asset optimization
  - Hiện tại: Không cần thiết

## Thư viện hỗ trợ

### Hình ảnh & Media
- **Image Fallback**: Sử dụng native HTML `<img>` với `onerror` handler hoặc CSS background
- Thư viện tuỳ chọn: **Lightbox.js** (xem ảnh sản phẩm lớn hơn)

### Utilities (tuỳ chọn)
- **date-fns** hoặc **moment.js**: Nếu cần timestamps
- **uuid**: Generate ID cho danh mục/sản phẩm (npm install uuid)

### Testing
- **Jest** hoặc **Vitest**: Unit test localStorage functions, data validation
- **Cypress / Playwright**: E2E test flow nhập/hiển thị

## Cấu trúc Folder Đề xuất

```
bio-tiktok/
├── docs/
│   ├── req.md
│   └── tech.md
├── src/
│   ├── admin/
│   │   ├── admin.html
│   │   ├── admin.css
│   │   └── admin.js
│   ├── bio/
│   │   ├── bio.html
│   │   ├── bio.css
│   │   └── bio.js
│   ├── shared/
│   │   ├── storage.js (localStorage helpers)
│   │   ├── tiktok-auth.js (OAuth flow)
│   │   └── constants.js (màu, endpoints)
│   └── assets/
│       └── images/ (fallback avatars)
├── index.html (entry point, redirect hoặc menu)
└── package.json (optional, nếu dùng npm)
```

## Performance & Optimization

### Tối ưu Mobile (375–640px)
- **Viewport meta tag**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Mobile-first CSS**: Đặt responsive breakpoints: `@media (min-width: 640px)`
- **Touch-friendly**: Button/clickable area ≥ 44x44px
- **Lazy Loading**: Sử dụng `loading="lazy"` cho ảnh sản phẩm

### Tốc độ
- Không cần compression ban đầu (dự án nhỏ)
- Future: Minify HTML/CSS/JS khi deploy

## Bảo mật

### Client-side
- **localStorage Limitations**:
  - Không lưu sensitive data (passwords, tokens)
  - TikTok OAuth tokens: Lưu trong sessionStorage / memory (không persistent)
- **CORS**: Nếu gọi TikTok API, cần backend proxy (future)

### Input Validation
- Validate form trước khi lưu (không để empty required fields)
- Sanitize URLs affiliate links

## Deployment

### Hosting Options
- **GitHub Pages**: Static, miễn phí, hỗ trợ custom domain
- **Vercel / Netlify**: Tự động deploy từ Git
- **Firebase Hosting**: Nếu muốn backend Firebase (future)

### CI/CD (future)
- GitHub Actions: Auto-test, build, deploy

## Summary

| Layer | Tech | Lý do |
|-------|------|-------|
| **Markup** | HTML5 | Đơn giản, chuẩn web |
| **Styling** | CSS3 + Variables | Pastel design, responsive |
| **Logic** | Vanilla JS (ES6+) | Nhẹ, không dependencies |
| **Storage** | Supabase (PostgreSQL) | Tốc độ cao, ảnh dễ, rẻ long-term |
| **Auth** | TikTok OAuth 2.0 | Yêu cầu official |
| **Development** | Live Server | Tập tin tĩnh, nhanh |
| **Testing** | Jest + Cypress | Optional, sau MVP |
| **Deploy** | GitHub Pages / Vercel | Miễn phí, dễ |

---

## Quyết định thiết kế

1. **Không cần framework (React/Vue)**: Dự án nhỏ, 2 trang, không có state phức tạp
2. **Vanilla JS đủ**: DOM manipulation đơn giản, localStorage khá đủ
3. **localStorage trước backend**: Sẵn sàng tích hợp API server sau
4. **CSS tùy chỉnh**: Kiểm soát pastel design hoàn toàn
5. **Static hosting**: Giảm chi phí, tăng tốc độ

