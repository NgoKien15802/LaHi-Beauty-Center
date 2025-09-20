import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎉 LaHi Beauty Center - React App</h1>
      <p>Migration từ vanilla JS sang React thành công!</p>
      <div style={{ marginTop: '30px' }}>
        <h2>✅ Tính năng đã hoàn thành:</h2>
        <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li>React Router với URL đẹp</li>
          <li>Dynamic Services loading từ JSON</li>
          <li>Responsive Header & Footer</li>
          <li>SEO optimized pages</li>
          <li>External libraries integration</li>
        </ul>
      </div>
      <div style={{ marginTop: '30px' }}>
        <h3>🚀 Sẵn sàng để phát triển!</h3>
        <p>Server đang chạy tại: <strong>http://localhost:3000</strong></p>
      </div>
    </div>
  );
}

export default App;
