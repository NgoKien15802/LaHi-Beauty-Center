import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Feedback = () => {
    const { id: groupSlug } = useParams();
    const [feedbackGroups, setFeedbackGroups] = useState([]);
    const [activeGroup, setActiveGroup] = useState("all");
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setActiveGroup(groupSlug || "all");
    }, [groupSlug]);

    const fetchData = async () => {
        try {
        const res = await fetch("/data/feedback.json");
        const data = await res.json();
        setFeedbackGroups(data.categories);
        } catch (error) {
        console.error("Error loading feedback:", error);
        }
    };

    // lấy danh sách feedback theo nhóm + filter keyword
    const getFeedbackList = () => {
        let list =
        activeGroup === "all"
            ? feedbackGroups.flatMap(group => group.feedback)
            : feedbackGroups.find(group => group.id === activeGroup)?.feedback || [];

        if (keyword.trim() !== "") {
        list = list.filter(fb =>
            fb.name.toLowerCase().includes(keyword.toLowerCase())
        );
        }
        return list;
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
                        {/* Menu feedback */}
                        <div className="row justify-content-center my-4 mx-5">
                            <div className="col-6 col-sm-4 col-md-2 text-center mb-1">
                                <Link to="/feedback" className={`d-block ${activeGroup === "all" ? "text-primary fw-bold" : "text-secondary"}`}>
                                    <div className={`rounded-circle border ${activeGroup === "all" ? "border-primary" : "border-secondary"} mx-auto`} 
                                        style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <img src="upload/feedback/menu/ic-services-all-actives.svg" alt="" style={{ width: 80, height: 80 }}/>
                                    </div>
                                    <div>Tất cả</div>
                                </Link>
                            </div>

                            {feedbackGroups.map(group => (
                                <div key={group.id} className="col-6 col-sm-4 col-md-2 text-center mb-1">
                                    <Link to={`/feedback/${group.id}`} className={`d-block ${activeGroup === group.id ? "text-primary fw-bold" : "text-secondary"}`}>
                                        <div className={`rounded-circle border ${activeGroup === group.id ? "border-primary" : "border-secondary"} mx-auto`} 
                                            style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                            <img src={group.image} alt={group.name} className="img-fluid" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                                        </div>
                                        <div>{group.name}</div>
                                    </Link>
                                </div>
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
                            {getFeedbackList().map(fb => (
                                <div key={`${activeGroup}-${fb.id}`} className="col-6 col-sm-4 col-md-3 mb-3">
                                    <div className="border p-2 text-center">
                                        <img src={`/${fb.image}`} alt={fb.name} className="img-fluid" />
                                        <p>{fb.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feedback;
