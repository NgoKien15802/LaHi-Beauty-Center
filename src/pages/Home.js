import React, { useEffect, useState } from "react";
import ServiceList from "../components/ServiceList";
import FeedbackList from "../components/FeedbackList";
import { Link } from "react-router-dom";
import { useFormSubmission } from "../utils/formSubmission";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { isSubmitting, submitMessage, handleFormSubmit } = useFormSubmission();

  const handleNewsletterSubmit = (e) => {
    const formFields = {
      'fullname-newsletter': 'họ tên',
      'phone-newsletter': 'số điện thoại'
    };
    
    handleFormSubmit(e, formFields).then((result) => {
      if (result?.success) {
        e.target.reset();
      }
    });
  };

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

    }
  ];

  // Dịch vụ nổi bật (hiển thị danh sách + phân trang)
  const [featuredServices, setFeaturedServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [featuredFeedbacks, setFeaturedFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

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
    const loadFeaturedNews = async () => {
      try {
        const res = await fetch("/data/news.json");
        const data = await res.json();
        // Lấy tất cả tin tức để hiển thị trên trang chủ
        const newsList = data.news || [];
        setFeaturedNews(newsList);
      } catch (error) {
        console.error("Error loading featured news:", error);
      } finally {
        setNewsLoading(false);
      }
    };
    loadFeaturedNews();
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
                <div className="d-block">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar closeOnClick pauseOnHover draggable theme="light" />
      <div className="wrap-all">
        <div className="gioithieu_wrap spacer">
          <div className="wrap-content">
            <div className="gioithieu_flex">
              <div
                className="gioithieu_left d-none d-md-block"
                data-aos="fade-right"
              >
                <Link to="/about" className="gioithieu__pic scale-img">
                  <img
                    className="d-inline-block lazy w-100"
                    onError={(e) =>
                      (e.target.src =
                        "upload/trangchu/snaptik_7472736510807133456_8.jpeg")
                    }
                    data-src="upload/trangchu/snaptik_7472736510807133456_8.jpeg"
                    alt="Lahi Beauty Center"
                  />
                </Link>
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
                  <Link
                    to="/about"
                    className="btn_about_viewmore d-inline-block"
                  >
                    Tìm hiểu thêm
                  </Link>
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
                          0961 658 866
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
                  onSubmit={handleNewsletterSubmit}
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
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        onKeyDown={(e) => e.keyCode !== 69}
                        onInput={(e) => {
                          // Chỉ cho phép số
                          e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
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
                <button
                  type="submit"
                  className="btn_newsletter btn_validation"
                  disabled={isSubmitting}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textAlign: 'center',
                    justifyContent: 'center',
                   }}
                >
                  {isSubmitting && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      style={{ width: '1rem', height: '1rem', borderWidth: '.15em' }}
                    />
                  )}
                  {isSubmitting ? "Đang gửi..." : "Đăng ký ngay"}
                </button>
                  </div>
                {/* Toast will handle messages; inline message removed */}
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
              <div
                className="logo_tieuchi-main d-none d-lg-block"
                style={{
                  left: "51%",
                }}
              >
                <picture>
                  <source
                    srcSet="
                  upload/trangchu/logo png.png
                "
                    media="(min-width: 0px)"
                  />
                  <img
                    className="d-inline-block lazy"
                    data-src="upload/trangchu/logo png.png"
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

        {/* Tin tức */}
        <div className="news_wrap spacer">
          <div className="wrap-content">
            <div className="title-main">
              <div className="name-title">LaHi Beauty Center</div>
              <h2>Kiến Thức Làm Đẹp</h2>
            </div>
            <div className="gridNews">
              {newsLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Đang tải tin tức...</p>
                </div>
              ) : (
                featuredNews.map((article) => (
                  <div key={article.id} className="news_item">
                    <Link to={`/news/${article.slug}`} className="news_box">
                      <div className="news_pic scale-img hvr-double-box">
                        <picture>
                          <source
                            srcSet={`/${article.image}`}
                            media="(min-width: 0px)"
                          />
                          <img
                            className="d-inline-block w-100"
                            data-src={`/${article.image}`}
                            alt="Her Skinlab"
                            width="400"
                            height="285"
                            src="/thumbs/400x285x2/assets/images/noimage.png.webp"
                          />
                        </picture>
                      </div>
                      <div className="news_info">
                        <h3 className="news__name text-split">
                          {article.title}
                        </h3>
                        <div className="news__date d-block">
                          <i
                            className="fa-light fa-clock"
                            style={{ marginRight: "5px" }}
                          ></i>
                          {article.dateFormatted}
                        </div>
                        <div className="news__desc text-split news__desc-detail">
                          {article.description}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
