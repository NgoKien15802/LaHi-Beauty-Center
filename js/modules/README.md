# Service Detail Modules

Cấu trúc module đã được refactor để dễ maintain và mở rộng:

## DataLoader.js
- **Chức năng**: Xử lý việc load dữ liệu services và service details
- **Methods**:
  - `loadServicesData()`: Load file services.json
  - `findServiceById()`: Tìm service theo ID
  - `loadServiceDetail()`: Load file detail JSON
  - `loadAllData()`: Load tất cả dữ liệu cần thiết

## TOCRenderer.js
- **Chức năng**: Xử lý việc render Table of Contents và tương tác
- **Methods**:
  - `render()`: Render TOC từ data
  - `createTOCContainer()`: Tạo container cho TOC
  - `buildTOCHTML()`: Build HTML cho TOC
  - `attachScrollBehavior()`: Thêm smooth scroll
  - `createNumberingMap()`: Tạo map đánh số cho headings
  - `createTOCChildrenMap()`: Tạo map children cho TOC

## ContentRenderer.js
- **Chức năng**: Xử lý việc render nội dung chi tiết
- **Methods**:
  - `render()`: Render toàn bộ nội dung
  - `renderIntro()`: Render phần giới thiệu
  - `renderSection()`: Render từng section
  - `renderTOCChildren()`: Render children theo TOC
  - `createHTMLHelpers()`: Tạo các helper functions cho HTML

## ServiceDetailPage.js (Main Class)
- **Chức năng**: Orchestrate các module và xử lý flow chính
- **Dependencies**: DataLoader, TOCRenderer, ContentRenderer
- **Methods**:
  - `init()`: Khởi tạo và load data
  - `render()`: Render trang chi tiết
  - `showError()`: Hiển thị lỗi

## Lợi ích của cấu trúc mới:
1. **Separation of Concerns**: Mỗi module có trách nhiệm riêng biệt
2. **Reusability**: Các module có thể tái sử dụng cho các trang khác
3. **Testability**: Dễ dàng test từng module riêng biệt
4. **Maintainability**: Dễ maintain và debug
5. **Extensibility**: Dễ dàng thêm tính năng mới

## Cách sử dụng:
```javascript
// Tự động load khi có serviceId
window.initServiceDetailPage('peel-da-chuyen-sau-sac-to');
```
