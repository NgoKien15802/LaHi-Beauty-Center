import React from 'react';

const Contact = () => {
	return (
		<div className="contact-wrap">
			<div className="wrap-main my-0 py-4">
				<div className="title-main">
					<h2>LaHi Beauty Center</h2>
				</div>
				<div className="content-main">
					<div className="contact-article row">
						<div className="container mt-lg-1">
							<div className="row align-items-center">
								<div className="col-12 col-lg-6 col-xl-6 mb-4 position-relative">
									<div className="box">
										<img src='upload/trangchu/card.jpg' alt='LaHi Beauty Center'/>

									</div>
								</div>
								<div className="text-box col-12 col-lg-6 col-xl-6 mb-4">
									<h3 style={{  fontSize: "clamp(1.2rem, 5vw, 2rem)", marginBottom: "45px" }}>
										<span style={{ color: "#70501f", fontFamily: "var(--hous)" }}>
											LaHi Beauty Center
										</span>
									</h3>
									<hr />
									<div className="contact-text col-lg-7"><p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-map-marker-20(1).png" width="20" /> Địa chỉ: 194 Nguyễn Văn Tuyết, Đống Đa, Hà Nội</p>

										<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-email-20(1).png" width="20" /> Email: lahibeautycenter@gmail.com</p>

										<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-help-20(1).png" width="20" /> Hotline: 096 165 88 66</p>

										<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-website-20(1).png" width="20" /> Website: lahibeautycenter.com</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
