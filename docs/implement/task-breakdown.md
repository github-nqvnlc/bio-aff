# Task Breakdown - Bio Affiliate Project

**Tạo:** 8 tháng 12, 2025
**Dựa trên:** analysis-req.md, analysis-tech.md, analysis-db.md
**Mục Đích:** Breakdown chi tiết các task để implementation

---

## Tổng Quan

### Cấu Trúc Task
- **Epic:** Nhóm tính năng lớn
- **Story:** User story với acceptance criteria
- **Task:** Task cụ thể để implement
- **Sub-task:** Chi tiết implementation

### Estimation Scale
- **Story Points:** 1, 2, 3, 5, 8, 13, 21
- **Time Estimate:** Giờ làm việc
- **Complexity:** Low, Medium, High

---

## Epic 0: Project Setup & Infrastructure

### Story 0.1: Initial Project Setup
**Story Points:** 8  
**Priority:** P0  
**Sprint:** Sprint 0

#### Task 0.1.1: Project Structure Setup
**Estimate:** 2 hours  
**Complexity:** Low  
**Dependencies:** None

**Sub-tasks:**
- [ ] Tạo cấu trúc thư mục dự án theo `analysis-tech.md`
- [ ] Tạo `package.json` với dependencies
- [ ] Setup Git repository và `.gitignore`
- [ ] Tạo `README.md` với hướng dẫn setup
- [ ] Tạo file `.env.example` từ `env.md`

**Acceptance Criteria:**
- [ ] Cấu trúc thư mục đúng theo specification
- [ ] `package.json` có đầy đủ dependencies
- [ ] Git repository initialized
- [ ] `.gitignore` exclude node_modules, .env, logs

**Files to Create:**
- `package.json`
- `.gitignore`
- `README.md`
- `.env.example`
- Cấu trúc thư mục `src/`

---

#### Task 0.1.2: Development Environment Setup
**Estimate:** 2 hours  
**Complexity:** Low  
**Dependencies:** Task 0.1.1

**Sub-tasks:**
- [ ] Install Node.js và npm/yarn
- [ ] Install dependencies: `npm install`
- [ ] Setup Vite development server
- [ ] Configure Vite config file
- [ ] Test development server runs
- [ ] Setup hot reload

**Acceptance Criteria:**
- [ ] Dependencies installed successfully
- [ ] Development server runs on localhost
- [ ] Hot reload hoạt động
- [ ] No errors in console

**Files to Create:**
- `vite.config.js` (nếu cần)

---

#### Task 0.1.3: Supabase Project Setup
**Estimate:** 3 hours  
**Complexity:** Medium  
**Dependencies:** None

**Sub-tasks:**
- [ ] Đăng ký tài khoản Supabase (nếu chưa có)
- [ ] Tạo Supabase project mới
- [ ] Lưu Supabase URL và anon key vào `.env`
- [ ] Test connection đến Supabase
- [ ] Document Supabase credentials

**Acceptance Criteria:**
- [ ] Supabase project được tạo
- [ ] Credentials được lưu trong `.env`
- [ ] Connection test thành công
- [ ] Credentials được document trong `setup.md`

**Environment Variables:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Files to Create:**
- `.env` (local, không commit)
- Update `env.md` với Supabase credentials

---

#### Task 0.1.4: Database Schema Setup
**Estimate:** 4 hours  
**Complexity:** High  
**Dependencies:** Task 0.1.3

**Sub-tasks:**
- [ ] Tạo 5 tables theo schema trong `analysis-db.md`
- [ ] Tạo indexes cho performance
- [ ] Setup foreign key constraints
- [ ] Setup triggers (updated_at, single_active_theme, published_at)
- [ ] Enable RLS policies
- [ ] Create RLS policies cho tất cả tables
- [ ] Test database operations

**Acceptance Criteria:**
- [ ] Tất cả 5 tables được tạo đúng schema
- [ ] Indexes được tạo
- [ ] Foreign keys hoạt động
- [ ] Triggers hoạt động
- [ ] RLS policies được enable và test

**Database Tables:**
- `channels`
- `categories`
- `products`
- `color_themes`
- `bio_layouts`

**Files to Create:**
- `docs/database/migration_001_initial_schema.sql` (optional)

---

#### Task 0.1.5: Supabase Storage Setup
**Estimate:** 2 hours  
**Complexity:** Medium  
**Dependencies:** Task 0.1.3

**Sub-tasks:**
- [ ] Tạo Storage bucket `product-images`
- [ ] Configure bucket as public
- [ ] Set file size limit (5MB)
- [ ] Setup Storage policies (upload, read, delete)
- [ ] Test image upload
- [ ] Document Storage setup

**Acceptance Criteria:**
- [ ] Storage bucket được tạo
- [ ] Bucket configured đúng (public, size limit)
- [ ] Storage policies hoạt động
- [ ] Test upload thành công

**Storage Configuration:**
- Bucket name: `product-images`
- Public: `true`
- File size limit: `5242880` (5MB)
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`

---

#### Task 0.1.6: Frontend Structure Setup
**Estimate:** 2 hours  
**Complexity:** Low  
**Dependencies:** Task 0.1.1

**Sub-tasks:**
- [ ] Tạo HTML structure (admin.html, bio.html)
- [ ] Setup CSS variables system
- [ ] Tạo shared modules structure
- [ ] Setup module imports/exports
- [ ] Create basic CSS files
- [ ] Test file structure

**Acceptance Criteria:**
- [ ] HTML files được tạo
- [ ] CSS variables system setup
- [ ] Module structure đúng
- [ ] Files có thể import/export

**Files to Create:**
- `src/admin/admin.html`
- `src/admin/admin.css`
- `src/admin/admin.js`
- `src/bio/bio.html`
- `src/bio/bio.css`
- `src/bio/bio.js`
- `src/shared/storage.js`
- `src/shared/utils.js`
- `src/shared/constants.js`

---

#### Task 0.1.7: Environment Configuration
**Estimate:** 1 hour  
**Complexity:** Low  
**Dependencies:** Task 0.1.3

**Sub-tasks:**
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in Supabase credentials
- [ ] Add TikTok OAuth credentials (nếu có)
- [ ] Verify `.env` được ignore trong `.gitignore`
- [ ] Document environment setup

**Acceptance Criteria:**
- [ ] `.env` file được tạo từ `.env.example`
- [ ] Tất cả required variables được fill
- [ ] `.env` không được commit
- [ ] Environment setup được document

**Files to Create:**
- `.env` (local, không commit)

---

## Epic 1: Authentication & Channel Management

### Story 1.1: TikTok Login (Mock)
**Story Points:** 5  
**Priority:** P0  
**Sprint:** Sprint 1

#### Task 1.1.1: Mock TikTok Auth Implementation
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** None

**Sub-tasks:**
- [ ] Tạo file `shared/tiktok-auth.js`
- [ ] Implement `login()` function với mock data
- [ ] Implement `getChannel()` function
- [ ] Implement `logout()` function
- [ ] Lưu session vào localStorage
- [ ] Test auth flow

**Acceptance Criteria:**
- [ ] User click "Login with TikTok" → redirect đến admin
- [ ] Channel info được lưu trong localStorage
- [ ] Session persist sau khi refresh page

**Files to Create:**
- `src/shared/tiktok-auth.js`

**Files to Modify:**
- `src/admin/admin.html`
- `src/admin/admin.js`

---

#### Task 1.1.2: Channel Info Display
**Estimate:** 3 hours  
**Complexity:** Low  
**Dependencies:** Task 1.1.1

**Sub-tasks:**
- [ ] Tạo UI component hiển thị channel info
- [ ] Hiển thị avatar, name, tiktok_id
- [ ] Hiển thị followers count (nếu có)
- [ ] Styling với CSS

**Acceptance Criteria:**
- [ ] Channel info hiển thị đúng sau login
- [ ] Avatar load đúng
- [ ] UI responsive

**Files to Create:**
- `src/admin/components/channel-info.js`
- `src/admin/styles/channel-info.css`

---

#### Task 1.1.3: Save Channel to Database
**Estimate:** 3 hours  
**Complexity:** Medium  
**Dependencies:** Task 1.1.1, Database setup

**Sub-tasks:**
- [ ] Tạo Supabase client
- [ ] Implement `saveChannel()` function
- [ ] Handle upsert (insert or update)
- [ ] Error handling
- [ ] Test database operations

**Acceptance Criteria:**
- [ ] Channel được lưu vào `channels` table
- [ ] Duplicate tiktok_id được handle (upsert)
- [ ] Error được handle gracefully

**Files to Create:**
- `src/shared/storage.js` (nếu chưa có)

**Database:**
- Table: `channels`
- Operations: INSERT, UPDATE (ON CONFLICT)

---

## Epic 2: Category Management

### Story 2.1: Category CRUD
**Story Points:** 8  
**Priority:** P0  
**Sprint:** Sprint 1

#### Task 2.1.1: Category Form UI
**Estimate:** 2 hours  
**Complexity:** Low  
**Dependencies:** None

**Sub-tasks:**
- [ ] Tạo form HTML với fields: name (required), description (optional)
- [ ] Styling form với CSS
- [ ] Form validation (client-side)
- [ ] Submit handler

**Acceptance Criteria:**
- [ ] Form hiển thị đúng
- [ ] Validation hoạt động (name required)
- [ ] Form reset sau submit

**Files to Create:**
- `src/admin/components/category-form.html`
- `src/admin/components/category-form.js`
- `src/admin/styles/form-styles.css`

---

#### Task 2.1.2: Category List Display
**Estimate:** 3 hours  
**Complexity:** Low  
**Dependencies:** Task 2.1.3

**Sub-tasks:**
- [ ] Tạo list/table component
- [ ] Fetch categories từ database
- [ ] Render categories với name, description
- [ ] Styling list

**Acceptance Criteria:**
- [ ] Categories hiển thị đúng
- [ ] List update sau khi thêm/sửa/xóa
- [ ] Empty state khi không có categories

**Files to Create:**
- `src/admin/components/category-list.js`

---

#### Task 2.1.3: Category Database Operations
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Database setup

**Sub-tasks:**
- [ ] Implement `addCategory()` function
- [ ] Implement `getCategories()` function
- [ ] Implement `updateCategory()` function
- [ ] Implement `deleteCategory()` function
- [ ] Error handling
- [ ] Test CRUD operations

**Acceptance Criteria:**
- [ ] CRUD operations hoạt động đúng
- [ ] Foreign key constraint được handle
- [ ] Cascade delete hoạt động (nếu có products)

**Database:**
- Table: `categories`
- Operations: INSERT, SELECT, UPDATE, DELETE

---

#### Task 2.1.4: Category Edit & Delete
**Estimate:** 3 hours  
**Complexity:** Medium  
**Dependencies:** Task 2.1.2, Task 2.1.3

**Sub-tasks:**
- [ ] Edit button cho mỗi category
- [ ] Modal/form để edit
- [ ] Delete button với confirmation modal
- [ ] Update UI sau edit/delete

**Acceptance Criteria:**
- [ ] User có thể edit category
- [ ] Confirmation modal hiển thị trước khi delete
- [ ] UI update sau operations

**Files to Create:**
- `src/admin/components/category-modal.js`

---

## Epic 3: Product Management

### Story 3.1: Product CRUD
**Story Points:** 10  
**Priority:** P0  
**Sprint:** Sprint 1

#### Task 3.1.1: Product Form UI
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Task 2.1.3

**Sub-tasks:**
- [ ] Tạo form với fields: image, title, description, category, link, status, tags
- [ ] Category dropdown (populate từ database)
- [ ] Image upload (file input + URL input)
- [ ] Image preview
- [ ] Form validation
- [ ] Warning nếu không có categories

**Acceptance Criteria:**
- [ ] Form hiển thị đúng
- [ ] Category dropdown populate đúng
- [ ] Image preview hoạt động
- [ ] Validation hoạt động (title, link required)

**Files to Create:**
- `src/admin/components/product-form.js`
- `src/shared/image-handler.js`

---

#### Task 3.1.2: Image Upload Implementation
**Estimate:** 5 hours  
**Complexity:** High  
**Dependencies:** Supabase Storage setup

**Sub-tasks:**
- [ ] Implement file upload to Supabase Storage
- [ ] Support URL input (validate URL)
- [ ] Image preview (FileReader API)
- [ ] Error handling
- [ ] File size validation (max 5MB)
- [ ] File type validation (images only)

**Acceptance Criteria:**
- [ ] File upload hoạt động
- [ ] URL input hoạt động
- [ ] Preview hiển thị đúng
- [ ] Validation hoạt động

**Files to Create:**
- `src/shared/image-handler.js`

**Storage:**
- Bucket: `product-images`
- Path: `{channel_id}/{timestamp}-{filename}`

---

#### Task 3.1.3: Product Database Operations
**Estimate:** 5 hours  
**Complexity:** Medium  
**Dependencies:** Database setup, Task 3.1.2

**Sub-tasks:**
- [ ] Implement `addProduct()` function
- [ ] Implement `getProducts()` function
- [ ] Implement `updateProduct()` function
- [ ] Implement `deleteProduct()` function
- [ ] Handle tags array
- [ ] Error handling
- [ ] Test CRUD operations

**Acceptance Criteria:**
- [ ] CRUD operations hoạt động đúng
- [ ] Tags được lưu đúng (TEXT[])
- [ ] Foreign keys được handle

**Database:**
- Table: `products`
- Operations: INSERT, SELECT, UPDATE, DELETE

---

#### Task 3.1.4: Product List Display
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Task 3.1.3

**Sub-tasks:**
- [ ] Tạo grid/list component
- [ ] Fetch products từ database
- [ ] Render products với image, title, category
- [ ] Edit và delete buttons
- [ ] Styling

**Acceptance Criteria:**
- [ ] Products hiển thị đúng
- [ ] Images load đúng
- [ ] List update sau operations

**Files to Create:**
- `src/admin/components/product-list.js`
- `src/admin/styles/product-list.css`

---

## Epic 4: Theme System

### Story 4.1: Theme Colors
**Story Points:** 11  
**Priority:** P0  
**Sprint:** Sprint 1

#### Task 4.1.1: Preset Themes Display
**Estimate:** 3 hours  
**Complexity:** Low  
**Dependencies:** None

**Sub-tasks:**
- [ ] Tạo preset themes data (10+ themes)
- [ ] Display themes trong grid
- [ ] Theme preview cards
- [ ] Click để select theme
- [ ] Styling

**Acceptance Criteria:**
- [ ] 10+ preset themes hiển thị
- [ ] User có thể click để select
- [ ] Preview cards đẹp

**Files to Create:**
- `src/shared/constants.js` (preset themes)
- `src/admin/components/theme-panel.js`

---

#### Task 4.1.2: Custom Color Picker
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** None

**Sub-tasks:**
- [ ] Tạo color picker UI (5 colors: primary, secondary, background, text, accent)
- [ ] Integrate color picker library hoặc HTML5 input[type=color]
- [ ] Live preview khi chọn màu
- [ ] Save custom theme với tên

**Acceptance Criteria:**
- [ ] User có thể chọn 5 màu
- [ ] Live preview cập nhật ngay
- [ ] User có thể save với tên

**Files to Create:**
- `src/admin/components/color-picker.js`

---

#### Task 4.1.3: WCAG Contrast Validation
**Estimate:** 3 hours  
**Complexity:** Medium  
**Dependencies:** Task 4.1.2

**Sub-tasks:**
- [ ] Implement contrast calculation algorithm
- [ ] Validate text vs background (≥4.5:1)
- [ ] Show warning nếu contrast thấp
- [ ] Suggest colors nếu cần

**Acceptance Criteria:**
- [ ] Contrast validation hoạt động
- [ ] Warning hiển thị khi contrast < 4.5:1
- [ ] Algorithm chính xác

**Files to Create:**
- `src/shared/color-utils.js`

---

#### Task 4.1.4: Theme Application & Storage
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Task 4.1.2, Database setup

**Sub-tasks:**
- [ ] Apply theme colors via CSS variables
- [ ] Save theme to database
- [ ] Load theme từ database
- [ ] Set active theme
- [ ] Update CSS variables dynamically

**Acceptance Criteria:**
- [ ] Theme được apply đúng
- [ ] Theme được lưu vào database
- [ ] CSS variables update đúng

**Database:**
- Table: `color_themes`
- Operations: INSERT, SELECT, UPDATE

**CSS Variables:**
```css
:root {
  --color-primary: #FF6B9D;
  --color-secondary: #FFB5D8;
  --color-background: #FFF5F9;
  --color-text: #333333;
  --color-accent: #FFD166;
}
```

---

## Epic 5: Layout Builder

### Story 5.1: Layout Builder Canvas
**Story Points:** 15  
**Priority:** P0  
**Sprint:** Sprint 2

#### Task 5.1.1: Builder UI Structure
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** None

**Sub-tasks:**
- [ ] Tạo 3-column layout (library, canvas, settings)
- [ ] Responsive layout
- [ ] Styling
- [ ] Basic structure

**Acceptance Criteria:**
- [ ] 3-column layout hiển thị đúng
- [ ] Responsive trên các screen sizes
- [ ] UI clean và intuitive

**Files to Create:**
- `src/admin/components/layout-builder-ui.js`
- `src/admin/styles/layout-builder.css`

---

#### Task 5.1.2: Block Library
**Estimate:** 3 hours  
**Complexity:** Low  
**Dependencies:** None

**Sub-tasks:**
- [ ] Tạo block library sidebar
- [ ] List các block types: Channel Info, Product Grid, Category Collapse, Category Tabs, Carousel
- [ ] Block preview cards
- [ ] Drag handles

**Acceptance Criteria:**
- [ ] Block library hiển thị đúng
- [ ] Blocks có thể drag được
- [ ] Preview cards đẹp

**Files to Create:**
- `src/admin/components/block-library.js`

---

#### Task 5.1.3: Drag-Drop Implementation
**Estimate:** 6 hours  
**Complexity:** High  
**Dependencies:** Task 5.1.1, Task 5.1.2

**Sub-tasks:**
- [ ] Integrate sortablejs library
- [ ] Implement drag từ library vào canvas
- [ ] Implement reorder trên canvas
- [ ] Visual feedback khi drag
- [ ] Handle drop zones

**Acceptance Criteria:**
- [ ] Drag-drop hoạt động mượt
- [ ] Visual feedback rõ ràng
- [ ] Reorder hoạt động đúng

**Dependencies:**
- Library: `sortablejs`

**Files to Modify:**
- `src/admin/components/layout-builder-ui.js`

---

#### Task 5.1.4: Block Settings Panel
**Estimate:** 5 hours  
**Complexity:** Medium  
**Dependencies:** Task 5.1.3

**Sub-tasks:**
- [ ] Tạo settings panel
- [ ] Show settings khi click block
- [ ] Dynamic form based on block type
- [ ] Save settings
- [ ] Update block preview

**Acceptance Criteria:**
- [ ] Settings panel hiển thị đúng
- [ ] Form dynamic theo block type
- [ ] Settings được save đúng

**Files to Create:**
- `src/admin/components/block-settings.js`

---

#### Task 5.1.5: Layout Save & Publish
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Task 5.1.3, Database setup

**Sub-tasks:**
- [ ] Implement save draft
- [ ] Implement publish
- [ ] Auto-save mỗi 30 giây
- [ ] Unsaved changes indicator
- [ ] Save layout config to database

**Acceptance Criteria:**
- [ ] Save draft hoạt động
- [ ] Publish hoạt động
- [ ] Auto-save hoạt động
- [ ] Indicator hiển thị đúng

**Database:**
- Table: `bio_layouts`
- Operations: INSERT, UPDATE

---

#### Task 5.1.6: Responsive Preview
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Task 5.1.1

**Sub-tasks:**
- [ ] Tạo preview iframe hoặc container
- [ ] Toggle viewport sizes (375px, 768px, 1024px)
- [ ] Update preview khi layout thay đổi
- [ ] Styling preview container

**Acceptance Criteria:**
- [ ] Preview hiển thị đúng
- [ ] Viewport toggle hoạt động
- [ ] Preview update real-time

**Files to Create:**
- `src/admin/components/responsive-preview.js`

---

## Epic 6: Block Components

### Story 6.1: Core Blocks
**Story Points:** 12  
**Priority:** P0  
**Sprint:** Sprint 2

#### Task 6.1.1: Channel Info Block
**Estimate:** 3 hours  
**Complexity:** Low  
**Dependencies:** Channel data

**Sub-tasks:**
- [ ] Tạo block template
- [ ] Render channel avatar, name, followers
- [ ] Block settings (avatar size, show/hide followers)
- [ ] Styling

**Acceptance Criteria:**
- [ ] Block render đúng
- [ ] Settings hoạt động
- [ ] Styling đẹp

**Files to Create:**
- `src/shared/blocks/channel-info-block.js`

---

#### Task 6.1.2: Product Grid Block
**Estimate:** 5 hours  
**Complexity:** Medium  
**Dependencies:** Product data

**Sub-tasks:**
- [ ] Tạo grid layout
- [ ] Render products với image, title, description
- [ ] Block settings (columns: 1, 2, 3)
- [ ] Responsive grid
- [ ] Styling

**Acceptance Criteria:**
- [ ] Grid render đúng
- [ ] Columns setting hoạt động
- [ ] Responsive đúng

**Files to Create:**
- `src/shared/blocks/product-grid-block.js`

---

#### Task 6.1.3: Category Collapse Block
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Category & Product data

**Sub-tasks:**
- [ ] Tạo collapse UI
- [ ] Render categories với products
- [ ] Expand/collapse functionality
- [ ] Animation
- [ ] Styling

**Acceptance Criteria:**
- [ ] Collapse hoạt động
- [ ] Animation smooth
- [ ] Products hiển thị đúng

**Files to Create:**
- `src/shared/blocks/category-collapse-block.js`

---

#### Task 6.1.4: Category Tabs Block
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Category & Product data

**Sub-tasks:**
- [ ] Tạo tabs UI
- [ ] Tab switching functionality
- [ ] Render products theo category
- [ ] Mobile-friendly (horizontal scroll)
- [ ] Styling

**Acceptance Criteria:**
- [ ] Tabs hoạt động
- [ ] Switching smooth
- [ ] Mobile-friendly

**Files to Create:**
- `src/shared/blocks/category-tabs-block.js`

---

#### Task 6.1.5: Carousel Block
**Estimate:** 5 hours  
**Complexity:** Medium  
**Dependencies:** Product data

**Sub-tasks:**
- [ ] Tạo carousel UI
- [ ] Implement swipe/scroll
- [ ] Navigation arrows
- [ ] Dots indicator
- [ ] Auto-play (optional)
- [ ] Styling

**Acceptance Criteria:**
- [ ] Carousel hoạt động
- [ ] Swipe smooth
- [ ] Navigation hoạt động

**Files to Create:**
- `src/shared/blocks/carousel-block.js`

---

## Epic 7: Public Bio Page

### Story 7.1: Public Page Rendering
**Story Points:** 15  
**Priority:** P0  
**Sprint:** Sprint 2

#### Task 7.1.1: Page Structure
**Estimate:** 2 hours  
**Complexity:** Low  
**Dependencies:** None

**Sub-tasks:**
- [ ] Tạo bio.html structure
- [ ] Basic layout
- [ ] Styling
- [ ] Meta tags

**Acceptance Criteria:**
- [ ] Page structure đúng
- [ ] Styling đẹp
- [ ] Meta tags đầy đủ

**Files to Create:**
- `src/bio/bio.html`
- `src/bio/bio.css`

---

#### Task 7.1.2: Data Loading
**Estimate:** 4 hours  
**Complexity:** Medium  
**Dependencies:** Database setup

**Sub-tasks:**
- [ ] Load channel data
- [ ] Load categories data
- [ ] Load products data
- [ ] Load theme data
- [ ] Load layout config
- [ ] Error handling
- [ ] Loading states

**Acceptance Criteria:**
- [ ] Data load đúng
- [ ] Error được handle
- [ ] Loading states hiển thị

**Files to Create:**
- `src/bio/bio.js`

---

#### Task 7.1.3: Dynamic Block Rendering
**Estimate:** 6 hours  
**Complexity:** High  
**Dependencies:** Task 7.1.2, Block components

**Sub-tasks:**
- [ ] Parse layout config (blocks array)
- [ ] Render blocks theo order
- [ ] Apply block settings
- [ ] Handle block types
- [ ] Error handling

**Acceptance Criteria:**
- [ ] Blocks render đúng theo layout
- [ ] Settings được apply
- [ ] Order đúng

**Files to Create:**
- `src/bio/components/block-renderer.js`

---

#### Task 7.1.4: Theme Application
**Estimate:** 2 hours  
**Complexity:** Low  
**Dependencies:** Task 7.1.2

**Sub-tasks:**
- [ ] Apply theme colors via CSS variables
- [ ] Update CSS variables dynamically
- [ ] Handle missing theme

**Acceptance Criteria:**
- [ ] Theme được apply đúng
- [ ] Colors hiển thị đúng

**Files to Create:**
- `src/bio/components/theme-applier.js`

---

#### Task 7.1.5: Responsive & Performance
**Estimate:** 5 hours  
**Complexity:** Medium  
**Dependencies:** Task 7.1.3

**Sub-tasks:**
- [ ] Implement lazy loading cho images
- [ ] Image fallback handling
- [ ] Responsive grid (1 col mobile, 2+ col tablet+)
- [ ] Touch-friendly sizing (≥48x48px buttons)
- [ ] Performance optimization

**Acceptance Criteria:**
- [ ] Lazy loading hoạt động
- [ ] Responsive đúng (375px priority)
- [ ] Performance tốt (<2s load)

**Files to Modify:**
- `src/bio/bio.css`
- `src/bio/bio.js`

---

## Task Dependencies Graph

```
Sprint 0 (Setup)
├── Project Setup
├── Supabase Setup
├── Frontend Structure
└── Mock Auth

Sprint 1
├── Auth (Task 1.1.1 → 1.1.2 → 1.1.3)
├── Categories (Task 2.1.1 → 2.1.3 → 2.1.2 → 2.1.4)
├── Products (Task 2.1.3 → 3.1.1 → 3.1.2 → 3.1.3 → 3.1.4)
└── Themes (Task 4.1.1 → 4.1.2 → 4.1.3 → 4.1.4)

Sprint 2
├── Layout Builder (Task 5.1.1 → 5.1.2 → 5.1.3 → 5.1.4 → 5.1.5)
├── Blocks (Task 6.1.1, 6.1.2, 6.1.3, 6.1.4, 6.1.5)
└── Public Page (Task 7.1.1 → 7.1.2 → 7.1.3 → 7.1.4 → 7.1.5)
```

---

## Estimation Guidelines

### Story Points
- **1 point:** 1-2 hours (trivial task)
- **2 points:** 2-4 hours (simple task)
- **3 points:** 4-6 hours (medium task)
- **5 points:** 6-10 hours (complex task)
- **8 points:** 10-16 hours (very complex)
- **13 points:** 16+ hours (epic, break down)

### Complexity Factors
- **Low:** Straightforward implementation, well-documented
- **Medium:** Some complexity, may need research
- **High:** Complex logic, multiple dependencies, high risk

---

## Testing Checklist

### Unit Tests
- [ ] Storage functions (CRUD operations)
- [ ] Validation functions
- [ ] Utility functions
- [ ] Color contrast calculation

### Integration Tests
- [ ] Form submissions
- [ ] Database operations
- [ ] Image upload
- [ ] Theme application

### E2E Tests
- [ ] Login flow
- [ ] Category CRUD flow
- [ ] Product CRUD flow
- [ ] Layout builder flow
- [ ] Public page rendering

### Manual Testing
- [ ] Cross-browser testing
- [ ] Mobile testing (375px, 640px, 1024px)
- [ ] Performance testing
- [ ] Accessibility testing

---

## Definition of Done

Mỗi task phải đáp ứng:
- [ ] Code completed
- [ ] Code reviewed
- [ ] Tests written và passing
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive tested
- [ ] Performance acceptable

---

**Kết Thúc Task Breakdown**

