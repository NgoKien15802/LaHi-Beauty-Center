import React, { useMemo, useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const ProductList = ({
  products = [],
  loading = false,
  pageSize = 12,
  scrollToId = "products-grid",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [products, pageSize]);

  const { currentItems, totalItems, totalPages } = useMemo(() => {
    const total = products.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(currentPage, pages);
    const start = (safePage - 1) * pageSize;
    const slice = products.slice(start, start + pageSize);
    return { currentItems: slice, totalItems: total, totalPages: pages };
  }, [products, pageSize, currentPage]);

  if (loading) {
    return (
      <div className="loading-spinner text-center my-4 w-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Đang tải...</p>
      </div>
    );
  }

  return (
    <>
      {pageLoading ? (
        <div className="loading-spinner text-center my-4 w-100" style={{ margin: "0 auto" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Đang tải...</p>
        </div>
      ) : (
        <div className="gridNews" id={scrollToId}>
          {currentItems.map((product) => (
            <div key={product.id} className="dvnb_item">
              <Link to={`/product/${product.id}`} className="dvnb_box position-relative d-block text-decoration-none">
                <div className="dvnb_pic service-pic scale-img hover-glass">
                  <picture>
                    <source srcSet={encodeURI(`/${product.image}`)} media="(min-width: 0px)" />
                    <img
                      className="d-inline-block w-100"
                      data-src={encodeURI(`/${product.image}`)}
                      src="/thumbs/300x345x2/assets/images/noimage.png.webp"
                      alt={product.name}
                      onError={(e) => (e.target.src = "/thumbs/300x345x2/assets/images/noimage.png.webp")}
                    />
                  </picture>
                </div>
                <div className="dvnb_bottom"></div>
                <div className="dvnb_info">
                  <h3 className="dvnb__name text-split">{product.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {!loading && totalItems === 0 && <p className="text-center">Không có sản phẩm nào</p>}

      {totalItems > 0 && (
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
          scrollToTop={false}
          alwaysShow={true}
        />
      )}
    </>
  );
};

export default ProductList;


