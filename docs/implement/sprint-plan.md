# Sprint Plan - Bio Affiliate Project

**Tạo:** 8 tháng 12, 2025
**Dựa trên:** analysis-req.md, analysis-tech.md, analysis-db.md
**Mục Đích:** Kế hoạch sprint chi tiết để quản lý dự án

---

## Tổng Quan Dự Án

### Thông Tin Chung
- **Tên Dự Án:** TikTok Bio Affiliate với Tùy Chỉnh Chủ Đề & Bố Cục
- **Tổng Tính Năng:** 100 tính năng (ID_001 đến ID_100)
- **Thời Gian Ước Tính:** 4 tuần (MVP: 2 tuần)
- **Team Size:** 1-2 developers
- **Methodology:** Agile/Scrum với Sprint 1 tuần

### Phân Bố Ưu Tiên
- **P0 (MVP - Phải Có):** 35 tính năng (43%)
- **P1 (Nên Có):** 28 tính năng (34%)
- **P2 (Tốt Nếu Có):** 19 tính năng (23%)

### Cấu Trúc Sprint
- **Sprint Duration:** 1 tuần (5 ngày làm việc)
- **Sprint Planning:** Thứ 2 đầu tuần
- **Daily Standup:** Hàng ngày
- **Sprint Review:** Thứ 6 cuối tuần
- **Sprint Retrospective:** Sau Review

---

## Sprint Overview

| Sprint | Tuần | Mục Tiêu | Tính Năng | Story Points | Status |
|--------|------|----------|-----------|--------------|--------|
| **Sprint 0** | Week 0 | Setup & Infrastructure | Setup | 8 | ⏳ Pending |
| **Sprint 1** | Week 1 | Core CRUD & Auth | ID_001-026, ID_034-038 | 34 | ⏳ Pending |
| **Sprint 2** | Week 2 | Layout Builder & Public Page | ID_042-059, ID_075-100 | 42 | ⏳ Pending |
| **Sprint 3** | Week 3 | Polish & Enhancement | ID_004-005, ID_013-016, ID_027-033, ID_039-041, ID_063-067 | 28 | ⏳ Pending |
| **Sprint 4** | Week 4 | Advanced Features | ID_030, ID_060-062, ID_068-072, ID_092-096 | 18 | ⏳ Pending |

**Tổng Story Points:** 130 points

---

## Sprint 0: Setup & Infrastructure (Week 0)

**Duration:** 3-5 ngày
**Goal:** Thiết lập môi trường phát triển, database, và cấu trúc dự án

### Sprint Goal
✅ Hoàn thành setup môi trường phát triển, database schema, và cấu trúc dự án cơ bản

### Tasks

#### 1. Project Setup (2 points)
- [ ] Tạo cấu trúc thư mục dự án
- [ ] Setup package.json với dependencies
- [ ] Cấu hình Vite/development server
- [ ] Setup Git repository và .gitignore
- [ ] Tạo README.md với hướng dẫn setup

#### 2. Supabase Setup (3 points)
- [ ] Tạo Supabase project
- [ ] Tạo database schema (5 tables)
- [ ] Tạo indexes và constraints
- [ ] Setup RLS policies
- [ ] Tạo triggers (updated_at, single_active_theme, published_at)
- [ ] Setup Storage bucket (product-images)
- [ ] Test database connection

#### 3. Frontend Structure (2 points)
- [ ] Tạo HTML structure (admin.html, bio.html)
- [ ] Setup CSS variables system
- [ ] Tạo shared modules (storage.js, utils.js)
- [ ] Setup module imports/exports

#### 4. Mock Authentication (1 point)
- [ ] Tạo mock TikTok auth (tiktok-auth.js)
- [ ] Implement localStorage session
- [ ] Test auth flow

### Deliverables
- ✅ Project structure hoàn chỉnh
- ✅ Database schema deployed
- ✅ Development environment running
- ✅ Mock auth working

### Definition of Done
- [ ] Code pushed to repository
- [ ] Database schema documented
- [ ] Development server running locally
- [ ] Team có thể clone và run project

---

## Sprint 1: Core CRUD & Theme System (Week 1)

**Duration:** 5 ngày
**Goal:** Hoàn thành CRUD cơ bản cho channels, categories, products và hệ thống theme

### Sprint Goal
✅ Users có thể đăng nhập, quản lý categories/products, và tùy chỉnh theme colors

### User Stories

#### Story 1: TikTok Authentication (5 points)
**As a** creator  
**I want to** login với TikTok account  
**So that** tôi có thể quản lý bio của mình

**Tasks:**
- [ ] ID_001: Implement mock TikTok login button
- [ ] ID_002: Fetch channel info từ mock API
- [ ] ID_003: Display channel preview
- [ ] ID_006: Save channel to database
- [ ] Test authentication flow

**Acceptance Criteria:**
- [ ] User có thể click "Login with TikTok"
- [ ] Channel info được hiển thị sau login
- [ ] Channel được lưu vào database
- [ ] Session được persist trong localStorage

#### Story 2: Category Management (8 points)
**As a** creator  
**I want to** quản lý categories  
**So that** tôi có thể tổ chức sản phẩm

**Tasks:**
- [ ] ID_007: Create category form
- [ ] ID_008: Category validation
- [ ] ID_009: Save category to DB
- [ ] ID_010: Display category list
- [ ] ID_011: Edit category
- [ ] ID_012: Delete category với confirmation
- [ ] Test CRUD operations

**Acceptance Criteria:**
- [ ] User có thể thêm category với tên (required)
- [ ] User có thể edit và delete category
- [ ] Category list hiển thị đúng
- [ ] Validation hoạt động (tên không được trống)

#### Story 3: Product Management (10 points)
**As a** creator  
**I want to** quản lý products  
**So that** tôi có thể thêm affiliate links

**Tasks:**
- [ ] ID_017: Create product form
- [ ] ID_018: Image upload (file hoặc URL)
- [ ] ID_019: Image preview
- [ ] ID_020: Category dropdown (required)
- [ ] ID_021: Warning nếu không có category
- [ ] ID_022: Form validation
- [ ] ID_023: Save product to DB
- [ ] ID_024: Display product list
- [ ] ID_025: Edit product
- [ ] ID_026: Delete product với confirmation
- [ ] Test CRUD operations

**Acceptance Criteria:**
- [ ] User có thể thêm product với đầy đủ thông tin
- [ ] Image upload hoạt động (file + URL)
- [ ] Form validation hoạt động (title, link required)
- [ ] Product list hiển thị đúng
- [ ] User có thể edit và delete product

#### Story 4: Theme System (11 points)
**As a** creator  
**I want to** tùy chỉnh theme colors  
**So that** bio của tôi có màu sắc đẹp

**Tasks:**
- [ ] ID_034: Display preset themes (10+ themes)
- [ ] ID_035: Live preview theme trên bio page
- [ ] ID_036: Custom color picker (5 colors)
- [ ] ID_037: WCAG contrast validation
- [ ] ID_038: Save custom theme to DB
- [ ] Apply theme colors via CSS variables
- [ ] Test theme system

**Acceptance Criteria:**
- [ ] User có thể chọn preset theme
- [ ] User có thể tạo custom theme với 5 colors
- [ ] Contrast validation hoạt động (≥4.5:1)
- [ ] Theme được lưu vào database
- [ ] Live preview cập nhật ngay lập tức

### Daily Standup Focus

**Day 1:** Setup complete, start Story 1 (Auth)
**Day 2:** Complete Story 1, start Story 2 (Categories)
**Day 3:** Complete Story 2, start Story 3 (Products)
**Day 4:** Complete Story 3, start Story 4 (Themes)
**Day 5:** Complete Story 4, testing & bug fixes

### Deliverables
- ✅ Authentication working
- ✅ Category CRUD complete
- ✅ Product CRUD complete
- ✅ Theme system working

### Definition of Done
- [ ] Tất cả P0 features hoàn thành
- [ ] Code reviewed và merged
- [ ] Tests passing
- [ ] Documentation updated

---

## Sprint 2: Layout Builder & Public Page (Week 2)

**Duration:** 5 ngày
**Goal:** Hoàn thành layout builder và trang bio công khai

### Sprint Goal
✅ Users có thể tạo layout bằng drag-drop và xem trang bio công khai

### User Stories

#### Story 5: Layout Builder Canvas (15 points)
**As a** creator  
**I want to** tạo layout bằng drag-drop  
**So that** tôi có thể tùy chỉnh bố cục bio

**Tasks:**
- [ ] ID_042: Create 3-column layout (library, canvas, settings)
- [ ] ID_043: Drag blocks từ library vào canvas
- [ ] ID_044: Reorder blocks trên canvas
- [ ] ID_045: Edit block settings
- [ ] ID_046: Delete block
- [ ] ID_047: Duplicate block
- [ ] ID_048: Responsive preview (375px, 768px, 1024px)
- [ ] ID_049: Layout presets (5-7 templates)
- [ ] ID_050: Save draft layout
- [ ] ID_051: Publish layout
- [ ] ID_052: Auto-save mỗi 30 giây
- [ ] ID_053: Unsaved changes indicator
- [ ] Integrate sortablejs

**Acceptance Criteria:**
- [ ] User có thể drag blocks vào canvas
- [ ] User có thể reorder blocks
- [ ] User có thể edit block settings
- [ ] Layout được lưu draft và publish
- [ ] Auto-save hoạt động
- [ ] Responsive preview hoạt động

#### Story 6: Block Components (12 points)
**As a** creator  
**I want to** thêm các loại blocks khác nhau  
**So that** tôi có thể tạo layout đa dạng

**Tasks:**
- [ ] ID_054: Channel Info block
- [ ] ID_055: Product Grid block
- [ ] ID_057: Category Collapse block
- [ ] ID_058: Category Tabs block
- [ ] ID_059: Carousel block
- [ ] Block templates và render functions
- [ ] Block settings forms

**Acceptance Criteria:**
- [ ] 5 block types hoạt động
- [ ] Mỗi block có settings form
- [ ] Blocks render đúng trên canvas

#### Story 7: Public Bio Page (15 points)
**As a** visitor  
**I want to** xem trang bio công khai  
**So that** tôi có thể xem sản phẩm affiliate

**Tasks:**
- [ ] ID_075: Display channel info
- [ ] ID_076: Render blocks dynamically
- [ ] ID_077: Apply theme colors
- [ ] ID_078-085: Block components (public versions)
- [ ] ID_086: Lazy load images
- [ ] ID_087: Image fallback
- [ ] ID_088: Responsive grid
- [ ] ID_089: Touch-friendly sizing
- [ ] ID_091: Affiliate link handling
- [ ] ID_097-100: Load data từ Supabase

**Acceptance Criteria:**
- [ ] Trang bio load và hiển thị đúng
- [ ] Blocks render theo layout config
- [ ] Theme colors được áp dụng
- [ ] Responsive trên mobile (375px)
- [ ] Images lazy load
- [ ] Affiliate links mở trong tab mới

### Daily Standup Focus

**Day 1:** Start Story 5 (Layout Builder Canvas)
**Day 2:** Complete Story 5, start Story 6 (Blocks)
**Day 3:** Complete Story 6, start Story 7 (Public Page)
**Day 4:** Complete Story 7, integration testing
**Day 5:** Bug fixes, performance optimization

### Deliverables
- ✅ Layout builder working
- ✅ All block types implemented
- ✅ Public bio page working
- ✅ Responsive design complete

### Definition of Done
- [ ] Layout builder hoàn chỉnh
- [ ] Public page render đúng
- [ ] Mobile responsive (375px)
- [ ] Performance acceptable (<2s load)

---

## Sprint 3: Polish & Enhancement (Week 3)

**Duration:** 5 ngày
**Goal:** Cải thiện UX và thêm tính năng nâng cao

### Sprint Goal
✅ Cải thiện trải nghiệm người dùng và thêm tính năng quản lý nâng cao

### User Stories

#### Story 8: Advanced Category Management (5 points)
**As a** creator  
**I want to** quản lý categories nâng cao  
**So that** tôi có thể tổ chức tốt hơn

**Tasks:**
- [ ] ID_013: Drag-drop reorder categories
- [ ] ID_014: Toggle hide/show category
- [ ] ID_015: Search/filter categories
- [ ] ID_016: Display product count per category

**Acceptance Criteria:**
- [ ] User có thể reorder categories bằng drag-drop
- [ ] User có thể ẩn/hiện categories
- [ ] Search categories hoạt động
- [ ] Product count hiển thị đúng

#### Story 9: Advanced Product Management (8 points)
**As a** creator  
**I want to** quản lý products nâng cao  
**So that** tôi có thể quản lý hiệu quả hơn

**Tasks:**
- [ ] ID_027: Drag-drop reorder products
- [ ] ID_028: Duplicate product
- [ ] ID_029: Toggle product status
- [ ] ID_031: Search products
- [ ] ID_032: Filter by category
- [ ] ID_033: Filter by status

**Acceptance Criteria:**
- [ ] User có thể reorder products
- [ ] User có thể duplicate product
- [ ] User có thể toggle status
- [ ] Search và filter hoạt động

#### Story 10: Theme Management (5 points)
**As a** creator  
**I want to** quản lý themes  
**So that** tôi có thể reuse và share themes

**Tasks:**
- [ ] ID_039: Theme library (view, delete, activate, duplicate)
- [ ] ID_040: Export theme JSON
- [ ] ID_041: Import theme JSON

**Acceptance Criteria:**
- [ ] User có thể xem tất cả themes
- [ ] User có thể export/import themes
- [ ] User có thể activate theme

#### Story 11: Fonts & Branding (5 points)
**As a** creator  
**I want to** tùy chỉnh fonts và branding  
**So that** bio của tôi có bản sắc riêng

**Tasks:**
- [ ] ID_063: Font selection (Google Fonts)
- [ ] ID_064: Font size scaling
- [ ] ID_065: Logo upload
- [ ] ID_066: Favicon upload
- [ ] ID_067: Social links

**Acceptance Criteria:**
- [ ] User có thể chọn fonts từ Google Fonts
- [ ] User có thể scale font size
- [ ] User có thể upload logo và favicon
- [ ] User có thể thêm social links

#### Story 12: Channel Management Enhancement (2 points)
**As a** creator  
**I want to** quản lý channel tốt hơn  
**So that** tôi có thể cập nhật thông tin

**Tasks:**
- [ ] ID_004: Disconnect TikTok account
- [ ] ID_005: Edit channel bio

**Acceptance Criteria:**
- [ ] User có thể disconnect account
- [ ] User có thể edit bio

### Daily Standup Focus

**Day 1:** Story 8 (Advanced Categories)
**Day 2:** Story 9 (Advanced Products)
**Day 3:** Story 10 (Theme Management)
**Day 4:** Story 11 (Fonts & Branding)
**Day 5:** Story 12 (Channel Enhancement), testing

### Deliverables
- ✅ Advanced CRUD features
- ✅ Theme management complete
- ✅ Fonts & branding working
- ✅ UX improvements

### Definition of Done
- [ ] Tất cả P1 features hoàn thành
- [ ] UX improvements tested
- [ ] Performance maintained

---

## Sprint 4: Advanced Features (Week 4)

**Duration:** 5 ngày
**Goal:** Thêm tính năng nâng cao và optimization

### Sprint Goal
✅ Hoàn thành tính năng nâng cao và tối ưu hóa performance

### User Stories

#### Story 13: Advanced Styling (8 points)
**As a** creator  
**I want to** tùy chỉnh styling nâng cao  
**So that** bio của tôi đẹp hơn

**Tasks:**
- [ ] ID_068: Advanced border styles
- [ ] ID_069: Advanced shadow styles
- [ ] ID_070: Global padding/spacing
- [ ] ID_071: Animation options
- [ ] ID_072: Animation duration

**Acceptance Criteria:**
- [ ] User có thể tùy chỉnh borders
- [ ] User có thể tùy chỉnh shadows
- [ ] User có thể điều chỉnh spacing
- [ ] Animations hoạt động

#### Story 14: Additional Blocks (3 points)
**As a** creator  
**I want to** thêm các blocks khác  
**So that** tôi có nhiều lựa chọn hơn

**Tasks:**
- [ ] ID_060: Hero Banner block
- [ ] ID_061: Custom Spacing block
- [ ] ID_062: Footer block

**Acceptance Criteria:**
- [ ] 3 block types mới hoạt động
- [ ] Blocks render đúng

#### Story 15: SEO & Sharing (5 points)
**As a** creator  
**I want to** optimize SEO và sharing  
**So that** bio của tôi dễ tìm và chia sẻ

**Tasks:**
- [ ] ID_092: Meta tags
- [ ] ID_093: Structured data (JSON-LD)
- [ ] ID_094: QR code generation
- [ ] ID_095: Social share buttons

**Acceptance Criteria:**
- [ ] Meta tags đầy đủ
- [ ] Structured data đúng format
- [ ] QR code generate được
- [ ] Share buttons hoạt động

#### Story 16: Performance & Optimization (2 points)
**As a** visitor  
**I want to** trang load nhanh  
**So that** tôi có trải nghiệm tốt

**Tasks:**
- [ ] ID_090: WebP image format
- [ ] ID_096: Dark mode (optional)
- [ ] Performance optimization
- [ ] Lighthouse score ≥ 90

**Acceptance Criteria:**
- [ ] Images được optimize (WebP)
- [ ] Page load < 2s
- [ ] Lighthouse score ≥ 90

### Daily Standup Focus

**Day 1:** Story 13 (Advanced Styling)
**Day 2:** Story 14 (Additional Blocks)
**Day 3:** Story 15 (SEO & Sharing)
**Day 4:** Story 16 (Performance)
**Day 5:** Final testing, documentation

### Deliverables
- ✅ Advanced styling complete
- ✅ Additional blocks working
- ✅ SEO optimized
- ✅ Performance optimized

### Definition of Done
- [ ] Tất cả P2 features hoàn thành
- [ ] Lighthouse score ≥ 90
- [ ] Documentation complete

---

## Sprint Metrics & Tracking

### Velocity Tracking

| Sprint | Planned Points | Completed Points | Velocity |
|--------|---------------|------------------|----------|
| Sprint 0 | 8 | - | - |
| Sprint 1 | 34 | - | - |
| Sprint 2 | 42 | - | - |
| Sprint 3 | 28 | - | - |
| Sprint 4 | 18 | - | - |

### Burndown Chart
- Track daily progress
- Identify blockers early
- Adjust sprint scope if needed

### Definition of Ready
- [ ] User story có acceptance criteria rõ ràng
- [ ] Dependencies đã được xác định
- [ ] Design/UI đã được approve
- [ ] Technical approach đã được discuss

### Definition of Done
- [ ] Code completed và reviewed
- [ ] Tests written và passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] Product Owner approved

---

## Risk Management

### High Risk Items

1. **Layout Builder Complexity**
   - **Risk:** Drag-drop builder phức tạp, có thể delay
   - **Mitigation:** Start early, use proven library (sortablejs)
   - **Contingency:** Simplify nếu cần

2. **TikTok OAuth Integration**
   - **Risk:** API có thể thay đổi hoặc khó integrate
   - **Mitigation:** Use mock trong MVP, real OAuth sau
   - **Contingency:** Extend timeline nếu cần

3. **Performance với nhiều products**
   - **Risk:** Page load chậm với 100+ products
   - **Mitigation:** Implement pagination/lazy loading
   - **Contingency:** Optimize queries và caching

### Medium Risk Items

1. **Theme System Complexity**
   - **Risk:** CSS variables có thể không đủ flexible
   - **Mitigation:** Test early với nhiều themes
   - **Contingency:** Add inline styles nếu cần

2. **Mobile Responsiveness**
   - **Risk:** Layout builder khó responsive
   - **Mitigation:** Test trên nhiều devices
   - **Contingency:** Simplify mobile preview

---

## Sprint Ceremonies

### Sprint Planning (2 hours)
- Review backlog
- Select stories for sprint
- Break down stories into tasks
- Estimate tasks
- Set sprint goal

### Daily Standup (15 minutes)
- What did I do yesterday?
- What will I do today?
- Any blockers?

### Sprint Review (1 hour)
- Demo completed features
- Get feedback
- Update product backlog

### Sprint Retrospective (1 hour)
- What went well?
- What could be improved?
- Action items for next sprint

---

## Success Criteria

### MVP (Sprint 1-2)
- ✅ All P0 features complete
- ✅ Layout builder working
- ✅ Public page functional
- ✅ Mobile responsive

### Full Release (Sprint 1-4)
- ✅ All features complete
- ✅ Performance optimized
- ✅ SEO optimized
- ✅ Lighthouse score ≥ 90
- ✅ Zero critical bugs

---

**Kết Thúc Sprint Plan**

