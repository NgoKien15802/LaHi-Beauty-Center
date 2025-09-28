import React, { useEffect, useState } from "react";
import ServiceList from "../components/ServiceList";
import FeedbackList from "../components/FeedbackList";

const Home = () => {
  // Dữ liệu hình ảnh gallery
  const galleryImages = [
    {
      id: 1,
      src: "upload/trangchu/snaptik_7472736510807133456_2.jpeg",
      alt: "Her Skinlab",
      width: "420",
      height: "315",
    },
    {
      id: 2,
      src: "upload/trangchu/snaptik_7472736510807133456_3.jpeg",
      alt: "Her Skinlab",
      width: "420",
      height: "315",
    },
    {
      id: 3,
      src: "upload/trangchu/snaptik_7472736510807133456_4.jpeg",
      alt: "Her Skinlab",
      width: "420",
      height: "315",
    },
    {
      id: 4,
      src: "upload/trangchu/snaptik_7472736510807133456_5.jpeg",
      alt: "Her Skinlab",
      width: "420",
      height: "315",
    },
    {
      id: 5,
      src: "upload/trangchu/snaptik_7472736510807133456_6.jpeg",
      alt: "Her Skinlab",
      width: "420",
      height: "315",
    },
    {
      id: 6,
      src: "upload/trangchu/snaptik_7472736510807133456_8.jpeg",
      alt: "Her Skinlab",
      width: "420",
      height: "315",
    },
    {
      id: 7,
      src: "upload/trangchu/snaptik_7472736510807133456_12.jpeg",
      alt: "Her Skinlab",
      width: "420",
      height: "315",
    },
  ];

  // Dịch vụ nổi bật (hiển thị danh sách + phân trang)
  const [featuredServices, setFeaturedServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [featuredFeedbacks, setFeaturedFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedServices = async () => {
      try {
        const res = await fetch("/data/services.json");
        const data = await res.json();
        const allServices =
          data.categories?.flatMap(
            (cat) => cat.subMenu?.flatMap((sub) => sub.services || []) || []
          ) || [];
        setFeaturedServices(allServices);
      } catch (error) {
        console.error("Error loading featured services:", error);
      } finally {
        setServicesLoading(false);
      }
    };
    loadFeaturedServices();
  }, []);

  useEffect(() => {
    const loadFeaturedFeedbacks = async () => {
      try {
        const res = await fetch("/data/feedback.json");
        const data = await res.json();
        const allFeedbacks =
          data.categories?.flatMap(
            (cat) => cat.subMenu?.flatMap((sub) => sub.feedbacks || []) || []
          ) || [];
        setFeaturedFeedbacks(allFeedbacks);
      } catch (error) {
        console.error("Error loading featured feedbacks:", error);
      } finally {
        setFeedbackLoading(false);
      }
    };
    loadFeaturedFeedbacks();
  }, []);

  useEffect(() => {
    // đợi DOM render xong rồi gọi lại các init sẵn có
    setTimeout(() => {
      window.NN_FRAMEWORK?.Lazys?.();
      window.NN_FRAMEWORK?.Splide?.();
      window.AOS?.init && window.AOS.init({ duration: 1000, once: true });
    }, 0);
  }, []);

  return (
    <>
      <div className="slideshow_wrap">
        <div className="splide slideshow">
          <div className="splide__track">
            <div className="splide__list">
              <div className="splide__slide">
                <a className="d-block" href="index.html" target="_blank">
                  <picture>
                    <source
                      srcSet="upload/trangchu/bia.jpg"
                      media="(min-width: 0px)"
                    />
                    <source
                      srcSet="upload/trangchu/bia.jpg"
                      media="(min-width: 600px)"
                    />
                    <img
                      className="d-inline-block w-100"
                      src="upload/trangchu/bia.jpg"
                      alt="Her Skinlab"
                      width="1920"
                      height="700"
                      onError={(e) =>
                        (e.target.src =
                          "http://herskinlab.com.vn/thumbs/1920x700x1/assets/images/noimage.png.webp")
                      }
                    />
                  </picture>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap-all">
        <div className="gioithieu_wrap spacer">
          <div className="wrap-content">
            <div className="gioithieu_flex">
              <div
                className="gioithieu_left d-none d-md-block"
                data-aos="fade-right"
              >
                <a href="gioi-thieu.html" className="gioithieu__pic scale-img">
                  <img
                    className="d-inline-block lazy w-100"
                    onError={(e) =>
                      (e.target.src =
                        "upload/trangchu/snaptik_7472736510807133456_1.jpeg")
                    }
                    data-src="upload/trangchu/snaptik_7472736510807133456_1.jpeg"
                    alt="Lahi Beauty Center"
                  />
                </a>
              </div>
              <div className="gioithieu_right" data-aos="fade-left">
                <div className="gioithieu__title">
                  Điểm đến lý tưởng cho làn da hoàn hảo
                </div>
                <h2 className="gioithieu__name">Lahi Beauty Center </h2>
                <div className="gioithieu__desc">
                  <p>
                    <span style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}>
                      <span style={{ fontSize: "18px" }}>
                        LaHi Beauty Center là spa hàng đầu dành cho phái đẹp,
                        chuyên cung cấp các dịch vụ chăm sóc da và làm đẹp
                        chuyên sâu. Với đội ngũ chuyên viên giàu kinh nghiệm
                        cùng công nghệ hiện đại, LaHi Beauty Center cam kết mang
                        đến trải nghiệm thư giãn, hiệu quả và an toàn cho từng
                        khách hàng. Tại đây, bạn sẽ được tư vấn liệu trình cá
                        nhân hóa phù hợp với tình trạng da, giúp cải thiện sắc
                        tố, ngừa lão hoá và tôn vinh vẻ đẹp tự nhiên. Hãy đến
                        với LaHi Beauty Center để khám phá bí quyết làm đẹp hoàn
                        hảo và tận hưởng không gian spa đẳng cấp – nơi vẻ đẹp
                        bắt đầu từ sự chăm sóc chân thành.
                      </span>
                    </span>
                  </p>
                </div>
                <div className="about_viewmore">
                  <a
                    href="gioi-thieu.html"
                    className="btn_about_viewmore d-inline-block"
                  >
                    Tìm hiểu thêm
                  </a>
                </div>
                <div className="about--gallery">
                  <div className="about__list">
                    <div className="splide about">
                      <div className="splide__track">
                        <div className="splide__list">
                          {galleryImages.map((image) => (
                            <div
                              key={image.id}
                              className="splide__slide"
                              data-aos="fade-up"
                            >
                              <div className="about__item hvr-double-box">
                                <img
                                  className="d-inline-block lazy"
                                  onError={(e) =>
                                    (e.target.src =
                                      "http://herskinlab.com.vn/thumbs/420x315x1/assets/images/noimage.png")
                                  }
                                  data-src={image.src}
                                  alt={image.alt}
                                  width={image.width}
                                  height={image.height}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dichvunb_wrap spacer" id="trangchudichvu">
          <div className="wrap-content">
            <div className="title-main">
              <div className="name-title">LaHi Beauty Center</div>
              <h2>Dịch Vụ Nổi Bật</h2>
            </div>
            <ServiceList
              services={featuredServices}
              loading={servicesLoading}
              pageSize={8}
              className="gridNews"
              showPagination={true}
              scrollToId="trangchudichvu"
            />
          </div>
        </div>

        <div className="feedback_wrap spacer" id="home-feedback">
          <div className="wrap-content">
            <div className="title-main">
              <div className="name-title">LaHi Beauty Center</div>
              <h2>Feedback Khách Hàng</h2>
            </div>
            <FeedbackList
              items={featuredFeedbacks}
              loading={feedbackLoading}
              pageSize={8}
              showPagination={true}
              scrollToId="home-feedback"
            />
          </div>
        </div>

        <div
          className="newsletter_wrap spacer"
          style={{
            // Thêm overlay để cho ảnh mờ đi chút
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backgroundBlendMode: "overlay",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="wrap-content">
            <div className="newsletter__inner wrap-content">
              <div className="newsletter__left rps-lg--w-100">
                <div className="newsletter__info-list">
                  <div
                    className="newsletter__info-item rps-md--flex-100"
                    data-aos="fade-right"
                  >
                    <div className="newsletter__info-top">
                      <img
                        className="shake-anim"
                        src="assets/images/hotline_newsletter.png"
                        alt="Hotline"
                        width="102"
                        height="102"
                      />
                    </div>
                    <div className="newsletter__info-bottom">
                      <div className="newsletter__info-content">
                        <div className="newsletter__info-title">
                          LIÊN HỆ HOTLINE
                        </div>
                        <a
                          className="newsletter__info-value gradient-text gradient-bg:2 text-center transition pulsate-bck"
                          href="tel:0949 774 973"
                          target="_blank"
                          rel="nofollow"
                        >
                          0949 774 973
                        </a>
                      </div>
                      <hr className="newsletter__info-separator my-2" />
                      <p className="newsletter__info-desc">
                        Giải quyết bất kỳ thắc mắc n&agrave;o của kh&aacute;ch
                        h&agrave;ng, phục vụ tận t&acirc;m 24/7
                      </p>
                    </div>
                  </div>
                  <div
                    className="newsletter__info-item rps-md--flex-100"
                    data-aos="fade-up"
                  >
                    <div className="newsletter__info-top">
                      <img
                        src="assets/images/ct_newsletter.png"
                        alt="Đặt lịch hẹn"
                        width="102"
                        height="102"
                      />
                    </div>
                    <div className="newsletter__info-bottom">
                      <div className="newsletter__info-content">
                        <div className="newsletter__info-title">ĐĂNG KÝ</div>
                        <div className="newsletter__info-value gradient-text gradient-bg:2 text-center text-uppercase pulsate-bck">
                          NHẬN ƯU ĐÃI
                        </div>
                      </div>
                      <hr className="newsletter__info-separator my-2" />
                      <p className="newsletter__info-desc">
                        Li&ecirc;n hệ ngay để được tư vấn, li&ecirc;n kết với
                        ch&uacute;ng t&ocirc;i qua ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="newsletter__right rps-lg--w-100">
                <header className="home__heading title_main text-center mb-0">
                  <h2 className="home__title f-fam:beautique-display-bold f-sz:36px clr-text:#ffffff text-shadow:#B57627 text-capitalize">
                    Đăng Ký
                  </h2>
                  <div className="newsletter__title text-center">
                    <p className="newsletter__title-sub mb-0">
                      HÀNG NGÀN ƯU ĐÃI
                    </p>
                  </div>
                  <q className="home__slogan quote-hidden font-semi-bold f-sz:18px clr-text:#ffffff text-uppercase">
                    <div className="title-slogan">
                      Để lại th&ocirc;ng tin để ch&uacute;ng t&ocirc;i
                      li&ecirc;n hệ với bạn!
                    </div>
                  </q>
                </header>
                <form
                  className="validation-newsletter form_validation"
                  id="form_newsletter"
                  novalidate
                  method="post"
                  action="http://herskinlab.com.vn/dangkynhanudai"
                  enctype="multipart/form-data"
                >
                  <div className="newsletter_grid">
                    <div className="newsletter-input validation-input">
                      <input
                        type="text"
                        className="form-control text-sm check_valid"
                        id="fullname-newsletter"
                        name="dataNewsletter[fullname]"
                        placeholder="Họ và tên"
                      />
                      <div className="invalid_feedback">
                        Vui lòng nhập họ tên
                      </div>
                    </div>
                    <div className="newsletter-input validation-input">
                      <input
                        type="number"
                        onKeyDown={(e) => e.keyCode !== 69}
                        onInput={(e) => {
                          if (e.target.value.length > e.target.maxLength) {
                            e.target.value = e.target.value.slice(
                              0,
                              e.target.maxLength
                            );
                          }
                        }}
                        maxLength="10"
                        className="form-control text-sm check_valid phone_valid"
                        id="phone-newsletter"
                        name="dataNewsletter[phone]"
                        placeholder="Số điện thoại"
                      />
                      <div className="invalid_feedback">
                        Vui lòng kiểm tra lại SĐT
                      </div>
                    </div>
                  </div>
                  <div className="newsletter-button">
                    <input
                      type="hidden"
                      name="csrf_token"
                      value="6a8bd0bf2151c2f0151bc4d77935b8b263a5de0880ebf1a5fc9379ee4c17f539"
                    />
                    <input type="hidden" name="submit-newsletter" value="1" />
                    <input
                      type="hidden"
                      name="recaptcha_response_newsletter"
                      id="recaptchaResponseNewsletter"
                    />
                    <input
                      type="submit"
                      className="btn_newsletter btn_validation"
                      value="Đăng ký ngay"
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="tieuchi_wrap">
          <div className="wrap-content">
            <div className="title-main">
              <div className="name-title">LaHi Beauty Center</div>
              <h2>Tại Sao Chọn Chúng Tôi</h2>
            </div>
            <div className="tieuchi__info_main">
              <div className="logo_tieuchi-main d-none d-lg-block">
                <picture>
                  <source
                    srcSet="
                  http://herskinlab.com.vn/thumbs/333x342x1/upload/photo/logo-1731991788.png.webp
                "
                    media="(min-width: 0px)"
                  />
                  <img
                    className="d-inline-block lazy"
                    data-src="http://herskinlab.com.vn/thumbs/333x342x1/upload/photo/logo-1731991788.png.webp"
                    alt="Her Skinlab"
                    width="333"
                    height="342"
                    onError={(e) =>
                      (e.target.src =
                        "http://herskinlab.com.vn/thumbs/333x342x1/assets/images/noimage.png.webp")
                    }
                    src="thumbs/333x342x2/assets/images/noimage.png.webp"
                  />
                </picture>
              </div>
              <div className="tieuchi__info_flex">
                <div className="tieuchi__row">
                  <div
                    className="tieuchi__item tieuchi__item_reverse"
                    data-aos="fade-right"
                  >
                    <div
                      className="tieuchi__pic peShiner peShiner-logo0"
                      data-id="logo0"
                    >
                      <img
                        className="d-inline-block"
                        onError={(e) =>
                          (e.target.src =
                            "http://herskinlab.com.vn/thumbs/90x90x2/assets/images/noimage.png")
                        }
                        src="thumbs/90x90x2/upload/news/1-1732246494.png.webp"
                        alt="DỊCH VỤ CHẤT LƯỢNG"
                        width="90"
                        height="90"
                      />
                    </div>
                    <div className="tieuchi__info-value">
                      <div className="tieuchi__info-title text-split">
                        DỊCH VỤ CHẤT LƯỢNG
                      </div>
                      <div className="tieuchi__info-desc text-split">
                        Với ni&ecirc;̀m đam m&ecirc; mu&ocirc;́n đem đ&ecirc;́n cho
                        khách hàng những giá trị th&acirc;̣t sự
                      </div>
                    </div>
                  </div>
                  <div
                    className="tieuchi__item tieuchi__item_reverse"
                    data-aos="fade-right"
                  >
                    <div
                      className="tieuchi__pic peShiner peShiner-logo1"
                      data-id="logo1"
                    >
                      <img
                        className="d-inline-block"
                        onError={(e) =>
                          (e.target.src =
                            "http://herskinlab.com.vn/thumbs/90x90x2/assets/images/noimage.png")
                        }
                        src="thumbs/90x90x2/upload/news/2-1732246511.png.webp"
                        alt="TƯ VẤN TẬN T&Acirc;M"
                        width="90"
                        height="90"
                      />
                    </div>
                    <div className="tieuchi__info-value">
                      <div className="tieuchi__info-title text-split">
                        TƯ VẤN TẬN T&Acirc;M
                      </div>
                      <div className="tieuchi__info-desc text-split">
                        Với ni&ecirc;̀m đam m&ecirc; mu&ocirc;́n đem đ&ecirc;́n cho
                        khách hàng những giá trị th&acirc;̣t sự
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tieuchi__row">
                  <div className="tieuchi__item" data-aos="fade-left">
                    <div
                      className="tieuchi__pic peShiner peShiner-logo2"
                      data-id="logo2"
                    >
                      <img
                        className="d-inline-block"
                        onError={(e) =>
                          (e.target.src =
                            "http://herskinlab.com.vn/thumbs/90x90x2/assets/images/noimage.png")
                        }
                        src="thumbs/90x90x2/upload/news/3-1732246522.png.webp"
                        alt="KỸ THUẬT CHUY&Ecirc;N NGHIỆP"
                        width="90"
                        height="90"
                      />
                    </div>
                    <div className="tieuchi__info-value">
                      <div className="tieuchi__info-title text-split">
                        KỸ THUẬT CHUY&Ecirc;N NGHIỆP
                      </div>
                      <div className="tieuchi__info-desc text-split">
                        Với ni&ecirc;̀m đam m&ecirc; mu&ocirc;́n đem đ&ecirc;́n cho
                        khách hàng những giá trị th&acirc;̣t sự
                      </div>
                    </div>
                  </div>
                  <div className="tieuchi__item" data-aos="fade-left">
                    <div
                      className="tieuchi__pic peShiner peShiner-logo3"
                      data-id="logo3"
                    >
                      <img
                        className="d-inline-block"
                        onError={(e) =>
                          (e.target.src =
                            "http://herskinlab.com.vn/thumbs/90x90x2/assets/images/noimage.png")
                        }
                        src="thumbs/90x90x2/upload/news/4-1732246533.png.webp"
                        alt="CƠ SỞ VẬT CHẤT HIỆN ĐẠI"
                        width="90"
                        height="90"
                      />
                    </div>
                    <div className="tieuchi__info-value">
                      <div className="tieuchi__info-title text-split">
                        CƠ SỞ VẬT CHẤT HIỆN ĐẠI
                      </div>
                      <div className="tieuchi__info-desc text-split">
                        Với ni&ecirc;̀m đam m&ecirc; mu&ocirc;́n đem đ&ecirc;́n cho
                        khách hàng những giá trị th&acirc;̣t sự
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="news_wrap spacer">
          <div className="wrap-content">
            <div className="title-main">
              <div className="name-title">Her Skinlab</div>
              <h2>Kiến Thức Làm Đẹp</h2>
            </div>
            <div className="news_wrap">
              <div className="splide news">
                <div className="splide__track">
                  <div className="splide__list">
                    <div className="splide__slide">
                      <div className="news_item">
                        <a
                          href="cong-nghe-tre-hoa-da-nhung-diem-noi-bat-trong-nganh-spa.html"
                          className="news_box"
                        >
                          <div className="news_pic scale-img hvr-double-box">
                            <picture>
                              <source
                                srcSet="
                              http://herskinlab.com.vn/thumbs/400x285x1/upload/news/phun-cm-1732243260.jpg.webp
                            "
                                media="(min-width: 0px)"
                              />
                              <img
                                className="d-inline-block lazy w-100"
                                data-src="http://herskinlab.com.vn/thumbs/400x285x1/upload/news/phun-cm-1732243260.jpg.webp"
                                alt="Her Skinlab"
                                width="400"
                                height="285"
                                onError={(e) =>
                                  (e.target.src =
                                    "http://herskinlab.com.vn/thumbs/400x285x1/assets/images/noimage.png.webp")
                                }
                                src="thumbs/400x285x2/assets/images/noimage.png.webp"
                              />
                            </picture>
                          </div>
                          <div className="news_info">
                            <h3 className="news__name text-split">
                              C&ocirc;ng Nghệ Trẻ H&oacute;a Da: Những Điểm Nổi
                              Bật Trong Ng&agrave;nh Spa
                            </h3>
                            <div className="news__date d-none">
                              <i className="fa-light fa-clock"></i>
                              thứ hai, 18 Th&aacute;ng 8 2025
                            </div>
                            <div className="news__desc text-split">
                              Trẻ h&oacute;a da l&agrave; một trong những nhu
                              cầu l&agrave;m đẹp được quan t&acirc;m h&agrave;ng
                              đầu hiện nay. Với sự ph&aacute;t triển kh&ocirc;ng
                              ngừng của c&ocirc;ng nghệ, ng&agrave;nh spa
                              đ&atilde; v&agrave; đang cung cấp c&aacute;c giải
                              ph&aacute;p hiện đại, an to&agrave;n v&agrave;
                              hiệu quả để mang lại l&agrave;n da căng
                              b&oacute;ng, mịn m&agrave;ng v&agrave; trẻ trung
                              hơn. B&agrave;i viết n&agrave;y sẽ cung cấp
                              th&ocirc;ng tin chi tiết về những c&ocirc;ng nghệ
                              trẻ h&oacute;a da nổi bật trong ng&agrave;nh spa,
                              gi&uacute;p bạn hiểu r&otilde; hơn về c&aacute;c
                              liệu ph&aacute;p n&agrave;y.
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="splide__slide">
                      <div className="news_item">
                        <a
                          href="10-bi-quyet-giu-gin-lan-da-tre-khoe-tai-spa.html"
                          className="news_box"
                        >
                          <div className="news_pic scale-img hvr-double-box">
                            <picture>
                              <source
                                srcSet="
                              http://herskinlab.com.vn/thumbs/400x285x1/upload/news/cham-soc-da-chuyen-sau-1732243225.jpg.webp
                            "
                                media="(min-width: 0px)"
                              />
                              <img
                                className="d-inline-block lazy w-100"
                                data-src="http://herskinlab.com.vn/thumbs/400x285x1/upload/news/cham-soc-da-chuyen-sau-1732243225.jpg.webp"
                                alt="Her Skinlab"
                                width="400"
                                height="285"
                                onError={(e) =>
                                  (e.target.src =
                                    "http://herskinlab.com.vn/thumbs/400x285x1/assets/images/noimage.png.webp")
                                }
                                src="thumbs/400x285x2/assets/images/noimage.png.webp"
                              />
                            </picture>
                          </div>
                          <div className="news_info">
                            <h3 className="news__name text-split">
                              10 B&iacute; Quyết Giữ G&igrave;n L&agrave;n Da
                              Trẻ Khỏe Tại Spa
                            </h3>
                            <div className="news__date d-none">
                              <i className="fa-light fa-clock"></i>
                              thứ hai, 18 Th&aacute;ng 8 2025
                            </div>
                            <div className="news__desc text-split">
                              L&agrave;n da trẻ khỏe l&agrave; mong muốn của hầu
                              hết mọi người, đặc biệt l&agrave; trong thời đại
                              nhan sắc được xem l&agrave; một phần quan trọng
                              của sự tự tin. Spa kh&ocirc;ng chỉ l&agrave; nơi
                              thư gi&atilde;n m&agrave; c&ograve;n l&agrave;
                              điểm đến l&yacute; tưởng để chăm s&oacute;c da
                              to&agrave;n diện. Dưới đ&acirc;y l&agrave; 10
                              b&iacute; quyết gi&uacute;p bạn giữ g&igrave;n
                              l&agrave;n da trẻ khỏe nhờ v&agrave;o c&aacute;c
                              liệu tr&igrave;nh v&agrave; kỹ thuật tại spa.
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="splide__slide">
                      <div className="news_item">
                        <a
                          href="massage-tri-lieu-loi-ich-vuot-xa-thu-gian.html"
                          className="news_box"
                        >
                          <div className="news_pic scale-img hvr-double-box">
                            <picture>
                              <source
                                srcSet="
                              http://herskinlab.com.vn/thumbs/400x285x1/upload/news/spa-therapist-lam-viec-1732265135.webp.webp
                            "
                                media="(min-width: 0px)"
                              />
                              <img
                                className="d-inline-block lazy w-100"
                                data-src="http://herskinlab.com.vn/thumbs/400x285x1/upload/news/spa-therapist-lam-viec-1732265135.webp.webp"
                                alt="Her Skinlab"
                                width="400"
                                height="285"
                                onError={(e) =>
                                  (e.target.src =
                                    "http://herskinlab.com.vn/thumbs/400x285x1/assets/images/noimage.png.webp")
                                }
                                src="thumbs/400x285x2/assets/images/noimage.png.webp"
                              />
                            </picture>
                          </div>
                          <div className="news_info">
                            <h3 className="news__name text-split">
                              Massage Trị Liệu: Lợi &Iacute;ch Vượt Xa Thư
                              Gi&atilde;n
                            </h3>
                            <div className="news__date d-none">
                              <i className="fa-light fa-clock"></i>
                              thứ hai, 18 Th&aacute;ng 8 2025
                            </div>
                            <div className="news__desc text-split">
                              Massage trị liệu từ l&acirc;u đ&atilde; được biết
                              đến như một phương ph&aacute;p chăm s&oacute;c sức
                              khỏe tự nhi&ecirc;n, kh&ocirc;ng chỉ mang lại cảm
                              gi&aacute;c thư gi&atilde;n m&agrave; c&ograve;n
                              hỗ trợ cải thiện sức khỏe thể chất v&agrave; tinh
                              thần. Trong x&atilde; hội hiện đại, khi căng thẳng
                              v&agrave; &aacute;p lực ng&agrave;y c&agrave;ng
                              gia tăng, massage trị liệu ng&agrave;y c&agrave;ng
                              được nhiều người t&igrave;m đến như một liệu
                              ph&aacute;p phục hồi to&agrave;n diện. H&atilde;y
                              c&ugrave;ng kh&aacute;m ph&aacute; s&acirc;u hơn
                              về massage trị liệu v&agrave; những lợi &iacute;ch
                              vượt xa sự thư gi&atilde;n m&agrave; phương
                              ph&aacute;p n&agrave;y mang lại.
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="splide__slide">
                      <div className="news_item">
                        <a
                          href="xu-huong-lam-dep-spa-nam-2024-cong-nghe-va-phong-cach.html"
                          className="news_box"
                        >
                          <div className="news_pic scale-img hvr-double-box">
                            <picture>
                              <source
                                srcSet="
                              http://herskinlab.com.vn/thumbs/400x285x1/upload/news/massage-spa-body-1732265546.jpg.webp
                            "
                                media="(min-width: 0px)"
                              />
                              <img
                                className="d-inline-block lazy w-100"
                                data-src="http://herskinlab.com.vn/thumbs/400x285x1/upload/news/massage-spa-body-1732265546.jpg.webp"
                                alt="Her Skinlab"
                                width="400"
                                height="285"
                                onError={(e) =>
                                  (e.target.src =
                                    "http://herskinlab.com.vn/thumbs/400x285x1/assets/images/noimage.png.webp")
                                }
                                src="thumbs/400x285x2/assets/images/noimage.png.webp"
                              />
                            </picture>
                          </div>
                          <div className="news_info">
                            <h3 className="news__name text-split">
                              Xu Hướng L&agrave;m Đẹp Spa Năm 2024 &ndash;
                              C&ocirc;ng Nghệ V&agrave; Phong C&aacute;ch
                            </h3>
                            <div className="news__date d-none">
                              <i className="fa-light fa-clock"></i>
                              thứ hai, 18 Th&aacute;ng 8 2025
                            </div>
                            <div className="news__desc text-split">
                              Ng&agrave;nh spa v&agrave; l&agrave;m đẹp
                              kh&ocirc;ng ngừng đổi mới để đ&aacute;p ứng nhu
                              cầu ng&agrave;y c&agrave;ng cao của kh&aacute;ch
                              h&agrave;ng. Năm 2024 đ&aacute;nh dấu sự
                              ph&aacute;t triển vượt bậc trong lĩnh vực
                              n&agrave;y với những xu hướng l&agrave;m đẹp hiện
                              đại, kết hợp c&ocirc;ng nghệ ti&ecirc;n tiến
                              v&agrave; phong c&aacute;ch c&aacute; nh&acirc;n
                              h&oacute;a. H&atilde;y c&ugrave;ng kh&aacute;m
                              ph&aacute; c&aacute;c xu hướng nổi bật sẽ dẫn đầu
                              ng&agrave;nh spa trong năm 2024.
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        */}
      </div>
    </>
  );
};

export default Home;
