/**
 * Encode image path properly for URLs
 * This function splits the path by '/' and encodes each segment separately
 * to preserve the path structure while encoding special characters
 * 
 * @param {string} imagePath - The image path to encode (e.g., "upload/service/chăm sóc da/image.png")
 * @returns {string} - The encoded path (e.g., "upload/service/ch%C4%83m%20s%C3%B3c%20da/image.png")
 */
export const encodeImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // Split by '/' and encode each segment separately
  return imagePath
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
};

