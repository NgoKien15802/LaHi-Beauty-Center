import { Link } from "react-router-dom";
import { useFormSubmission } from "../utils/formSubmission";

const Contact = () => {
  // Use form submission utility
  const { isSubmitting, submitMessage, handleFormSubmit } = useFormSubmission();

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    const formFields = {
      'fullname-contact': 'họ tên',
      'phone-contact': 'số điện thoại'
    };
    
    handleFormSubmit(e, formFields).then((result) => {
      if (result?.success) {
        e.target.reset();
      }
    });
  };

  return (
    <>
      {/* breadcrumbs */}
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
                <span>Liên Hệ</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="contact-wrap">
        <div className="wrap-main my-0 py-4">
          <div className="title-main">
            <h2>LaHi Beauty Center</h2>
          </div>
          <div className="content-main">
            <div className="contact-article row" style={{ padding: "0" }}>
              <div className="container mt-lg-1">
                <div className="row align-items-center">
                  <div className="col-12 col-lg-6 col-xl-6 mb-4 position-relative">
                    <div className="box">
                      <img
                        src="upload/trangchu/card.jpg"
                        alt="LaHi Beauty Center"
                      />
                    </div>
                  </div>
                  <div className="text-box col-12 col-lg-6 col-xl-6 mb-4">
                    <h3
                      style={{
                        fontSize: "clamp(1.2rem, 5vw, 2rem)",
                        marginBottom: "45px",
                      }}
                    >
                      <span
                        style={{ color: "#70501f", fontFamily: "var(--hous)" }}
                      >
                        LaHi Beauty Center
                      </span>
                    </h3>
                    <hr />
                    <div className="contact-text col-lg-9">
                      <p>
                        <img
                          alt=""
                          height="20"
                          src="upload/filemanager/files/icon/icons8-map-marker-20(1).png"
                          width="20"
                        />{" "}
                        CS1: S2.16 - Vinhomes Ocean Park, Gia Lâm, Hà Nội
                      </p>
                      <p>
                        <img
                          alt=""
                          height="20"
                          src="upload/filemanager/files/icon/icons8-help-20(1).png"
                          width="20"
                        />
                         Hotline 1: 
                        <a
                          href="tel:0876638686"
                          className="text-black custom-link-website"
                        >
                          087.663.8686
                        </a>
                      </p>
                      <p>
                        <img
                          alt=""
                          height="20"
                          src="upload/filemanager/files/icon/icons8-map-marker-20(1).png"
                          width="20"
                        />
                         CS2: 194 Nguyễn Văn Tuyết - Quận Đống Đa, Tp. Hà Nội
                      </p>
                      <p>
                        <img
                          alt=""
                          height="20"
                          src="upload/filemanager/files/icon/icons8-help-20(1).png"
                          width="20"
                        />
                         Hotline 2: 
                        <a
                          href="tel:0961658866"
                          className="text-black custom-link-website"
                        >
                          096.165.8866
                        </a>
                      </p>
                      <p>
                        <img
                          alt=""
                          height="20"
                          src="upload/filemanager/files/icon/icons8-email-20(1).png"
                          width="20"
                        />
                         Email: lahibeautycenter@gmail.com
                      </p>

                      <p>
                        <img
                          alt=""
                          height="20"
                          src="upload/filemanager/files/icon/icons8-website-20(1).png"
                          width="20"
                        />
                         Website:{" "}
                        <a
                          href="http://lahibeautycenter.com"
                          className="text-black custom-link-website"
                          target="_blank"
                          rel="noopener"
                        >
                          lahibeautycenter.com{" "}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="contac_form"
          style={{
            background:
              "url('upload/news/462767223122112361532539291361829581168189458n-1732160429.jpg') no-repeat center center / cover",
          }}
        >
          <div className="section contact-form">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                  <div className="left-box">
                     <form
                       className="validation-contact form_validation"
                       id="form_contact"
                       onSubmit={handleContactSubmit}
                     >
                      <div className="row-20 row">
                        <div className="contact-input validation-input col-sm-6 col-20 mb-3">
                          <div className="title-form mb-2">Họ và Tên</div>
                          <div className="form-floating form-floating-cus">
                            <input
                              type="text"
                              name="dataContact[fullname]"
                              className="form-control text-sm check_valid"
                              id="fullname-contact"
                              placeholder="Họ và tên"
                              required
                            />
                            <label htmlFor="fullname-contact">Họ và tên</label>
                          </div>
                          <div className="invalid_feedback">
                            Vui lòng nhập họ tên
                          </div>
                        </div>
                        <div className="contact-input validation-input col-sm-6 col-20 mb-3">
                          <div className="title-form mb-2">Số điện thoại</div>
                          <div className="form-floating form-floating-cus">
                            <input
                              type="number"
                              name="dataContact[phone]"
                              className="form-control text-sm check_valid phone_valid"
                              id="phone-contact"
                              placeholder="Điện thoại"
                              required
                              onKeyDown={(e) => e.keyCode !== 69}
                              onInput={(e) => {
                                if (
                                  e.target.value.length > e.target.maxLength
                                ) {
                                  e.target.value = e.target.value.slice(
                                    0,
                                    e.target.maxLength
                                  );
                                }
                              }}
                              maxLength="10"
                            />
                            <label htmlFor="phone-contact">Số điện thoại</label>
                          </div>
                          <div className="invalid_feedback">
                            Vui lòng nhập số điện thoại
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <input
                          type="hidden"
                          name="dataContact[type]"
                          value="lien-he"
                        />
                        <input
                          type="hidden"
                          name="csrf_token"
                          value="6a8bd0bf2151c2f0151bc4d77935b8b263a5de0880ebf1a5fc9379ee4c17f539"
                        />
                         <input
                           type="submit"
                           className="btn_validation btn  mr-2"
						  style={{
							border: '1px solid #70501f'
						  }}
                           name="submit-contact"
                           value={isSubmitting ? "Đang gửi..." : "Gửi"}
                           disabled={isSubmitting}
                         />
                         <input
                           type="reset"
                           className="btn btn-secondary"
                           value="Nhập lại"
                         />
                         <input
                           type="hidden"
                           name="recaptcha_response_contact"
                           id="recaptchaResponseContact"
                         />
                       </div>
                       {submitMessage && (
                         <div className={`submit-message ${submitMessage.includes("thành công") ? "success" : "error"}`} style={{
                           marginTop: "10px",
                           padding: "10px",
                           borderRadius: "5px",
                           textAlign: "center",
                           backgroundColor: submitMessage.includes("thành công") ? "#d4edda" : "#f8d7da",
                           color: submitMessage.includes("thành công") ? "#155724" : "#721c24",
                           border: `1px solid ${submitMessage.includes("thành công") ? "#c3e6cb" : "#f5c6cb"}`
                         }}>
                           {submitMessage}
                         </div>
                       )}
                     </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
