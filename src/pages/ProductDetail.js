import React, { useEffect, useMemo, useState } from "react";
import mammoth from "mammoth/mammoth.browser";
import { Link, useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docxHtml, setDocxHtml] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const res = await fetch("/data/products.json");
        const data = await res.json();
        if (!isMounted) return;
        setProducts(data.products || []);
      } catch (err) {
        if (!isMounted) return;
        setError("Không thể tải dữ liệu sản phẩm.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const product = useMemo(() => {
    return products.find((p) => p.id === productId);
  }, [products, productId]);

  // Prepare data before any early returns to keep hook order stable
  const galleryImages = [
    product?.images?.main,
    ...(product?.images?.gallery || []),
  ].filter(Boolean);

  const relatedProducts = useMemo(() => {
    if (!product?.relatedProducts || !Array.isArray(product.relatedProducts)) {
      return [];
    }
    const idSet = new Set(product.relatedProducts);
    return products.filter((p) => idSet.has(p.id));
  }, [product, products]);

  // Init Swiper (plain JS) if available globally
  useEffect(() => {
    const hasSwiper = typeof window !== "undefined" && window.Swiper;
    if (!hasSwiper) return;
    const thumbs = new window.Swiper(".gallery-thumbs", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slideToClickedSlide: true,
      breakpoints: {
        0: { slidesPerView: 4, spaceBetween: 8 },
        768: { slidesPerView: 4, spaceBetween: 10 },
        1200: { slidesPerView: 5, spaceBetween: 12 },
      },
    });
    const main = new window.Swiper(".gallery-top", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: { swiper: thumbs },
      slidesPerView: 1,
      centeredSlides: true,
      loop: false,
    });
    const setActiveThumb = (index) => {
      document
        .querySelectorAll(".gallery-thumbs .swiper-slide")
        .forEach((el, i) => {
          if (i === index) el.classList.add("thumb-active");
          else el.classList.remove("thumb-active");
        });
    };
    setActiveThumb(0);
    main.on("slideChange", () => setActiveThumb(main.activeIndex));
    thumbs.on("click", () => setActiveThumb(thumbs.clickedIndex));
  }, [productId, products]);

  // Load product description from word doc if available
  useEffect(() => {
    const loadDocx = async (docxPath) => {
      try {
        setDocxHtml(null);
        const res = await fetch(docxPath);
        if (!res.ok) return;
        const arrayBuffer = await res.arrayBuffer();
        const result = await mammoth.convertToHtml(
          { arrayBuffer },
          { convertImage: mammoth.images.inline() }
        );
        setDocxHtml(result.value || null);
      } catch (e) {
        // ignore
      }
    };

    if (product && (product.docx || product.docxPath)) {
      loadDocx(product.docx || product.docxPath);
    } else {
      setDocxHtml(null);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="loading-spinner text-center my-4 w-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-danger my-4">{error}</p>;
  }

  if (!product) {
    return <p className="text-center my-4">Không tìm thấy sản phẩm.</p>;
  }

  const handleContact = () => {
    const pageUsernameOrId = "lahibeautycenter1"; 
    const messengerUrl = `https://m.me/${pageUsernameOrId}`;
    const fallbackUrl = `https://www.facebook.com/messages/t/${pageUsernameOrId}`;

    const urlToOpen = messengerUrl || fallbackUrl;
    window.open(urlToOpen, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="wrap-all">
      <div className="breadCrumbs">
        <div className="max-width">
          <div className="wrap-content">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="text-decoration-none" to="/">
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="text-decoration-none" to="/products">
                  <span>Sản phẩm</span>
                </Link>
              </li>
              <li className="breadcrumb-item active">
                <span>{product.name}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="wrap-main">
        <div className="container">
          <div className="row details-product">
            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
              <div className="relative product-image-block">
                <div
                  className="swiper gallery-top clearfix margin-bottom-10"
                  style={{ maxWidth: 520, margin: "0 auto" }}
                >
                  <div className="swiper-wrapper">
                    {galleryImages.map((img, idx) => (
                      <div
                        className="swiper-slide"
                        data-index={idx + 1}
                        key={`slide-${idx}`}
                      >
                        <a
                          href={encodeURI(`/${img}`)}
                          data-fancybox="gallery"
                          title="Click để xem"
                        >
                          <img
                            src={encodeURI(`/${img}`)}
                            alt={product.name}
                            data-image={encodeURI(`/${img}`)}
                            className="img-responsive mx-auto d-block center-block"
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              maxHeight: 520,
                              objectFit: "contain",
                            }}
                            onError={(e) =>
                              (e.currentTarget.src =
                                "/thumbs/300x345x2/assets/images/noimage.png.webp")
                            }
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="swiper-button-next swiper-button-white"></div>
                  <div className="swiper-button-prev swiper-button-white"></div>
                </div>

                <div
                  className="swiper gallery-thumbs clearfix"
                  style={{ maxWidth: 520, margin: "10px auto 0" }}
                >
                  <div
                    className="swiper-wrapper"
                    style={{ alignItems: "center" }}
                  >
                    {galleryImages.map((img, idx) => (
                      <div
                        className="swiper-slide"
                        data-index={idx + 1}
                        key={`thumb-${idx}`}
                        style={{ width: 100, height: 100 }}
                      >
                        <img
                          src={encodeURI(`/${img}`)}
                          alt={product.name}
                          data-image={encodeURI(`/${img}`)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) =>
                            (e.currentTarget.src =
                              "/thumbs/300x345x2/assets/images/noimage.png.webp")
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="social-sharing margin-top-10">
                  <div className="addthis_inline_share_toolbox_7dnb"></div>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6 details-pro">
              <div className="product-top clearfix">
                <h2 className="title-head">{product.name}</h2>
                <div className="sku-product clearfix">
                  <div className="item-sku">
                    <span className="hidden">LAHI BEAUTY</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="price-box clearfix">
                  <div className="special-price">
                    <span className="price product-price">{product.price}</span>
                  </div>
                </div>

                <div className="inventory_quantity">
                  <span className="stock-brand-title">Tình trạng: </span>
                  <span className="a-stock a1">Còn hàng</span>
                </div>
              </div>

              <div className="form-product">
                <form>
                  <div className="form-group ">
                    <div className="btn-mua">
                      <button
                        type="button"
                        className="btn btn-lg btn-gray btn-cart add_to_cart btn_buy add_to_cart"
                        onClick={handleContact}
                      >
                        <span className="txt-main">Liên hệ để mua</span>
                        <span className="text-add">
                          Đặt mua giao hàng tận nơi
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="hotline_product">
                <span>
                  Gọi đặt mua:{" "}
                  <a href="tel:0961658866" title="0961658866">
                    0961 658 866
                  </a>
                </span>
                <span> (miễn phí 8:30 - 21:30).</span>
              </div>

              <div className="module_service_details clearfix">
                <div className="item_service clearfix">
                  <img
                    src="/assets/icons/policy_images_1.svg"
                    alt="Thanh toán dễ dàng và bảo mật"
                  />
                  <h4>Thanh toán dễ dàng và bảo mật</h4>
                </div>
                <div className="item_service clearfix">
                  <img
                    src="/assets/icons/policy_images_2.svg"
                    alt="Miễn phí vận chuyển với đơn hàng từ 5 sản phẩm"
                  />
                  <h4>Miễn phí vận chuyển với đơn hàng từ 5 sản phẩm</h4>
                </div>
                <div className="item_service clearfix">
                  <img
                    src="/assets/icons/policy_images_3.svg"
                    alt="Đổi trả hàng trong vòng 03 ngày do lỗi nhà sản xuất"
                  />
                  <h4>Đổi trả hàng trong vòng 03 ngày do lỗi nhà sản xuất</h4>
                </div>
                <div className="item_service clearfix">
                  <img
                    src="/assets/icons/policy_images_4.svg"
                    alt="Cam kết 100% chính hãng"
                  />
                  <h4>Cam kết 100% chính hãng</h4>
                </div>
              </div>
            </div>
          </div>
          {docxHtml && (
            <div className="product-description mt-4">
              <div className="title-main">
                <h2 style={{ fontSize: 26 }}>Mô tả sản phẩm</h2>
              </div>
              <div className="content-main w-clear markdownEditor">
                <div
                  className="word-content"
                  dangerouslySetInnerHTML={{ __html: docxHtml }}
                />
              </div>
            </div>
          )}

          {relatedProducts && relatedProducts.length > 0 && (
            <div className="wrap-all related-product" style={{ marginTop: 30 }}>
              <div className="title-main">
                <h2 style={{ fontSize: 26 }}>Sản phẩm liên quan</h2>
              </div>
              <div className="gridNews">
                {relatedProducts.map((rp) => (
                  <div key={rp.id} className="dvnb_item">
                    <Link
                      to={`/product/${rp.id}`}
                      className="dvnb_box position-relative d-block text-decoration-none"
                      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    >
                      <div className="dvnb_pic service-pic scale-img hover-glass">
                        <picture>
                          <source
                            srcSet={encodeURI(`/${rp.image}`)}

                            media="(min-width: 0px)"
                          />
                          <img
                            className="d-inline-block w-100"
                            data-src={encodeURI(`/${rp.image}`)}
                            src="/thumbs/300x345x2/assets/images/noimage.png.webp"
                            alt={rp.name}
                            onError={(e) =>
                              (e.target.src =
                                "/thumbs/300x345x2/assets/images/noimage.png.webp")
                            }
                          />
                        </picture>
                      </div>
                      <div className="dvnb_bottom"></div>
                      <div className="dvnb_info">
                        <h3 className="dvnb__name text-split">
                          {rp.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
