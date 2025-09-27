import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="footer_wrap">
        <div className="footer_article">
          <div className="wrap-content">
            <div className="footer_flex">
              <div className="footer_news">
                <Link to="/" className="footer_logo">
                  <img src="upload/trangchu/logo_trang.png" alt=""/>
                </Link>
              </div>
              <div className="footer_news">
                <h3 className="footer_title">Thông tin liên hệ</h3>
                <div className="footer_info" style={{ lineHeight: '1', fontSize: '16px' }}>
                  <p>
                    <img alt="" height="20" src="upload/filemanager/files/icon/icons8-map-marker-20.png" width="20" /> 
                    CS1 : S2.16 - Vinhomes Ocean Park, Gia Lâm, Hà Nội
                  </p>
                  <p>
                    <img alt="" height="20" src="upload/filemanager/files/icon/icons8-help-20.png" width="20" /> 
                    Hotline 1: <a href="tel:0876638686" className="info__hotline">087.663.8686</a>
                  </p>
                  <p>
                    <img alt="" height="20" src="upload/filemanager/files/icon/icons8-map-marker-20.png" width="20" /> 
                    CS2 : 194 Nguyễn Văn Tuyết - Quận Đống Đa, Tp. Hà Nội
                  </p>
                  <p>
                    <img alt="" height="20" src="upload/filemanager/files/icon/icons8-help-20.png" width="20" /> 
                    Hotline 2: <a href="tel:0961658866" className="info__hotline">096.165.8866</a>
                  </p>
                  <p>
                    <img alt="" height="20" src="upload/filemanager/files/icon/icons8-email-20.png" width="20" /> 
                    Email: lahibeautycenter@gmail.com
                  </p>
                  <p>
                    <img alt="" height="20" src="upload/filemanager/files/icon/icons8-website-20.png" width="20" /> 
                    Website: <a href="http://lahibeautycenter.com" className="text-white custom-link-website" target="_blank" rel="noopener">lahibeautycenter.com </a>
                  </p>
                </div>
                <ul className="social socialf">
                  <li>
                    <a href="https://www.facebook.com/lahibeautycenter1" className="bg-white-socialf">
                      <img src="upload/photo/fb.png" alt="Facebook" width="36" height="36" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/lahibeautycenter7.7" className="bg-white-socialf">
                      <img src="upload/photo/instagram.png" style={{width: '36px', height: '36px'}} alt="instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tiktok.com/@lahibeautycenter" className="bg-white-socialf">
                      <img src="upload/photo/tiktok-1731040210.png" style={{width: '36px', height: '36px'}} alt="tiktok" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer_news">
                <h3 className="footer_title">Chính sách</h3>
                <ul className="policy_list">
                  <li><Link to="/">Chính sách hỗ trợ khách hàng</Link></li>
                  <li><Link to="/">Chính sách bảo hành</Link></li>
                  <li><Link to="/">Chính sách thanh toán</Link></li>
                  <li><Link to="/">Chính sách bảo mật</Link></li>
                </ul>
              </div>
              <div className="footer_news">
                <a href="https://www.facebook.com/lahibeautycenter1" target="_blank" rel="noopener noreferrer" className="fb-page-img">
                  <img src="upload/trangchu/snaptik_7472736510807133456_6.jpeg" alt="Her Skinlab" />
                </a>
              </div>
            </div>
            <div id="footer-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.062829054936!2d105.83357!3d21.02173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab768ae5f4c9%3A0x2dfe35e9c2966d13!2s194%20Nguy%E1%BB%85n%20V%C4%83n%20Tuy%E1%BA%BFt%2C%20Ng%C3%A3%20T%C6%B0%20S%E1%BB%9F%2C%20%C4%90%E1%BB%91ng%20%C4%90a%2C%20H%C3%A0%20N%E1%BB%99i!5e0!3m2!1svi!2s!4v1736817841234!5m2!1svi!2s"
                width="600"
                height="450"
                style={{border: 0}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LaHi Beauty Center Location">
              </iframe>
            </div>
          </div>
        </div>

        <div className="footer_powered">
          <div className="wrap-content">
            <div className="copyright">
              Copyright 2025 © <b>LaHi Beauty Center</b>. All rights reserved. Designed by <b>Nina.vn</b>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hotline Button */}
      <a id="hotline" 
         style={{
           '--background': '#968670', 
           '--bottom': '50px', 
           '--left': '20px', 
           '--right': '', 
           display: 'inline'
         }} 
         className="btn-phone btn-frame text-decoration-none" 
         href="tel:0961658866">
        <div className="animated infinite zoomIn kenit-alo-circle"></div>
        <div className="animated infinite pulse kenit-alo-circle-fill"></div>
        <i className="fa-solid fa-circle-phone tada"></i>
      </a>

      {/* Social Buttons */}
      <div id="social" 
           style={{
             '--background': '#968670', 
             '--bottom': '100px', 
             '--left': '', 
             '--right': '20px', 
             display: 'inline'
           }}>
        <a className="btn-frame text-decoration-none" href="https://www.tiktok.com/@lahibeautycenter">
          <div className="pulsation"></div>
          <div className="pulsation"></div>
          <i>
            <img src="upload/photo/tiktok-1731040210.png" alt="" title="" width="35" />
          </i>
        </a>
        <a className="btn-frame text-decoration-none" href="https://www.instagram.com/lahibeautycenter7.7">
          <div className="pulsation"></div>
          <div className="pulsation"></div>
          <i>
            <img src="upload/photo/instagram-1731040210.png" alt="" title="" width="35" />
          </i>
        </a>
        <a className="btn-frame text-decoration-none" href="https://www.facebook.com/lahibeautycenter1">
          <div className="pulsation"></div>
          <div className="pulsation"></div>
          <i>
            <img onError={(e) => e.target.src = 'assets/images/noimage.png'} 
                 src="upload/photo/fanpage-1731040210.png" alt="" title="" width="35" />
          </i>
        </a>
      </div>
    </>
  );
};

export default Footer;
