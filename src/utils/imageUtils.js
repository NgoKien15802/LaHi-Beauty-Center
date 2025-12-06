/**
 * Encode image path properly for URLs
 * This function splits the path by '/' and encodes each segment separately
 * to preserve the path structure while encoding special characters
 * 
 * Also normalizes all path segments to lowercase to avoid case-sensitivity issues on Linux servers
 * This ensures consistent behavior regardless of how filenames are stored in JSON
 * 
 * @param {string} imagePath - The image path to encode (e.g., "upload/service/chăm sóc da/image.png")
 * @returns {string} - The encoded path (e.g., "upload/service/ch%C4%83m%20s%C3%B3c%20da/image.png")
 */
export const encodeImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // Split by '/' and normalize each segment to lowercase
  // This avoids case-sensitivity issues on Linux servers
  // Then encode each segment separately to preserve path structure
  return imagePath
    .split('/')
    .map(segment => {
      // Normalize to lowercase first, then encode
      const normalized = segment.toLowerCase();
      // encodeURIComponent handles spaces, unicode, parentheses, etc. correctly
      return encodeURIComponent(normalized);
    })
    .join('/');
};

