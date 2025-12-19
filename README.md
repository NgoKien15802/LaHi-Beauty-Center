# LaHi Beauty Center

Website giới thiệu dịch vụ và sản phẩm của LaHi Beauty Center - được xây dựng bằng React.js

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt:

- **Node.js** phiên bản 16.x trở lên
- **npm** phiên bản 8.x trở lên (đi kèm với Node.js)

Kiểm tra phiên bản:
```bash
node --version
npm --version
```

## 🚀 Hướng dẫn cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd LaHi-Beauty-Center
```

### 2. Cài đặt các thư viện phụ thuộc

```bash
npm install
```

## 💻 Chạy ứng dụng

### Chế độ Development (phát triển)

```bash
npm start
```

Ứng dụng sẽ chạy tại địa chỉ: [http://localhost:3000](http://localhost:3000)

Trang web sẽ tự động reload khi bạn thay đổi code.

### Build Production (xuất bản)

```bash
npm run build
```

Lệnh này sẽ tạo thư mục `build/` chứa các file tĩnh đã được tối ưu hóa, sẵn sàng để deploy lên server.

### Deploy lên GitHub Pages

```bash
npm run deploy
```

## 📁 Cấu trúc thư mục

```
LaHi-Beauty-Center/
├── public/                 # Tài nguyên tĩnh
│   ├── assets/            # CSS, JS libraries
│   ├── data/              # Dữ liệu JSON (services, products, news...)
│   ├── upload/            # Hình ảnh upload
│   └── index.html         # File HTML chính
├── src/                   # Source code React
│   ├── components/        # Các component tái sử dụng
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Layout.js
│   │   └── ...
│   ├── pages/             # Các trang của website
│   │   ├── Home.js
│   │   ├── Services.js
│   │   ├── Products.js
│   │   ├── News.js
│   │   ├── About.js
│   │   ├── Contact.js
│   │   └── ...
│   ├── styles/            # File CSS
│   ├── utils/             # Hàm tiện ích
│   ├── App.js             # Component gốc
│   └── index.js           # Entry point
├── scripts/               # Scripts hỗ trợ
├── package.json           # Cấu hình project và dependencies
└── README.md              # File này
```

## 🛠 Công nghệ sử dụng

| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| React | 18.2.0 | Thư viện UI |
| React Router DOM | 6.8.0 | Điều hướng SPA |
| Bootstrap | 5.2.0 | CSS Framework |
| AOS | 2.3.4 | Animate on Scroll |
| React Toastify | 9.1.3 | Thông báo toast |
| Mammoth | 1.11.0 | Đọc file Word (.docx) |

## 📝 Các lệnh có sẵn

| Lệnh | Mô tả |
|------|-------|
| `npm start` | Chạy ứng dụng ở chế độ development |
| `npm run build` | Build ứng dụng cho production |
| `npm test` | Chạy test |
| `npm run deploy` | Deploy lên GitHub Pages |

## 🔧 Xử lý sự cố

### Lỗi khi cài đặt npm install

Thử xóa cache và cài lại:
```bash
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

### Port 3000 đã được sử dụng

Thay đổi port bằng cách:
```bash
# Windows
set PORT=3001 && npm start

# Linux/Mac
PORT=3001 npm start
```

## 📄 License

© 2024 LaHi Beauty Center. All rights reserved.

