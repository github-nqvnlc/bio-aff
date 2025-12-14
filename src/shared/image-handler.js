/**
 * Image Handler - Supabase Storage
 * 
 * Handles image upload, validation, and deletion for product images
 * 
 * @module shared/image-handler
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const BUCKET_NAME = 'product-images';
const MAX_FILE_SIZE = parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '5242880'); // 5MB default
const ALLOWED_TYPES = (import.meta.env.VITE_ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp,image/gif').split(',');

/**
 * Validate image file
 * @param {File} file - Image file to validate
 * @returns {Object} Validation result with isValid and error message
 */
export function validateImageFile(file) {
  // Check if file exists
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}`
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(2);
    return {
      isValid: false,
      error: `File size exceeds limit of ${maxSizeMB}MB`
    };
  }

  return { isValid: true };
}

/**
 * Upload image to Supabase Storage
 * @param {File} file - Image file to upload
 * @param {number} channelId - Channel ID for folder structure
 * @returns {Promise<Object>} Upload result with url and path
 * @throws {Error} If upload fails
 */
export async function uploadImage(file, channelId) {
  // Validate file
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Generate file path
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const randomString = Math.random().toString(36).substring(7);
  const fileName = `${timestamp}-${randomString}.${fileExt}`;
  const filePath = `${channelId}/${fileName}`;

  try {
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath,
      fileName: fileName
    };
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

/**
 * Delete image from Supabase Storage
 * @param {string} filePath - Path to image file
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
export async function deleteImage(filePath) {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  } catch (error) {
    console.error('Image delete error:', error);
    throw error;
  }
}

/**
 * Get public URL for image
 * @param {string} filePath - Path to image file
 * @returns {string} Public URL
 */
export function getImageUrl(filePath) {
  if (!filePath) return null;
  
  // If already a full URL, return as is
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Preview image from file input
 * @param {File} file - Image file
 * @returns {Promise<string>} Data URL for preview
 */
export function previewImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    
    reader.onerror = (error) => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Convert image to WebP format (optional, for optimization)
 * @param {File} file - Image file
 * @returns {Promise<File>} WebP file
 */
export async function convertToWebP(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert to WebP'));
            return;
          }
          const webpFile = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), {
            type: 'image/webp'
          });
          resolve(webpFile);
        },
        'image/webp',
        0.8 // Quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

