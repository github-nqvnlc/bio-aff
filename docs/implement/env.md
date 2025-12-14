# Environment Variables - Bio Affiliate Project

**Tạo:** 8 tháng 12, 2025
**Mục Đích:** Mô tả chi tiết tất cả environment variables cần thiết

---

## Hướng Dẫn Sử Dụng

1. Copy toàn bộ nội dung file này
2. Tạo file `.env` ở root project
3. Paste và điền các giá trị thực tế
4. **KHÔNG commit file `.env` vào Git**

---

## Environment Variables Template

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================
# Lấy từ: Supabase Dashboard → Project Settings → API
# Project URL
VITE_SUPABASE_URL=https://xxxxx.supabase.co

# Anon/Public Key (safe to expose in frontend)
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTk5OTksImV4cCI6MjAxNTc3NTk5OX0.xxxxx

# Service Role Key (ONLY for backend/admin operations, NEVER expose in frontend)
# Chỉ dùng khi cần bypass RLS policies (development only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTk5OTk5OSwiZXhwIjoyMDE1Nzc1OTk5fQ.xxxxx

# ============================================
# TIKTOK OAUTH CONFIGURATION (Optional - Phase 2)
# ============================================
# Lấy từ: TikTok Developer Portal → App Settings
# Chỉ cần khi implement real OAuth (Phase 2)
# Phase 1 (MVP) sử dụng mock OAuth, không cần các biến này

# TikTok OAuth Client Key
VITE_TIKTOK_CLIENT_ID=your_tiktok_client_key_here

# TikTok OAuth Client Secret (keep secret!)
VITE_TIKTOK_CLIENT_SECRET=your_tiktok_client_secret_here

# OAuth Redirect URI
# Development
VITE_TIKTOK_REDIRECT_URI=http://localhost:3000/admin.html
# Production (update khi deploy)
# VITE_TIKTOK_REDIRECT_URI=https://yourdomain.com/admin.html

# ============================================
# APPLICATION CONFIGURATION
# ============================================
# Application environment
NODE_ENV=development
# Options: development, production, test

# Application port (for Vite dev server)
PORT=3000

# Application URL (for OAuth redirects)
VITE_APP_URL=http://localhost:3000
# Production: https://yourdomain.com

# ============================================
# FEATURE FLAGS (Optional)
# ============================================
# Enable/disable features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_QR_CODE=true

# ============================================
# STORAGE CONFIGURATION
# ============================================
# Supabase Storage bucket name
VITE_STORAGE_BUCKET=product-images

# Maximum file size (in bytes)
VITE_MAX_FILE_SIZE=5242880
# 5MB = 5 * 1024 * 1024

# Allowed image MIME types (comma-separated)
VITE_ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp,image/gif

# ============================================
# DEVELOPMENT ONLY
# ============================================
# Enable debug mode (show console logs)
VITE_DEBUG=true

# Mock TikTok OAuth (Phase 1)
VITE_USE_MOCK_TIKTOK_AUTH=true
# Set to false when using real TikTok OAuth (Phase 2)
```

---

## Chi Tiết Từng Biến

### Supabase Variables

#### `VITE_SUPABASE_URL`
- **Mô tả:** URL của Supabase project
- **Format:** `https://xxxxx.supabase.co`
- **Lấy từ:** Supabase Dashboard → Project Settings → API → Project URL
- **Required:** ✅ Yes
- **Example:** `https://abcdefghijklmnop.supabase.co`

#### `VITE_SUPABASE_ANON_KEY`
- **Mô tả:** Anon/Public key để authenticate với Supabase API
- **Format:** JWT token string
- **Lấy từ:** Supabase Dashboard → Project Settings → API → anon/public key
- **Required:** ✅ Yes
- **Security:** Safe to expose in frontend (public key)
- **Example:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### `SUPABASE_SERVICE_ROLE_KEY`
- **Mô tả:** Service role key để bypass RLS policies (admin operations)
- **Format:** JWT token string
- **Lấy từ:** Supabase Dashboard → Project Settings → API → service_role key
- **Required:** ❌ No (chỉ cần cho admin operations)
- **Security:** ⚠️ **NEVER expose in frontend!** Chỉ dùng trong backend
- **Usage:** Development/testing only, không dùng trong production frontend

---

### TikTok OAuth Variables (Phase 2)

#### `VITE_TIKTOK_CLIENT_ID`
- **Mô tả:** TikTok OAuth Client Key
- **Format:** String
- **Lấy từ:** TikTok Developer Portal → App Settings → Basic Information → Client Key
- **Required:** ❌ No (chỉ cần Phase 2)
- **Example:** `awxxxxxxxxxxxxxxxxxx`

#### `VITE_TIKTOK_CLIENT_SECRET`
- **Mô tả:** TikTok OAuth Client Secret
- **Format:** String
- **Lấy từ:** TikTok Developer Portal → App Settings → Basic Information → Client Secret
- **Required:** ❌ No (chỉ cần Phase 2)
- **Security:** ⚠️ Keep secret! Không commit vào Git
- **Example:** `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### `VITE_TIKTOK_REDIRECT_URI`
- **Mô tả:** OAuth redirect URI sau khi login
- **Format:** Full URL
- **Required:** ❌ No (chỉ cần Phase 2)
- **Development:** `http://localhost:3000/admin.html`
- **Production:** `https://yourdomain.com/admin.html`
- **Note:** Phải match với redirect URI đã config trong TikTok Developer Portal

---

### Application Configuration

#### `NODE_ENV`
- **Mô tả:** Environment mode
- **Values:** `development`, `production`, `test`
- **Default:** `development`
- **Required:** ❌ No

#### `PORT`
- **Mô tả:** Port cho development server
- **Default:** `3000`
- **Required:** ❌ No
- **Note:** Chỉ dùng cho Vite dev server

#### `VITE_APP_URL`
- **Mô tả:** Base URL của application
- **Development:** `http://localhost:3000`
- **Production:** `https://yourdomain.com`
- **Required:** ❌ No (có thể infer từ window.location)

---

### Feature Flags

#### `VITE_ENABLE_ANALYTICS`
- **Mô tả:** Enable analytics tracking
- **Type:** Boolean
- **Default:** `false`
- **Required:** ❌ No

#### `VITE_ENABLE_DARK_MODE`
- **Mô tả:** Enable dark mode feature
- **Type:** Boolean
- **Default:** `true`
- **Required:** ❌ No

#### `VITE_ENABLE_QR_CODE`
- **Mô tả:** Enable QR code generation
- **Type:** Boolean
- **Default:** `true`
- **Required:** ❌ No

---

### Storage Configuration

#### `VITE_STORAGE_BUCKET`
- **Mô tả:** Supabase Storage bucket name
- **Default:** `product-images`
- **Required:** ❌ No (hardcoded trong code)
- **Note:** Nếu đổi tên bucket, cần update code

#### `VITE_MAX_FILE_SIZE`
- **Mô tả:** Maximum file size in bytes
- **Default:** `5242880` (5MB)
- **Required:** ❌ No
- **Formula:** `5 * 1024 * 1024 = 5242880`

#### `VITE_ALLOWED_IMAGE_TYPES`
- **Mô tả:** Comma-separated list of allowed MIME types
- **Default:** `image/jpeg,image/png,image/webp,image/gif`
- **Required:** ❌ No

---

### Development Variables

#### `VITE_DEBUG`
- **Mô tả:** Enable debug mode (show console logs)
- **Type:** Boolean
- **Default:** `true` (development), `false` (production)
- **Required:** ❌ No

#### `VITE_USE_MOCK_TIKTOK_AUTH`
- **Mô tả:** Use mock TikTok OAuth instead of real OAuth
- **Type:** Boolean
- **Default:** `true` (Phase 1), `false` (Phase 2)
- **Required:** ❌ No
- **Note:** Phase 1 dùng mock, Phase 2 dùng real OAuth

---

## Usage trong Code

### Accessing Environment Variables

**Vite (Frontend):**
```javascript
// Access với prefix VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if variable exists
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.error('Missing VITE_SUPABASE_URL');
}
```

**Node.js (Backend - nếu có):**
```javascript
// Access without VITE_ prefix
const nodeEnv = process.env.NODE_ENV;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
```

### Type Safety (Optional)

Tạo file `src/shared/env.js`:

```javascript
/**
 * Environment variables with validation
 */
export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  tiktok: {
    clientId: import.meta.env.VITE_TIKTOK_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_TIKTOK_CLIENT_SECRET || '',
    redirectUri: import.meta.env.VITE_TIKTOK_REDIRECT_URI || '',
  },
  app: {
    url: import.meta.env.VITE_APP_URL || window.location.origin,
    env: import.meta.env.NODE_ENV || 'development',
  },
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE !== 'false',
    qrCode: import.meta.env.VITE_ENABLE_QR_CODE !== 'false',
  },
  storage: {
    bucket: import.meta.env.VITE_STORAGE_BUCKET || 'product-images',
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '5242880'),
    allowedTypes: (import.meta.env.VITE_ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp,image/gif').split(','),
  },
  debug: import.meta.env.VITE_DEBUG === 'true',
  useMockAuth: import.meta.env.VITE_USE_MOCK_TIKTOK_AUTH !== 'false',
};

// Validate required variables
const requiredVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
];

requiredVars.forEach(varName => {
  if (!import.meta.env[varName]) {
    console.warn(`⚠️ Missing required environment variable: ${varName}`);
  }
});
```

---

## Security Best Practices

### ✅ DO:
- ✅ Sử dụng `VITE_` prefix cho frontend variables
- ✅ Commit `.env.example` với placeholder values
- ✅ Add `.env` vào `.gitignore`
- ✅ Use service role key chỉ trong backend
- ✅ Rotate keys nếu bị expose

### ❌ DON'T:
- ❌ Commit `.env` file với real values
- ❌ Expose service role key trong frontend
- ❌ Hardcode credentials trong code
- ❌ Share `.env` file qua insecure channels
- ❌ Use production keys trong development

---

## Production Deployment

Khi deploy production:

1. **Tạo `.env.production`:**
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxxx
   VITE_APP_URL=https://yourdomain.com
   VITE_TIKTOK_REDIRECT_URI=https://yourdomain.com/admin.html
   VITE_USE_MOCK_TIKTOK_AUTH=false
   VITE_DEBUG=false
   ```

2. **Set environment variables trên hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - GitHub Pages: Repository Settings → Secrets (nếu dùng Actions)

3. **Verify variables được load đúng:**
   - Check `import.meta.env` trong browser console
   - Verify không có undefined values

---

## Quick Start

1. Copy template từ file này
2. Tạo `.env` ở root project
3. Paste template
4. Điền Supabase credentials
5. Save file
6. Restart development server

```bash
# Quick copy command (macOS/Linux)
cat docs/implement/env.md | grep -A 100 "^```env" | grep -v "^```" > .env

# Hoặc manual copy từ section "Environment Variables Template"
```

---

**Kết Thúc Environment Variables Documentation**





