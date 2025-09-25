import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Feedback.css";

const Feedback = () => {
    const { feedBackId } = useParams();
    const [feedbackGroups, setFeedbackGroups] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!feedBackId || feedBackId === "all") {
            setActiveCategory("all");
            setActiveSubMenu(null);
            return;
        }

        // menu
        const category = feedbackGroups.find((cat) => cat.id.toString() === feedBackId);
        if (category) {
            setActiveCategory(category.id);
            setActiveSubMenu(null);
            return;
        }

        // submenu
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
                // Lọc theo submenu khi chọn "Tất cả"
                const sub = feedbackGroups
                    .flatMap(cat => cat.subMenu.map(s => ({ ...s, parentId: cat.id })))
                    .find(s => s.id === activeSubMenu);

                list = sub ? sub.feedbacks : [];
            } else {
                // Chưa chọn submenu → gom toàn bộ feedback
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
                // chưa chọn submenu → gom tất cả feedback của category
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
                        className={`submenu-item px-3 py-2 mx-2 rounded-pill ${
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
                <div className="col-12 col-sm-10 col-md-6">
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
              {getFeedbackList().map((fb) => (
                <div key={`${activeCategory}-${fb.id}`} className="col-6 col-sm-4 col-md-3 mb-3">
                  <div className="border p-2 text-center">
                    <img src={`/${fb.image}`} alt={fb.name} className="img-fluid" />
                    <p>{fb.name}</p>
                  </div>
                </div>
              ))}

              {getFeedbackList().length === 0 && (
                <p className="text-center">Không có feedback nào</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
