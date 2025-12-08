# Yêu cầu chi tiết cho dự án Bio Affiliate

## 1. Mục tiêu chung

- Xây 2 trang tách biệt:
  - Trang nhập/quản trị: cho phép đăng nhập TikTok, lấy thông tin kênh, nhập danh mục sản phẩm, nhập sản phẩm affiliate.
  - Trang bio hiển thị: công khai, hiển thị thông tin kênh và danh sách sản phẩm theo danh mục, tối ưu cho mobile.
- Ưu tiên trải nghiệm trên màn hình 375–640px.

## 2. Trang nhập/quản trị (Admin Panel)

Trang admin có 4 section chính:

### 2.1 Quản lý Thông tin Kênh (Channel Management)
- **Đăng nhập TikTok**:
  - Nút "Đăng nhập với TikTok"
  - Sau khi login, lấy: tên kênh, ID kênh, avatar URL
  - Hiển thị xem trước thông tin kênh
  - Có nút "Disconnect" để logout
  
- **Channel Info Display**:
  - Avatar, channel name, ID
  - Followers count (nếu có API access)
  - Bio description (from TikTok nếu có)
  - Edit button để chỉnh sửa tên/bio

### 2.2 Quản lý Danh mục (Category Management)
- **Thêm danh mục mới**:
  - Form: Tên danh mục (bắt buộc), Mô tả (tùy chọn)
  - Button "Add Category"
  
- **Danh sách danh mục**:
  - Table/list view với columns: Name, Description, # Products, Actions
  - Actions: Edit, Delete, Hide/Show toggle, Reorder (drag-drop)
  - Search/filter danh mục
  - Delete confirmation modal
  
- **Chỉnh sửa danh mục**:
  - Click Edit → mở form overlay
  - Cập nhật tên, mô tả
  - Save/Cancel

### 2.3 Quản lý Sản phẩm (Product Management)
- **Thêm sản phẩm mới**:
  - Form fields:
    - Image (upload hoặc URL)
    - Title (bắt buộc)
    - Description
    - Category (dropdown, bắt buộc)
    - Affiliate Link
    - Status: Active/Inactive toggle
    - Tags (optional, for internal use)
  - Validation: Cảnh báo nếu chưa có danh mục
  - Button "Add Product"
  
- **Danh sách sản phẩm**:
  - Group by category hoặc flat list view
  - Columns: Image, Title, Category, Status, Actions
  - Search products
  - Filter by category, status
  - Actions: Edit, Delete, Hide/Show, Duplicate, Reorder (drag-drop)
  
- **Chỉnh sửa sản phẩm**:
  - Mở form overlay để edit
  - Change image, title, description, category, link, status
  - Save/Cancel

### 2.4 Tùy chỉnh Giao diện (Theme & Layout Customization) - NEW ⭐
Người dùng có thể hoàn toàn tùy chỉnh bộ màu và layout trang bio.

**Tab 1: Theme Colors**
- Hiển thị preset color themes (10+ options pastel)
- Click theme để preview live trên trang bio
- "Custom Colors" button để chỉnh sửa 5 màu:
  - Primary, Secondary, Background, Text, Accent
  - Color picker UI cho mỗi màu
  - Live preview
  - Save custom theme với tên
  - Delete custom theme

**Tab 2: Layout Builder (Drag-Drop)**
- Canvas area ở giữa (live preview)
- Left sidebar: "Blocks Library" (Channel Info, Product Grid, Category Collapse, Carousel, Tabs, Hero, Spacing, Footer)
- Right sidebar: "Block Settings" (options của block đang chọn)
- Drag block từ library vào canvas
- Click block để edit settings
- Drag trên canvas để reorder
- Delete/Duplicate buttons
- Show responsive preview (375px, 768px, 1200px)
- Save/Publish buttons
- Layout presets dropdown

**Tab 3: Fonts & Branding**
- Choose fonts: Headings, Body, CTA (Google Fonts)
- Font size scaling
- Upload logo/favicon
- Social links (Instagram, YouTube, Facebook)

**Tab 4: Advanced Styling**
- Border radius (sharp, rounded, very rounded, pill)
- Shadow intensity
- Global padding/spacing (compact, normal, spacious)
- Animation options (fade, slide, hover effects)
- Duration (fast, normal, slow)

- **UX Form** (tất cả section):
  - Sắp xếp theo thứ tự: Channel → Categories → Products → Theme & Layout
  - Auto-save form data (localStorage) mỗi 30 giây
  - Show unsaved changes indicator
  - Confirmation khi có unsaved changes
  - Nút "Reset" để xóa toàn bộ dữ liệu
  - Nút "Preview Bio" để xem trang bio live
  - Data stored: Supabase (tables: channels, categories, products, bio_layouts)

## 3. Trang bio hiển thị (Public Page)

Trang bio là nơi hiển thị mọi sản phẩm affiliate của creator. Layout & design được tùy chỉnh hoàn toàn bằng drag-drop builder.

### 3.1 Block Components (Tùy theo layout user chọn)

**Channel Info Block**
- Avatar tròn, tên kênh, ID kênh
- Optional: Followers count, bio description
- Positioning: Mặc định ở header (top), có thể tùy chỉnh
- Styling: Avatar size, alignment, background

**Product Grid Block**
- Hiển thị sản phẩm ở dạng lưới
- Columns: 1, 2 (default responsive), 3
- Card layout: Image-top, image-left, image-background
- Card info: Image, title, description, CTA link
- Touch-friendly sizing & spacing
- Lazy load khi scroll

**Product List Block**
- Danh sách sản phẩm (horizontal carousel hoặc vertical list)
- Thumbnail, title, description, CTA
- Swipe-friendly trên mobile

**Category Collapse Block**
- Mỗi danh mục là 1 khối collapse/expand
- Mở/đóng danh mục mới xem sản phẩm
- Animation smooth
- Trạng thái rõ ràng (arrow icon, open/close indicator)

**Category Tabs Block**
- Danh mục dạng tab bar ở top
- Click tab để switch category
- Show products bên dưới
- Mobile-friendly dengan horizontal scroll

**Carousel Block**
- Sản phẩm ở dạng carousel/slider
- Swipe hoặc click arrows để navigate
- Dots indicator, auto-play option

**Hero Banner Block**
- Banner ở top (background image/color, overlay text)
- Tagline, description, CTA button
- Responsive background

**Footer Block**
- Social media links, contact info, copyright
- Customizable content

### 3.2 Responsive & Mobile Optimization (375–640px priority)
- **Layout**: Danh sách 1 cột cho mobile, tự adjust cho tablet/desktop
- **Grid Products**: 1 cột (375px), 2 cột (640px+)
- **Touch-friendly**: Buttons ≥ 48x48px, spacing ≥ 16px
- **Image optimization**: WebP format with PNG fallback, lazy loading
- **Collapse**: Dễ bấm, animation smooth
- **Performance**: Load <2s trên 3G

### 3.3 Theme & Styling
- **Colors**: User-defined 5-color palette (từ admin)
- **Fonts**: User-selected fonts (Google Fonts)
- **Spacing**: User-defined (compact, normal, spacious)
- **Animations**: Fade, slide, hover effects (customizable)
- **Dark Mode**: Optional (user preference)

### 3.4 Fallback & Error Handling
- **Missing Images**: Show placeholder
- **Broken Links**: Show error state, fallback to bio link
- **No Products**: Show "No products yet" message
- **Offline**: Show cached data

### 3.5 SEO & Social Sharing
- **Meta tags**: Title, description, OG image (preview)
- **Structured data**: JSON-LD product schema
- **Share**: QR code, social share buttons
- **OpenGraph**: Custom preview khi share link

## 4. Core Features Summary (Tính năng chính của dự án)

### 🎯 3 Pillars Chính:

**1️⃣ TikTok Bio Affiliate Shop (Cơ bản)**
- Kết nối TikTok OAuth để quản lý channel
- Thêm/chỉnh sửa danh mục sản phẩm
- Thêm/chỉnh sửa sản phẩm affiliate
- Public page hiển thị sản phẩm
- Link affiliate tracking

**2️⃣ Complete Theme Customization (Chủ yếu)**
- **5-Color Theme System**: 10+ preset pastel themes từ ColorHunt
- **Custom Color Picker**: Chọn 5 màu tùy ý (Primary, Secondary, BG, Text, Accent)
- **Contrast Validation**: Auto-check WCAG compliance
- **Theme Library**: Save, reuse, export/import custom themes

**3️⃣ Drag-Drop Layout Builder (Chủ yếu)**
- **9 Block Types**: Channel Info, Product Grid, Product List, Category Collapse, Category Tabs, Carousel, Hero Banner, Custom Spacing, Footer
- **Visual Builder**: Drag-drop canvas, live preview, responsive preview (375px, 768px, 1200px)
- **Block Settings**: Customize mỗi block (columns, style, content)
- **Layout Presets**: 5-7 pre-built layouts (Classic, Modern, Minimal, Featured, List, etc.)
- **Save/Publish**: Draft & publish workflow
- **Reorder**: Drag blocks để thay đổi vị trí

### 📊 Feature Breakdown:

### 📊 Feature Breakdown:

| Feature | Priority | MVP | Phase 2 | Impact |
|---------|----------|-----|---------|--------|
| **TikTok Login** | ⭐⭐⭐ | ✅ (Mock) | ✅ (Real) | Core |
| **Product CRUD** | ⭐⭐⭐ | ✅ | ✅ | Core |
| **Theme Colors** | ⭐⭐⭐ | ✅ | ✅ | Differentiation |
| **Layout Builder** | ⭐⭐⭐ | ✅ | ✅ | Differentiation |
| **Fonts & Branding** | ⭐⭐ | ✅ | ✅ | UX |
| **Image Upload** | ⭐⭐⭐ | ✅ | ✅ | Core |
| **Import/Export** | ⭐⭐ | ⭐ (JSON) | ✅ (JSON+CSV) | Backup |
| **Analytics** | ⭐⭐ | ❌ | ✅ | Insights |
| **Multi-user** | ⭐ | ❌ | ⭐ | Expansion |

---

---

## 5. Data Storage & Structure

### 5.1 Data Sources
- **Channel info**: From TikTok OAuth login
- **Categories & Products**: User-created data
- **Theme & Layout**: User-customized configurations

### 5.2 Data Storage (Supabase)
Primary storage: **Supabase PostgreSQL**
- Backup storage: Export JSON

### 5.3 Database Tables
```sql
-- Channels
CREATE TABLE channels (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tiktok_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  followers INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Categories
CREATE TABLE categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT REFERENCES channels(id),
  name TEXT NOT NULL,
  description TEXT,
  order INT DEFAULT 0,
  hidden BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Products
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT REFERENCES channels(id),
  category_id BIGINT REFERENCES categories(id),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  link TEXT NOT NULL,
  status BOOLEAN DEFAULT TRUE, -- active/inactive
  tags TEXT[], -- JSON array for tags
  order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Bio Layouts (NEW)
CREATE TABLE bio_layouts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT REFERENCES channels(id) UNIQUE,
  blocks JSONB NOT NULL, -- Array of block configurations
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Color Themes (NEW)
CREATE TABLE color_themes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT REFERENCES channels(id),
  name TEXT NOT NULL,
  colors JSONB NOT NULL, -- { primary, secondary, background, text, accent }
  is_preset BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);
```

### 5.4 Data Structure Examples
```javascript
// Block configuration
{
  id: 'block_123',
  type: 'product_grid',
  order: 1,
  settings: {
    columns: 2,
    cardStyle: 'image-top',
    showDescription: true,
    spacing: 'normal'
  }
}

// Theme colors
{
  id: 'theme_456',
  name: 'Soft Blush',
  colors: {
    primary: '#FDB4E6',
    secondary: '#F4B0D6',
    background: '#FFFBFE',
    text: '#333333',
    accent: '#FFD4E5'
  }
}
```

## 6. Kỹ thuật & triển khai

### 6.1 Cấu trúc dự án
- **Tách file**: HTML, CSS, JS riêng cho từng trang (admin.html, bio.html, etc.)
- **Shared files**: utils, storage, constants, auth, theme helpers
- **Asset**: fonts, icons, placeholders

### 6.2 Technology Stack (Đã định nghĩa trong tech.md)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript ES6+
- **Database**: Supabase (PostgreSQL + Storage)
- **Auth**: TikTok OAuth 2.0 (mock ban đầu)
- **Styling**: CSS Variables for theme system
- **Builder**: Drag-drop UI (built from scratch hoặc library: React-DnD, Sortable.js)

### 6.3 Key Libraries (MVP Phase)
- `@supabase/supabase-js`: Database & storage
- `sortablejs`: Drag-drop cho layout builder
- `vanilla-colorpicker`: Color picker library (hoặc HTML5 native)
- `html2canvas`: Screenshot/preview layout
- Optionally: `Chart.js` (analytics Phase 2)

### 6.4 Theme System Implementation
- **CSS Variables**: Define 5 color variables, apply globally
  ```css
  :root {
    --color-primary: #FDB4E6;
    --color-secondary: #F4B0D6;
    --color-background: #FFFBFE;
    --color-text: #333333;
    --color-accent: #FFD4E5;
  }
  ```
- **Dynamic CSS Injection**: Runtime theme change by updating CSS variables
- **Theme Storage**: Save theme config (JSON) to Supabase, apply on page load

### 6.5 Layout Builder Architecture
- **Block System**: Each block type has:
  - Template (HTML structure)
  - Default settings (JSON)
  - Render function (generate HTML based on settings)
  - Settings form (UI to edit settings)
  
- **Layout State Management**: 
  - Keep blocks array in memory (JS object)
  - Save to Supabase on publish
  - Auto-save draft every 30 seconds

- **Responsive Preview**:
  - Embed iframe với 3 viewports: 375px, 768px, 1200px
  - Real-time preview as user edits

### 6.6 Data Flow
1. **Admin creates content**: 
   - Channel info → save to channels table
   - Categories → save to categories table
   - Products → save to products table

2. **Admin customizes theme & layout**:
   - Choose theme (preset or custom) → save to color_themes table
   - Drag-drop blocks → save layout config to bio_layouts table

3. **Public bio page loads**:
   - Fetch channel, categories, products từ Supabase
   - Fetch theme config từ color_themes
   - Fetch layout config từ bio_layouts
   - Apply theme (CSS variables)
   - Render blocks theo layout config
   - Generate final HTML

### 6.7 Backend Preparation
- **TikTok OAuth Callback**: Endpoint để nhận code từ TikTok, exchange cho token
- **Image Upload**: Endpoint trong Supabase Storage
- **API Routes** (Supabase Edge Functions hoặc external backend):
  - GET /api/channel/:id
  - GET /api/products/:channelId
  - POST /api/products (create)
  - PUT /api/products/:id (update)
  - DELETE /api/products/:id
  - Similar for categories & themes

## 7. UI/UX & Design System

### 7.1 Design Principles
- **Customization First**: Mọi user có thể tùy chỉnh (không default-only)
- **Mobile Priority**: Design cho 375-640px, scale lên desktop
- **Simplicity**: Drag-drop builder là phần phức tạp, nhưng UX phải đơn giản
- **Visual Feedback**: Live preview, instant feedback cho mọi thay đổi
- **Accessibility**: WCAG 2.1 Level AA compliance

### 7.2 Color & Typography
- **Default palette**: Soft pastel (cơ bản)
- **User themes**: 10+ preset pastel từ ColorHunt
- **Custom colors**: 5-color system (Primary, Secondary, BG, Text, Accent)
- **Fonts**: Google Fonts (user choice for Headings, Body, CTA)
- **Typography scale**: 12px, 14px, 16px, 18px, 24px, 32px

### 7.3 Component Library
- **Buttons**: Primary, Secondary, Danger (with hover/active states)
- **Forms**: Input, textarea, select, color picker, file upload
- **Modals**: Confirmation, form overlay, settings panel
- **Cards**: Product card, category card, theme preview
- **Icons**: Arrow, plus, close, menu, drag handle, eye (show/hide)
- **Loading**: Skeleton, spinner, shimmer

### 7.4 Layout Grid
- Mobile (375px): 1 column, 16px margin
- Tablet (640px): 2 columns, 24px margin
- Desktop (1024px+): 3-4 columns, 32px margin
- Global padding: 16px (mobile), 24px (tablet), 32px (desktop)

### 7.5 Spacing & Rhythm
- Space unit: 8px (8, 16, 24, 32, 48px)
- Line height: 1.5 (body), 1.2 (headings)
- Button size: 44x44px min (touch-friendly)

### 7.6 Admin Panel Layout
```
┌─────────────────────────────────────────┐
│ Header: Brand logo, user menu, preview  │
├──────────────┬──────────────────────────┤
│              │                          │
│   Sidebar    │      Main Content        │
│   - Channel  │   (tab view)             │
│   - Category │  ┌──────────────┬─────┐  │
│   - Products │  │ Tab Content  │ RHS │  │
│   - Theme    │  │              │ Set │  │
│   - Layout   │  │              │ting │  │
│              │  │              │ s   │  │
│              │  └──────────────┴─────┘  │
└──────────────┴──────────────────────────┘
```

### 7.7 Builder Canvas Layout
```
┌──────────────────────────────────────────────┐
│ Header: Save, Publish, Preview, Help         │
├────────┬──────────────────────┬──────────────┤
│        │                      │              │
│ Blocks │  Canvas Preview      │ Block        │
│Library │  (live 1:1 ratio)    │ Settings     │
│        │                      │              │
│- Ch.   │  ┌────────────────┐  │ Columns: 2   │
│ Info   │  │ Channel Header │  │ Style: grid  │
│        │  ├────────────────┤  │ Spacing: OK  │
│- Grid  │  │ Products Grid  │  │              │
│        │  │ 2 cols         │  │ [Save]       │
│- List  │  │ ...            │  │ [Delete]     │
│        │  └────────────────┘  │ [Duplicate]  │
│- Tabs  │                      │              │
│        │ [Responsive: 375px]  │              │
│...     │ [375px] [768px] [1k] │              │
└────────┴──────────────────────┴──────────────┘
```

## 8. Kiểm thử & QA

### 8.1 Functional Testing (Tính năng)
- **Admin CRUD**: 
  - ✅ Create category, product
  - ✅ Edit category, product
  - ✅ Delete with confirmation
  - ✅ Upload/preview image
  
- **Theme Customization**:
  - ✅ Apply preset theme
  - ✅ Create custom 5-color theme
  - ✅ Color contrast validation
  - ✅ Save/load/delete custom theme
  
- **Layout Builder**:
  - ✅ Drag block from library to canvas
  - ✅ Reorder blocks on canvas
  - ✅ Edit block settings
  - ✅ Delete, duplicate blocks
  - ✅ Preview in 3 viewports (375, 768, 1024px)
  - ✅ Save & publish layout
  
- **Bio Page**:
  - ✅ Load & render custom layout
  - ✅ Apply custom theme colors
  - ✅ Responsive display
  - ✅ Affiliate links work
  - ✅ Image fallback

### 8.2 Responsive Testing
- **Mobile (375px)**:
  - Single column layout
  - 44x44px touch targets
  - Text readable (16px+)
  - Buttons/inputs accessible
  
- **Tablet (640px)**:
  - 2-column grid
  - Proper spacing
  - Touch-friendly
  
- **Desktop (1024px+)**:
  - 2-3 column grid
  - Optimal line length (50-75 chars)
  - Hover effects

### 8.3 Performance Testing
- **Lighthouse Audit**:
  - ✅ Performance ≥ 90
  - ✅ Accessibility ≥ 90
  - ✅ Best Practices ≥ 90
  - ✅ SEO ≥ 90
  
- **Load Time**:
  - ✅ < 2s on 3G
  - ✅ FCP < 1s
  - ✅ LCP < 2.5s
  - ✅ CLS < 0.1
  
- **Bundle Size**:
  - ✅ JS < 200KB
  - ✅ CSS < 50KB
  - ✅ Images optimized (WebP, lazy load)

### 8.4 Browser Compatibility
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### 8.5 Device Testing
- iPhone 12 (375px)
- iPhone 12 Pro (390px)
- Samsung Galaxy A10 (360px)
- iPad (768px)
- Desktop (1920px)

### 8.6 A11y (Accessibility) Testing
- **WCAG 2.1 Level AA**:
  - ✅ Color contrast ≥ 4.5:1
  - ✅ Keyboard navigation (Tab, Enter, Arrow keys)
  - ✅ Screen reader support (ARIA labels)
  - ✅ Focus indicators visible
  - ✅ Form labels explicit
  
- **Tools**: axe DevTools, WAVE, Lighthouse

### 8.7 Security Testing
- **Input Validation**:
  - ✅ No HTML injection
  - ✅ URL validation (affiliate links)
  - ✅ File upload validation (image only)
  
- **HTTPS**: All requests over HTTPS
- **CORS**: Only allow Supabase domain

### 8.8 E2E Tests (Cypress/Playwright)
```
Scenario 1: Create Bio
1. Login (mock TikTok)
2. Create category
3. Create product (with image)
4. Create layout (drag-drop)
5. Apply theme
6. Publish
7. Visit public page
8. Verify all content displays correctly

Scenario 2: Edit Layout
1. Login
2. Go to layout builder
3. Change theme
4. Reorder blocks
5. Save draft
6. Preview in mobile
7. Publish
8. Verify changes on public page

Scenario 3: Mobile Responsive
1. Open public page on 375px viewport
2. Verify single column
3. Click product
4. Click affiliate link
5. Verify opens in new tab
```

### 8.9 Manual Testing Checklist
- [ ] Form validation (required fields, URL format)
- [ ] Error messages display (no blank errors)
- [ ] Loading states (spinners, skeletons)
- [ ] Image fallback (broken image handling)
- [ ] Drag-drop smoothness
- [ ] Theme live preview updates instantly
- [ ] Offline mode (cached data displays)
- [ ] Undo/redo functionality (if implemented)

---

## 8. Tính năng bổ sung (Advanced Features)

### 8.1 Quản lý danh mục nâng cao
- **Chỉnh sửa danh mục**: Cho phép cập nhật tên và mô tả danh mục đã tạo.
- **Xóa danh mục**: Xóa danh mục có xác nhận (cảnh báo nếu danh mục có sản phẩm).
- **Sắp xếp danh mục**: Drag-and-drop để sắp xếp thứ tự danh mục (tùy chọn hoặc dùng number field).
- **Ẩn/hiển thị danh mục**: Toggle để ẩn danh mục khỏi trang bio mà không xóa.

### 8.2 Quản lý sản phẩm nâng cao
- **Chỉnh sửa sản phẩm**: Cập nhật tiêu đề, mô tả, hình ảnh, link, danh mục.
- **Xóa sản phẩm**: Xóa với xác nhận.
- **Sắp xếp sản phẩm**: Drag-and-drop hoặc button up/down để thay đổi thứ tự trong danh mục.
- **Sao chép sản phẩm**: Tạo bản sao nhanh của sản phẩm (để tạo variant).
- **Trạng thái sản phẩm**: Active/Inactive toggle (hiển thị/ẩn trên bio).
- **Thêm tag/ghi chú**: Thêm tags hoặc ghi chú nội bộ cho sản phẩm (không hiển thị công khai).

### 8.3 Tính năng tìm kiếm & lọc
- **Tìm kiếm sản phẩm**: Input search để tìm theo tiêu đề, mô tả (chỉ trang admin).
- **Lọc theo danh mục**: Dropdown filter để xem sản phẩm của danh mục cụ thể (admin).
- **Lọc theo trạng thái**: Show all / Show active only (admin).

### 8.4 Import/Export dữ liệu
- **Export JSON**: Xuất tất cả dữ liệu (channel, categories, products) thành file JSON để backup.
- **Import JSON**: Import dữ liệu từ file JSON (với xác nhận overwrite).
- **Export CSV**: Xuất products thành CSV để dùng với Excel (tùy chọn).

### 8.5 Hỗ trợ hình ảnh
- **Preview ảnh trước upload**: Hiển thị preview ảnh khi user chọn file hoặc nhập URL.
- **Nén/optimize ảnh**: Tự động nén ảnh upload để giảm dung lượng.
- **Placeholder/fallback**: Ảnh default khi URL hỏng hoặc chưa upload.
- **Multiple images (tùy chọn)**: Support upload nhiều ảnh cho 1 sản phẩm (gallery).

### 8.6 Tiêu chí sắp xếp (Sorting)
- **Sắp xếp sản phẩm**: Theo ngày tạo, tiêu đề (A-Z), thứ tự tùy chỉnh.
- **Sắp xếp danh mục**: Theo ngày tạo, tên, thứ tự tùy chỉnh.

### 8.7 Phân trang & hiệu năng
- **Lazy load sản phẩm**: Load sản phẩm khi scroll xuống (infinite scroll hoặc pagination).
- **Phân trang danh mục**: Collapse/expand riêng biệt, không load tất cả cùng lúc.
- **Shimmer/skeleton loading**: Show skeleton khi đang load dữ liệu từ server.

---

## 9. Tính năng mở rộng (Expansion Features - Phase 2)

### 9.1 Thống kê & Analytics (Dashboard)
- **Thống kê cơ bản**: 
  - Số danh mục, số sản phẩm, số lần truy cập trang bio.
  - Tỷ lệ click affiliate links.
- **Chart**: Biểu đồ view/click theo ngày/tuần/tháng.
- **Top products**: Danh sách sản phẩm có click nhiều nhất.

### 9.2 Tích hợp TikTok sâu hơn
- **Đồng bộ thông tin kênh**: Cập nhật tự động avatar, tên từ TikTok (schedule nightly).
- **Hiển thị followers count**: Lấy số follower từ TikTok API hiển thị trên trang bio.
- **Link TikTok profile**: Thêm link tới TikTok profile trên trang bio.

### 9.3 Quản lý người dùng & bảo mật (nếu mở rộng multi-user)
- **Role-based access**: Admin, Editor, Viewer roles.
- **Xác thực bằng email**: Thay vì chỉ TikTok.
- **Two-factor authentication (2FA)**: Bảo vệ tài khoản admin.
- **Audit log**: Ghi lại ai đã thay đổi gì, khi nào.

### 9.4 Tùy chỉnh giao diện & Theme (Customization) - CORE FEATURE ⭐
Người dùng có thể hoàn toàn tùy chỉnh giao diện của trang bio theo sở thích, tạo nên một bản sắc duy nhất.

#### 9.4.1 Hệ thống Theme Màu (Color Themes)
**5-Color Palette System**
- Mỗi theme gồm 5 màu chính được thiết kế hài hòa:
  1. **Primary**: Màu chủ đạo (buttons, headings, accents)
  2. **Secondary**: Màu phụ (tags, badges, secondary elements)
  3. **Background**: Màu nền chính (trang, cards)
  4. **Text**: Màu chữ (text content)
  5. **Accent**: Màu nhấn (hover effects, highlights)

**Preset Color Themes**
- Cung cấp **10+ bộ theme màu pastel có sẵn** được chọn từ ColorHunt:
  - Pastel Dreams: #FFB3BA, #FFCAB0, #FFFFBA, #BAE1FF, #BAC7FF
  - Soft Blush: #FDB4E6, #F4B0D6, #FFD4E5, #FFF5E1, #E8C5FF
  - Mint Breeze: #B8F3F1, #98D8C8, #F7DC6F, #F8B739, #F5CBA7
  - Lavender Dream: #E8B4F3, #D4A5F4, #F4D4E8, #E8F4F8, #D8E4F8
  - Peach Sunset: #FFD7A8, #FFCBA4, #FFB3BA, #FFE5CC, #FFF0E6
  - ... (thêm 5+ theme khác)
  
- User có thể preview từng theme trực tiếp trên trang bio trước khi lưu.

**Custom Color Picker**
- Nếu không thích preset, user có thể:
  - Chọn 5 màu tùy ý bằng color picker (hex/RGB/HSL)
  - Save custom theme với tên riêng (VD: "Summer 2025")
  - Reuse custom themes cũ
  - Export/import custom themes (JSON format)
  
- Validation: Đảm bảo contrast ratio ≥ 4.5:1 giữa text & background (A11y compliance)

**Color Preview & Editing**
- Admin page có "Theme Editor" panel:
  - Show 5 input fields cho từng màu (color picker)
  - Live preview bên cạnh các color fields
  - Show color values (HEX, RGB)
  - Apply/Cancel button
  - Reset to preset button

#### 9.4.2 Kiểu Layout (Layout Customization) - DRAG & DROP BUILDER
Người dùng có thể xây dựng layout trang bio bằng kéo thả các khối (blocks), tạo sự linh hoạt cực độ.

**Block Types**
Các loại khối có sẵn để drag-drop:

1. **Channel Info Block**
   - Hiển thị avatar, tên kênh, followers count
   - Options: Avatar size, layout (centered/left/right), show/hide followers
   - Positioning: Header (default), middle, custom

2. **Product Grid Block**
   - Hiển thị sản phẩm trong danh mục ở dạng lưới
   - Options:
     - Columns: 1, 2 (responsive), 3
     - Card style: Image on top (default), image left, image as background
     - Show/hide: Title, description, affiliate link
     - Spacing: compact, normal, spacious
     - Image aspect ratio: Square, 16:9, 4:3, custom

3. **Product List Block**
   - Hiển thị sản phẩm dạng danh sách (ngang hoặc dọc)
   - Options:
     - Direction: Horizontal (carousel), Vertical (list)
     - Item height: Compact, medium, large
     - Show: Thumbnail, title, description, price tag, CTA
     - Separators: Line, space, none

4. **Category Collapse Block**
   - Mỗi danh mục là 1 khối collapse/expand (hiện tại)
   - Options:
     - Start state: Opened, Closed
     - Animation: Smooth, instant
     - Icon: Arrow, Plus, Chevron, custom
     - Category title styling: Font size, weight, color

5. **Category Tabs Block** (New)
   - Hiển thị danh mục dạng tabs (thay vì collapse)
   - Tab click để switch between categories
   - Options: Tab style (underline, pill, boxed), animation

6. **Carousel Block** (New)
   - Hiển thị sản phẩm dạng carousel/slider
   - Options: Auto-play duration, show dots/arrows, per-page items

7. **Hero Banner Block** (New)
   - Section hero ở trên cùng (custom background, text overlay)
   - Options: Background image/color, tagline text, CTA button

8. **Custom Spacing Block**
   - Spacer block để tăng khoảng cách giữa các khối
   - Options: Height (16px, 32px, 48px, custom)

9. **Footer Block**
   - Social links, contact info, copyright
   - Options: Show/hide items, alignment

**Drag-Drop Builder Interface (Admin Page)**
- Canvas kéo thả ở trang admin:
  - Left sidebar: "Blocks Library" - danh sách loại block có thể drag vào
  - Center: Canvas preview - hiển thị live preview của layout
  - Right sidebar: "Block Settings" - các option của block đang chọn
  
- Interactions:
  - Drag block từ library vào canvas (add new)
  - Click block trên canvas để select & edit properties
  - Drag block trên canvas để reorder
  - Drag handle trên block để move
  - Delete icon để remove block
  - Duplicate icon để clone block
  - Show responsive preview (mobile 375px, tablet, desktop)

**Layout Presets**
- Cung cấp 5-7 layout preset (users có thể dùng làm template):
  - Classic: Channel Header → Category Collapse → Products Grid
  - Modern: Hero Banner → Category Tabs → Product Grid
  - Minimal: Channel Header → Carousel Products → Footer
  - Featured: Channel Header → Category Tabs → Featured Items → Rest Grid
  - List Style: Channel Header → Product List → More Products
  
- User có thể "Load Preset" rồi chỉnh sửa

**Save & Preview**
- Save Layout: Lưu layout configuration vào Supabase (table: `bio_layouts`)
- Preview Mode: Button "Preview Live" để view trên device thực (mobile 375px)
- Draft/Publish: 
  - Draft: Lưu layout nhưng không publish lên trang bio public
  - Publish: Public có thể view layout mới
  - Auto-save: Auto-save every 30 seconds

**Data Structure for Layouts**
```javascript
// bio_layouts table in Supabase
{
  id: uuid,
  user_id: tiktok_id,
  blocks: [
    {
      id: uuid,
      type: 'channel_info' | 'product_grid' | 'category_collapse' | 'carousel' | ...,
      order: 1,
      settings: {
        // Specific to block type
        // VD for product_grid: { columns: 2, cardStyle: 'image-top', ... }
      }
    },
    {
      id: uuid,
      type: 'product_grid',
      order: 2,
      settings: { ... }
    },
    ...
  ],
  published_at: timestamp,
  created_at: timestamp,
  updated_at: timestamp
}
```

#### 9.4.3 Custom Fonts
- **Font Selection**:
  - Use Google Fonts library (~1000+ fonts)
  - Cho user chọn:
    - Heading font (h1, h2, category titles)
    - Body font (product titles, descriptions)
    - CTA font (buttons, links)
  
- **Font Variants**: 
  - Weight: Regular, Medium, Bold, Extra Bold
  - Size scaling: Small (-20%), Normal, Large (+20%), Extra Large (+40%)

#### 9.4.4 Custom Branding
- **Logo/Icon**: Upload custom logo (show next to channel avatar or replace)
- **Favicon**: Upload custom favicon
- **Custom Domain** (Phase 2): Domain riêng cho bio (VD: bio.{username}.com)
- **Social Links**: Thêm links tới Instagram, YouTube, Facebook, TikTok

#### 9.4.5 Advanced Styling Options
- **Border & Shadows**:
  - Border radius: Sharp (0px), Rounded (8px), Very Rounded (16px), Pill (50px)
  - Shadow intensity: None, Light, Medium, Heavy
  - Border width & color

- **Spacing/Padding**:
  - Global padding: Compact, Normal, Spacious, Custom
  - Gap between items: Tight, Normal, Loose

- **Animations**:
  - Fade in on scroll
  - Slide animations
  - Hover effects: Scale, lift, underline
  - Transition duration: Fast (200ms), Normal (300ms), Slow (500ms)
  - Disable animations (prefer-reduced-motion support)

#### 9.4.6 Theme Management (Admin)
- **Create/Edit Themes**:
  - Create new custom theme từ preset hoặc từ đầu
  - Edit saved theme
  - Delete unused theme
  
- **Theme Library**:
  - Show all saved themes (custom + preset)
  - Quick preview khi hover
  - "Set as Active" để apply theme
  - "Duplicate Theme" để tạo variant

- **Export/Import**:
  - Export theme as JSON (share với users)
  - Import theme từ JSON file
  - Share theme collection

**Success Metrics for Customization:**
- 80%+ users apply custom theme
- Average 5+ minute session time trong theme editor
- 0% confusion về how to change layout (help docs + tutorials)
- Page load time < 2s even with custom CSS/fonts

### 9.5 Tính năng xã hội
- **Share links**: QR code hoặc link share trang bio.
- **Social media integration**: Hiển thị links tới Instagram, YouTube (ngoài TikTok).
- **Feedback form**: Form feedback từ khách hàng (newsletter signup, contact).

### 9.6 Email & Notifications
- **Email notifications**: Notify admin khi có sản phẩm bán chạy.
- **Scheduled emails**: Gửi email liên kết sản phẩm cho subscribers.
- **Webhook**: Tích hợp với external services (Discord, Slack).

### 9.7 API công khai (Public API)
- **REST API**: Expose products, categories để third-party integrate.
- **Embed widget**: Embed sản phẩm vào web/blog khác.

---

## 10. Yêu cầu hiệu suất & bảo mật

### 10.1 Hiệu suất
- **Tốc độ tải**: Trang bio load <2 giây trên 3G.
- **Lighthouse score**: ≥ 90 (Performance, Accessibility, SEO).
- **Image optimization**: Tất cả ảnh được compress, use WebP format (fallback PNG).
- **Caching strategy**: Cache API responses trong 5 phút, clear cache khi có update.
- **Code splitting**: Chỉ load JS cần thiết cho mỗi trang.

### 10.2 Bảo mật
- **HTTPS only**: Tất cả requests phải qua HTTPS.
- **Input validation**: Validate toàn bộ input trước khi lưu (server + client).
- **XSS protection**: Sanitize user input (không allow HTML tags).
- **CSRF tokens**: Nếu cần session-based auth.
- **Rate limiting**: Giới hạn request từ 1 IP (prevent DDoS).
- **Data encryption**: Sensitive data (tokens) được encrypt nếu lưu.

### 10.3 SEO (Search Engine Optimization)
- **Meta tags**: Title, description, OG tags trên trang bio.
- **Structured data**: JSON-LD markup cho products (schema.org).
- **Sitemap**: Sitemap.xml nếu mở rộng.
- **Open Graph**: Custom preview khi share link trang bio.

---

## 11. Yêu cầu UX/UI chi tiết

### 11.1 Responsive design
- **Breakpoints**:
  - Mobile: 375-640px (priority)
  - Tablet: 641-1024px
  - Desktop: 1025px+
- **Touch-friendly**: Buttons ≥ 48x48px, spacing ≥ 16px.

### 11.2 Accessibility (A11y)
- **WCAG 2.1 Level AA**: Comply với accessibility standards.
- **Keyboard navigation**: Tab through form, arrow keys cho collapse.
- **Screen reader support**: Alt text cho ảnh, ARIA labels.
- **Color contrast**: Text contrast ≥ 4.5:1.
- **Focus indicators**: Rõ ràng, không xóa outline mặc định.

### 11.3 Loading states & Error handling
- **Loading skeletons**: Show skeleton khi fetch data.
- **Error messages**: User-friendly error messages (không lỗi kỹ thuật).
- **Retry logic**: Nút retry nếu request fail.
- **Offline mode**: Show cached data nếu offline (tùy chọn).
- **Empty states**: Hiển thị thích hợp khi chưa có dữ liệu.

### 11.4 Animations & Transitions
- **Smooth transitions**: Collapse/expand danh mục 300-500ms.
- **Micro-interactions**: Hover effects, button feedback.
- **Loading animations**: Spinner hoặc progress indicator.
- **Prefer reduced motion**: Respect user's motion preference.

### 11.5 Dark mode (Tùy chọn)
- **Auto dark mode**: Theo system preference.
- **Toggle dark mode**: Button để chuyển qua lại.
- **Persistent**: Lưu user preference vào localStorage.

---

## 12. Yêu cầu kiểm thử chi tiết

### 12.1 Unit tests
- **Storage functions**: Test CRUD operations.
- **Data validation**: Test validation logic.
- **Utility functions**: Test helper functions.

### 12.2 Integration tests
- **Form submission**: Test thêm/chỉnh sửa/xóa danh mục & sản phẩm.
- **Supabase integration**: Test API calls, error handling.
- **Image upload**: Test upload ảnh, fallback.

### 12.3 E2E tests (Cypress/Playwright)
- **Admin flow**: Login (mock) → tạo danh mục → tạo sản phẩm → submit.
- **Bio page**: Load trang bio → expand danh mục → click affiliate link.
- **Mobile testing**: Test trên viewport 375px, 640px.

### 12.4 Manual testing
- **Browser compatibility**: Chrome, Firefox, Safari, Edge (latest 2 versions).
- **Device testing**: iPhone 12, Samsung Galaxy A10, iPad.
- **Network testing**: Test trên 4G, 3G, slow network.
- **TikTok OAuth**: Test login flow (với mock access token).

### 12.5 Performance testing
- **Lighthouse**: Chạy audit, target ≥90 all metrics.
- **PageSpeed Insights**: Optimize CLS, LCP, FID.
- **Network waterfall**: Analyze load time của từng resource.

---

## 13. Deployment & DevOps

### 13.1 CI/CD Pipeline
- **GitHub Actions**:
  - Lint HTML/CSS/JS
  - Run tests (unit + E2E)
  - Build (minify/optimize)
  - Deploy tự động

### 13.2 Hosting
- **Frontend**: GitHub Pages / Vercel (auto-deploy từ Git)
- **Database**: Supabase (free tier)
- **CDN**: Vercel CDN hoặc Cloudflare (tùy chọn)
- **Monitoring**: Sentry hoặc LogRocket (error tracking)

### 13.3 Database backups
- **Auto backup**: Supabase tự động backup hàng ngày.
- **Manual export**: Admin có thể manual export JSON anytime.
- **Disaster recovery**: Plan để restore từ backup.

---

## 14. Documentation

### 14.1 Code documentation
- **JSDoc**: Comment tất cả functions, async operations.
- **README**: Setup, installation, usage guide.
- **API docs**: Document Supabase tables, fields, relationships.

### 14.2 User guide
- **Admin guide**: Hướng dẫn dùng admin panel (PDF hoặc wiki).
- **FAQ**: Câu hỏi thường gặp (TikTok login, upload ảnh, v.v.).
- **Troubleshooting**: Common issues & solutions.

---

## 15. Roadmap & Timeline (Ước tính)

### Phase 1: MVP with Customization (Week 1-2) ⭐
**Core Features:**
- ✅ Setup project structure, Supabase
- ✅ Admin panel: Channel login, Categories, Products (CRUD)
- ✅ **Theme Colors**: 10+ preset pastel themes + custom color picker
- ✅ **Layout Builder**: Drag-drop blocks (Channel Info, Product Grid, Category Collapse, Carousel)
- ✅ **Fonts & Branding**: Google Fonts, custom logo
- ✅ Bio page: Display with customized layout, responsive mobile-first
- ✅ Mock TikTok login
- Testing & deploy

**Deliverables:**
- Fully functional admin with theme/layout customization
- Public bio page with 100% custom layout support
- Responsive design (375-640px priority)
- No vendor lock-in (can export layout JSON)

### Phase 2: Polish & Integration (Week 3)
- Real TikTok OAuth integration
- Image upload & optimization
- Data import/export (JSON, CSV)
- Advanced styling (borders, shadows, animations)
- Full responsive testing (all breakpoints)
- Analytics dashboard (basic)
- Lighthouse score ≥ 90

### Phase 3: Expansion & Advanced (Week 4+)
- Social media links integration
- Advanced analytics & tracking
- Email notifications
- Public API & embed widget
- Dark mode with auto-detection
- Multi-language support
- Theme marketplace (share custom themes)
- Collaboration features (multi-user edit)

---

## 16. Success Metrics

**MVP Success Criteria:**
- ✅ **Launch**: MVP hoàn thành trong 2 tuần
- 🎨 **Customization**: 100% users can customize theme & layout (no default-only)
- 📊 **Performance**: Lighthouse ≥ 90 (Performance, Accessibility, SEO)
- 📱 **Mobile-first**: Perfect display 375-640px, zero responsive issues
- ⚡ **Speed**: Load time < 2s trên 3G
- 🔒 **Security**: Zero security vulnerabilities (OWASP top 10)
- 🧪 **Quality**: E2E test coverage ≥ 80%

**Engagement Metrics:**
- 🎯 **Theme Usage**: 80%+ users apply custom theme
- 🖱️ **Layout Builder**: Average 10+ minutes session in builder
- 📈 **CTR**: Affiliate link CTR ≥ 5% per product
- 📉 **Bounce Rate**: < 30% on public bio page
- ⏱️ **Session**: Average 3-5 minutes on bio page

**Scalability:**
- 💪 **Handle**: 1000+ products, 100+ categories, 10k daily users
- 🔄 **Load Time Stable**: Even with 100+ products, load < 2s
- 📦 **Storage**: Optimized image handling, use CDN

**Business Metrics:**
- 👥 **User Adoption**: 500+ active users in Month 1
- 🎨 **Theme Variety**: 20%+ users create custom theme (not use preset)
- ⭐ **Satisfaction**: NPS ≥ 50, rating ≥ 4.5/5 stars
- 🔗 **Affiliate Success**: 20%+ of users report increased sales via affiliate links
