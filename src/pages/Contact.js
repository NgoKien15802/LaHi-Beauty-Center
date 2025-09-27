import { Link } from "react-router-dom";

const Contact = () => {
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
						<div className="contact-article row" style={{padding: "0"}}>
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
										<div className="contact-text col-lg-9">
											<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-map-marker-20(1).png" width="20" /> CS1: S2.16 - Vinhomes Ocean Park, Gia Lâm, Hà Nội</p>
											<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-help-20(1).png" width="20" /> Hotline 1: <a href="tel:0876638686" className="text-black custom-link-website">087.663.8686</a></p>
											<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-map-marker-20(1).png" width="20" /> CS2: 194 Nguyễn Văn Tuyết - Quận Đống Đa, Tp. Hà Nội</p>
											<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-help-20(1).png" width="20" /> Hotline 2: <a href="tel:0961658866" className="text-black custom-link-website">096.165.8866</a></p>
											<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-email-20(1).png" width="20" /> Email: lahibeautycenter@gmail.com</p>

											<p><img alt="" height="20" src="upload/filemanager/files/icon/icons8-website-20(1).png" width="20" /> Website: <a href="http://lahibeautycenter.com" className="text-black custom-link-website" target="_blank" rel="noopener">lahibeautycenter.com </a></p>
										</div>
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
