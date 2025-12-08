# Phân Tích Database Chi Tiết - Bio Affiliate Project

**Tạo:** 8 tháng 12, 2025
**Dựa trên:** analysis-req.md + analysis-tech.md
**Database:** Supabase PostgreSQL
**Mục Đích:** Phân tích chi tiết schema, relationships, và optimization strategies

---

## Mục Lục
1. [Tổng Quan Database](#tổng-quan-database)
2. [Chi Tiết Các Bảng](#chi-tiết-các-bảng)
3. [Mối Quan Hệ Giữa Các Bảng](#mối-quan-hệ-giữa-các-bảng)
4. [ERD Diagram (DrawIO)](#erd-diagram-drawio)
5. [Indexes & Performance](#indexes--performance)
6. [Row Level Security (RLS)](#row-level-security-rls)
7. [Constraints & Business Rules](#constraints--business-rules)
8. [Storage Buckets](#storage-buckets)
9. [Migration & Seeding](#migration--seeding)
10. [Query Patterns](#query-patterns)

---

## Tổng Quan Database

### Thông Tin Cơ Bản
- **Database Engine:** PostgreSQL 15+ (Supabase)
- **Tổng Số Bảng:** 5 bảng chính
- **Storage:** JSONB cho flexible data (themes, layouts)
- **Relationships:** 1-to-many, 1-to-1
- **Cascade Rules:** ON DELETE CASCADE để tự động cleanup

### Kiến Trúc Tổng Thể
```
channels (1) ──→ (nhiều) categories
channels (1) ──→ (nhiều) products
channels (1) ──→ (nhiều) color_themes
channels (1) ──→ (1) bio_layouts
categories (1) ──→ (nhiều) products
color_themes (1) ──→ (0 hoặc 1) bio_layouts
```

### Đặc Điểm Nổi Bật
1. **JSONB Storage:** Lưu trữ cấu hình linh hoạt (colors, blocks)
2. **Cascade Deletes:** Tự động xóa dữ liệu liên quan khi xóa channel
3. **Order Management:** `order_index` để sắp xếp tùy chỉnh
4. **Soft Delete:** `is_hidden` cho categories, `status` cho products
5. **Publish Workflow:** `is_published` và `published_at` cho layouts

---

## Chi Tiết Các Bảng

### 1. Bảng `channels` (Thông Tin Kênh TikTok)

**Mục Đích:** Lưu trữ thông tin người dùng/kênh TikTok sau khi đăng nhập OAuth.

**Schema:**
```sql
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
```

**Chi Tiết Cột:**

| Cột | Kiểu | Ràng Buộc | Mô Tả |
|-----|------|-----------|-------|
| `id` | BIGINT | PRIMARY KEY, IDENTITY | ID tự tăng, unique |
| `tiktok_id` | TEXT | UNIQUE, NOT NULL | TikTok user ID (từ OAuth) |
| `name` | TEXT | NOT NULL | Tên hiển thị kênh (VD: "@creator_name") |
| `avatar` | TEXT | NULL | URL avatar (Supabase Storage hoặc TikTok CDN) |
| `followers` | INTEGER | DEFAULT 0 | Số lượng followers (từ TikTok API) |
| `bio` | TEXT | NULL | Mô tả bio kênh (có thể chỉnh sửa) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Thời gian tạo |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Thời gian cập nhật cuối |

**Business Rules:**
- Mỗi `tiktok_id` chỉ có 1 channel (UNIQUE constraint)
- `avatar` có thể là URL từ TikTok hoặc Supabase Storage
- `followers` có thể được sync định kỳ từ TikTok API
- `bio` có thể được user chỉnh sửa trong admin panel

**Ví Dụ Dữ Liệu:**
```json
{
  "id": 1,
  "tiktok_id": "1234567890123456789",
  "name": "@fashion_creator",
  "avatar": "https://storage.supabase.co/object/public/avatars/channel_1.jpg",
  "followers": 1250000,
  "bio": "Fashion & Lifestyle Creator | Product Recommendations",
  "created_at": "2025-12-01T10:00:00Z",
  "updated_at": "2025-12-08T15:30:00Z"
}
```

**Indexes:**
```sql
CREATE INDEX idx_channels_tiktok_id ON channels(tiktok_id); -- Đã có UNIQUE nên tự động index
```

---

### 2. Bảng `categories` (Danh Mục Sản Phẩm)

**Mục Đích:** Quản lý danh mục sản phẩm của mỗi channel.

**Schema:**
```sql
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
```

**Chi Tiết Cột:**

| Cột | Kiểu | Ràng Buộc | Mô Tả |
|-----|------|-----------|-------|
| `id` | BIGINT | PRIMARY KEY, IDENTITY | ID tự tăng |
| `channel_id` | BIGINT | NOT NULL, FK → channels(id) | Tham chiếu channel |
| `name` | TEXT | NOT NULL | Tên danh mục (VD: "Fashion", "Beauty") |
| `description` | TEXT | NULL | Mô tả danh mục (tùy chọn) |
| `order_index` | INTEGER | DEFAULT 0 | Thứ tự hiển thị (drag-drop) |
| `is_hidden` | BOOLEAN | DEFAULT FALSE | Ẩn/hiện danh mục trên bio |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Thời gian tạo |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Thời gian cập nhật |

**Business Rules:**
- Mỗi category thuộc về 1 channel (many-to-one)
- `name` là bắt buộc, không được trống
- `order_index` dùng để sắp xếp (có thể thay đổi bằng drag-drop)
- `is_hidden = TRUE` → không hiển thị trên trang bio công khai
- Khi xóa channel → tự động xóa tất cả categories (CASCADE)

**Ví Dụ Dữ Liệu:**
```json
{
  "id": 1,
  "channel_id": 1,
  "name": "Fashion",
  "description": "Clothing & Accessories",
  "order_index": 0,
  "is_hidden": false,
  "created_at": "2025-12-01T10:05:00Z",
  "updated_at": "2025-12-05T14:20:00Z"
}
```

**Indexes:**
```sql
CREATE INDEX idx_categories_channel ON categories(channel_id);
CREATE INDEX idx_categories_order ON categories(channel_id, order_index); -- Composite cho sorting
```

---

### 3. Bảng `products` (Sản Phẩm Affiliate)

**Mục Đích:** Lưu trữ thông tin sản phẩm affiliate của mỗi channel.

**Schema:**
```sql
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
```

**Chi Tiết Cột:**

| Cột | Kiểu | Ràng Buộc | Mô Tả |
|-----|------|-----------|-------|
| `id` | BIGINT | PRIMARY KEY, IDENTITY | ID tự tăng |
| `channel_id` | BIGINT | NOT NULL, FK → channels(id) | Tham chiếu channel |
| `category_id` | BIGINT | NOT NULL, FK → categories(id) | Tham chiếu category |
| `title` | TEXT | NOT NULL | Tiêu đề sản phẩm |
| `description` | TEXT | NULL | Mô tả sản phẩm |
| `image` | TEXT | NULL | URL hình ảnh (Supabase Storage) |
| `link` | TEXT | NOT NULL | Link affiliate (bắt buộc) |
| `status` | TEXT | DEFAULT 'active', CHECK | 'active' hoặc 'inactive' |
| `tags` | TEXT[] | DEFAULT ARRAY[] | Mảng tags (VD: ["summer", "casual"]) |
| `order_index` | INTEGER | DEFAULT 0 | Thứ tự trong category |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Thời gian tạo |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Thời gian cập nhật |

**Business Rules:**
- Mỗi product thuộc về 1 channel và 1 category (many-to-one)
- `title` và `link` là bắt buộc
- `status = 'inactive'` → không hiển thị trên trang bio
- `tags` là mảng PostgreSQL TEXT[], có thể query bằng `ANY()` hoặc `@>`
- `order_index` để sắp xếp trong category (drag-drop)
- Khi xóa channel hoặc category → tự động xóa products (CASCADE)

**Ví Dụ Dữ Liệu:**
```json
{
  "id": 1,
  "channel_id": 1,
  "category_id": 1,
  "title": "Vintage T-Shirt",
  "description": "Comfortable cotton t-shirt with vintage design",
  "image": "https://storage.supabase.co/object/public/product-images/channel_1/product_1.jpg",
  "link": "https://shop.example.com/product/123?affiliate=abc",
  "status": "active",
  "tags": ["summer", "casual", "vintage"],
  "order_index": 0,
  "created_at": "2025-12-01T10:10:00Z",
  "updated_at": "2025-12-07T09:15:00Z"
}
```

**Indexes:**
```sql
CREATE INDEX idx_products_channel ON products(channel_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(channel_id, status) WHERE status = 'active'; -- Partial index
CREATE INDEX idx_products_order ON products(category_id, order_index); -- Composite cho sorting
CREATE INDEX idx_products_tags ON products USING GIN(tags); -- GIN index cho array search
```

**Query Examples:**
```sql
-- Tìm products theo tag
SELECT * FROM products WHERE tags @> ARRAY['summer']::TEXT[];

-- Lấy active products của channel, sắp xếp theo order
SELECT * FROM products 
WHERE channel_id = 1 AND status = 'active' 
ORDER BY category_id, order_index;
```

---

### 4. Bảng `color_themes` (Chủ Đề Màu)

**Mục Đích:** Lưu trữ cấu hình màu sắc tùy chỉnh cho trang bio.

**Schema:**
```sql
CREATE TABLE color_themes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  colors JSONB NOT NULL,
  is_preset BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Chi Tiết Cột:**

| Cột | Kiểu | Ràng Buộc | Mô Tả |
|-----|------|-----------|-------|
| `id` | BIGINT | PRIMARY KEY, IDENTITY | ID tự tăng |
| `channel_id` | BIGINT | NOT NULL, FK → channels(id) | Tham chiếu channel |
| `name` | TEXT | NOT NULL | Tên theme (VD: "Pastel Pink", "Custom Theme 1") |
| `colors` | JSONB | NOT NULL | Object chứa 5 màu chính |
| `is_preset` | BOOLEAN | DEFAULT FALSE | Có phải preset theme không |
| `is_active` | BOOLEAN | DEFAULT FALSE | Theme đang được sử dụng |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Thời gian tạo |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Thời gian cập nhật |

**Cấu Trúc JSONB `colors`:**
```json
{
  "primary": "#FF6B9D",
  "secondary": "#FFB5D8",
  "background": "#FFF5F9",
  "text": "#333333",
  "accent": "#FFD166"
}
```

**Business Rules:**
- Mỗi channel có thể có nhiều themes (preset + custom)
- `colors` phải chứa đủ 5 keys: primary, secondary, background, text, accent
- `is_preset = TRUE` → theme được tạo sẵn bởi hệ thống
- `is_active = TRUE` → theme đang được áp dụng cho bio layout
- Chỉ nên có 1 theme `is_active = TRUE` cho mỗi channel (có thể enforce bằng trigger)

**Ví Dụ Dữ Liệu:**
```json
{
  "id": 1,
  "channel_id": 1,
  "name": "Pastel Pink",
  "colors": {
    "primary": "#FF6B9D",
    "secondary": "#FFB5D8",
    "background": "#FFF5F9",
    "text": "#333333",
    "accent": "#FFD166"
  },
  "is_preset": true,
  "is_active": true,
  "created_at": "2025-12-01T10:00:00Z",
  "updated_at": "2025-12-01T10:00:00Z"
}
```

**Indexes:**
```sql
CREATE INDEX idx_themes_channel ON color_themes(channel_id);
CREATE INDEX idx_themes_active ON color_themes(channel_id, is_active) WHERE is_active = TRUE;
CREATE INDEX idx_themes_colors ON color_themes USING GIN(colors); -- GIN index cho JSONB queries
```

**Query Examples:**
```sql
-- Lấy active theme của channel
SELECT * FROM color_themes 
WHERE channel_id = 1 AND is_active = TRUE;

-- Tìm themes có màu primary cụ thể
SELECT * FROM color_themes 
WHERE colors->>'primary' = '#FF6B9D';
```

---

### 5. Bảng `bio_layouts` (Cấu Hình Bố Cục Bio)

**Mục Đích:** Lưu trữ cấu hình layout drag-drop của trang bio.

**Schema:**
```sql
CREATE TABLE bio_layouts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT UNIQUE NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  blocks JSONB NOT NULL,
  theme_id BIGINT REFERENCES color_themes(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  last_saved_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Chi Tiết Cột:**

| Cột | Kiểu | Ràng Buộc | Mô Tả |
|-----|------|-----------|-------|
| `id` | BIGINT | PRIMARY KEY, IDENTITY | ID tự tăng |
| `channel_id` | BIGINT | UNIQUE, NOT NULL, FK → channels(id) | Mỗi channel chỉ có 1 layout |
| `blocks` | JSONB | NOT NULL | Mảng cấu hình các blocks |
| `theme_id` | BIGINT | NULL, FK → color_themes(id) | Tham chiếu theme (có thể NULL) |
| `is_published` | BOOLEAN | DEFAULT FALSE | Đã publish chưa |
| `published_at` | TIMESTAMP | NULL | Thời gian publish |
| `last_saved_at` | TIMESTAMP | DEFAULT NOW() | Thời gian lưu cuối (auto-save) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Thời gian tạo |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Thời gian cập nhật |

**Cấu Trúc JSONB `blocks`:**
```json
[
  {
    "id": "block_1",
    "type": "channel_info",
    "order": 0,
    "settings": {
      "avatarSize": "large",
      "showFollowers": true
    }
  },
  {
    "id": "block_2",
    "type": "product_grid",
    "order": 1,
    "settings": {
      "columns": 2,
      "cardStyle": "image-top",
      "categoryId": null
    }
  },
  {
    "id": "block_3",
    "type": "category_tabs",
    "order": 2,
    "settings": {}
  }
]
```

**Block Types Hỗ Trợ:**
- `channel_info`: Hiển thị thông tin kênh
- `product_grid`: Lưới sản phẩm
- `product_list`: Danh sách sản phẩm
- `category_collapse`: Danh mục thu gọn
- `category_tabs`: Thẻ danh mục
- `carousel`: Xoay vòng sản phẩm
- `hero_banner`: Biểu ngữ hero
- `custom_spacing`: Khoảng trắng tùy chỉnh
- `footer`: Chân trang

**Business Rules:**
- Mỗi channel chỉ có 1 layout (UNIQUE constraint)
- `blocks` là mảng JSONB, mỗi block có `id`, `type`, `order`, `settings`
- `theme_id` có thể NULL (nếu không chọn theme)
- `is_published = TRUE` → layout hiển thị trên trang bio công khai
- `published_at` được set khi publish lần đầu
- `last_saved_at` được cập nhật mỗi khi auto-save (30 giây)
- Khi xóa theme → `theme_id` được set NULL (SET NULL, không xóa layout)

**Ví Dụ Dữ Liệu:**
```json
{
  "id": 1,
  "channel_id": 1,
  "blocks": [
    {
      "id": "block_1",
      "type": "channel_info",
      "order": 0,
      "settings": {}
    },
    {
      "id": "block_2",
      "type": "product_grid",
      "order": 1,
      "settings": {
        "columns": 2,
        "categoryId": null
      }
    }
  ],
  "theme_id": 1,
  "is_published": true,
  "published_at": "2025-12-05T12:00:00Z",
  "last_saved_at": "2025-12-08T10:30:00Z",
  "created_at": "2025-12-01T10:00:00Z",
  "updated_at": "2025-12-08T10:30:00Z"
}
```

**Indexes:**
```sql
CREATE INDEX idx_layouts_channel ON bio_layouts(channel_id); -- Đã có UNIQUE nên tự động index
CREATE INDEX idx_layouts_published ON bio_layouts(channel_id, is_published) WHERE is_published = TRUE;
CREATE INDEX idx_layouts_blocks ON bio_layouts USING GIN(blocks); -- GIN index cho JSONB queries
```

**Query Examples:**
```sql
-- Lấy published layout của channel
SELECT * FROM bio_layouts 
WHERE channel_id = 1 AND is_published = TRUE;

-- Tìm layouts có block type cụ thể
SELECT * FROM bio_layouts 
WHERE blocks @> '[{"type": "product_grid"}]'::jsonb;
```

---

## Mối Quan Hệ Giữa Các Bảng

### ERD Relationships

```
┌─────────────────┐
│    channels     │
│─────────────────│
│ id (PK)         │
│ tiktok_id (UK)  │
│ name            │
│ avatar          │
│ followers       │
│ bio             │
└────────┬────────┘
         │
         │ 1
         │
         │ N
    ┌────┴────┬──────────────┬──────────────┐
    │         │              │              │
    │         │              │              │
    ▼         ▼              ▼              ▼
┌─────────┐ ┌──────────┐ ┌─────────────┐ ┌──────────────┐
│categories│ │ products │ │color_themes │ │ bio_layouts  │
│─────────│ │──────────│ │─────────────│ │──────────────│
│ id (PK) │ │ id (PK)  │ │ id (PK)     │ │ id (PK)      │
│channel_id│ │channel_id│ │channel_id   │ │channel_id(UK)│
│ name    │ │category_id│ │ name        │ │ blocks       │
│order_idx│ │ title    │ │ colors      │ │ theme_id     │
│is_hidden│ │ status   │ │is_preset    │ │is_published  │
└─────────┘ │order_idx │ │is_active    │ └──────┬───────┘
            └──────────┘ └─────────────┘        │
                                                 │
                                                 │ N
                                                 │
                                                 │ 0..1
                                                 │
                                                 ▼
                                         ┌─────────────┐
                                         │color_themes │
                                         │ (theme_id)  │
                                         └─────────────┘
```

### Chi Tiết Relationships

#### 1. channels → categories (1-to-Many)
- **Type:** One-to-Many
- **Foreign Key:** `categories.channel_id` → `channels.id`
- **Cascade:** ON DELETE CASCADE
- **Description:** Mỗi channel có nhiều categories
- **Query Pattern:**
  ```sql
  SELECT c.*, cat.name as category_name 
  FROM channels c
  LEFT JOIN categories cat ON c.id = cat.channel_id
  WHERE c.id = 1;
  ```

#### 2. channels → products (1-to-Many)
- **Type:** One-to-Many
- **Foreign Key:** `products.channel_id` → `channels.id`
- **Cascade:** ON DELETE CASCADE
- **Description:** Mỗi channel có nhiều products
- **Query Pattern:**
  ```sql
  SELECT p.*, c.name as channel_name
  FROM products p
  JOIN channels c ON p.channel_id = c.id
  WHERE c.id = 1;
  ```

#### 3. categories → products (1-to-Many)
- **Type:** One-to-Many
- **Foreign Key:** `products.category_id` → `categories.id`
- **Cascade:** ON DELETE CASCADE
- **Description:** Mỗi category có nhiều products
- **Query Pattern:**
  ```sql
  SELECT p.*, cat.name as category_name
  FROM products p
  JOIN categories cat ON p.category_id = cat.id
  WHERE cat.id = 1;
  ```

#### 4. channels → color_themes (1-to-Many)
- **Type:** One-to-Many
- **Foreign Key:** `color_themes.channel_id` → `channels.id`
- **Cascade:** ON DELETE CASCADE
- **Description:** Mỗi channel có nhiều themes (preset + custom)
- **Query Pattern:**
  ```sql
  SELECT t.* FROM color_themes t
  WHERE t.channel_id = 1 AND t.is_active = TRUE;
  ```

#### 5. channels → bio_layouts (1-to-One)
- **Type:** One-to-One
- **Foreign Key:** `bio_layouts.channel_id` → `channels.id`
- **Cascade:** ON DELETE CASCADE
- **Unique:** `channel_id` UNIQUE (mỗi channel chỉ có 1 layout)
- **Description:** Mỗi channel có đúng 1 layout
- **Query Pattern:**
  ```sql
  SELECT l.* FROM bio_layouts l
  WHERE l.channel_id = 1 AND l.is_published = TRUE;
  ```

#### 6. color_themes → bio_layouts (1-to-Zero-or-One)
- **Type:** One-to-Zero-or-One (Optional)
- **Foreign Key:** `bio_layouts.theme_id` → `color_themes.id`
- **Cascade:** ON DELETE SET NULL (không xóa layout khi xóa theme)
- **Description:** Mỗi layout có thể tham chiếu 1 theme (hoặc NULL)
- **Query Pattern:**
  ```sql
  SELECT l.*, t.colors as theme_colors
  FROM bio_layouts l
  LEFT JOIN color_themes t ON l.theme_id = t.id
  WHERE l.channel_id = 1;
  ```

---

## ERD Diagram (DrawIO)

### DrawIO XML Format

```xml
<mxfile host="app.diagrams.net" agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36" version="25.0.3">
  <diagram name="Bio Affiliate ERD" id="bio-affiliate-erd">
    <mxGraphModel dx="1837" dy="1115" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="channels" value="channels" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" parent="1" vertex="1">
          <mxGeometry x="260" y="50" width="200" height="240" as="geometry" />
        </mxCell>
        <mxCell id="channels-id" value="id : BIGINT (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=1" parent="channels" vertex="1">
          <mxGeometry y="30" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="channels-tiktok_id" value="tiktok_id : TEXT (UK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="channels" vertex="1">
          <mxGeometry y="60" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="channels-name" value="name : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="channels" vertex="1">
          <mxGeometry y="90" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="channels-avatar" value="avatar : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="channels" vertex="1">
          <mxGeometry y="120" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="channels-followers" value="followers : INTEGER" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="channels" vertex="1">
          <mxGeometry y="150" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="channels-bio" value="bio : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="channels" vertex="1">
          <mxGeometry y="180" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="channels-timestamps" value="created_at, updated_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="channels" vertex="1">
          <mxGeometry y="210" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="categories" value="categories" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" parent="1" vertex="1">
          <mxGeometry x="660" y="50" width="200" height="240" as="geometry" />
        </mxCell>
        <mxCell id="categories-id" value="id : BIGINT (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=1" parent="categories" vertex="1">
          <mxGeometry y="30" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="categories-channel_id" value="channel_id : BIGINT (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="categories" vertex="1">
          <mxGeometry y="60" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="categories-name" value="name : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="categories" vertex="1">
          <mxGeometry y="90" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="categories-description" value="description : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="categories" vertex="1">
          <mxGeometry y="120" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="categories-order_index" value="order_index : INTEGER" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="categories" vertex="1">
          <mxGeometry y="150" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="categories-is_hidden" value="is_hidden : BOOLEAN" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="categories" vertex="1">
          <mxGeometry y="180" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="categories-timestamps" value="created_at, updated_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="categories" vertex="1">
          <mxGeometry y="210" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products" value="products" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" parent="1" vertex="1">
          <mxGeometry x="740" y="440" width="200" height="360" as="geometry" />
        </mxCell>
        <mxCell id="products-id" value="id : BIGINT (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=1" parent="products" vertex="1">
          <mxGeometry y="30" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-channel_id" value="channel_id : BIGINT (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="products" vertex="1">
          <mxGeometry y="60" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-category_id" value="category_id : BIGINT (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="products" vertex="1">
          <mxGeometry y="90" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-title" value="title : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="products" vertex="1">
          <mxGeometry y="120" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-description" value="description : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="products" vertex="1">
          <mxGeometry y="150" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-image" value="image : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="products" vertex="1">
          <mxGeometry y="180" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-link" value="link : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="products" vertex="1">
          <mxGeometry y="210" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-status" value="status : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="products" vertex="1">
          <mxGeometry y="240" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-tags" value="tags : TEXT[]" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="products" vertex="1">
          <mxGeometry y="270" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-order_index" value="order_index : INTEGER" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="products" vertex="1">
          <mxGeometry y="300" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="products-timestamps" value="created_at, updated_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="products" vertex="1">
          <mxGeometry y="330" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="color_themes" value="color_themes" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" parent="1" vertex="1">
          <mxGeometry x="20" y="440" width="200" height="240" as="geometry" />
        </mxCell>
        <mxCell id="themes-id" value="id : BIGINT (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=1" parent="color_themes" vertex="1">
          <mxGeometry y="30" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="themes-channel_id" value="channel_id : BIGINT (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="color_themes" vertex="1">
          <mxGeometry y="60" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="themes-name" value="name : TEXT" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="color_themes" vertex="1">
          <mxGeometry y="90" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="themes-colors" value="colors : JSONB" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="color_themes" vertex="1">
          <mxGeometry y="120" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="themes-is_preset" value="is_preset : BOOLEAN" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="color_themes" vertex="1">
          <mxGeometry y="150" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="themes-is_active" value="is_active : BOOLEAN" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="color_themes" vertex="1">
          <mxGeometry y="180" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="themes-timestamps" value="created_at, updated_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="color_themes" vertex="1">
          <mxGeometry y="210" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="bio_layouts" value="bio_layouts" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" parent="1" vertex="1">
          <mxGeometry x="390" y="440" width="200" height="270" as="geometry" />
        </mxCell>
        <mxCell id="layouts-id" value="id : BIGINT (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=1" parent="bio_layouts" vertex="1">
          <mxGeometry y="30" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="layouts-channel_id" value="channel_id : BIGINT (FK, UK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="bio_layouts" vertex="1">
          <mxGeometry y="60" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="layouts-blocks" value="blocks : JSONB" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="bio_layouts" vertex="1">
          <mxGeometry y="90" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="layouts-theme_id" value="theme_id : BIGINT (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="bio_layouts" vertex="1">
          <mxGeometry y="120" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="layouts-is_published" value="is_published : BOOLEAN" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="bio_layouts" vertex="1">
          <mxGeometry y="150" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="layouts-published_at" value="published_at : TIMESTAMP" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="bio_layouts" vertex="1">
          <mxGeometry y="180" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="layouts-last_saved_at" value="last_saved_at : TIMESTAMP" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;" parent="bio_layouts" vertex="1">
          <mxGeometry y="210" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="layouts-timestamps" value="created_at, updated_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;fontStyle=2" parent="bio_layouts" vertex="1">
          <mxGeometry y="240" width="200" height="30" as="geometry" />
        </mxCell>
        <mxCell id="rel1" value="" style="endArrow=ERmany;startArrow=ERone;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" parent="1" source="channels" target="categories" edge="1">
          <mxGeometry width="100" height="100" relative="1" as="geometry">
            <mxPoint x="500" y="170" as="sourcePoint" />
            <mxPoint x="600" y="70" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="rel1-label" value="1 : N" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];" parent="rel1" vertex="1" connectable="0">
          <mxGeometry x="-0.2" y="1" relative="1" as="geometry">
            <mxPoint x="10" y="-4" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="rel2" value="" style="endArrow=ERmany;startArrow=ERone;html=1;rounded=0;exitX=0.801;exitY=0.91;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitPerimeter=0;" parent="1" source="channels-timestamps" target="products" edge="1">
          <mxGeometry width="100" height="100" relative="1" as="geometry">
            <mxPoint x="500" y="230" as="sourcePoint" />
            <mxPoint x="800" y="140" as="targetPoint" />
            <Array as="points">
              <mxPoint x="420" y="370" />
              <mxPoint x="840" y="370" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="rel2-label" value="1 : N" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];" parent="rel2" vertex="1" connectable="0">
          <mxGeometry x="-0.2" y="1" relative="1" as="geometry">
            <mxPoint x="10" y="-4" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="rel3" value="" style="endArrow=ERmany;startArrow=ERone;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" parent="1" source="categories" target="products-description" edge="1">
          <mxGeometry width="100" height="100" relative="1" as="geometry">
            <mxPoint x="780" y="185" as="sourcePoint" />
            <mxPoint x="950" y="605" as="targetPoint" />
            <Array as="points">
              <mxPoint x="1080" y="170" />
              <mxPoint x="1080" y="605" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="rel3-label" value="1 : N" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];" parent="rel3" vertex="1" connectable="0">
          <mxGeometry x="-0.2" y="1" relative="1" as="geometry">
            <mxPoint x="-91" y="-88" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="rel4" value="" style="endArrow=ERmany;startArrow=ERone;html=1;rounded=0;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="channels-avatar" target="color_themes" edge="1">
          <mxGeometry width="100" height="100" relative="1" as="geometry">
            <mxPoint x="360" y="290" as="sourcePoint" />
            <mxPoint x="360" y="410" as="targetPoint" />
            <Array as="points">
              <mxPoint x="120" y="185" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="rel4-label" value="1 : N" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];" parent="rel4" vertex="1" connectable="0">
          <mxGeometry x="-0.2" y="1" relative="1" as="geometry">
            <mxPoint x="10" y="-4" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="rel5" value="" style="endArrow=ERzeroToOne;startArrow=ERone;html=1;rounded=0;exitX=0.408;exitY=1.138;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitPerimeter=0;" parent="1" source="channels-timestamps" target="bio_layouts" edge="1">
          <mxGeometry width="100" height="100" relative="1" as="geometry">
            <mxPoint x="360" y="290" as="sourcePoint" />
            <mxPoint x="640" y="410" as="targetPoint" />
            <Array as="points">
              <mxPoint x="340" y="410" />
              <mxPoint x="490" y="410" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="rel5-label" value="1 : 1" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];" parent="rel5" vertex="1" connectable="0">
          <mxGeometry x="-0.2" y="1" relative="1" as="geometry">
            <mxPoint x="47" y="-4" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="rel6" value="" style="endArrow=ERzeroToOne;startArrow=ERone;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0.043;entryY=0.113;entryDx=0;entryDy=0;entryPerimeter=0;" parent="1" source="color_themes" target="layouts-theme_id" edge="1">
          <mxGeometry width="100" height="100" relative="1" as="geometry">
            <mxPoint x="460" y="560" as="sourcePoint" />
            <mxPoint x="540" y="520" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="rel6-label" value="1 : 0..1" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];" parent="rel6" vertex="1" connectable="0">
          <mxGeometry x="-0.2" y="1" relative="1" as="geometry">
            <mxPoint x="10" y="-4" as="offset" />
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

### Hướng Dẫn Sử Dụng DrawIO

1. **Mở DrawIO:** Truy cập https://app.diagrams.net/
2. **Import XML:** File → Import from → Device → Chọn file XML trên
3. **Hoặc Copy-Paste:** Mở DrawIO, File → New → Blank Diagram, sau đó Edit → Paste (Ctrl+V) với XML trên

---

## Indexes & Performance

### Indexes Đã Tạo

```sql
-- Foreign Key Indexes (tự động tạo bởi FK constraints)
-- Nhưng nên tạo thêm composite indexes cho queries phổ biến

-- Categories
CREATE INDEX idx_categories_channel ON categories(channel_id);
CREATE INDEX idx_categories_order ON categories(channel_id, order_index); -- Composite cho sorting

-- Products
CREATE INDEX idx_products_channel ON products(channel_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(channel_id, status) WHERE status = 'active'; -- Partial index
CREATE INDEX idx_products_order ON products(category_id, order_index); -- Composite cho sorting
CREATE INDEX idx_products_tags ON products USING GIN(tags); -- GIN index cho array search

-- Color Themes
CREATE INDEX idx_themes_channel ON color_themes(channel_id);
CREATE INDEX idx_themes_active ON color_themes(channel_id, is_active) WHERE is_active = TRUE; -- Partial index
CREATE INDEX idx_themes_colors ON color_themes USING GIN(colors); -- GIN index cho JSONB queries

-- Bio Layouts
CREATE INDEX idx_layouts_channel ON bio_layouts(channel_id); -- Đã có UNIQUE nên tự động index
CREATE INDEX idx_layouts_published ON bio_layouts(channel_id, is_published) WHERE is_published = TRUE; -- Partial index
CREATE INDEX idx_layouts_blocks ON bio_layouts USING GIN(blocks); -- GIN index cho JSONB queries
```

### Performance Optimization Strategies

#### 1. Partial Indexes
- **Mục đích:** Giảm kích thước index, tăng tốc queries với WHERE clause
- **Ví dụ:** `idx_products_status` chỉ index các products có `status = 'active'`
- **Lợi ích:** Index nhỏ hơn, queries nhanh hơn khi filter active products

#### 2. Composite Indexes
- **Mục đích:** Tối ưu queries có nhiều điều kiện
- **Ví dụ:** `idx_categories_order` cho `ORDER BY order_index WHERE channel_id = X`
- **Lợi ích:** Index scan thay vì sort, nhanh hơn đáng kể

#### 3. GIN Indexes cho JSONB & Arrays
- **Mục đích:** Tối ưu queries trên JSONB và arrays
- **Ví dụ:** `idx_products_tags` cho `WHERE tags @> ARRAY['summer']`
- **Lợi ích:** Hỗ trợ containment operators (`@>`, `<@`, `?`)

#### 4. Query Optimization Tips

```sql
-- ✅ GOOD: Sử dụng index
SELECT * FROM products 
WHERE channel_id = 1 AND status = 'active'
ORDER BY category_id, order_index;

-- ✅ GOOD: Partial index được sử dụng
SELECT * FROM products 
WHERE channel_id = 1 AND status = 'active';

-- ✅ GOOD: GIN index cho array search
SELECT * FROM products 
WHERE tags @> ARRAY['summer']::TEXT[];

-- ❌ BAD: Không sử dụng index (full table scan)
SELECT * FROM products 
WHERE title LIKE '%shirt%'; -- Nên dùng full-text search nếu cần

-- ✅ GOOD: JSONB query với GIN index
SELECT * FROM color_themes 
WHERE colors->>'primary' = '#FF6B9D';
```

---

## Row Level Security (RLS)

### RLS Policies

```sql
-- Enable RLS cho tất cả tables
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bio_layouts ENABLE ROW LEVEL SECURITY;

-- Policy: Users chỉ có thể xem/sửa dữ liệu của chính họ
-- (Giả sử có auth.uid() từ Supabase Auth)

-- Channels: User chỉ có thể xem/sửa channel của mình
CREATE POLICY "Users can view own channel"
  ON channels FOR SELECT
  USING (auth.uid()::text = tiktok_id);

CREATE POLICY "Users can update own channel"
  ON channels FOR UPDATE
  USING (auth.uid()::text = tiktok_id);

-- Categories: User chỉ có thể xem/sửa categories của channel mình
CREATE POLICY "Users can view own categories"
  ON categories FOR SELECT
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE tiktok_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can manage own categories"
  ON categories FOR ALL
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE tiktok_id = auth.uid()::text
    )
  );

-- Products: Tương tự categories
CREATE POLICY "Users can view own products"
  ON products FOR SELECT
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE tiktok_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can manage own products"
  ON products FOR ALL
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE tiktok_id = auth.uid()::text
    )
  );

-- Color Themes: Tương tự
CREATE POLICY "Users can view own themes"
  ON color_themes FOR SELECT
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE tiktok_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can manage own themes"
  ON color_themes FOR ALL
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE tiktok_id = auth.uid()::text
    )
  );

-- Bio Layouts: Tương tự
CREATE POLICY "Users can view own layouts"
  ON bio_layouts FOR SELECT
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE tiktok_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can manage own layouts"
  ON bio_layouts FOR ALL
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE tiktok_id = auth.uid()::text
    )
  );

-- Public read cho bio layouts đã publish (cho trang công khai)
CREATE POLICY "Public can view published layouts"
  ON bio_layouts FOR SELECT
  USING (is_published = TRUE);
```

### RLS Best Practices

1. **Enable RLS ngay từ đầu:** Bảo mật tốt hơn
2. **Test policies:** Đảm bảo users chỉ truy cập được dữ liệu của mình
3. **Public read policies:** Cho phép public đọc published layouts (không cần auth)
4. **Service role bypass:** Supabase service role có thể bypass RLS (dùng cho admin operations)

---

## Constraints & Business Rules

### Check Constraints

```sql
-- Products: status chỉ có thể là 'active' hoặc 'inactive'
ALTER TABLE products 
ADD CONSTRAINT check_status 
CHECK (status IN ('active', 'inactive'));

-- Color Themes: colors phải chứa đủ 5 keys
ALTER TABLE color_themes
ADD CONSTRAINT check_colors_keys
CHECK (
  colors ? 'primary' AND
  colors ? 'secondary' AND
  colors ? 'background' AND
  colors ? 'text' AND
  colors ? 'accent'
);

-- Bio Layouts: blocks phải là array
ALTER TABLE bio_layouts
ADD CONSTRAINT check_blocks_array
CHECK (jsonb_typeof(blocks) = 'array');
```

### Unique Constraints

```sql
-- Channels: tiktok_id phải unique
ALTER TABLE channels
ADD CONSTRAINT unique_tiktok_id UNIQUE (tiktok_id);

-- Bio Layouts: mỗi channel chỉ có 1 layout
ALTER TABLE bio_layouts
ADD CONSTRAINT unique_channel_layout UNIQUE (channel_id);
```

### Foreign Key Constraints

```sql
-- Categories -> Channels (CASCADE)
ALTER TABLE categories
ADD CONSTRAINT fk_categories_channel
FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE;

-- Products -> Channels (CASCADE)
ALTER TABLE products
ADD CONSTRAINT fk_products_channel
FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE;

-- Products -> Categories (CASCADE)
ALTER TABLE products
ADD CONSTRAINT fk_products_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;

-- Color Themes -> Channels (CASCADE)
ALTER TABLE color_themes
ADD CONSTRAINT fk_themes_channel
FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE;

-- Bio Layouts -> Channels (CASCADE)
ALTER TABLE bio_layouts
ADD CONSTRAINT fk_layouts_channel
FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE;

-- Bio Layouts -> Color Themes (SET NULL)
ALTER TABLE bio_layouts
ADD CONSTRAINT fk_layouts_theme
FOREIGN KEY (theme_id) REFERENCES color_themes(id) ON DELETE SET NULL;
```

### Triggers

```sql
-- Trigger: Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Áp dụng cho tất cả tables
CREATE TRIGGER update_channels_updated_at
  BEFORE UPDATE ON channels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_color_themes_updated_at
  BEFORE UPDATE ON color_themes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bio_layouts_updated_at
  BEFORE UPDATE ON bio_layouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Chỉ có 1 active theme per channel
CREATE OR REPLACE FUNCTION ensure_single_active_theme()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = TRUE THEN
    UPDATE color_themes
    SET is_active = FALSE
    WHERE channel_id = NEW.channel_id
      AND id != NEW.id
      AND is_active = TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER single_active_theme_trigger
  BEFORE INSERT OR UPDATE ON color_themes
  FOR EACH ROW EXECUTE FUNCTION ensure_single_active_theme();

-- Trigger: Set published_at khi publish
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_published = TRUE AND OLD.is_published = FALSE THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_published_at_trigger
  BEFORE UPDATE ON bio_layouts
  FOR EACH ROW EXECUTE FUNCTION set_published_at();
```

---

## Storage Buckets

### Supabase Storage Setup

```sql
-- Tạo bucket cho product images (via Supabase Dashboard hoặc API)
-- Bucket name: product-images
-- Public: true (để có thể truy cập công khai)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif
```

### Storage Policies

```sql
-- Policy: Authenticated users có thể upload images
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Public có thể đọc images
CREATE POLICY "Public can read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Policy: Users có thể xóa images của mình
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### Storage Structure

```
product-images/
├── {channel_id}/
│   ├── {timestamp}-{filename}.jpg
│   ├── {timestamp}-{filename}.png
│   └── ...
```

---

## Migration & Seeding

### Migration Script

```sql
-- migration_001_initial_schema.sql

-- 1. Create channels table
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

-- 2. Create categories table
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

-- 3. Create products table
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

-- 4. Create color_themes table
CREATE TABLE color_themes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  colors JSONB NOT NULL,
  is_preset BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Create bio_layouts table
CREATE TABLE bio_layouts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT UNIQUE NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  blocks JSONB NOT NULL,
  theme_id BIGINT REFERENCES color_themes(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  last_saved_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Create indexes
CREATE INDEX idx_categories_channel ON categories(channel_id);
CREATE INDEX idx_categories_order ON categories(channel_id, order_index);
CREATE INDEX idx_products_channel ON products(channel_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(channel_id, status) WHERE status = 'active';
CREATE INDEX idx_products_order ON products(category_id, order_index);
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_themes_channel ON color_themes(channel_id);
CREATE INDEX idx_themes_active ON color_themes(channel_id, is_active) WHERE is_active = TRUE;
CREATE INDEX idx_themes_colors ON color_themes USING GIN(colors);
CREATE INDEX idx_layouts_published ON bio_layouts(channel_id, is_published) WHERE is_published = TRUE;
CREATE INDEX idx_layouts_blocks ON bio_layouts USING GIN(blocks);

-- 7. Create triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON channels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_color_themes_updated_at BEFORE UPDATE ON color_themes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bio_layouts_updated_at BEFORE UPDATE ON bio_layouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION ensure_single_active_theme()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = TRUE THEN
    UPDATE color_themes SET is_active = FALSE WHERE channel_id = NEW.channel_id AND id != NEW.id AND is_active = TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER single_active_theme_trigger BEFORE INSERT OR UPDATE ON color_themes FOR EACH ROW EXECUTE FUNCTION ensure_single_active_theme();

CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_published = TRUE AND OLD.is_published = FALSE THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_published_at_trigger BEFORE UPDATE ON bio_layouts FOR EACH ROW EXECUTE FUNCTION set_published_at();

-- 8. Enable RLS
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bio_layouts ENABLE ROW LEVEL SECURITY;
```

### Seeding Data (Preset Themes)

```sql
-- seed_preset_themes.sql
-- Insert preset color themes (có thể dùng cho tất cả channels)

-- Lưu ý: Preset themes không có channel_id cụ thể, hoặc có thể tạo cho channel_id = 0 (system)
-- Hoặc tạo khi user chọn preset → clone vào channel của họ

-- Pastel Dreams Theme
INSERT INTO color_themes (channel_id, name, colors, is_preset, is_active) VALUES
(0, 'Pastel Dreams', '{"primary": "#FFB3BA", "secondary": "#FFCAB0", "background": "#FFFFBA", "text": "#333333", "accent": "#BAE1FF"}', TRUE, FALSE),
(0, 'Soft Blush', '{"primary": "#FDB4E6", "secondary": "#F4B0D6", "background": "#FFF5E1", "text": "#333333", "accent": "#E8C5FF"}', TRUE, FALSE),
(0, 'Mint Breeze', '{"primary": "#B8F3F1", "secondary": "#98D8C8", "background": "#F7DC6F", "text": "#333333", "accent": "#F8B739"}', TRUE, FALSE),
(0, 'Lavender Dream', '{"primary": "#E8B4F3", "secondary": "#D4A5F4", "background": "#F4D4E8", "text": "#333333", "accent": "#E8F4F8"}', TRUE, FALSE),
(0, 'Peach Sunset', '{"primary": "#FFD7A8", "secondary": "#FFCBA4", "background": "#FFB3BA", "text": "#333333", "accent": "#FFE5CC"}', TRUE, FALSE);
```

---

## Query Patterns

### Common Queries

#### 1. Lấy Tất Cả Dữ Liệu Cho Trang Bio Công Khai

```sql
-- Lấy published layout với theme và channel info
SELECT 
  l.*,
  c.name as channel_name,
  c.avatar as channel_avatar,
  c.followers as channel_followers,
  c.bio as channel_bio,
  t.colors as theme_colors
FROM bio_layouts l
JOIN channels c ON l.channel_id = c.id
LEFT JOIN color_themes t ON l.theme_id = t.id
WHERE l.channel_id = 1 AND l.is_published = TRUE;
```

#### 2. Lấy Products Theo Category (Cho Block Render)

```sql
-- Lấy active products của category, sắp xếp theo order
SELECT 
  p.*,
  cat.name as category_name
FROM products p
JOIN categories cat ON p.category_id = cat.id
WHERE p.channel_id = 1 
  AND p.category_id = 1
  AND p.status = 'active'
  AND cat.is_hidden = FALSE
ORDER BY p.order_index;
```

#### 3. Lấy Tất Cả Categories Với Product Count

```sql
-- Lấy categories với số lượng products
SELECT 
  c.*,
  COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
WHERE c.channel_id = 1 AND c.is_hidden = FALSE
GROUP BY c.id
ORDER BY c.order_index;
```

#### 4. Tìm Products Theo Tags

```sql
-- Tìm products có tag "summer"
SELECT * FROM products
WHERE channel_id = 1
  AND status = 'active'
  AND tags @> ARRAY['summer']::TEXT[];
```

#### 5. Lấy Active Theme Của Channel

```sql
-- Lấy theme đang active
SELECT * FROM color_themes
WHERE channel_id = 1 AND is_active = TRUE
LIMIT 1;
```

#### 6. Update Layout Auto-Save

```sql
-- Auto-save layout (update blocks và last_saved_at)
UPDATE bio_layouts
SET 
  blocks = $1::jsonb,
  last_saved_at = NOW(),
  updated_at = NOW()
WHERE channel_id = $2;
```

#### 7. Publish Layout

```sql
-- Publish layout
UPDATE bio_layouts
SET 
  is_published = TRUE,
  published_at = NOW(),
  updated_at = NOW()
WHERE channel_id = $1;
```

---

## Tóm Tắt Database Design

### Điểm Mạnh

1. **Normalization:** Dữ liệu được normalize tốt, tránh redundancy
2. **Flexibility:** JSONB cho themes và layouts linh hoạt
3. **Performance:** Indexes được tối ưu cho các query patterns phổ biến
4. **Security:** RLS policies đảm bảo data isolation
5. **Cascade Rules:** Tự động cleanup khi xóa channel

### Lưu Ý

1. **JSONB Size:** Blocks và colors có thể lớn, cần monitor size
2. **Index Maintenance:** GIN indexes có thể chậm khi INSERT/UPDATE nhiều
3. **RLS Performance:** RLS policies có thể ảnh hưởng performance, cần test kỹ
4. **Storage:** Cần có strategy cho image cleanup khi xóa products

### Future Enhancements

1. **Full-Text Search:** Thêm full-text search cho products (PostgreSQL tsvector)
2. **Analytics Table:** Tạo bảng analytics để track views/clicks
3. **Versioning:** Thêm versioning cho layouts (lưu history)
4. **Soft Delete:** Có thể thêm `deleted_at` thay vì hard delete

---

**Kết Thúc Phân Tích Database**

