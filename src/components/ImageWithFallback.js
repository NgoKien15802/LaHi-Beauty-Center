import React, { useState } from "react";
import { encodeImagePath } from "../utils/imageUtils";

/**
 * Image component with automatic case-insensitive fallback
 * Tries multiple case variations of the filename if the original fails to load
 */
const ImageWithFallback = ({
  src,
  alt,
  className,
  fallbackSrc = "/thumbs/300x345x2/assets/images/noimage.png.webp",
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attempts, setAttempts] = useState(0);

  // Generate case variations of the filename
  const getCaseVariations = (path) => {
    if (!path) return [];
    
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const dirPath = parts.slice(0, -1).join('/');
    
    // Get filename without extension
    const lastDot = filename.lastIndexOf('.');
    const nameWithoutExt = lastDot > 0 ? filename.substring(0, lastDot) : filename;
    const ext = lastDot > 0 ? filename.substring(lastDot) : '';
    
    // Generate variations
    const variations = [
      filename, // Original
      filename.toLowerCase(), // All lowercase
      filename.toUpperCase(), // All uppercase
      nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1).toLowerCase() + ext, // Title case
    ];
    
    // Remove duplicates
    const unique = [...new Set(variations)];
    
    return unique.map(variation => {
      if (dirPath) {
        return `${dirPath}/${variation}`;
      }
      return variation;
    });
  };

  const handleError = (e) => {
    if (attempts === 0) {
      // First attempt failed, try case variations
      const variations = getCaseVariations(src);
      if (variations.length > 1) {
        // Try next variation
        const nextAttempt = attempts + 1;
        if (nextAttempt < variations.length) {
          setAttempts(nextAttempt);
          setCurrentSrc(variations[nextAttempt]);
          return; // Don't set fallback yet
        }
      }
    }
    
    // All attempts failed, use fallback
    e.target.src = fallbackSrc;
  };

  return (
    <img
      src={`/${encodeImagePath(currentSrc)}`}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;

