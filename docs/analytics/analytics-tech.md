# Phân Tích Công Nghệ Chi Tiết - Bio Affiliate Project

**Tạo:** 8 tháng 12, 2025
**Dựa trên:** analysis-req.md (100 tính năng) + tech.md (stack recommendations)
**Mục Đích:** Ánh xạ từng tính năng → công nghệ/thư viện cụ thể

---

## Mục Lục
1. [Tóm Tắt Công Nghệ](#tóm-tắt-công-nghệ)
2. [Frontend Stack Chi Tiết](#frontend-stack-chi-tiết)
3. [Backend Stack Chi Tiết](#backend-stack-chi-tiết)
4. [Database Chi Tiết](#database-chi-tiết)
5. [Ánh Xạ Tính Năng → Công Nghệ](#ánh-xạ-tính-năng--công-nghệ)
6. [Thư Viện & Dependencies](#thư-viện--dependencies)
7. [Kiến Trúc Ứng Dụng](#kiến-trúc-ứng-dụng)
8. [Quyết Định Thiết Kế Chi Tiết](#quyết-định-thiết-kế-chi-tiết)

---

## Tóm Tắt Công Nghệ

### Stack Chính
| Tầng | Công Nghệ | Phiên Bản | Lý Do |
|-----|----------|---------|-------|
| **Markup** | HTML5 | Latest | Semantic, form handling, media |
| **Styling** | CSS3 + CSS Variables | Latest | Theming dynamic, gradient, responsive |
| **Logic** | Vanilla JavaScript ES6+ | Latest | Nhẹ, không dependencies, load nhanh |
| **Storage** | Supabase (PostgreSQL) | v2 | Real-time, bucket images, open-source |
| **Auth** | TikTok OAuth 2.0 | Latest | Official API, mock available |
| **UI Library** | sortablejs | v1.15+ | Drag-drop builder, lightweight |
| **Color Picker** | vanilla color picker / jscolor | Latest | 5-color system, WCAG validation |
| **Fonts** | Google Fonts API | Latest | Phông chữ tùy chỉnh, free |
| **Development** | Live Server / VSCode | - | Static files, hot reload |
| **Deployment** | Vercel / GitHub Pages | - | Static hosting, CDN global |

---

## Frontend Stack Chi Tiết

### 1. HTML5
**Dùng Cho:** ID_001, ID_003, ID_007, ID_010, ID_017, ID_024, ID_034, ID_042, ID_075

**Tính Năng Chính:**
- `<form>` elements: Input validation, submit handling
- `<input type="file">`: Product image upload
- `<input type="color">`: Color picker input
- `<input type="text">`, `<input type="url">`: Form fields
- `<canvas>`: Responsive preview render (tuỳ chọn)
- `<template>`: Reusable block component templates
- `<dialog>`: Modal dialogs (confirm delete, settings)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`

**Form Handling:**
```html
<!-- Admin Product Form -->
<form id="productForm">
  <input type="text" name="title" required placeholder="Product Title">
  <textarea name="description"></textarea>
  <input type="file" name="image" accept="image/*">
  <select name="categoryId" required>
    <option value="">Select Category</option>
  </select>
  <input type="url" name="link" required>
  <button type="submit">Add Product</button>
</form>

<!-- Template reusable components -->
<template id="blockTemplate">
  <div class="block" draggable="true" data-block-id="">
    <!-- Block content -->
  </div>
</template>
```

---

### 2. CSS3 + CSS Variables
**Dùng Cho:** ID_035, ID_036, ID_037, ID_063, ID_064, ID_068, ID_069, ID_070, ID_077

**5-Color System (CSS Variables):**
```css
:root {
  /* 5-color palette */
  --color-primary: #FF6B9D;      /* Pink chính */
  --color-secondary: #FFB5D8;    /* Pink phụ */
  --color-background: #FFF5F9;   /* Nền sáng */
  --color-text: #333333;         /* Văn bản tối */
  --color-accent: #FFD166;       /* Nhấn (vàng) */
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Poppins', sans-serif;
  --font-size-body: 1rem;
  --font-size-heading: 1.5rem;
  --font-size-title: 2rem;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Borders & Shadows */
  --border-radius: 0.5rem;
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.15);
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.2);
}

/* Theme application */
body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-primary);
}

h1 {
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: var(--font-size-title);
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--border-radius);
}

/* Responsive Grid */
@media (min-width: 375px) {
  .product-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}

@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Hover effects */
.block:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

**Advanced Styling Options (P2):**
- Border radius: `--border-radius: 0.5rem` → adjust dynamically
- Shadow intensity: `--shadow-intensity: 0.2` → scale all shadows
- Padding preset: `.layout-compact`, `.layout-normal`, `.layout-spacious`

---

### 3. Vanilla JavaScript ES6+
**Dùng Cho:** Semua tính năng (DOM, state management, events)

**Struktur Modular:**
```javascript
// shared/storage.js - Abstraction layer
export class Storage {
  async addCategory(data) { /* Supabase insert */ }
  async getCategories() { /* Supabase select */ }
  async updateCategory(id, data) { /* Supabase update */ }
  async deleteCategory(id) { /* Supabase delete */ }
}

// shared/theme-manager.js - Theme system
export class ThemeManager {
  loadTheme(themeId) { /* Apply CSS variables */ }
  createCustomTheme(colors) { /* Save to DB */ }
  validateContrast(color1, color2) { /* WCAG check */ }
}

// shared/layout-builder.js - Layout builder logic
export class LayoutBuilder {
  addBlock(blockType) { /* Add to canvas */ }
  removeBlock(blockId) { /* Remove from canvas */ }
  reorderBlocks(blockIds) { /* Update order */ }
  saveLayout(config) { /* Save to DB */ }
  publishLayout(config) { /* Mark as active */ }
}

// admin/admin.js - Admin panel controller
import { Storage } from '../shared/storage.js';
import { ThemeManager } from '../shared/theme-manager.js';
import { LayoutBuilder } from '../shared/layout-builder.js';

const storage = new Storage();
const themeManager = new ThemeManager();
const layoutBuilder = new LayoutBuilder();

// Event handlers
document.getElementById('addCategoryBtn').addEventListener('click', async () => {
  const name = document.getElementById('categoryName').value;
  if (!name) {
    alert('Category name required');
    return;
  }
  await storage.addCategory({ name });
  renderCategories();
});
```

**Key Libraries:**
- **No Framework**: Chỉ cần DOM APIs (`querySelector`, `addEventListener`, `classList`)
- **Async/Await**: Xử lý Supabase calls
- **Map/Filter/Reduce**: Data transformation
- **Destructuring**: Clean data handling

---

### 4. Drag-Drop Builder (sortablejs)
**Dùng Cho:** ID_013, ID_027, ID_043, ID_044, ID_047

**Installation & Usage:**
```bash
npm install sortablejs
# hoặc include CDN
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
```

**Implementation:**
```javascript
import Sortable from 'sortablejs';

// Category reordering (ID_013)
const categoryList = document.getElementById('categoryList');
Sortable.create(categoryList, {
  animation: 150,
  ghostClass: 'drag-ghost',
  onEnd: async (evt) => {
    const newOrder = Array.from(categoryList.children).map(el => el.dataset.categoryId);
    await storage.updateCategoriesOrder(newOrder);
  }
});

// Block reordering on canvas (ID_043-044)
const blockCanvas = document.getElementById('blockCanvas');
Sortable.create(blockCanvas, {
  animation: 150,
  ghostClass: 'block-ghost',
  onEnd: async (evt) => {
    const blockOrder = Array.from(blockCanvas.children).map(el => el.dataset.blockId);
    await layoutBuilder.reorderBlocks(blockOrder);
  }
});

// Product drag-drop (ID_027)
const productList = document.getElementById('productList');
Sortable.create(productList, {
  handle: '.drag-handle', // Only drag by handle
  animation: 150,
  onEnd: async (evt) => {
    const productOrder = Array.from(productList.children).map(el => el.dataset.productId);
    await storage.updateProductsOrder(productOrder);
  }
});
```

---

### 5. Color Picker & WCAG Validation
**Dùng Cho:** ID_036, ID_037

**Option A: HTML5 Input (Simple)**
```html
<input type="color" id="colorPrimary" value="#FF6B9D">
```

**Option B: Advanced Color Picker Library (Recommended)**
```bash
npm install @oslllo/svg-color-picker
# hoặc
npm install vanilla-color-picker
```

**WCAG Contrast Validation:**
```javascript
// shared/color-utils.js
export class ColorValidator {
  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static getLuminance(rgb) {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(x => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  static getContrast(color1, color2) {
    const lum1 = this.getLuminance(this.hexToRgb(color1));
    const lum2 = this.getLuminance(this.hexToRgb(color2));
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  static validateWCAG(textColor, bgColor, minRatio = 4.5) {
    const contrast = this.getContrast(textColor, bgColor);
    return contrast >= minRatio;
  }
}

// Usage in theme manager
const isAccessible = ColorValidator.validateWCAG(
  theme.colors.text,
  theme.colors.background,
  4.5 // WCAG AA level
);

if (!isAccessible) {
  alert('⚠️ Text color has low contrast. Minimum ratio: 4.5:1');
}
```

---

### 6. Google Fonts Integration
**Dùng Cho:** ID_063, ID_064

**Implementation:**
```javascript
// shared/fonts-manager.js
export class FontsManager {
  static AVAILABLE_FONTS = {
    'Poppins': 'heading',
    'Inter': 'body',
    'Playfair Display': 'display',
    'Lora': 'serif',
    'Open Sans': 'body'
  };

  static loadFonts(fontNames) {
    const fonts = fontNames.join('&family=').replace(/ /g, '+');
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  static applyFont(elementSelector, fontName) {
    document.querySelector(elementSelector).style.fontFamily = fontName;
    document.documentElement.style.setProperty(
      `--font-${elementSelector.replace('#', '')}`,
      fontName
    );
  }

  static scaleFontSize(scale) {
    // scale: -20, -10, 0, 10, 20, 40 (%)
    const multiplier = 1 + (scale / 100);
    document.documentElement.style.setProperty(
      '--font-size-scale',
      multiplier
    );
  }
}
```

---

### 7. Image Handling & Optimization
**Dùng Cho:** ID_018, ID_019, ID_086, ID_087, ID_090

**Image Upload (Client-side):**
```javascript
// shared/image-handler.js
export class ImageHandler {
  static async uploadProductImage(file) {
    // 1. Validate
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB max
      throw new Error('File too large');
    }

    // 2. Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('imagePreview').src = e.target.result;
      document.getElementById('imagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);

    // 3. Convert to WebP (optional P1)
    const webpFile = await this.convertToWebP(file);

    // 4. Upload to Supabase Storage
    const url = await storage.uploadImage(webpFile);
    return url;
  }

  static async convertToWebP(file) {
    // Using canvas to convert
    const canvas = await this.getCanvasFromFile(file);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
      }, 'image/webp', 0.8);
    });
  }

  static getCanvasFromFile(file) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };
      img.src = URL.createObjectURL(file);
    });
  }
}
```

**Lazy Loading (ID_086):**
```html
<!-- Native lazy loading -->
<img src="product.jpg" alt="Product" loading="lazy" width="300" height="300">

<!-- Fallback (ID_087) -->
<img 
  src="product.jpg" 
  alt="Product"
  loading="lazy"
  onerror="this.src='assets/placeholder.png'"
>
```

---

## Backend Stack Chi Tiết

### 1. TikTok OAuth 2.0 Integration
**Dùng Cho:** ID_001, ID_002, ID_004

**Mock Implementation (Phase 0):**
```javascript
// shared/tiktok-auth.js (Mock)
export class TikTokAuth {
  static mockChannels = [
    {
      id: 'tiktok_123',
      name: '@example_creator',
      avatar: 'https://example.com/avatar.jpg',
      followers: 1250000
    }
  ];

  static login() {
    const channel = this.mockChannels[0];
    localStorage.setItem('channel', JSON.stringify(channel));
    localStorage.setItem('accessToken', 'mock_token_' + Date.now());
    window.location.href = '/admin.html';
  }

  static logout() {
    localStorage.removeItem('channel');
    localStorage.removeItem('accessToken');
  }

  static getChannel() {
    return JSON.parse(localStorage.getItem('channel'));
  }
}
```

**Real OAuth Flow (Phase 1):**
```javascript
// shared/tiktok-auth.js (Real)
export class TikTokAuth {
  static TIKTOK_CLIENT_ID = process.env.VITE_TIKTOK_CLIENT_ID;
  static REDIRECT_URI = window.location.origin + '/admin.html';

  static login() {
    const authUrl = new URL('https://www.tiktok.com/v1/oauth/authorize/');
    authUrl.searchParams.append('client_id', this.TIKTOK_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', this.REDIRECT_URI);
    authUrl.searchParams.append('scope', 'user.info.basic');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('state', this.generateState());
    
    window.location.href = authUrl.toString();
  }

  static async handleCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (!code) return;

    // Exchange code for token (need backend endpoint)
    const response = await fetch('/api/auth/tiktok', {
      method: 'POST',
      body: JSON.stringify({ code })
    });

    const { accessToken, channel } = await response.json();
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('channel', JSON.stringify(channel));
  }

  static generateState() {
    return Math.random().toString(36).substring(7);
  }
}
```

---

## Database Chi Tiết

### 1. Supabase PostgreSQL Schema
**Dùng Cho:** ID_006, ID_009, ID_023, ID_038, ID_050, ID_051

**Complete Schema:**
```sql
-- 1. Channels table
CREATE TABLE channels (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tiktok_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  followers INTEGER DEFAULT 0,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Categories table
CREATE TABLE categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  is_hidden BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Products table
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  link TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Color themes table
CREATE TABLE color_themes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  colors JSONB NOT NULL, -- { "primary": "#FF6B9D", "secondary": "#FFB5D8", ... }
  is_preset BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Bio layouts table
CREATE TABLE bio_layouts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT UNIQUE NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  blocks JSONB NOT NULL, -- Array of block configs
  theme_id BIGINT REFERENCES color_themes(id),
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  last_saved_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_categories_channel ON categories(channel_id);
CREATE INDEX idx_products_channel ON products(channel_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_themes_channel ON color_themes(channel_id);
CREATE INDEX idx_layouts_channel ON bio_layouts(channel_id);

-- Row Level Security (RLS) - Optional pero recommended
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bio_layouts ENABLE ROW LEVEL SECURITY;
```

**Data Examples:**

```javascript
// Channel
{
  id: 1,
  tiktok_id: "123456789",
  name: "@creator_name",
  avatar: "https://storage.supabase.co/...",
  followers: 1250000,
  bio: "Product recommendations"
}

// Category
{
  id: 1,
  channel_id: 1,
  name: "Fashion",
  description: "Clothing & Accessories",
  order_index: 0,
  is_hidden: false
}

// Product
{
  id: 1,
  channel_id: 1,
  category_id: 1,
  title: "Vintage T-Shirt",
  description: "Comfortable cotton...",
  image: "https://storage.supabase.co/...",
  link: "https://shop.example.com/product/123",
  status: "active",
  tags: ["summer", "casual"],
  order_index: 0
}

// Color Theme
{
  id: 1,
  channel_id: 1,
  name: "Pastel Pink",
  colors: {
    "primary": "#FF6B9D",
    "secondary": "#FFB5D8",
    "background": "#FFF5F9",
    "text": "#333333",
    "accent": "#FFD166"
  },
  is_preset: true,
  is_active: true
}

// Bio Layout
{
  id: 1,
  channel_id: 1,
  blocks: [
    {
      id: "block_1",
      type: "channel_info",
      order: 0,
      settings: {}
    },
    {
      id: "block_2",
      type: "product_grid",
      order: 1,
      settings: {
        columns: 2,
        categoryId: null
      }
    },
    {
      id: "block_3",
      type: "category_tabs",
      order: 2,
      settings: {}
    }
  ],
  theme_id: 1,
  is_published: true,
  published_at: "2025-12-08T10:30:00Z"
}
```

### 2. Supabase Storage (Images)
**Dùng Cho:** ID_018, ID_065, ID_066

**Bucket Setup:**
```javascript
// Create bucket via Supabase dashboard or API
const { data, error } = await supabase.storage.createBucket('product-images', {
  public: true,
  fileSizeLimit: 5242880 // 5MB
});

// Upload image
const { data, error } = await supabase.storage
  .from('product-images')
  .upload(`${channelId}/${Date.now()}-${file.name}`, file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('product-images')
  .getPublicUrl(data.path);

// Delete image
await supabase.storage
  .from('product-images')
  .remove([data.path]);
```

---

## Ánh Xạ Tính Năng → Công Nghệ

### P0 Features (MVP - 35 items)

#### Authentication & Channel (ID_001-006)
| ID | Tính Năng | Frontend | Backend | Database | Thư Viện |
|---|----------|----------|---------|----------|---------|
| ID_001 | Đăng Nhập TikTok | HTML form, JS event | TikTok OAuth mock | localStorage | Supabase SDK |
| ID_002 | Tải Thông Tin Kênh | - | REST API call | - | Supabase SDK |
| ID_003 | Hiển Thị Channel | HTML template, CSS | - | - | - |
| ID_004 | Logout | HTML button, JS | - | localStorage | Supabase SDK |
| ID_005 | Edit Channel Bio | HTML form, textarea | Supabase update | channels table | Supabase SDK |
| ID_006 | Lưu Channel vào DB | Form validation | Supabase insert | channels table | Supabase SDK |

#### Category Management (ID_007-012)
| ID | Tính Năng | Frontend | Backend | Database | Thư Viện |
|---|----------|----------|---------|----------|---------|
| ID_007 | Form Thêm Danh Mục | HTML form, validation | - | - | - |
| ID_008 | Validation | JS required check | - | - | - |
| ID_009 | Lưu Danh Mục | Form submit | Supabase insert | categories | Supabase SDK |
| ID_010 | Hiển Thị Danh Mục | HTML table, loop | Supabase query | categories | - |
| ID_011 | Chỉnh Sửa Danh Mục | HTML form modal | Supabase update | categories | - |
| ID_012 | Xóa Danh Mục | Confirm modal | Supabase delete | categories | - |

#### Product Management (ID_017-026)
| ID | Tính Năng | Frontend | Backend | Database | Thư Viện |
|---|----------|----------|---------|----------|---------|
| ID_017 | Form Thêm Sản Phẩm | HTML form | - | - | - |
| ID_018 | Upload Hình Ảnh | File input, preview | Supabase storage | - | Supabase SDK |
| ID_019 | Xem Trước Ảnh | Canvas/img preview | - | - | - |
| ID_020 | Category Dropdown | HTML select, loop | - | - | - |
| ID_021 | Warning if no categories | JS conditional | - | - | - |
| ID_022 | Form Validation | JS validation | - | - | - |
| ID_023 | Lưu Product | Form submit | Supabase insert | products | Supabase SDK |
| ID_024 | Hiển Thị Product | HTML template loop | Supabase query | products | - |
| ID_025 | Chỉnh Sửa Product | Form modal | Supabase update | products | - |
| ID_026 | Xóa Product | Confirm modal | Supabase delete | products | - |

#### Theme System (ID_034-038)
| ID | Tính Năng | Frontend | Backend | Database | Thư Viện |
|---|----------|----------|---------|----------|---------|
| ID_034 | Theme Presets | HTML grid, buttons | Preset data | color_themes (preset=true) | CSS, JS |
| ID_035 | Live Preview | CSS variable apply | - | - | CSS |
| ID_036 | Color Picker | HTML input[type=color] | - | - | vanilla-color-picker (opt) |
| ID_037 | Contrast Validation | JS WCAG algorithm | - | - | Custom algorithm |
| ID_038 | Lưu Theme | Form submit | Supabase insert | color_themes | Supabase SDK |

#### Layout Builder Canvas (ID_042-053)
| ID | Tính Năng | Frontend | Backend | Database | Thư Viện |
|---|----------|----------|---------|----------|---------|
| ID_042 | Layout Canvas | HTML grid 3col | - | - | CSS Grid/Flex |
| ID_043 | Drag-Drop Blocks | Drag event, JS | - | - | sortablejs |
| ID_044 | Reorder Blocks | Drop event handler | - | - | sortablejs |
| ID_045 | Edit Block Settings | HTML form modal | - | - | - |
| ID_046 | Delete Block | JS array remove | - | - | - |
| ID_047 | Duplicate Block | JS clone object | - | - | - |
| ID_048 | Responsive Preview | CSS media queries | - | - | CSS |
| ID_049 | Layout Presets | HTML templates | Preset configs | - | JS templating |
| ID_050 | Save Draft | Form submit | Supabase insert | bio_layouts | Supabase SDK |
| ID_051 | Publish Layout | Button click | Supabase update (published=true) | bio_layouts | Supabase SDK |
| ID_052 | Auto-Save | setInterval, Supabase | Supabase upsert | bio_layouts | - |
| ID_053 | Unsaved Changes | JS dirty flag | - | - | - |

#### Block Components (ID_054-059)
| ID | Tính Năng | Frontend | Backend | Database | Thư Viện |
|---|----------|----------|---------|----------|---------|
| ID_054 | Channel Info Block | HTML template | - | channels (data) | - |
| ID_055 | Product Grid Block | CSS grid, loop | - | products (data) | CSS |
| ID_057 | Category Collapse | HTML details/summary | - | categories | - |
| ID_058 | Category Tabs | HTML tabs, JS toggle | - | categories | - |
| ID_059 | Carousel Block | HTML ul, JS scroll | - | products | CSS |

#### Public Page (ID_075-085, ID_086-091, ID_097-100)
| ID | Tính Năng | Frontend | Backend | Database | Thư Viện |
|---|----------|----------|---------|----------|---------|
| ID_075 | Display Channel Info | HTML template | - | channels | - |
| ID_076 | Render Blocks Dynamically | JS map blocks config | - | bio_layouts | - |
| ID_077 | Apply Theme Colors | CSS variables | - | color_themes | CSS |
| ID_078-085 | Block Components (Public) | HTML templates | - | products/categories | - |
| ID_086 | Image Lazy Loading | loading="lazy" attr | - | - | native HTML5 |
| ID_087 | Image Fallback | onerror handler | - | - | native JS |
| ID_088 | Responsive Grid | CSS media queries | - | - | CSS |
| ID_089 | Touch-Friendly | CSS min-width/height | - | - | CSS |
| ID_091 | Affiliate Link | target="_blank", rel="noopener" | - | products | native HTML |
| ID_097-100 | Load Data APIs | Supabase select | Supabase query | all tables | Supabase SDK |

---

## Thư Viện & Dependencies

### Package.json (Recommended)
```json
{
  "name": "bio-tiktok",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0",
    "sortablejs": "^1.15.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-basic-ssl": "^1.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### CDN Alternatives (No Build)
```html
<!-- Supabase -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Sortable -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Optional Libraries (P1, P2)
| Tính Năng | Thư Viện | NPM | Kích Thước |
|----------|---------|-----|-----------|
| Color Picker Advanced | `@oslllo/svg-color-picker` | npm | ~50KB |
| QR Code Generation | `qrcode.js` | npm | ~20KB |
| Date Formatting | `date-fns` | npm | ~30KB (tree-shakeable) |
| UUID Generation | `uuid` | npm | ~10KB |
| Image Optimization | `sharp` (backend) | npm | varies |
| Analytics | `plausible-tracker` | npm | ~5KB |

---

## Kiến Trúc Ứng Dụng

### Folder Structure
```
bio-tiktok/
├── docs/
│   ├── req.md
│   ├── tech.md
│   ├── analysis-req.md
│   └── analysis-tech.md (this file)
│
├── src/
│   ├── shared/
│   │   ├── storage.js (Supabase wrapper)
│   │   ├── tiktok-auth.js (OAuth mock/real)
│   │   ├── theme-manager.js (CSS variables, themes)
│   │   ├── layout-builder.js (Block logic)
│   │   ├── image-handler.js (Upload, validation)
│   │   ├── color-utils.js (WCAG validation)
│   │   ├── fonts-manager.js (Google Fonts)
│   │   ├── constants.js (Preset colors, fonts)
│   │   └── utils.js (Helper functions)
│   │
│   ├── admin/
│   │   ├── admin.html
│   │   ├── admin.css
│   │   ├── admin.js (Main controller)
│   │   ├── components/
│   │   │   ├── category-manager.js (ID_007-016)
│   │   │   ├── product-manager.js (ID_017-033)
│   │   │   ├── theme-panel.js (ID_034-041)
│   │   │   └── layout-builder-ui.js (ID_042-073)
│   │   └── styles/
│   │       ├── admin-base.css
│   │       ├── form-styles.css
│   │       ├── layout-builder.css
│   │       └── theme-panel.css
│   │
│   ├── bio/
│   │   ├── bio.html
│   │   ├── bio.css
│   │   ├── bio.js (Render logic)
│   │   ├── components/
│   │   │   ├── channel-info.js
│   │   │   ├── block-renderer.js (ID_076)
│   │   │   └── theme-applier.js (ID_077)
│   │   └── styles/
│   │       ├── bio-base.css
│   │       ├── block-styles.css
│   │       └── responsive.css
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── placeholder.png
│   │   │   └── icons/
│   │   └── fonts/ (if self-hosted)
│   │
│   └── index.html (Entry point)
│
├── public/
│   └── favicon.ico
│
├── .env.example
├── package.json
├── vite.config.js (optional)
└── README.md
```

### Module Dependencies
```
admin.html
  └─ admin.js
      ├─ shared/storage.js ─→ Supabase
      ├─ shared/tiktok-auth.js
      ├─ shared/theme-manager.js
      ├─ shared/layout-builder.js
      ├─ shared/image-handler.js
      │   └─ shared/color-utils.js
      ├─ admin/components/category-manager.js
      ├─ admin/components/product-manager.js
      ├─ admin/components/theme-panel.js
      │   └─ shared/fonts-manager.js
      └─ admin/components/layout-builder-ui.js
          └─ sortablejs

bio.html
  └─ bio.js
      ├─ shared/storage.js ─→ Supabase
      ├─ shared/theme-manager.js
      ├─ bio/components/block-renderer.js
      │   ├─ block-channel-info.js (ID_078)
      │   ├─ block-product-grid.js (ID_079)
      │   ├─ block-category-collapse.js (ID_080)
      │   ├─ block-category-tabs.js (ID_081)
      │   └─ block-carousel.js (ID_082)
      └─ bio/components/theme-applier.js
```

---

## Quyết Định Thiết Kế Chi Tiết

### 1. Vanilla JS vs Framework
**Tại sao Vanilla JS?**
- ✅ Dự án nhỏ: 2 trang tách biệt
- ✅ Ít state complexity: Data lưu ở Supabase
- ✅ Load time: Không cần bundler, tải <100ms
- ✅ Bảo trì: Ít dependencies = ít security issues
- ✅ Learning curve: Dễ dạy cho team không giàu kinh nghiệm

**React/Vue cần khi:**
- App có 10+ routes
- State complexity cao (Redux, Vuex)
- Component reuse phức tạp
- Real-time collaboration (WebSocket) nhiều

### 2. CSS Variables vs SCSS
**Tại sao CSS Variables?**
- ✅ Native support (mọi trình duyệt hiện đại)
- ✅ Dynamic runtime: Thay đổi màu không cần rebuild
- ✅ WCAG validation: Tính toán contrast runtime
- ✅ Nhẹ: Không cần transpiler

**SCSS nếu:**
- Cần nesting, mixins, functions phức tạp
- Multiple variants (light/dark mode)

### 3. Supabase vs Firebase vs Hybrid
**So Sánh:**

| Tiêu Chí | Supabase | Firebase | Hybrid |
|---------|---------|----------|--------|
| **Speed** | ⭐⭐⭐⭐⭐ (PostgreSQL) | ⭐⭐⭐ (NoSQL lag) | ⭐⭐⭐⭐ |
| **Storage** | 500MB + unlimited bucket | 1GB + 5GB storage | Varies |
| **Images** | Easy (storage bucket) | ⚠️ More setup | Easy |
| **Integration** | REST API + SDK | REST API + SDK | Varies |
| **Cost Long-term** | $25-100/month | $25-300/month | Custom |
| **Learning** | SQL knowledge | Firestore learning | Both |

**Supabase Thắng vì:**
- PostgreSQL quen thuộc
- Storage bucket dễ dùng
- Long-term cost thấp
- Open-source (portable)

### 4. Drag-Drop Library: sortablejs
**Tại sao sortablejs?**
- ✅ Lightweight (~10KB gzip)
- ✅ Vanilla JS (không dependency)
- ✅ Multi-list drag-drop
- ✅ Active development, ~6K stars

**Alternatives:**
- dnd-kit (React-specific, overkill)
- jQuery UI (deprecated, heavy)
- React Beautiful DnD (React, too complex)

### 5. Mobile-First Design (375px)
**Breakpoints:**
```css
/* Mobile first */
@media (min-width: 375px) { /* iPhone SE */ }
@media (min-width: 640px) { /* iPad mini */ }
@media (min-width: 1024px) { /* Desktop */ }
```

**Touch-Friendly Requirements:**
- Button/clickable: ≥48x48px (WCAG 2.5.5)
- Padding: ≥16px (visual separation)
- Form input: ≥44px height
- No hover-only interactions

### 6. Performance Targets
| Metrik | Target | Teknologi |
|--------|--------|-----------|
| Load Time | <2s | CDN, lazy loading |
| Lighthouse Score | ≥90 | Image optimization, minify |
| Core Web Vitals | Good | CSS optimization, layout shift <0.1 |
| Mobile Score | ≥90 | Touch-friendly, responsive |

**Optimization Strategy:**
```javascript
// 1. Lazy load images
<img loading="lazy" src="...">

// 2. Code splitting (future Vite)
// import { feature } from './feature.js'; // Dynamic import

// 3. Minify CSS/JS (Vite build)
// npm run build

// 4. CDN delivery
// Vercel / Netlify auto-minify + CDN
```

### 7. WCAG A11y Compliance (Level AA)
**Key Requirements:**
1. **Color Contrast**: Text ≥4.5:1, UI ≥3:1 (ID_037)
2. **Keyboard Navigation**: Form inputs, buttons focusable
3. **Image Alt Text**: All images need descriptive alt
4. **Form Labels**: Associated with inputs (label for="...")
5. **Semantic HTML**: Use `<header>`, `<main>`, `<nav>`, `<button>`

**Implementation:**
```html
<!-- ✅ Good -->
<label for="productTitle">Product Title</label>
<input id="productTitle" type="text" required>

<!-- ✅ Color contrast -->
<button style="background: #FF6B9D; color: white;"><!-- 5.1:1 ratio --></button>

<!-- ✅ Image alt -->
<img src="product.jpg" alt="Red vintage t-shirt">

<!-- ✅ Semantic button -->
<button type="submit">Add Product</button>
```

---

## Tóm Tắt Công Nghệ Theo Phase

### Phase 0: Setup (Day 0)
- ✅ HTML5 structure
- ✅ CSS variables system
- ✅ Supabase project create
- ✅ Mock TikTok auth
- ✅ Local development server

### Phase 1: MVP (Days 1-7)
- ✅ Category CRUD (ID_007-012)
- ✅ Product CRUD (ID_017-026)
- ✅ Theme presets (ID_034-038)
- ✅ Layout builder canvas (ID_042-053)
- ✅ Block components (ID_054-059)
- ✅ Public page rendering (ID_075-100)
- **Dependencies:** Supabase SDK, sortablejs

### Phase 1.5: Polish (Days 8-10)
- ✅ Drag-drop reordering (ID_013, 027, 043-044)
- ✅ Font customization (ID_063-064)
- ✅ Logo/favicon upload (ID_065-066)
- ✅ Social links (ID_067)
- **Dependencies:** Same

### Phase 2: Advanced (Days 11-14)
- ✅ WebP optimization (ID_090)
- ✅ SEO meta tags (ID_092-093)
- ✅ Advanced styling (ID_068-072)
- ✅ Real TikTok OAuth (ID_001-002)
- **Dependencies:** Sharp (backend), qrcode.js, date-fns

### Phase 3: Future
- ✅ Analytics dashboard
- ✅ Multi-user management
- ✅ Email notifications
- ✅ Public API

---

## Reference Documentation

- [Supabase JS Docs](https://supabase.com/docs/reference/javascript)
- [sortablejs Docs](https://sortablejs.github.io/Sortable/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Google Fonts API](https://developers.google.com/fonts/docs/getting_started)
- [TikTok OAuth Docs](https://developers.tiktok.com/doc/oauth-setup)

---

**Kết Thúc Phân Tích Công Nghệ Chi Tiết**
