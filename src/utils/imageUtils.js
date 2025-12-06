/**
 * Encode image path properly for URLs
 * This function splits the path by '/' and encodes each segment separately
 * to preserve the path structure while encoding special characters
 * 
 * IMPORTANT: Keep the exact case as in JSON - ensure JSON matches server filenames exactly
 * 
 * @param {string} imagePath - The image path to encode (e.g., "upload/service/chăm sóc da/image.png")
 * @returns {string} - The encoded path (e.g., "upload/service/ch%C4%83m%20s%C3%B3c%20da/image.png")
 */
export const encodeImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // Split by '/' and encode each segment separately
  // This preserves the path structure while encoding special characters
  // Keep original case - JSON must match server filenames exactly
  return imagePath
    .split('/')
    .map(segment => {
      // encodeURIComponent handles spaces, unicode, parentheses, etc. correctly
      return encodeURIComponent(segment);
    })
    .join('/');
};

