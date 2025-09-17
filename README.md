# LaHi Beauty Center

Website của LaHi Beauty Center với Single Page Application (SPA) routing.

## 🚀 Cách chạy local

### Yêu cầu
- Node.js (phiên bản 14 trở lên)
- npm

### Cài đặt và chạy

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy server:**
   ```bash
   npm start
   ```

3. **Mở browser:**
   ```
   http://localhost:3000
   ```

## 📁 Cấu trúc project

```
LaHi-Beauty-Center/
├── index.html          # Trang chính
├── header.html         # Header component
├── footer.html         # Footer component
├── pages/              # Các trang con
│   ├── home.html
│   ├── about.html
│   ├── services.html
│   └── ...
├── js/
│   ├── router.js       # Router chính
│   └── layout.js       # Layout và route handlers
├── assets/             # CSS, JS, images
├── server.js           # Express server cho SPA routing
└── package.json        # Dependencies
```

## 🔧 Tính năng

- ✅ Single Page Application (SPA) routing
- ✅ Tự động detect GitHub Pages vs Local
- ✅ Responsive design
- ✅ SEO friendly
- ✅ GitHub Pages deployment ready

## 🌐 Deploy lên GitHub Pages

1. **Push code lên GitHub:**
   ```bash
   git add .
   git commit -m "Add SPA routing support"
   git push origin main
   ```

2. **Cấu hình GitHub Pages:**
   - Vào Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

3. **Truy cập website:**
   ```
   https://yourusername.github.io/LaHi-Beauty-Center/
   ```

## 📝 Lưu ý

- Server Express chỉ cần cho development local
- GitHub Pages sẽ tự động serve static files
- File `404.html` và `.nojekyll` đã được cấu hình cho GitHub Pages
