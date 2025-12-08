# Bio Affiliate - TikTok Bio Affiliate với Tùy Chỉnh Chủ Đề & Bố Cục

**Version:** 1.0.0  
**Created:** 8 tháng 12, 2025  
**Status:** In Development

---
## 💸 **Support My Work**

[![Sponsor](https://img.shields.io/badge/❤%EF%B8%8F_Sponsor_Me-FF5733?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/github-nqvnlc)
[![Buy Me A Coffee](https://img.shields.io/badge/☕_Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/locnv14r)
[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://github.com/sponsors/github-nqvnlc)

## 📋 Tổng Quan Dự Án

Bio Affiliate là một nền tảng cho phép TikTok creators tạo và quản lý trang bio affiliate với khả năng tùy chỉnh hoàn toàn về màu sắc, bố cục và nội dung.

### 🎯 3 Trụ Cột Cốt Lõi

1. **Cửa Hàng Liên Kết Bio TikTok** - Quản lý sản phẩm affiliate cơ bản
2. **Tùy Chỉnh Chủ Đề Hoàn Chỉnh** - Hệ thống theme màu sắc với 10+ preset và custom colors
3. **Trình Tạo Bố Cục Kéo-Thả** - Drag-drop layout builder với 9 loại blocks

### 📊 Thống Kê Dự Án

- **Tổng Tính Năng:** 100 tính năng (ID_001 đến ID_100)
- **Tính Năng Admin:** 48 mục (58%)
- **Tính Năng Công Khai:** 34 mục (42%)
- **MVP (P0):** 35 tính năng (43%)
- **Timeline:** 4 tuần (MVP: 2 tuần)

---

## 🚀 Quick Start

### Yêu Cầu Hệ Thống
- Node.js v18.0.0+
- npm v9.0.0+ hoặc yarn
- Git
- Supabase account (free tier)

### Setup Nhanh

```bash
# 1. Clone repository
git clone <repository-url>
cd bio-aff

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp docs/implement/env.md .env
# Edit .env và điền Supabase credentials

# 4. Setup Supabase database
# Follow: docs/implement/setup.md

# 5. Start development server
npm run dev
```

**Chi tiết setup:** Xem [docs/implement/setup.md](docs/implement/setup.md)

---

## 📚 Tài Liệu Dự Án

### 📁 Cấu Trúc Thư Mục Docs

```
docs/
├── analytics/          # Phân tích chi tiết
│   ├── analytics-req.md      # Phân tích yêu cầu (100 tính năng)
│   ├── analytics-tech.md     # Phân tích công nghệ & stack
│   ├── analytics-db.md       # Phân tích database schema
│   └── analytics-db.drawio   # ERD diagram
│
├── implement/          # Kế hoạch triển khai
│   ├── sprint-plan.md        # Kế hoạch sprint (4 tuần)
│   ├── task-breakdown.md     # Breakdown chi tiết tasks
│   ├── setup.md              # Hướng dẫn setup dự án
│   └── env.md                # Environment variables template
│
└── reseach-feature/    # Nghiên cứu tính năng
    ├── req.md
    ├── tech.md
    ├── todo.md
    └── UPDATES.md
```

---

## 📖 Tài Liệu Chi Tiết

### 1. Phân Tích Yêu Cầu ([analytics-req.md](docs/analytics/analytics-req.md))

**Nội dung:**
- Tổng quan dự án và phân bố tính năng
- Danh sách đầy đủ 100 tính năng (ID_001 đến ID_100)
- Phân loại theo ưu tiên (P0, P1, P2)
- Phân loại theo vai trò (Admin, Công Khai)
- Phân loại theo lớp triển khai (Frontend, Backend, Database)
- Trình tự triển khai được đề xuất
- Phân tích rủi ro và độ phức tạp

**Key Metrics:**
- 100 tính năng tổng cộng
- 35 tính năng MVP (P0)
- 28 tính năng P1
- 19 tính năng P2

---

### 2. Phân Tích Công Nghệ ([analytics-tech.md](docs/analytics/analytics-tech.md))

**Nội dung:**
- Technology stack chi tiết
- Frontend stack (HTML5, CSS3, Vanilla JS)
- Backend stack (Supabase PostgreSQL)
- Database chi tiết
- Ánh xạ tính năng → công nghệ
- Thư viện & dependencies
- Kiến trúc ứng dụng
- Quyết định thiết kế

**Tech Stack:**
- **Frontend:** Vanilla JavaScript ES6+, CSS3 + CSS Variables
- **Backend:** Supabase (PostgreSQL + Storage)
- **Auth:** TikTok OAuth 2.0 (mock Phase 1)
- **Libraries:** sortablejs, @supabase/supabase-js
- **Build:** Vite (optional) hoặc Live Server

---

### 3. Phân Tích Database ([analytics-db.md](docs/analytics/analytics-db.md))

**Nội dung:**
- Tổng quan database architecture
- Chi tiết 5 bảng (channels, categories, products, color_themes, bio_layouts)
- Mối quan hệ giữa các bảng
- ERD Diagram (DrawIO format)
- Indexes & Performance optimization
- Row Level Security (RLS) policies
- Constraints & Business rules
- Storage buckets setup
- Migration & Seeding scripts
- Query patterns

**Database Schema:**
- 5 tables chính
- JSONB cho flexible data (themes, layouts)
- Cascade deletes
- RLS policies cho security

**ERD Diagram:** [analytics-db.drawio](docs/analytics/analytics-db.drawio)

---

### 4. Sprint Plan ([sprint-plan.md](docs/implement/sprint-plan.md))

**Nội dung:**
- Kế hoạch 5 sprints (Sprint 0-4)
- User stories cho mỗi sprint
- Story points estimation
- Daily standup focus
- Risk management
- Sprint ceremonies
- Success criteria

**Sprint Overview:**
- **Sprint 0:** Setup & Infrastructure (8 points)
- **Sprint 1:** Core CRUD & Theme (34 points)
- **Sprint 2:** Layout Builder & Public Page (42 points)
- **Sprint 3:** Polish & Enhancement (28 points)
- **Sprint 4:** Advanced Features (18 points)

**Total:** 130 story points

---

### 5. Task Breakdown ([task-breakdown.md](docs/implement/task-breakdown.md))

**Nội dung:**
- Breakdown chi tiết theo Epic → Story → Task → Sub-task
- Estimation (story points, time, complexity)
- Dependencies giữa các tasks
- Acceptance criteria cho mỗi task
- Files to create/modify
- Testing checklist
- Definition of Done

**Epic Structure:**
- **Epic 0:** Project Setup & Infrastructure (7 tasks)
- **Epic 1:** Authentication & Channel Management
- **Epic 2:** Category Management
- **Epic 3:** Product Management
- **Epic 4:** Theme System
- **Epic 5:** Layout Builder
- **Epic 6:** Block Components
- **Epic 7:** Public Bio Page

---

### 6. Setup Guide ([setup.md](docs/implement/setup.md))

**Nội dung:**
- Yêu cầu hệ thống
- Đăng ký tài khoản third-party (Supabase, TikTok)
- Setup môi trường development
- Setup Supabase (project, database, storage)
- Setup TikTok OAuth (optional)
- Cấu hình environment variables
- Verify setup
- Troubleshooting

**Quick Steps:**
1. Install Node.js và npm
2. Tạo Supabase project
3. Setup database schema
4. Configure environment variables
5. Start development server

---

### 7. Environment Variables ([env.md](docs/implement/env.md))

**Nội dung:**
- Template đầy đủ environment variables
- Chi tiết từng biến (mô tả, format, cách lấy)
- Security best practices
- Usage trong code
- Production deployment guide

**Required Variables:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TIKTOK_CLIENT_ID` (Phase 2)
- `VITE_TIKTOK_CLIENT_SECRET` (Phase 2)

**Quick Copy:**
```bash
# Copy template từ env.md
cat docs/implement/env.md | grep -A 100 "^```env" | grep -v "^```" > .env
```

---

## 🏗️ Kiến Trúc Dự Án

### Cấu Trúc Thư Mục

```
bio-aff/
├── docs/                    # Tài liệu dự án
│   ├── analytics/           # Phân tích chi tiết
│   ├── implement/          # Kế hoạch triển khai
│   └── reseach-feature/    # Nghiên cứu tính năng
│
├── src/                     # Source code
│   ├── shared/             # Shared utilities
│   │   ├── storage.js      # Supabase wrapper
│   │   ├── tiktok-auth.js  # OAuth handler
│   │   ├── theme-manager.js
│   │   ├── layout-builder.js
│   │   └── blocks/         # Block components
│   │
│   ├── admin/              # Admin panel
│   │   ├── admin.html
│   │   ├── admin.css
│   │   ├── admin.js
│   │   ├── components/
│   │   └── styles/
│   │
│   ├── bio/                # Public bio page
│   │   ├── bio.html
│   │   ├── bio.css
│   │   ├── bio.js
│   │   ├── components/
│   │   └── styles/
│   │
│   └── assets/             # Static assets
│
├── logs/                    # Task logs
├── public/                  # Public assets
├── .env                     # Environment variables (local)
├── .env.example            # Environment template
├── package.json
├── vite.config.js          # Vite config (optional)
└── README.md               # This file
```

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3 + CSS Variables** - Dynamic theming
- **Vanilla JavaScript ES6+** - No framework dependencies
- **sortablejs** - Drag-drop functionality

### Backend & Database
- **Supabase** - PostgreSQL database + Storage
- **PostgreSQL 15+** - Relational database
- **Supabase Storage** - Image storage

### Development Tools
- **Vite** - Build tool (optional)
- **Live Server** - Development server (alternative)
- **Git** - Version control

### Third-Party Services
- **TikTok OAuth 2.0** - Authentication (Phase 2)
- **Google Fonts** - Custom fonts
- **Supabase** - Backend as a Service

---

## 📊 Database Schema

### Tables Overview

1. **channels** - Thông tin kênh TikTok
2. **categories** - Danh mục sản phẩm
3. **products** - Sản phẩm affiliate
4. **color_themes** - Cấu hình theme màu sắc
5. **bio_layouts** - Cấu hình layout drag-drop

### Relationships

```
channels (1) ──→ (nhiều) categories
channels (1) ──→ (nhiều) products
channels (1) ──→ (1) bio_layouts
channels (1) ──→ (nhiều) color_themes
categories (1) ──→ (nhiều) products
```

**Chi tiết:** Xem [analytics-db.md](docs/analytics/analytics-db.md)

---

## 🎯 Tính Năng Chính

### Admin Panel
- ✅ TikTok OAuth login (mock Phase 1)
- ✅ Quản lý categories (CRUD)
- ✅ Quản lý products (CRUD với image upload)
- ✅ Theme customization (10+ presets + custom)
- ✅ Drag-drop layout builder
- ✅ 9 block types
- ✅ Responsive preview
- ✅ Auto-save & publish

### Public Bio Page
- ✅ Dynamic block rendering
- ✅ Theme color application
- ✅ Responsive design (375px priority)
- ✅ Lazy loading images
- ✅ SEO optimization
- ✅ Affiliate link handling

**Chi tiết:** Xem [analytics-req.md](docs/analytics/analytics-req.md)

---

## 📅 Timeline & Milestones

### Sprint 0: Setup (Week 0)
- Project structure
- Supabase setup
- Database schema
- Development environment

### Sprint 1: Core CRUD & Theme (Week 1)
- Authentication
- Category management
- Product management
- Theme system

### Sprint 2: Layout Builder & Public Page (Week 2)
- Layout builder canvas
- Block components
- Public page rendering
- MVP Complete ✅

### Sprint 3: Polish & Enhancement (Week 3)
- Advanced CRUD features
- Theme management
- Fonts & branding
- UX improvements

### Sprint 4: Advanced Features (Week 4)
- Advanced styling
- SEO & sharing
- Performance optimization
- Full Release ✅

**Chi tiết:** Xem [sprint-plan.md](docs/implement/sprint-plan.md)

---

## 🚦 Getting Started

### Bước 1: Đọc Tài Liệu

**Bắt đầu với:**
1. [analytics-req.md](docs/analytics/analytics-req.md) - Hiểu yêu cầu
2. [analytics-tech.md](docs/analytics/analytics-tech.md) - Hiểu tech stack
3. [analytics-db.md](docs/analytics/analytics-db.md) - Hiểu database
4. [setup.md](docs/implement/setup.md) - Setup môi trường

### Bước 2: Setup Project

**Follow:**
- [setup.md](docs/implement/setup.md) - Hướng dẫn setup chi tiết
- [env.md](docs/implement/env.md) - Cấu hình environment variables

### Bước 3: Bắt Đầu Development

**Reference:**
- [task-breakdown.md](docs/implement/task-breakdown.md) - Breakdown tasks
- [sprint-plan.md](docs/implement/sprint-plan.md) - Sprint planning

**Workflow:**
1. Đọc task từ `task-breakdown.md`
2. Check dependencies
3. Implement task
4. Update task status
5. Create log file
6. Stop và hỏi user

---

## 📝 Development Workflow

### Task Workflow

1. **Read Documentation** - Đọc tất cả docs trước khi bắt đầu
2. **Reference Task** - Tham chiếu task từ `task-breakdown.md`
3. **Check Dependencies** - Verify dependencies đã hoàn thành
4. **Update Status** - Mark task "In Progress" trong `task-breakdown.md`
5. **Implement** - Code theo specification
6. **Update Progress** - Update checkboxes khi hoàn thành sub-tasks
7. **Test** - Test acceptance criteria
8. **Update Status** - Mark "Completed" với completion date
9. **Create Log** - Tạo log file trong `logs/`
10. **Stop & Ask** - Dừng lại và hỏi user tiếp tục hay không

**Chi tiết:** Xem [.cursor/rules/bio-affiliate-rule.mdc](.cursor/rules/bio-affiliate-rule.mdc)

---

## 🧪 Testing

### Test Checklist

- [ ] Unit tests cho utilities
- [ ] Integration tests cho CRUD operations
- [ ] E2E tests cho user flows
- [ ] Cross-browser testing
- [ ] Mobile testing (375px, 640px, 1024px)
- [ ] Performance testing (Lighthouse ≥90)
- [ ] Accessibility testing (WCAG 2.1 AA)

---

## 📦 Dependencies

### Production
```json
{
  "@supabase/supabase-js": "^2.38.0",
  "sortablejs": "^1.15.0"
}
```

### Development (Optional)
```json
{
  "vite": "^5.0.0"
}
```

**Install:**
```bash
npm install
```

---

## 🔐 Environment Variables

**Required:**
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key

**Optional (Phase 2):**
- `VITE_TIKTOK_CLIENT_ID` - TikTok OAuth client key
- `VITE_TIKTOK_CLIENT_SECRET` - TikTok OAuth client secret

**Template:** Xem [env.md](docs/implement/env.md)

---

## 📈 Project Status

### Current Phase
- **Status:** Planning & Setup
- **Sprint:** Sprint 0 (Setup)
- **Progress:** 0% (chưa bắt đầu implementation)

### Next Steps
1. Complete Epic 0: Project Setup
2. Start Epic 1: Authentication & Channel Management
3. Follow sprint plan

---

## 📚 Tài Liệu Tham Khảo

### Internal Documentation
- [Requirements Analysis](docs/analytics/analytics-req.md)
- [Technology Analysis](docs/analytics/analytics-tech.md)
- [Database Analysis](docs/analytics/analytics-db.md)
- [Sprint Plan](docs/implement/sprint-plan.md)
- [Task Breakdown](docs/implement/task-breakdown.md)
- [Setup Guide](docs/implement/setup.md)
- [Environment Variables](docs/implement/env.md)

### External Resources
- [Supabase Documentation](https://supabase.com/docs)
- [TikTok OAuth Docs](https://developers.tiktok.com/doc/oauth-setup)
- [sortablejs Documentation](https://sortablejs.github.io/Sortable/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🤝 Contributing

### Development Rules
- Follow [Cursor Rules](.cursor/rules/bio-affiliate-rule.mdc)
- Update task status trong `task-breakdown.md`
- Create log files sau mỗi task
- Test acceptance criteria
- Fix lint errors trước khi complete

### Git Workflow
- Commit messages in English only
- Format: `[type]: [description]`
- Commit only when requested

---


## 📄 License

[Add license information here]

---

## 🎉 Acknowledgments

Dự án này được xây dựng dựa trên nhiều công nghệ, thư viện và dịch vụ tuyệt vời. Chúng tôi xin cảm ơn:

### 🏗️ Infrastructure & Backend
- **[Supabase](https://supabase.com/)** - Cảm ơn team Supabase đã cung cấp nền tảng BaaS (Backend as a Service) xuất sắc với PostgreSQL, Storage, và Authentication. Supabase giúp chúng tôi tập trung vào frontend mà không cần lo lắng về backend infrastructure.

### 🔐 Authentication & APIs
- **[TikTok Developers](https://developers.tiktok.com/)** - Cảm ơn TikTok đã cung cấp OAuth 2.0 API cho phép tích hợp đăng nhập và lấy thông tin kênh một cách an toàn.

### 🎨 Frontend Libraries
- **[SortableJS](https://sortablejs.github.io/Sortable/)** - Thư viện drag-and-drop mạnh mẽ giúp xây dựng layout builder với trải nghiệm người dùng mượt mà.
- **[Google Fonts](https://fonts.google.com/)** - Cung cấp bộ sưu tập phông chữ miễn phí và chất lượng cao cho việc tùy chỉnh typography.

### 🛠️ Development Tools
- **[Vite](https://vitejs.dev/)** - Build tool nhanh chóng và hiện đại cho development experience tốt hơn.
- **[Node.js](https://nodejs.org/)** - Runtime environment cho JavaScript ecosystem.
- **[Git](https://git-scm.com/)** - Version control system không thể thiếu.

### 📚 Documentation & Resources
- **[MDN Web Docs](https://developer.mozilla.org/)** - Tài liệu tham khảo không thể thiếu cho web development.
- **[W3C WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** - Hướng dẫn về accessibility giúp dự án đạt chuẩn WCAG 2.1 AA.

### 🌟 Open Source Community
- Cảm ơn **cộng đồng open source** đã tạo ra và duy trì các công cụ, thư viện miễn phí giúp dự án này có thể phát triển.
- Cảm ơn tất cả **contributors** đã đóng góp code, báo lỗi, và đề xuất cải tiến cho các dự án open source mà chúng tôi sử dụng.

### 💡 Inspiration
- Cảm ơn các **TikTok creators** và **affiliate marketers** đã truyền cảm hứng cho dự án này.
- Cảm ơn các **designers** và **developers** trong cộng đồng đã chia sẻ kiến thức và best practices.

---

**Nếu bạn thấy dự án này hữu ích, hãy xem xét:**
- ⭐ Star repository này trên GitHub
- 🐛 Báo cáo bugs hoặc đề xuất features
- 💬 Chia sẻ feedback và suggestions
- 🤝 Đóng góp code hoặc documentation

---

**Last Updated:** 8 tháng 12, 2025

---

## 📞 Support & Contact

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:locnv14@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:84582070987)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/github-nqvnlc)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/linkedlocnv14/)

---

<div align="center">
<sub>© 2025 <a href="https://github.com/github-nqvnlc">Van Loc</a>. Made with ❤️ and lots of ☕</sub>
</div>