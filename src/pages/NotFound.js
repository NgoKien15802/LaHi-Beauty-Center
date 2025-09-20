import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{textAlign: 'center', padding: '50px'}}>
      <h2>404 - Trang không tìm thấy</h2>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to="/" style={{color: '#007bff', textDecoration: 'none'}}>
        ← Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
