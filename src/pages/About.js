import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <div className="breadCrumbs">
        <div className="max-width">
          <div className="wrap-content">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="text-decoration-none" to="/">
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li className="breadcrumb-item active">
                <span>Giới thiệu</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="wrap-all">
        <div className="wrap-main">
          <div className="title-main">
            <h2>Điểm đến lý tưởng cho làn da hoàn hảo</h2>
          </div>
          <div className="content-main w-clear markdownEditor">
            <h1 style={{textAlign: 'center'}}>
              <span style={{color: '#90895f'}}>
                <strong>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    GIỚI THIỆU VỀ LAHI BEAUTY CENTER – ĐỐNG ĐA
                  </span>
                </strong>
              </span>
            </h1>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Tọa lạc tại trung tâm quận Đống Đa – Hà Nội, 
                <Link to="/"><strong>LaHi Beauty Center</strong></Link> 
                là địa chỉ tin cậy cho những ai mong muốn chăm sóc và cải thiện làn da chuyên nghiệp. Với phương châm "Nuôi dưỡng vẻ đẹp tự nhiên", chúng tôi cam kết mang đến cho khách hàng trải nghiệm thư giãn cùng hiệu quả vượt trội.
              </span>
            </p>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Đống Đa" height="333" src="upload/trangchu/snaptik_7472736510807133456_6.jpeg" width="500" />
            </p>

            <h2 style={{textAlign: 'justify'}}>
              <span style={{color: '#90895f'}}>
                <strong>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    Dịch vụ chăm sóc da chuyên nghiệp
                  </span>
                </strong>
              </span>
            </h2>

            <h3 style={{textAlign: 'justify'}}>
              <em>
                <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                  Liệu trình chăm sóc da mặt
                </span>
              </em>
            </h3>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Lahi Beauty Center cung cấp đa dạng liệu trình phù hợp với từng nhu cầu:
              </span>
            </p>

            <ul>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Trị mụn chuyên sâu</strong>: Làm sạch da, giảm viêm, hạn chế tái phát.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Trẻ hóa làn da</strong>: Kích thích sản sinh collagen, cải thiện nếp nhăn.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Dưỡng trắng sáng</strong>: Giúp da đều màu, mịn màng và rạng rỡ.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Glass Skin</strong>: Cho làn da căng bóng, trong trẻo như gương.
                  </span>
                </p>
              </li>
            </ul>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Quận 3" height="333" src="upload/trangchu/snaptik_7472736510807133456_12.jpeg" width="500" />
            </p>

            <h3 style={{textAlign: 'justify'}}>
              <em>
                <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                  Công nghệ hiện đại
                </span>
              </em>
            </h3>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Chúng tôi ứng dụng nhiều công nghệ tiên tiến:
              </span>
            </p>

            <ul>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>RF & MF Lifting</strong>: Nâng cơ, mờ nhăn, trẻ hóa tự nhiên.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Oxy Jet & Aqua Peel</strong>: Làm sạch sâu, cấp oxy tươi và dưỡng chất.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Hifu New Doublo 2.0</strong>: Nâng cơ, thon gọn gương mặt, trẻ hóa toàn diện.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Triệt lông Diode</strong>: Hiệu quả, an toàn, thoải mái.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Phun xăm (đầu kim siêu mảnh)</strong>: Lên màu tự nhiên, mềm mịn, không đau rát.
                  </span>
                </p>
              </li>
            </ul>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Đống Đa" height="333" src="upload/trangchu/snaptik_7472736510807133456_2.jpeg" width="500" />
            </p>

            <h3 style={{textAlign: 'justify'}}>
              <em>
                <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                  Đội ngũ tận tâm
                </span>
              </em>
            </h3>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Khách hàng sẽ được chăm sóc bởi đội ngũ giàu kinh nghiệm, luôn lắng nghe và tư vấn tận tình để mang đến liệu trình phù hợp nhất cho làn da.
              </span>
            </p>

            <h3 style={{textAlign: 'justify'}}>
              <em>
                <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                  Không gian thư giãn sang trọng
                </span>
              </em>
            </h3>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Lahi Beauty Center mang đến không gian hiện đại và ấm cúng. Mỗi chi tiết đều được thiết kế để khách hàng cảm thấy thư thái, thoải mái và tái tạo năng lượng.
              </span>
            </p>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Đống Đa" height="333" src="upload/trangchu/snaptik_7472736510807133456_1.jpeg" width="500" />
            </p>

            <h2 style={{textAlign: 'justify'}}>
              <span style={{color: '#90895f'}}>
                <strong>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    Tại sao chọn Lahi Beauty Center – Đống Đa?
                  </span>
                </strong>
              </span>
            </h2>

            <ul>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Vị trí thuận lợi</strong>: Ngay trung tâm quận Đống Đa.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Dịch vụ chất lượng cao</strong>: Kết hợp chăm sóc chuyên sâu và công nghệ tiên tiến.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    <strong>Giá cả hợp lý</strong>: nhiều gói ưu đãi đa dạng.
                  </span>
                </p>
              </li>
            </ul>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Đánh giá từ khách hàng
              </span>
            </p>

            <blockquote>
              <p style={{textAlign: 'justify'}}>
                <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                  "Sau vài buổi chăm sóc da tại Lahi, làn da mình thay đổi rõ rệt, mịn màng và sáng hơn hẳn. Nhân viên thân thiện, không gian rất thư giãn. Mình hoàn toàn hài lòng!" – <em>Chị Minh Hằng</em>
                </span>
              </p>
            </blockquote>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                <Link to="/services">Lahi Beauty Center – Đống Đa</Link> cam kết mang lại trải nghiệm chăm sóc da đẳng cấp và kết quả vượt mong đợi.
              </span>
            </p>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Quận 3" height="750" src="upload/trangchu/hoa.jpg" width="500" />
            </p>

            <p>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Hãy đến và trải nghiệm sự khác biệt tại
                <em><Link to="/contact"><strong>Lahi Beauty Center – Đống Đa</strong></Link></em>.
              </span>
            </p>

            <p>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                <img alt="" height="20" src="upload/filemanager/files/icon/icons8-map-marker-20(1).png" style={{float: 'left'}} width="20" /> 
                Địa chỉ: 194 Nguyễn Văn Tuyết, Đống Đa, Hà Nội
              </span>
            </p>

            <p>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                <img alt="" height="20" src="upload/filemanager/files/icon/icons8-email-20(1).png" style={{float: 'left'}} width="20" /> 
                Email: lahibeautycenter@gmail.com
              </span>
            </p>
            
            <p>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                <img alt="" height="20" src="upload/filemanager/files/icon/icons8-help-20(1).png" style={{float: 'left'}} width="20" /> 
                Hotline: 096 165 88 66
              </span>
            </p>
            
            <p>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                <img alt="" height="20" src="upload/filemanager/files/icon/icons8-website-20(1).png" style={{float: 'left'}} width="20" /> 
                Website: lahibeautycenter.com
              </span>
            </p>
          </div>
          
          <div className="share">
            <b style={{marginRight: '10px'}}>Chia sẻ:</b>
            <div style={{display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '5px'}}>
              {/* Facebook Share */}
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://lahibeautycenter.com" 
                 target="_blank" rel="noopener noreferrer"
                 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#1877f2', color: 'white', borderRadius: '4px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="#fff">
                  <path d="M28 16c0-6.627-5.373-12-12-12S4 9.373 4 16c0 5.628 3.875 10.35 9.101 11.647v-7.98h-2.474V16H13.1v-1.58c0-4.085 1.849-5.978 5.859-5.978.76 0 2.072.15 2.608.298v3.325c-.283-.03-.775-.045-1.386-.045-1.967 0-2.728.745-2.728 2.683V16h3.92l-.673 3.667h-3.247v8.245C23.395 27.195 28 22.135 28 16"/>
                </svg>
              </a>

              {/* Messenger Share */}
              <a href="fb-messenger://share?link=https://lahibeautycenter.com" 
                 target="_blank" rel="noopener noreferrer"
                 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#00a2ff', color: 'white', borderRadius: '4px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="#fff">
                  <path d="M16 5C9.986 5 5.11 9.56 5.11 15.182c0 3.2 1.58 6.054 4.046 7.92V27l3.716-2.06c.99.276 2.04.425 3.128.425 6.014 0 10.89-4.56 10.89-10.183S22.013 5 16 5m1.147 13.655L14.33 15.73l-5.423 3 5.946-6.31 2.816 2.925 5.42-3-5.946 6.31z"/>
                </svg>
              </a>

              {/* Website */}
              <a href="https://lahibeautycenter.com" 
                 target="_blank" rel="noopener noreferrer"
                 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', height: '32px', background: '#888990', color: 'white', borderRadius: '4px', textDecoration: 'none'}}>
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
