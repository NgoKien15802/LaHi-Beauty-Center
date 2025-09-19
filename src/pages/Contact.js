import React from 'react';

const Contact = () => {
  return (
    <div className="wrap-all">
      <div className="wrap-main">
        <div className="title-main">
          <h2>Liên hệ với chúng tôi</h2>
        </div>
        <div className="content-main w-clear markdownEditor">
          <div style={{textAlign: 'center', padding: '50px'}}>
            <h3>Thông tin liên hệ</h3>
            <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'left'}}>
              <div style={{marginBottom: '20px'}}>
                <h4>📍 Địa chỉ</h4>
                <p>194 Nguyễn Văn Tuyết, Đống Đa, Hà Nội</p>
              </div>
              
              <div style={{marginBottom: '20px'}}>
                <h4>📞 Hotline</h4>
                <p><a href="tel:0961658866" style={{color: '#007bff', textDecoration: 'none'}}>096 165 88 66</a></p>
              </div>
              
              <div style={{marginBottom: '20px'}}>
                <h4>📧 Email</h4>
                <p><a href="mailto:lahibeautycenter@gmail.com" style={{color: '#007bff', textDecoration: 'none'}}>lahibeautycenter@gmail.com</a></p>
              </div>
              
              <div style={{marginBottom: '20px'}}>
                <h4>🌐 Website</h4>
                <p><a href="http://lahibeautycenter.com" style={{color: '#007bff', textDecoration: 'none'}}>lahibeautycenter.com</a></p>
              </div>
              
              <div style={{marginBottom: '20px'}}>
                <h4>⏰ Giờ làm việc</h4>
                <p>Thứ 2 - Chủ nhật: 9:00 - 21:00</p>
              </div>
            </div>
            
            <div style={{marginTop: '40px'}}>
              <h4>Bản đồ</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.062829054936!2d105.83357!3d21.02173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab768ae5f4c9%3A0x2dfe35e9c2966d13!2s194%20Nguy%E1%BB%85n%20V%C4%83n%20Tuy%E1%BA%BFt%2C%20Ng%C3%A3%20T%C6%B0%20S%E1%BB%9F%2C%20%C4%90%E1%BB%91ng%20%C4%90a%2C%20H%C3%A0%20N%E1%BB%99i!5e0!3m2!1svi!2s!4v1736817841234!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{border: 0, borderRadius: '10px'}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LaHi Beauty Center Location">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
