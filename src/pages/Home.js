import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="main-content">
      <div className="container">
        <h1>🏠 Trang chủ - LaHi Beauty Center</h1>
        <div className="hero-section" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center',
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <h2>Chào mừng đến với LaHi Beauty Center</h2>
          <p>Cam kết da đẹp, hiệu quả, tư vấn đúng liệu trình</p>
          <Link to="/services" style={{
            background: 'white',
            color: '#667eea',
            padding: '15px 30px',
            borderRadius: '25px',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '20px'
          }}>
            Khám phá dịch vụ
          </Link>
        </div>
        
        <div className="features" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          margin: '40px 0'
        }}>
          <div className="feature-card" style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3>✨ Dịch vụ chuyên nghiệp</h3>
            <p>Từ triệt lông diode laser đến chăm sóc da chuyên sâu</p>
          </div>
          <div className="feature-card" style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3>🏆 Công nghệ hiện đại</h3>
            <p>Sử dụng các thiết bị và công nghệ tiên tiến nhất</p>
          </div>
          <div className="feature-card" style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3>👩‍⚕️ Đội ngũ chuyên gia</h3>
            <p>Được đào tạo chuyên nghiệp và có kinh nghiệm</p>
          </div>
        </div>
        
        <div className="cta-section" style={{
          background: '#f8f9fa',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          margin: '40px 0'
        }}>
          <h3>Liên hệ ngay để được tư vấn miễn phí</h3>
          <p>Hotline: <strong>096 165 88 66</strong></p>
          <Link to="/contact" style={{
            background: '#28a745',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '25px',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '20px'
          }}>
            Liên hệ ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
