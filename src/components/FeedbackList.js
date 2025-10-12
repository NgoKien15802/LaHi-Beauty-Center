import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const FeedbackList = ({
  items = [],
  loading = false,
  pageSize = 12,
  showPagination = true,
  scrollToId = "feedback-grid",
  className = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [items, pageSize]);

  const { currentItems, totalItems, totalPages, startIndex } = useMemo(() => {
    const total = items.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(currentPage, pages);
    const start = (safePage - 1) * pageSize;
    const slice = items.slice(start, start + pageSize);
    return { currentItems: slice, totalItems: total, totalPages: pages, startIndex: start };
  }, [items, pageSize, currentPage]);

  const showPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? currentItems.length - 1 : prev - 1));
  };

  const showNext = () => {
    setSelectedIndex((prev) => (prev === currentItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {pageLoading ? (
        <div
          className="loading-spinner text-center my-4 w-100"
          style={{ margin: "0 auto" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Đang tải...</p>
        </div>
      ) : (
        <div className={`row ${className}`} id={scrollToId}>
          {currentItems.map((fb, index) => (
            <div key={fb.id} className="col-6 col-sm-4 col-md-3 mb-3">
              <div className="border p-2 text-center">
                <img
                  src={`/${fb.image}`}
                  alt={fb.name}
                  className="img-fluid"
                  onClick={() => setSelectedIndex(index)}
                  onError={(e) => (e.currentTarget.src = "/thumbs/300x345x2/assets/images/noimage.png.webp")}
                />
                <p 
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/service/${fb.serviceId}`)}>{fb.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && totalItems === 0 && (
        <p className="text-center">Không có feedback nào</p>
      )}

      {selectedIndex !== null && currentItems.length > 0 && (
        <div
          className="modal d-block bg-dark bg-opacity-75"
          tabIndex="-1"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "95vw" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-transparent border-0 text-center position-relative">
              <button
                type="button"
                className="btn btn-warning rounded-circle position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center"
                style={{ width: 50, height: 50, zIndex: 10 }}
                onClick={() => setSelectedIndex(null)}
              >
                ✕
              </button>

              <img
                src={`/${currentItems[selectedIndex].image}`}
                alt={currentItems[selectedIndex].name}
                className="popup-img"
              />

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
                <h5 className="mb-0">{currentItems[selectedIndex].name}</h5>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPagination && !loading && totalItems > 0 && (
        <Pagination
          total={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onChange={(p) => {
            setPageLoading(true);
            setCurrentPage(p);
            setTimeout(() => setPageLoading(false), 350);
          }}
          scrollToId={scrollToId}
          scrollToTop={scrollToId === "feedback-grid"}
          alwaysShow={true}
        />
      )}
    </>
  );
};

export default FeedbackList;


