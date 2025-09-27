import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Feedback.css";
import Pagination from "../components/Pagination";

const Feedback = () => {
    const { feedBackId } = useParams();
    const [feedbackGroups, setFeedbackGroups] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, []);

	// Cập nhật activeCategory và activeSubMenu khi feedBackId thay đổi
    useEffect(() => {
		// Xử lý khi chọn menu "Tất cả" hoặc không có feedBackId
        if (!feedBackId || feedBackId === "all") {
            setActiveCategory("all");
            setActiveSubMenu(null);
            return;
        }

        // xử lý khi chọn category
        const category = feedbackGroups.find((cat) => cat.id.toString() === feedBackId);
        if (category) {
            setActiveCategory(category.id);
            setActiveSubMenu(null);
            return;
        }

        // xử lý khi chọn submenu
        const sub = feedbackGroups
            .flatMap((cat) => cat.subMenu.map((s) => ({ ...s, parentId: cat.id })))
            .find((s) => s.id.toString() === feedBackId);

        if (sub) {
            setActiveCategory(sub.parentId);
            setActiveSubMenu(sub.id);
        }
    }, [feedBackId, feedbackGroups]);

    // Initialize lazy loading after services are loaded
    useEffect(() => {
        if (!loading && feedbackGroups.length > 0) {
            // Wait for DOM to be updated
            setTimeout(() => {
            // Initialize lazy loading
            if (window.LazyLoad) {
                new window.LazyLoad({
                elements_selector: ".lazy",
                });
            }

            // Also try jQuery lazy loading
            if (window.$ && window.$().lazy) {
                window.$(".lazy").lazy();
            }
            }, 100);
        }
    }, [loading, feedbackGroups]);

	// load feedback data from local JSON file
    const fetchData = async () => {
        try {
            const res = await fetch("/data/feedback.json");
            const data = await res.json();
            setFeedbackGroups(data.categories || []);
        } catch (error) {
            console.error("Error loading feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    // lấy danh sách feedback theo nhóm + filter keyword
    const getFeedbackList = () => {
        let list = [];

        if (activeCategory === "all") {
            if (activeSubMenu) {
                // Lọc theo submenu khi chọn menu "Tất cả"
                const sub = feedbackGroups
                    .flatMap(cat => cat.subMenu.map(s => ({ ...s, parentId: cat.id })))
                    .find(s => s.id === activeSubMenu);

                list = sub ? sub.feedbacks : [];
            } else {
                // hiển thị toàn bộ feedback
                list = feedbackGroups.flatMap(cat =>
                    cat.subMenu.flatMap(sub => sub.feedbacks)
                );
            }
        } else {
            const category = feedbackGroups.find(cat => cat.id === activeCategory);
            if (!category) return [];

            if (activeSubMenu) {
                // lọc theo submenu
                const sub = category.subMenu.find(s => s.id === activeSubMenu);
                list = sub ? sub.feedbacks : [];
            } else {
                // hiển thị toàn bộ feedback của menu đó
                list = category.subMenu.flatMap(sub => sub.feedbacks);
            }
        }

        // filter theo keyword
        if (keyword.trim() !== "") {
            list = list.filter(fb =>
            fb.name.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        return list;
    };

    // Danh sách feedback đã phân trang
    const getPagedList = () => {
        const list = getFeedbackList();
        const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
        const page = Math.min(currentPage, totalPages);
        const start = (page - 1) * pageSize;
        const pagedList = list.slice(start, start + pageSize);

        return { list, pagedList, start, totalPages };
    };

	// Danh sách feedback hiện tại theo category/submenu đang chọn
    const activeList = getFeedbackList();
	// Xử lý selectedIndex luôn hợp lệ khi activeList đổi.
    useEffect(() => {
        if (selectedIndex !== null && (activeList.length === 0 || selectedIndex >= activeList.length)) {
            setSelectedIndex(null);
        }
    }, [activeList, selectedIndex]);

	// Xử lý chuyển ảnh feedback trước/sau trong popup
    const showPrev = () => {
    	setSelectedIndex(prev => (prev === 0 ? activeList.length - 1 : prev - 1));
    };
    const showNext = () => {
    	setSelectedIndex(prev => (prev === activeList.length - 1 ? 0 : prev + 1));
    };

    // reset to first page when filters or keyword change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, activeSubMenu, keyword]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Đang tải danh sách feedback...</p>
      </div>
    );
  }

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
                <span>Feedback</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="wrap-all">
        <div className="wrap-main">
          <div className="title-main">
            <h2>Câu chuyện khách hàng</h2>
          </div>

          <div className="container">
            {/* Menu feedback*/}
            <div className="row justify-content-center my-4 mx-lg-5">
              <div className="col-4 col-md-4 col-lg-2 text-center mb-1"
              >
                <Link to="/feedback" className={`d-block ${ activeCategory === "all" ? "text-primary fw-bold" : "text-secondary"}`}>
                  <div className={`rounded-circle border ${ activeCategory === "all" ? "border-primary" : "border-secondary"} mx-auto`}
                    style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="upload/feedback/menu/ic-services-all-actives.svg" alt="" style={{ width: 80, height: 80 }}/>
                  </div>
                  <div>Tất cả</div>
                </Link>
              </div>

              {feedbackGroups.map(group => (
                    <div key={group.id} className="col-4 col-md-4 col-lg-2 text-center mb-1">
                        <Link to={`/feedback/${group.id}`} className={`d-block ${activeCategory === group.id ? "text-primary fw-bold" : "text-secondary"}`}>
                            <div className={`rounded-circle border ${activeCategory === group.id ? "border-primary" : "border-secondary"} mx-auto`} 
                                style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                <img src={group.image} alt={group.name} className="img-fluid" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                            </div>
                            <div>{group.name}</div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* submenu */}
            <div className="submenu-scroll d-flex my-4">
                {(activeCategory === "all"
                    ? feedbackGroups.flatMap((cat) =>
                        cat.subMenu.map((sub) => ({ ...sub, parentId: cat.id }))
                    )
                    : feedbackGroups.find((cat) => cat.id === activeCategory)?.subMenu || []
                ).map((sub) => (
                    <Link
                        key={sub.id}
                        to={`/feedback/${sub.id}`}
                        className={`submenu-item rounded-pill ${
                            activeSubMenu === sub.id ? "active" : ""
                        }`}
                        onClick={() => setActiveSubMenu(sub.id)}
                    >
                        {sub.name}
                    </Link>
                ))}
            </div>

            {/* Search input */}
            <div className="row justify-content-center my-4">
                <div className="col-12 col-sm-10 col-lg-8">
                    <div className="d-flex align-items-center border rounded-pill overflow-hidden" style={{ backgroundColor: "#fff" }}>
                    <div className="d-flex align-items-center justify-content-center p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Tìm kiếm theo từ khóa"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        style={{ borderRadius: 0 }}
                    />
                    </div>
                </div>
            </div>

            {/* list feedback */}
            <div className="row">
                {(() => {
                    const { list, pagedList, start } = getPagedList();

                    return (
                        <>
                            {pagedList.map((fb, index) => {
                                const globalIndex = start + index;
                                return (
                                    <div key={`${activeCategory}-${fb.id}`} className="col-6 col-sm-4 col-md-3 mb-3">
                                        <div className="border p-2 text-center">
                                            <img src={`/${fb.image}`} alt={fb.name} className="img-fluid" onClick={() => setSelectedIndex(globalIndex)}/>
                                            <p>{fb.name}</p>
                                        </div>
                                    </div>
                                );
                            })}

                            {list.length === 0 && <p className="text-center">Không có feedback nào</p>}
                        </>
                    );
                })()}
            </div>

			{/* Popup lightbox */}
            {selectedIndex !== null && activeList.length > 0 && (
                <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1" onClick={() => setSelectedIndex(null)}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "95vw" }} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content bg-transparent border-0 text-center position-relative">
                        <button
                        type="button"
                        className="btn btn-warning rounded-circle position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center"
                        style={{ width: 50, height: 50, zIndex: 10 }}
                        onClick={() => setSelectedIndex(null)}
                        >
                        ✕
                        </button>

                        <img src={`/${activeList[selectedIndex].image}`} alt={activeList[selectedIndex].name} className="popup-img" />

                        <button
                        className="btn position-absolute top-50 start-0 translate-middle-y text-white"
                        style={{ left: "-20px", fontSize: "80px" }}
                        onClick={showPrev}
                        aria-label="Prev"
                        >
                        ‹
                        </button>

                        <button
                        className="btn position-absolute top-50 end-0 translate-middle-y text-white"
                        style={{ right: "-20px", fontSize: "80px" }}
                        onClick={showNext}
                        aria-label="Next"
                        >
                        ›
                        </button>

                        <div className="mt-3 text-white">
                        <h5 className="mb-0">{activeList[selectedIndex].name}</h5>
                        </div>
                    </div>
                    </div>
                </div>
            )}

            {/* pagination */}
            {!pageLoading && getFeedbackList().length > 0 && (
              <Pagination
                total={getFeedbackList().length}
                pageSize={pageSize}
                currentPage={currentPage}
                onChange={(p) => {
                  setPageLoading(true);
                  setCurrentPage(p);
                  setTimeout(() => setPageLoading(false), 350);
                }}
                scrollToId="services-grid"
                alwaysShow={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
