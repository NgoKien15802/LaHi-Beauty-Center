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

            <div style={{textAlign: 'justify'}}>
              <p style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Trong hành trình tìm kiếm nơi làm đẹp và chăm sóc da uy tín tại Hà Nội,
                <Link to="/"><strong> bài giới thiệu về LaHi Beauty Center</strong></Link> 
                <span> sẽ mang đến cho bạn những thông tin chân thực, chi tiết về một địa chỉ nổi bật, nơi hội tụ của các công nghệ tiên tiến cùng đội ngũ chuyên viên dày dạn kinh nghiệm. Không chỉ là nơi đem lại vẻ đẹp bên ngoài, LaHi Beauty Center còn là nơi giúp khách hàng tìm lại sự tự tin, tỏa sáng từ chính nội tại của làn da.</span> 
              </p>

              <p style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Tiên phong trong lĩnh vực làm đẹp, LaHi Beauty Center đã ghi dấu ấn bằng chất lượng phục vụ cũng như phương pháp tối ưu nhất dành cho làn da của khách hàng. Tại đây, các dịch vụ chăm sóc da không chỉ dừng lại ở mức độ làm đẹp vẻ ngoài mà còn hướng đến việc duy trì sức khỏe cho làn da dài lâu. Với không gian thoáng đãng và phù hợp cho mọi khách hàng từ nội thành trung tâm Hà Nội, trung tâm luôn hướng tới mục tiêu nâng cao trải nghiệm và sự hài lòng tối đa
              </p>

              <p style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Trong hành trình chăm sóc da, sự chuyên nghiệp, phương pháp chuẩn xác và công nghệ hiện đại là những yếu tố cốt lõi để LaHi Beauty Center khẳng định vị thế trên thị trường làm đẹp. Tham khảo từ những phản hồi của khách hàng, chúng tôi nhận thấy đây thực sự là nơi đáng để lựa chọn cho bất kỳ ai mong muốn có một làn da trẻ trung, mịn màng và tràn đầy sức sống.
              </p>

              <p style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif', fontWeight: 'bold'}}>
                Tọa lạc tại trung tâm quận Đống Đa – Hà Nội, 
                <Link to="/"><strong> Lahi Beauty Center</strong></Link>
                <span> là địa chỉ tin cậy cho những ai mong muốn chăm sóc và cải thiện làn da chuyên nghiệp. Với phương châm “Nuôi dưỡng vẻ đẹp tự nhiên”, chúng tôi cam kết mang đến cho khách hàng trải nghiệm thư giãn cùng hiệu quả vượt trội.</span>
              </p>

              <p style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Lợi thế về vị trí địa lý giúp khách hàng dễ dàng tiếp cận, phù hợp với nhịp sống bận rộn của đô thị lớn như Hà Nội. Không gian của trung tâm không chỉ hiện đại, sang trọng mà còn mang đến cảm giác ấm cúng, dễ chịu, giúp khách hàng thoải mái hơn khi thực hiện các dịch vụ chăm sóc da. Dù là người mới bắt đầu hoặc đã có kinh nghiệm làm đẹp, mỗi khách hàng đều cảm nhận được sự quan tâm và chăm sóc tận tình của đội ngũ nhân viên.
              </p>

              <p style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Phương châm “Nuôi dưỡng vẻ đẹp tự nhiên” thể hiện qua từng dịch vụ, từng sản phẩm mà trung tâm lựa chọn. Không sử dụng các phương pháp xâm lấn quá mức, thay vào đó, LaHi Beauty Center hướng đến việc kích thích khả năng tự hồi phục của làn da, giúp khách hàng sở hữu làn da tươi trẻ, khỏe mạnh một cách bền vững, tự nhiên nhất. Những khách hàng đã từng trải nghiệm dịch vụ đều chia sẻ cảm giác hài lòng, cảm nhận rõ rệt sự thay đổi rõ nét sau từng lần chăm sóc.
              </p>
            </div>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Đống Đa" height="333" src="upload/about/nen.jpeg" width="500" />
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

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Dịch vụ chăm sóc da tại LaHi Beauty Center không chỉ đơn thuần là các liệu trình làm đẹp mà còn là quá trình tái tạo, phục hồi làn da theo chiều hướng tự nhiên và an toàn nhất. Đội ngũ chuyên viên là những người có trình độ cao, luôn cập nhật kiến thức mới, sẵn sàng tư vấn tận tình nhất để phù hợp với từng đặc điểm của mỗi khách hàng. Thực hiện đúng quy trình, lựa chọn sản phẩm phù hợp giúp giảm thiểu tối đa rủi ro, mang lại kết quả rõ rệt, lâu dài.
              </span>
            </p>
            
            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Trong số các dịch vụ tiêu biểu, trị mụn chuyên sâu, trẻ hóa làn da, dưỡng trắng sáng hay phương pháp Glass Skin là những liệu trình nhận được nhiều sự quan tâm nhất. Tối ưu hóa từ công nghệ tiên tiến, các quy trình này đi sâu làm sạch da, giảm viêm, kích thích tái sinh collagen, khắc phục các dấu hiệu lão hóa, làm đều màu và sáng khỏe da. Do đó, khách hàng không cần phải lo lắng về tác dụng phụ hay phương pháp gây tổn thương cho da, mọi thứ đều được kiểm soát chặt chẽ, an toàn.
              </span>
            </p>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Ngoài ra, LaHi Beauty Center còn chú trọng đến việc giúp khách hàng duy trì làn da khỏe mạnh sau liệu trình. Các chuyên viên luôn hướng dẫn cách chăm sóc tại nhà, cung cấp các sản phẩm phù hợp để giữ gìn kết quả đạt được lâu dài. Chính nhờ sự tận tâm này, trung tâm luôn được khách hàng yêu mến, trở thành điểm gặp gỡ quen thuộc trong hành trình làm đẹp của nhiều người dân Hà Nội.
              </span>
            </p>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Quận 3" height="333" src="upload/about/about1.jpg" width="500" />
            </p>

           <h2 style={{textAlign: 'justify'}}>
              <span style={{color: '#90895f'}}>
                <strong>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    Công nghệ hiện đại
                  </span>
                </strong>
              </span>
            </h2>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Cơ sở vật chất của LaHi Beauty Center luôn cập nhật những tinh túy của ngành thẩm mỹ, từ đó mang đến những dịch vụ vừa hiệu quả vừa an toàn. Các công nghệ như RF & MF Lifting, Oxy Jet & Aqua Peel hay Hifu New Doublo 2.0 đều là những bước tiến lớn, giúp quá trình chăm sóc da đạt hiệu quả tối đa chỉ trong thời gian ngắn nhất.
              </span>
            </p>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Công nghệ RF & MF Lifting giúp nâng cơ mặt, làm mờ nếp nhăn mà không cần phẫu thuật, đánh bật các dấu hiệu lão hóa tự nhiên một cách nhẹ nhàng, không gây tổn thương. Oxy Jet & Aqua Peel hỗ trợ làm sạch sâu, cung cấp oxy tươi, dưỡng chất giúp da sáng khỏe, mịn màng từ bên trong. Trong khi đó, Hifu New Doublo 2.0 là bước tiến công nghệ hứa hẹn mang lại làn da săn chắc, trẻ trung, phù hợp cho những khách hàng muốn duy trì vẻ ngoài trẻ trung dài lâu.
              </span>
            </p>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Đặc biệt, các dịch vụ triệt lông Diode hay phun xăm using công nghệ mới, đảm bảo mang lại kết quả tuyệt vời, không gây đau rát, không để lại sẹo hay tác dụng phụ. Công nghệ hiện đại chính là kim chỉ nam dẫn đến thành công của trung tâm trong việc cung cấp dịch vụ chất lượng cao, an toàn và hiệu quả lâu dài.
              </span>
            </p>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Đống Đa" height="333" src="upload/about/snaptik_7472736510807133456_5.jpeg" width="500" />
            </p>

            <h2 style={{textAlign: 'justify'}}>
              <span style={{color: '#90895f'}}>
                <strong>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    Đội ngũ tận tâm
                  </span>
                </strong>
              </span>
            </h2>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Chìa khóa trong thành công của LaHi Beauty Center chính là đội ngũ nhân viên chuyên nghiệp, tận tâm, luôn đặt lợi ích của khách hàng lên hàng đầu. Mỗi chuyên viên đều được đào tạo bài bản, có kinh nghiệm lâu năm, am hiểu rõ về các phương pháp chăm sóc da, đồng thời luôn sẵn sàng lắng nghe, tư vấn tận tình những vấn đề về làn da của khách hàng.
              </span>
            </p>

             <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Ngoài ra, đội ngũ tư vấn của trung tâm còn theo sát quá trình điều trị, đo lường, đánh giá phản ứng của làn da để điều chỉnh liệu trình phù hợp, tối ưu hiệu quả. Chính sự quan tâm chú đáo này giúp khách hàng cảm thấy an tâm, tin tưởng hơn khi gửi gắm làn da của mình.
              </span>
            </p>

             <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Trong mắt khách hàng, đội ngũ nhân viên không chỉ là những người thực hiện dịch vụ, mà còn là những người bạn đồng hành, chia sẻ và tạo nên cảm giác thân thiện, gẫn gũi. Tâm huyết và trách nhiệm là điểm đặc trưng giúp trung tâm xây dựng uy tín, giữ chân khách hàng trung thành qua nhiều năm qua.
              </span>
            </p>

           <h2 style={{textAlign: 'justify'}}>
              <span style={{color: '#90895f'}}>
                <strong>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    Không gian thư giãn
                  </span>
                </strong>
              </span>
            </h2>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Không gian tại LaHi Beauty Center có lẽ là phần khiến khách hàng cảm thấy yêu thích nhất khi đến đây. Với thiết kế hiện đại, tinh tế, nhưng vẫn ấm cúng, trung tâm mang đến cảm giác thư thái, dễ chịu như đang ở trong chính mái ấm của mình. Mỗi chi tiết, từ ánh sáng, màu sắc cho đến âm nhạc đều được tính toán cẩn thận nhằm kích thích sự thư giãn tối đa của khách hàng.
              </span>
            </p>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Sự phối hợp hài hòa giữa thiết kế nội thất và phong cách trang trí giúp trung tâm trở thành nơi an toàn, yên bình, tránh xa những áp lực của cuộc sống thường nhật. Đây là yếu tố cực kỳ quan trọng để khách hàng có thể thoải mái phản ánh các vấn đề về da mặt, tâm sự về nhu cầu của mình để trung tâm cung cấp dịch vụ phù hợp nhất.
              </span>
            </p>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Không chỉ thế, không gian còn giúp khách hàng “xả stress” sau những ngày làm việc căng thẳng, tạo động lực để duy trì thói quen chăm sóc da đều đặn, từ đó duy trì vẻ đẹp lâu dài. Khách hàng đến đây không chỉ vì dịch vụ làm đẹp mà còn vì cảm giác thư thái, thoải mái và được chăm sóc chu đáo từ các nhân viên.
              </span>
            </p>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Đống Đa" height="333" src="upload/about/snaptik_7472736510807133456_6.jpeg" width="500" />
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
                    Lahi Beauty Center không chỉ đơn thuần là một trung tâm làm đẹp, mà còn là nơi đem đến sự yên tâm, hiệu quả lâu dài trong chăm sóc và cải thiện làn da. Vị trí trung tâm, dễ dàng tiếp cận đã là một lợi thế lớn để khách hàng dễ dàng sắp xếp lịch trình làm đẹp. Chất lượng dịch vụ cao, công nghệ hiện đại kết hợp cùng đội ngũ tận tâm chính là những yếu tố tạo nên thương hiệu của trung tâm.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    Chính sách giá cả hợp lý, đa dạng các gói dịch vụ và chương trình ưu đãi liên tục cũng là những lý do khiến khách hàng luôn yên tâm khi lựa chọn LaHi Beauty Center. Họ tin tưởng vào chất lượng, hiệu quả và sự chăm sóc tận tâm của đội ngũ nhân viên để mỗi lần quay lại luôn mong muốn đem lại kết quả tốt nhất về cả sắc vóc lẫn tâm lý.
                  </span>
                </p>
              </li>
              <li>
                <p style={{textAlign: 'justify'}}>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    Kết hợp các yếu tố trên, dễ dàng nhận thấy LaHi Beauty Center đã và đang trở thành điểm đến quen thuộc của hàng nghìn khách hàng trong và ngoài quận Đống Đa, Hà Nội mỗi khi cần tìm lại vẻ đẹp tự nhiên, tươi trẻ.
                  </span>
                </p>
              </li>
            </ul>

            <p style={{textAlign: 'justify', color: '#90895f', fontWeight: 'bold'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Đánh giá từ khách hàng
              </span>
            </p>

            <blockquote>
              <p style={{textAlign: 'justify'}}>
                <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                  Phản hồi từ khách hàng chính là minh chứng rõ nét nhất về chất lượng dịch vụ tại LaHi Beauty Center. Chị Minh Hằng, một khách hàng lâu năm của trung tâm, chia sẻ: “Sau vài buổi chăm sóc da tại Lahi, làn da mình thay đổi rõ rệt, mịn màng và sáng hơn hẳn. Nhân viên thân thiện, không gian rất thư giãn. Mình hoàn toàn hài lòng.” Những lời nhận xét chân thành này không chỉ thể hiện sự hài lòng mà còn là nguồn động lực để trung tâm không ngừng nâng cao chất lượng, phục vụ tốt hơn nữa.
                </span>
              </p>

              <p style={{textAlign: 'justify'}}>
                <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                  Ngoài ra, nhiều khách hàng khác cũng ghi nhận sự tiến bộ rõ rệt của làn da sau khi trải nghiệm dịch vụ của trung tâm. Sự thành công này nằm ở việc trung tâm cam kết mang lại kết quả thật, dựa trên nền tảng công nghệ tiên tiến, đội ngũ chuyên gia tận tâm và không gian chữa lành cảm xúc.
                </span>
              </p>

              <p style={{textAlign: 'justify'}}>
                <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                  Phải nói rằng, LaHi Beauty Center đã xây dựng được niềm tin vững chắc từ khách hàng, và điều này chính là bí quyết để duy trì vị trí top đầu trong lĩnh vực thẩm mỹ tại Hà Nội.
                </span>
              </p>
            </blockquote>

            <h2 style={{textAlign: 'justify'}}>
              <span style={{color: '#90895f'}}>
                <strong>
                  <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                    Tổng kết
                  </span>
                </strong>
              </span>
            </h2>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Với sự kết hợp hoàn hảo giữa công nghệ tiên tiến, đội ngũ nhân viên chuyên nghiệp và không gian thư giãn, LaHi Beauty Center thực sự là điểm đến lý tưởng cho những ai mong muốn sở hữu vẻ đẹp tự nhiên, rạng rỡ. Địa chỉ nằm ngay trung tâm quận Đống Đa, dễ dàng tiếp cận và phù hợp với nhịp sống bận rộn của người dân thủ đô. Chất lượng dịch vụ luôn đi đầu, đi kèm các chương trình ưu đãi hợp lý đã giúp trung tâm ngày càng được yêu mến và tin tưởng.
              </span>
            </p>

            <p style={{textAlign: 'justify'}}>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Hãy để LaHi Beauty Center trở thành bạn đồng hành trong hành trình làm đẹp của bạn. Đặt lịch ngay hôm nay để trải nghiệm dịch vụ chuyên nghiệp và đem lại kết quả vượt mong đợi. Chúng tôi cam kết mang lại vẻ đẹp tự nhiên, tự tin tỏa sáng, mang đến cho bạn những phút giây thực sự thư thái và hài lòng.
              </span>
            </p>

            <p style={{textAlign: 'center'}}>
              <img alt="Spa Trị Mụn Tại Quận 3" height="750" src="upload/trangchu/hoa.jpg" width="500" />
            </p>

            <p>
              <span style={{fontSize: '18px', fontFamily: 'Times New Roman,Times,serif'}}>
                Hãy đến
                <em><Link to="/contact"><strong> Lahi Beauty Center – Đống Đa</strong></Link></em>
                <span> để cảm nhận sự khác biệt và trở thành phiên bản hoàn hảo của chính mình!</span>
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
