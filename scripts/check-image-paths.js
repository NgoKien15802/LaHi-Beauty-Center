/**
 * Script to check if image paths in services.json match actual files
 * Run: node scripts/check-image-paths.js
 */

const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, '../public/data/services.json');
const uploadPath = path.join(__dirname, '../public/upload');

// Read services.json
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

// Function to check if file exists (case-sensitive)
function checkFileExists(filePath) {
  const fullPath = path.join(uploadPath, filePath);
  try {
    return fs.existsSync(fullPath);
  } catch (e) {
    return false;
  }
}

// Function to find actual filename (case-insensitive search)
function findActualFile(dirPath, filename) {
  const fullDirPath = path.join(uploadPath, dirPath);
  
  if (!fs.existsSync(fullDirPath)) {
    return null;
  }
  
  const files = fs.readdirSync(fullDirPath);
  const lowerFilename = filename.toLowerCase();
  
  // Try exact match first
  if (files.includes(filename)) {
    return filename;
  }
  
  // Try case-insensitive match
  const found = files.find(f => f.toLowerCase() === lowerFilename);
  return found || null;
}

console.log('Checking image paths in services.json...\n');

let allGood = true;
let issues = [];

// Extract all services
const allServices = servicesData.categories.flatMap(cat =>
  cat.subMenu?.flatMap(sub => sub.services || []) || []
);

allServices.forEach(service => {
  if (!service.image) return;
  
  const imagePath = service.image.replace('upload/', '');
  const pathParts = imagePath.split('/');
  const filename = pathParts.pop();
  const dirPath = pathParts.join('/');
  
  const exists = checkFileExists(imagePath);
  
  if (!exists) {
    // Try to find actual file
    const actualFile = findActualFile(dirPath, filename);
    
    if (actualFile && actualFile !== filename) {
      issues.push({
        service: service.name,
        expected: imagePath,
        actual: `${dirPath}/${actualFile}`,
        fix: `"image": "upload/service/${dirPath}/${actualFile}"`
      });
      allGood = false;
    } else if (!actualFile) {
      issues.push({
        service: service.name,
        expected: imagePath,
        actual: 'FILE NOT FOUND',
        fix: 'Check if file exists on server'
      });
      allGood = false;
    }
  }
});

if (allGood) {
  console.log('✅ All image paths are correct!');
} else {
  console.log(`❌ Found ${issues.length} issues:\n`);
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. Service: ${issue.service}`);
    console.log(`   Expected: ${issue.expected}`);
    console.log(`   Actual:   ${issue.actual}`);
    if (issue.fix !== 'Check if file exists on server') {
      console.log(`   Fix:      ${issue.fix}`);
    }
    console.log('');
  });
}

