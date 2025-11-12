const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
if (!fs.existsSync(buildDir)) {
  console.error('Build folder does not exist. Please run "npm run build" first.');
  process.exit(1);
}

// Copy .htaccess (for Apache) and _redirects (for Netlify)
const files = [
  { name: '.htaccess', desc: 'Apache' },
  { name: '_redirects', desc: 'Netlify' }
];

files.forEach(({ name, desc }) => {
  const source = path.join(__dirname, '..', 'public', name);
  const dest = path.join(__dirname, '..', 'build', name);
  
  if (fs.existsSync(source)) {
    try {
      fs.copyFileSync(source, dest);
      console.log(`✓ ${name} copied (${desc})`);
    } catch (error) {
      console.error(`Error copying ${name}:`, error);
    }
  }
});

