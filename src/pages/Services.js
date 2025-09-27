import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/Services.css";
import Pagination from "../components/Pagination";

const Services = () => {
  const [serviceGroups, setServiceGroups] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const pageSize = 12;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
  }, []);

  // sync state from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const submenuFromUrl = searchParams.get("submenu");

    if (!categoryFromUrl || categoryFromUrl === "all") {
      setActiveCategory("all");
      setActiveSubMenu(submenuFromUrl ? submenuFromUrl : null);
      return;
    }

    // find category by id
    const category = serviceGroups.find(
      (cat) => cat.id.toString() === categoryFromUrl
    );
    if (category) {
      setActiveCategory(category.id);
      setActiveSubMenu(submenuFromUrl ? submenuFromUrl : null);
    }
  }, [searchParams, serviceGroups]);

  // Initialize lazy loading after items are loaded
  useEffect(() => {
    if (!loading && serviceGroups.length > 0) {
      setTimeout(() => {
        if (window.LazyLoad) {
          new window.LazyLoad({ elements_selector: ".lazy" });
        }
        if (window.$ && window.$().lazy) {
          window.$(".lazy").lazy();
        }
      }, 100);
    }
  }, [loading, serviceGroups]);

  // show loading state while typing search (debounced)
  useEffect(() => {
    setSearchLoading(true);
    const handle = setTimeout(() => setSearchLoading(false), 400);
    return () => clearTimeout(handle);
  }, [keyword]);

  // reset to first page when filters or keyword change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubMenu, keyword]);

  const fetchData = async () => {
    try {
      const res = await fetch("/data/services.json");
      const data = await res.json();
      setServiceGroups(data.categories || []);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  // compute list of services based on active filters + keyword
  const getServiceList = () => {
    let list = [];

    if (activeCategory === "all") {
      if (activeSubMenu) {
        const sub = serviceGroups
          .flatMap((cat) => cat.subMenu.map((s) => ({ ...s, parentId: cat.id })))
          .find((s) => s.id === activeSubMenu || s.id.toString() === activeSubMenu);
        list = sub ? sub.services : [];
      } else {
        list = serviceGroups.flatMap((cat) =>
          cat.subMenu.flatMap((sub) => sub.services)
        );
      }
    } else {
      const category = serviceGroups.find(
        (cat) => cat.id === activeCategory || cat.id.toString() === activeCategory
      );
      if (!category) return [];

      if (activeSubMenu) {
        const sub = category.subMenu.find(
          (s) => s.id === activeSubMenu || s.id.toString() === activeSubMenu
        );
        list = sub ? sub.services : [];
      } else {
        list = category.subMenu.flatMap((sub) => sub.services);
      }
    }

    if (keyword.trim() !== "") {
      list = list.filter((sv) =>
        (sv.name || sv.title || "").toLowerCase().includes(keyword.toLowerCase())
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
        <p className="mt-3">Đang tải danh sách dịch vụ...</p>
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
                <span>Dịch vụ</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="wrap-all">
        <div className="wrap-main">
          <div className="title-main">
            <h2>Dịch vụ chăm sóc da chuyên nghiệp</h2>
          </div>

          <div className="container">
            {/* Menu services */}
            <div className="row justify-content-center my-4 mx-lg-5">
              <div className="col-4 col-md-4 col-lg-2 text-center mb-1">
                <Link
                  to="/services"
                  className={`d-block ${activeCategory === "all" ? "text-primary fw-bold" : "text-secondary"}`}
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveSubMenu(null);
                    setSearchParams({});
                  }}
                >
                  <div
                    className={`rounded-circle border ${activeCategory === "all" ? "border-primary" : "border-secondary"} mx-auto`}
                    style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <img
                      src="/upload/feedback/menu/ic-services-all-actives.svg"
                      alt="Tất cả"
                      style={{ width: 80, height: 80 }}
                    />
                  </div>
                  <div>Tất cả</div>
                </Link>
              </div>

              {serviceGroups.map((group) => (
                <div key={group.id} className="col-4 col-md-4 col-lg-2 text-center mb-1">
                  <Link
                    to={`/services?category=${group.id}`}
                    className={`d-block ${
                      (activeCategory === group.id || activeCategory === group.id.toString())
                        ? "text-primary fw-bold"
                        : "text-secondary"
                    }`}
                    onClick={() => {
                      setActiveCategory(group.id);
                      setActiveSubMenu(null);
                      setSearchParams({ category: group.id });
                    }}
                  >
                    <div
                      className={`rounded-circle border ${
                        (activeCategory === group.id || activeCategory === group.id.toString())
                          ? "border-primary"
                          : "border-secondary"
                      } mx-auto`}
                      style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
                    >
                      <img
                        src={group.image}
                        alt={group.name}
                        className="img-fluid"
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                        onError={(e) => (e.currentTarget.src = "/assets/images/noimage.png")}
                      />
                    </div>
                    <div>{group.name}</div>
                  </Link>
                </div>
              ))}
            </div>

            {/* submenu */}
            <div className="submenu-scroll d-flex my-4">
              {(activeCategory === "all"
                ? serviceGroups.flatMap((cat) =>
                    cat.subMenu.map((sub) => ({ ...sub, parentId: cat.id }))
                  )
                : serviceGroups.find((cat) =>
                    cat.id === activeCategory || cat.id.toString() === activeCategory
                  )?.subMenu || []
              ).map((sub) => (
                <Link
                  key={sub.id}
                  to={
                    activeCategory === "all"
                      ? `/services?submenu=${sub.id}`
                      : `/services?category=${activeCategory}&submenu=${sub.id}`
                  }
                  className={`submenu-item px-3 py-2 mx-2 rounded-pill ${
                    (activeSubMenu === sub.id || activeSubMenu === sub.id.toString()) ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveSubMenu(sub.id);
                    if (activeCategory === "all") {
                      setSearchParams({ submenu: sub.id });
                    } else {
                      setSearchParams({ category: activeCategory, submenu: sub.id });
                    }
                  }}
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
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ borderRadius: 0 }}
                  />
                </div>
              </div>
            </div>

            {/* list services */}
            {searchLoading || pageLoading ? (
              <div className="loading-spinner text-center my-4 w-100">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Đang tải...</p>
              </div>
            ) : (
              <div className="gridNews" id="services-grid">
                {(() => {
                  const list = getServiceList();
                  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
                  const page = Math.min(currentPage, totalPages);
                  const start = (page - 1) * pageSize;
                  return list.slice(start, start + pageSize);
                })().map((service) => (
                <div key={service.id} className="dvnb_item">
                  <Link
                    to={`/service/${service.id}`}
                    className="dvnb_box position-relative d-block"
                  >
                    <div className="dvnb_pic service-pic scale-img hover-glass">
                      <picture>
                        <source
                          srcSet={`/${service.image}`}
                          media="(min-width: 0px)"
                        />
                        <img
                          className="d-inline-block w-100"
                          data-src={`/${service.image}`}
                          src="/thumbs/300x345x2/assets/images/noimage.png.webp"
                            alt={service.name}
                          onError={(e) =>
                            (e.target.src =
                              "/thumbs/300x345x2/assets/images/noimage.png.webp")
                          }
                        />
                      </picture>
                    </div>
                    <div className="dvnb_bottom"></div>
                    <div className="dvnb_info">
                        <h3 className="dvnb__name text-split">{service.name}</h3>
                    </div>
                  </Link>
                </div>
                ))}

                {getServiceList().length === 0 && (
                  <p className="text-center">Không có dịch vụ nào</p>
                )}
              </div>
            )}

            {/* pagination */}
            {!searchLoading && !pageLoading && getServiceList().length > 0 && (
              <Pagination
                total={getServiceList().length}
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

export default Services;
