# 📝 Updates & Changes to Requirements

**Last Updated:** December 8, 2025

---

## Major Enhancements to MVP Requirements

### 🎨 1. Theme Customization System (NEW - CORE FEATURE)

**Added to Mục 9.4 (Tùy chỉnh giao diện & Theme)**

#### 5-Color Palette System
- Each theme consists of 5 carefully designed colors:
  1. **Primary**: Màu chủ đạo (buttons, headings, accents)
  2. **Secondary**: Màu phụ (tags, badges)
  3. **Background**: Màu nền chính (pages, cards)
  4. **Text**: Màu chữ (content)
  5. **Accent**: Màu nhấn (hover, highlights)

#### Preset Color Themes
- **10+ pre-designed pastel themes** from ColorHunt:
  - Pastel Dreams, Soft Blush, Mint Breeze, Lavender Dream, Peach Sunset, + 5 more
  - One-click apply to public bio page
  - Live preview before saving

#### Custom Color Picker
- Users can create **unlimited custom themes**:
  - Hex/RGB/HSL color picker for each color
  - Auto-validation of WCAG A11y contrast (≥ 4.5:1)
  - Save with custom names (e.g., "Summer 2025")
  - Export/import custom themes (JSON)

---

### 🖱️ 2. Drag-Drop Layout Builder (NEW - CORE FEATURE)

**Added to Mục 2.4 (Tùy chỉnh Giao diện) & Mục 9.4.2**

#### 9 Block Types Available:
1. **Channel Info Block** - Avatar, name, followers, bio
2. **Product Grid Block** - Customizable grid (1, 2, 3 columns)
3. **Product List Block** - Carousel or vertical list
4. **Category Collapse Block** - Traditional collapse/expand (current)
5. **Category Tabs Block** - NEW: Tab navigation between categories
6. **Carousel Block** - NEW: Product slider with auto-play
7. **Hero Banner Block** - NEW: Custom hero section
8. **Custom Spacing Block** - NEW: Add space between sections
9. **Footer Block** - Social links & contact info

#### Visual Builder Interface (Admin Page)
- **Left Sidebar**: Block library (drag-drop)
- **Center**: Live preview canvas
- **Right Sidebar**: Block settings (edit properties)
- **Features**:
  - Drag blocks from library → add to canvas
  - Click block → edit settings
  - Drag on canvas → reorder
  - Preview in 3 responsive sizes (375px, 768px, 1024px)
  - Save draft & publish workflow

#### Block Customization Options
Each block has context-specific settings:
- **Grid Block**: Columns, card style, spacing, image aspect ratio
- **List Block**: Direction (horizontal/vertical), item height, content visibility
- **Collapse Block**: Start state, animation, icon style
- **Carousel Block**: Auto-play duration, arrows/dots, items per page
- **Hero Block**: Background image/color, text overlay, CTA button

#### Layout Presets
- **5-7 pre-built layouts** users can use as templates:
  - Classic: Header → Collapse → Grid
  - Modern: Hero → Tabs → Grid
  - Minimal: Header → Carousel → Footer
  - Featured: Header → Tabs → Featured + Rest
  - List Style: Header → List → More

#### Save & Publish
- **Draft mode**: Save layout without publishing
- **Publish**: Make live on public bio page
- **Auto-save**: Every 30 seconds
- **Responsive preview**: Instant feedback as user edits

**Data Structure:**
```javascript
bio_layouts {
  id, 
  channel_id, 
  blocks: [
    { id, type, order, settings: {...} },
    ...
  ],
  published_at,
  created_at,
  updated_at
}
```

---

### 🎯 3. Admin Panel Restructuring (UPDATED - Mục 2)

Previously scattered requirements are now organized into **4 main sections**:

**2.1 Channel Management**
- TikTok login/logout
- View channel info (avatar, name, followers)
- Edit bio description

**2.2 Category Management** (Enhanced)
- Create, edit, delete categories
- Drag-drop reorder
- Hide/show toggle (don't delete, just hide)
- Search & filter

**2.3 Product Management** (Enhanced)
- Create, edit, delete products
- Image upload with preview
- Drag-drop reorder within category
- Duplicate product (create variant)
- Status toggle (active/inactive)
- Internal tags

**2.4 Theme & Layout Customization** (NEW)
- 4 sub-tabs:
  - **Theme Colors**: Preset selection + custom color picker
  - **Layout Builder**: Drag-drop canvas (as described above)
  - **Fonts & Branding**: Google Fonts, logo, social links
  - **Advanced Styling**: Borders, shadows, spacing, animations

---

### 📄 4. Bio Public Page Redesign (UPDATED - Mục 3)

Changed from **fixed layout** to **fully customizable layout**:

**Before**: Always: Header → Collapse Categories → Products Grid

**Now**: User-defined order using layout builder:
- Can have: Hero Banner → Tabs → Grid → Carousel → Footer
- Or: Header → List → Spacing → Grid → Footer
- Or: Any combination of 9 block types

**Responsive Features**:
- Dynamic grid columns (1, 2, or 3)
- Responsive image sizing
- Lazy load on scroll
- Touch-friendly spacing
- WebP images with PNG fallback

---

### 🔄 5. Data Structure Expansion (UPDATED - Mục 4-5)

**NEW Tables in Supabase:**
1. `bio_layouts` - Store layout configuration (blocks array)
2. `color_themes` - Store color theme definitions

**Enhanced Tables:**
- `channels`: Added `followers`, `updated_at`
- `products`: Added `status`, `tags`, `order`
- `categories`: Added `order`, `hidden`

---

### 📱 6. Mobile-First Design (UPDATED - Mục 7)

Emphasized:
- **375px priority** (smallest phone size)
- **2-3 viewport testing** (375, 768, 1024px)
- **48x48px** minimum touch targets
- **44x44px** acceptable for secondary
- **16px+ body text** on all devices

---

### 🧪 7. Testing Scope Expanded (UPDATED - Mục 8)

Added specific tests for new features:
- Theme color application (live update)
- Layout builder interactions (drag, reorder, delete, duplicate)
- Block settings update
- Responsive preview in all viewports
- A11y color contrast validation

---

## Technology Impact

### Libraries Added (for MVP):
```
- sortablejs: Drag-drop layout builder
- color-picker library: Color selection UI
- html2canvas: Screenshot/preview functionality
```

### Browser Compatibility:
- All modern browsers (Chrome, Firefox, Safari, Edge latest 2 versions)
- Mobile: iOS Safari, Chrome mobile, Samsung browser

### Performance Targets:
- Lighthouse ≥ 90 across all metrics
- Load time < 2s on 3G
- LCP < 2.5s, CLS < 0.1

---

## Roadmap Impact

### Phase 1: MVP (Week 1-2) - EXPANDED SCOPE
**Additions:**
- Theme system (preset + custom)
- Layout builder (9 block types, drag-drop)
- Fonts & branding customization
- Responsive preview in builder

**Removed from MVP:**
- Real TikTok OAuth (kept as mock)
- Analytics dashboard (moved to Phase 2)
- Multi-user/RBAC (moved to Phase 3)

### Phase 2: Polish & Integration
- Real TikTok OAuth
- Image optimization
- Analytics
- Advanced styling

### Phase 3: Expansion
- Social media integration
- Public API
- Dark mode
- Theme marketplace

---

## Feature Priority Matrix

```
HIGH PRIORITY (MVP Essential):
├── TikTok Auth (mock)
├── Product CRUD
├── Theme Colors ⭐ NEW
├── Layout Builder ⭐ NEW
└── Image Upload

MEDIUM PRIORITY (Phase 1/2):
├── Import/Export (JSON)
├── Fonts & Branding
├── Advanced Styling
└── Image Optimization

PHASE 2+:
├── Analytics Dashboard
├── Real TikTok OAuth
├── Email Notifications
└── Public API
```

---

## Key Design Decisions

### Why 5-Color System?
- Balanced between simplicity (5 is manageable) and flexibility (enough for design)
- Professional designers use 5-color palettes (primary, secondary, neutral, accent, background)
- Easy to validate for A11y (all text-bg combinations)

### Why Drag-Drop Builder?
- Low-code approach: No programming required
- Visual feedback: See changes instantly
- Flexible: Unlimited layout combinations
- Future-proof: Easy to add new block types

### Why Preset Themes?
- Accessibility: Users unfamiliar with design can start immediately
- Brand consistency: Even with custom colors, system maintains harmony
- Speed: 1-click apply

---

## Success Metrics (Updated)

### MVP Launch:
- ✅ 100% of users can customize theme & layout (NOT defaults-only)
- ✅ 80%+ of users apply custom theme in first session
- ✅ 0% confusion about builder (intuitive UX)
- ✅ Lighthouse ≥ 90 across all metrics

### Engagement:
- 🎯 10+ minutes average session time in builder
- 🎯 20%+ users create custom theme (not just use preset)
- 🎯 5%+ CTR on affiliate links

---

## Breaking Changes

**For current todo list:**
- ❌ Remove: "Fix colors to pastel pink only" 
- ✅ Add: "Implement theme color system"
- ✅ Add: "Build layout builder with 9 blocks"
- ✅ Add: "Add theme preview functionality"

**For current tech stack:**
- Added: sortablejs, color-picker lib
- Consider: React-based builder (Phase 2 if Vanilla JS gets complex)

---

## Next Steps

1. ✅ Update req.md with new requirements (DONE)
2. ✅ Update tech.md with new libraries (DONE in tech.md)
3. ⏭️ Create implementation roadmap in todo.md
4. ⏭️ Design UI mockups for admin panel (9.4)
5. ⏭️ Design UI mockups for layout builder
6. ⏭️ Create database schema (Supabase)
7. ⏭️ Start coding Phase 1

---

## Questions for Clarification

1. **Block Reordering**: Should blocks be reorderable by drag-handle or just drag anywhere?
2. **Theme Naming**: Should preset themes have Vietnamese names or English?
3. **Layout Defaults**: Should new users auto-load a default layout (e.g., "Classic")?
4. **Export Layouts**: Should users be able to share/download layouts as JSON?
5. **Block Limits**: Any maximum number of blocks per layout?
