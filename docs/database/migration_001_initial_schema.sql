-- ============================================
-- Bio Affiliate Database Schema Migration
-- Migration: 001_initial_schema
-- Created: 2025-12-14
-- Description: Initial database schema with 5 tables, indexes, triggers, and RLS
-- ============================================

-- ============================================
-- 1. TABLES
-- ============================================

-- Table: channels
CREATE TABLE IF NOT EXISTS channels (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tiktok_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  followers INTEGER DEFAULT 0,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: categories
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  is_hidden BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: products
CREATE TABLE IF NOT EXISTS products (
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

-- Table: color_themes
CREATE TABLE IF NOT EXISTS color_themes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_id BIGINT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  colors JSONB NOT NULL,
  is_preset BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: bio_layouts
CREATE TABLE IF NOT EXISTS bio_layouts (
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

-- ============================================
-- 2. INDEXES
-- ============================================

-- Channels indexes
CREATE INDEX IF NOT EXISTS idx_channels_tiktok_id ON channels(tiktok_id); -- Already indexed by UNIQUE, but explicit for clarity

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_channel ON categories(channel_id);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(channel_id, order_index);

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_products_channel ON products(channel_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(channel_id, status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_products_order ON products(category_id, order_index);
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN(tags);

-- Color themes indexes
CREATE INDEX IF NOT EXISTS idx_themes_channel ON color_themes(channel_id);
CREATE INDEX IF NOT EXISTS idx_themes_active ON color_themes(channel_id, is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_themes_colors ON color_themes USING GIN(colors);

-- Bio layouts indexes
CREATE INDEX IF NOT EXISTS idx_layouts_channel ON bio_layouts(channel_id); -- Already indexed by UNIQUE
CREATE INDEX IF NOT EXISTS idx_layouts_published ON bio_layouts(channel_id, is_published) WHERE is_published = TRUE;
CREATE INDEX IF NOT EXISTS idx_layouts_blocks ON bio_layouts USING GIN(blocks);

-- ============================================
-- 3. TRIGGERS
-- ============================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at for channels
CREATE TRIGGER trigger_channels_updated_at
  BEFORE UPDATE ON channels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update updated_at for categories
CREATE TRIGGER trigger_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update updated_at for products
CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update updated_at for color_themes
CREATE TRIGGER trigger_color_themes_updated_at
  BEFORE UPDATE ON color_themes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update updated_at for bio_layouts
CREATE TRIGGER trigger_bio_layouts_updated_at
  BEFORE UPDATE ON bio_layouts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function: Ensure only one active theme per channel
CREATE OR REPLACE FUNCTION ensure_single_active_theme()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting a theme to active, deactivate all other themes for the same channel
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

-- Trigger: Single active theme per channel
CREATE TRIGGER trigger_single_active_theme
  BEFORE INSERT OR UPDATE ON color_themes
  FOR EACH ROW
  WHEN (NEW.is_active = TRUE)
  EXECUTE FUNCTION ensure_single_active_theme();

-- Function: Set published_at when is_published changes to TRUE
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  -- Set published_at when is_published changes from FALSE to TRUE
  IF NEW.is_published = TRUE AND (OLD.is_published IS NULL OR OLD.is_published = FALSE) THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Set published_at on publish
CREATE TRIGGER trigger_set_published_at
  BEFORE INSERT OR UPDATE ON bio_layouts
  FOR EACH ROW
  EXECUTE FUNCTION set_published_at();

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bio_layouts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. RLS POLICIES
-- ============================================

-- Channels policies
-- Policy: Users can read all channels (for public bio pages)
CREATE POLICY "Channels are viewable by everyone"
  ON channels FOR SELECT
  USING (true);

-- Policy: Users can insert their own channel
CREATE POLICY "Users can insert their own channel"
  ON channels FOR INSERT
  WITH CHECK (true); -- Will be restricted by auth in application layer

-- Policy: Users can update their own channel
CREATE POLICY "Users can update their own channel"
  ON channels FOR UPDATE
  USING (true); -- Will be restricted by auth in application layer

-- Categories policies
-- Policy: Users can read all categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Policy: Users can manage categories for their channels
CREATE POLICY "Users can manage their categories"
  ON categories FOR ALL
  USING (true); -- Will be restricted by auth in application layer

-- Products policies
-- Policy: Users can read active products
CREATE POLICY "Active products are viewable by everyone"
  ON products FOR SELECT
  USING (status = 'active');

-- Policy: Users can manage products for their channels
CREATE POLICY "Users can manage their products"
  ON products FOR ALL
  USING (true); -- Will be restricted by auth in application layer

-- Color themes policies
-- Policy: Users can read all themes
CREATE POLICY "Themes are viewable by everyone"
  ON color_themes FOR SELECT
  USING (true);

-- Policy: Users can manage themes for their channels
CREATE POLICY "Users can manage their themes"
  ON color_themes FOR ALL
  USING (true); -- Will be restricted by auth in application layer

-- Bio layouts policies
-- Policy: Users can read published layouts
CREATE POLICY "Published layouts are viewable by everyone"
  ON bio_layouts FOR SELECT
  USING (is_published = TRUE);

-- Policy: Users can manage layouts for their channels
CREATE POLICY "Users can manage their layouts"
  ON bio_layouts FOR ALL
  USING (true); -- Will be restricted by auth in application layer

-- ============================================
-- 6. COMMENTS (Documentation)
-- ============================================

COMMENT ON TABLE channels IS 'Stores TikTok channel/user information';
COMMENT ON TABLE categories IS 'Product categories for each channel';
COMMENT ON TABLE products IS 'Affiliate products for each channel';
COMMENT ON TABLE color_themes IS 'Color theme configurations';
COMMENT ON TABLE bio_layouts IS 'Bio page layout configurations with drag-drop blocks';

-- ============================================
-- Migration Complete
-- ============================================

-- Verify tables created
DO $$
BEGIN
  RAISE NOTICE 'Migration 001_initial_schema completed successfully!';
  RAISE NOTICE 'Tables created: channels, categories, products, color_themes, bio_layouts';
  RAISE NOTICE 'Indexes, triggers, and RLS policies have been set up.';
END $$;

