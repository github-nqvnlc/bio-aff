-- ============================================
-- Supabase Storage Setup - Bio Affiliate
-- Created: 2025-12-14
-- Description: Create storage bucket and policies for product images
-- ============================================

-- ============================================
-- 1. CREATE STORAGE BUCKET
-- ============================================

-- Create bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true, -- Public bucket (images need to be accessible)
  5242880, -- 5MB limit (5 * 1024 * 1024)
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. STORAGE POLICIES
-- ============================================

-- Policy: Anyone can view images (public bucket)
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Policy: Authenticated users can upload images
-- Note: In Phase 1 (mock auth), this will allow all uploads
-- In Phase 2 (real auth), will restrict to channel owners
CREATE POLICY "Users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  (storage.foldername(name))[1] IS NOT NULL -- Must have folder structure: {channel_id}/filename
);

-- Policy: Users can update their own images
CREATE POLICY "Users can update own product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' AND
  (storage.foldername(name))[1] IS NOT NULL
)
WITH CHECK (
  bucket_id = 'product-images' AND
  (storage.foldername(name))[1] IS NOT NULL
);

-- Policy: Users can delete their own images
CREATE POLICY "Users can delete own product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' AND
  (storage.foldername(name))[1] IS NOT NULL
);

-- ============================================
-- 3. VERIFY SETUP
-- ============================================

-- Check bucket exists
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- Check policies
SELECT * FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%product%';

-- ============================================
-- Setup Complete
-- ============================================

DO $$
BEGIN
  RAISE NOTICE 'Storage bucket "product-images" setup completed!';
  RAISE NOTICE 'Bucket is public, 5MB file size limit, images only';
  RAISE NOTICE 'Storage policies have been created.';
END $$;

