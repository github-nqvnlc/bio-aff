# Project Setup Guide - Bio Affiliate

**Tạo:** 8 tháng 12, 2025
**Mục Đích:** Hướng dẫn chi tiết setup dự án từ đầu

---

## Mục Lục
1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Đăng Ký Tài Khoản Third-Party](#đăng-ký-tài-khoản-third-party)
3. [Setup Môi Trường Development](#setup-môi-trường-development)
4. [Setup Supabase](#setup-supabase)
5. [Setup Database Schema](#setup-database-schema)
6. [Setup Storage](#setup-storage)
7. [Setup TikTok OAuth (Optional)](#setup-tiktok-oauth-optional)
8. [Cấu Hình Environment Variables](#cấu-hình-environment-variables)
9. [Verify Setup](#verify-setup)
10. [Troubleshooting](#troubleshooting)

---

## Yêu Cầu Hệ Thống

### Phần Mềm Cần Thiết
- **Node.js:** v18.0.0 hoặc cao hơn
- **npm:** v9.0.0 hoặc cao hơn (hoặc yarn v1.22+)
- **Git:** Latest version
- **Code Editor:** VS Code (recommended) hoặc bất kỳ editor nào
- **Browser:** Chrome, Firefox, Safari, hoặc Edge (latest 2 versions)

### Kiến Thức Cần Thiết
- HTML5, CSS3, JavaScript ES6+
- Basic understanding of PostgreSQL
- Git basics
- Command line basics

---

## Đăng Ký Tài Khoản Third-Party

### 1. Supabase Account

**Bước 1: Đăng Ký**
1. Truy cập https://supabase.com
2. Click "Start your project"
3. Đăng ký bằng GitHub, Google, hoặc Email
4. Verify email nếu cần

**Bước 2: Tạo Project**
1. Click "New Project"
2. Điền thông tin:
   - **Organization:** Tạo mới hoặc chọn existing
   - **Name:** `bio-affiliate` (hoặc tên bạn muốn)
   - **Database Password:** Tạo password mạnh (lưu lại!)
   - **Region:** Chọn region gần bạn nhất (VD: `Southeast Asia (Singapore)`)
   - **Pricing Plan:** Free tier (đủ cho development)
3. Click "Create new project"
4. Đợi project được tạo (2-3 phút)

**Bước 3: Lấy Credentials**
1. Vào Project Settings → API
2. Copy các giá trị sau:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon/public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Lưu vào file `.env` (sẽ tạo sau)

**Lưu Ý:**
- Free tier có giới hạn: 500MB database, 1GB bandwidth/month
- Đủ cho development và testing
- Có thể upgrade sau nếu cần

---

### 2. TikTok Developer Account (Optional - Phase 2)

**Bước 1: Đăng Ký Developer Account**
1. Truy cập https://developers.tiktok.com
2. Click "Get Started"
3. Đăng nhập bằng TikTok account
4. Complete developer registration

**Bước 2: Tạo App**
1. Vào Developer Portal
2. Click "Create App"
3. Điền thông tin:
   - **App Name:** Bio Affiliate App
   - **App Category:** Business/Other
   - **Description:** TikTok Bio Affiliate Management
4. Submit for review (có thể mất vài ngày)

**Bước 3: Lấy OAuth Credentials**
1. Vào App Settings → Basic Information
2. Copy:
   - **Client Key:** `xxxxx`
   - **Client Secret:** `xxxxx` (giữ bí mật!)
3. Lưu vào `.env`

**Lưu Ý:**
- Trong Phase 1 (MVP), sử dụng mock OAuth
- Real OAuth chỉ cần khi deploy production
- Có thể skip bước này nếu chỉ development

---

## Setup Môi Trường Development

### Bước 1: Clone Repository

```bash
# Nếu có Git repository
git clone <repository-url>
cd bio-aff

# Hoặc tạo project mới
mkdir bio-aff
cd bio-aff
git init
```

### Bước 2: Install Node.js

**macOS (Homebrew):**
```bash
brew install node
node --version  # Kiểm tra version (cần >= 18.0.0)
npm --version
```

**Windows:**
1. Download từ https://nodejs.org
2. Install Node.js LTS version
3. Verify: `node --version` và `npm --version`

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
```

### Bước 3: Tạo Project Structure

```bash
# Tạo cấu trúc thư mục
mkdir -p src/{admin,bio,shared,assets}
mkdir -p src/admin/{components,styles}
mkdir -p src/bio/{components,styles}
mkdir -p src/shared/blocks
mkdir -p docs/{analysis,implement,logs}
mkdir -p public
```

### Bước 4: Initialize npm Project

```bash
npm init -y
```

Sau đó edit `package.json` theo `analysis-tech.md` hoặc copy từ template:

```json
{
  "name": "bio-affiliate",
  "version": "1.0.0",
  "type": "module",
  "description": "TikTok Bio Affiliate with Theme Customization",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0",
    "sortablejs": "^1.15.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### Bước 5: Install Dependencies

```bash
npm install
```

### Bước 6: Setup Vite (Optional - nếu dùng build tool)

Tạo `vite.config.js`:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
```

**Hoặc sử dụng Live Server (simpler):**
- Install VS Code extension "Live Server"
- Right-click `src/admin/admin.html` → "Open with Live Server"

---

## Setup Supabase

### Bước 1: Tạo Supabase Project

1. Đăng nhập vào https://supabase.com/dashboard
2. Click "New Project"
3. Điền thông tin (xem phần Đăng Ký Tài Khoản)
4. Đợi project ready (2-3 phút)

### Bước 2: Lấy API Credentials

1. Vào Project Settings → API
2. Copy các giá trị:
   - **URL:** `https://xxxxx.supabase.co`
   - **anon key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Lưu vào `.env` file (sẽ tạo sau)

### Bước 3: Test Connection

Tạo file test `test-supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
async function testConnection() {
  const { data, error } = await supabase.from('channels').select('count');
  console.log('Connection test:', error ? 'Failed' : 'Success');
}

testConnection();
```

---

## Setup Database Schema

### Bước 1: Mở SQL Editor

1. Vào Supabase Dashboard
2. Click "SQL Editor" ở sidebar
3. Click "New query"

### Bước 2: Chạy Migration Script

Copy toàn bộ SQL từ `docs/analysis/analysis-db.md` section "Migration Script" hoặc từ file `docs/database/migration_001_initial_schema.sql` (nếu có).

**Hoặc chạy từng bước:**

1. **Tạo tables:**
   - Copy SQL CREATE TABLE statements
   - Paste vào SQL Editor
   - Click "Run"

2. **Tạo indexes:**
   - Copy CREATE INDEX statements
   - Run

3. **Tạo triggers:**
   - Copy CREATE FUNCTION và CREATE TRIGGER statements
   - Run

4. **Enable RLS:**
   - Copy ALTER TABLE ENABLE ROW LEVEL SECURITY statements
   - Run

5. **Tạo RLS policies:**
   - Copy CREATE POLICY statements
   - Run

### Bước 3: Verify Schema

1. Vào "Table Editor" trong Supabase Dashboard
2. Kiểm tra 5 tables đã được tạo:
   - `channels`
   - `categories`
   - `products`
   - `color_themes`
   - `bio_layouts`

### Bước 4: Test Database Operations

Tạo test script hoặc dùng Supabase Dashboard để test:
- INSERT một record vào `channels`
- SELECT records
- Verify foreign keys hoạt động

---

## Setup Storage

### Bước 1: Tạo Storage Bucket

1. Vào Supabase Dashboard → Storage
2. Click "New bucket"
3. Điền thông tin:
   - **Name:** `product-images`
   - **Public bucket:** ✅ Check (để public có thể xem images)
   - **File size limit:** `5242880` (5MB)
   - **Allowed MIME types:** `image/jpeg,image/png,image/webp,image/gif`
4. Click "Create bucket"

### Bước 2: Setup Storage Policies

1. Vào Storage → Policies
2. Click "New Policy" cho bucket `product-images`

**Policy 1: Public Read**
```sql
CREATE POLICY "Public can read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 3: Authenticated Delete**
```sql
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### Bước 3: Test Storage

1. Vào Storage → `product-images`
2. Click "Upload file"
3. Upload một test image
4. Verify file được upload và có public URL

---

## Setup TikTok OAuth (Optional)

### Phase 1: Mock OAuth (Development)

Không cần setup gì, sử dụng mock data trong code.

### Phase 2: Real OAuth (Production)

**Bước 1: Tạo TikTok App**
1. Đăng nhập https://developers.tiktok.com
2. Tạo app mới (xem phần Đăng Ký Tài Khoản)
3. Đợi approval (có thể mất vài ngày)

**Bước 2: Configure OAuth**
1. Vào App Settings → OAuth
2. Add redirect URI:
   - Development: `http://localhost:3000/admin.html`
   - Production: `https://yourdomain.com/admin.html`
3. Copy Client Key và Client Secret
4. Lưu vào `.env`

**Bước 3: Test OAuth Flow**
1. Implement OAuth flow trong code
2. Test login với TikTok account
3. Verify access token được lấy

---

## Cấu Hình Environment Variables

### Bước 1: Tạo .env File

```bash
# Copy từ env.md hoặc .env.example
cp docs/implement/env.md .env
# Hoặc
cp .env.example .env
```

### Bước 2: Fill Environment Variables

Mở `.env` và điền các giá trị từ Supabase và TikTok (nếu có):

```env
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# TikTok OAuth (Optional - Phase 2)
VITE_TIKTOK_CLIENT_ID=your_client_key
VITE_TIKTOK_CLIENT_SECRET=your_client_secret
VITE_TIKTOK_REDIRECT_URI=http://localhost:3000/admin.html
```

### Bước 3: Verify .gitignore

Đảm bảo `.env` được ignore:

```gitignore
# Environment variables
.env
.env.local
.env.*.local

# Logs
logs/
*.log

# Dependencies
node_modules/

# Build
dist/
build/
```

---

## Verify Setup

### Checklist Setup

- [ ] Node.js và npm installed
- [ ] Project structure created
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] Supabase credentials trong `.env`
- [ ] Database schema created (5 tables)
- [ ] Storage bucket created
- [ ] Storage policies configured
- [ ] Development server runs (`npm run dev` hoặc Live Server)
- [ ] No errors in console
- [ ] Can connect to Supabase
- [ ] Can upload image to Storage

### Test Scripts

**Test Supabase Connection:**
```javascript
// test-connection.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const { data, error } = await supabase.from('channels').select('count');
console.log('Supabase connection:', error ? 'Failed' : 'Success');
```

**Test Storage:**
```javascript
// test-storage.js
const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
const { data, error } = await supabase.storage
  .from('product-images')
  .upload('test/test.jpg', file);
console.log('Storage upload:', error ? 'Failed' : 'Success');
```

---

## Troubleshooting

### Lỗi Thường Gặp

#### 1. "Cannot find module '@supabase/supabase-js'"
**Giải pháp:**
```bash
npm install @supabase/supabase-js
```

#### 2. "Invalid API key" khi connect Supabase
**Giải pháp:**
- Kiểm tra `.env` file có đúng format không
- Verify Supabase URL và anon key từ Dashboard
- Đảm bảo variables có prefix `VITE_` (cho Vite)

#### 3. "RLS policy violation"
**Giải pháp:**
- Kiểm tra RLS policies đã được tạo chưa
- Verify policies allow operations bạn đang thực hiện
- Test với service role key nếu cần (chỉ development)

#### 4. "Storage bucket not found"
**Giải pháp:**
- Verify bucket name đúng: `product-images`
- Kiểm tra bucket đã được tạo trong Dashboard
- Verify Storage policies

#### 5. "CORS error" khi call API
**Giải pháp:**
- Supabase tự handle CORS, không cần config
- Nếu vẫn lỗi, kiểm tra Supabase URL đúng không

#### 6. Development server không chạy
**Giải pháp:**
- Kiểm tra port 3000 có bị chiếm không
- Thử port khác: `vite --port 3001`
- Hoặc dùng Live Server extension

---

## Next Steps

Sau khi setup xong:

1. ✅ Verify tất cả checklist items
2. ✅ Test database connection
3. ✅ Test storage upload
4. ✅ Start development server
5. ✅ Bắt đầu Epic 1: Authentication & Channel Management

**Reference:**
- Xem `docs/implement/task-breakdown.md` cho Task 0.1.1 đến 0.1.7
- Xem `docs/implement/env.md` cho chi tiết environment variables
- Xem `docs/analysis/analysis-db.md` cho database schema

---

**Kết Thúc Setup Guide**





