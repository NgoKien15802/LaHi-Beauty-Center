import React from "react";

const Pagination = ({
  total = 0,
  pageSize = 12,
  currentPage = 1,
  onChange,
  className = "",
  scrollToId,
  scrollToTop = true,
  alwaysShow = false,
}) => {
  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goTo = (p) => {
    if (!onChange) return;
    const bounded = Math.min(Math.max(1, p), totalPages);
    onChange(bounded);
    if (scrollToTop) {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {}
    } else if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (!alwaysShow && total <= pageSize) return null;

  return (
    <nav className={`d-flex justify-content-center mt-4 ${className}`} aria-label="Pagination">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => currentPage > 1 && goTo(currentPage - 1)}>«</button>
        </li>
        {pages.map((p) => (
          <li key={p} className={`page-item ${p === currentPage ? "active" : ""}`}>
            <button className="page-link" onClick={() => goTo(p)}>{p}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => currentPage < totalPages && goTo(currentPage + 1)}>»</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;


