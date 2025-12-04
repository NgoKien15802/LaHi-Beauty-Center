import React, { useState, useEffect } from "react";
import mammoth from "mammoth/mammoth.browser";
import { useParams, Link } from "react-router-dom";
import "../styles/DetailPages.css";

// Helper functions for rendering content
const createHTMLHelpers = () => ({
  h1: (text) => (
    <h1
      style={{
        textAlign: "center",
        fontSize: "18px",
        fontFamily: "Times New Roman,Times,serif",
        fontWeight: "bold",
        color: "#9b856d",
      }}
    >
      {text}
    </h1>
  ),
  h2: (id, text) => (
    <h2
      id={id}
      style={{
        textAlign: "justify",
        fontSize: "18px",
        fontFamily: "Times New Roman,Times,serif",
        fontWeight: "bold",
      }}
    >
      {text}
    </h2>
  ),
  h3: (id, text) => (
    <h3
      id={id || ""}
      style={{
        textAlign: "justify",
        fontSize: "18px",
        fontFamily: "Times New Roman,Times,serif",
      }}
    >
      {text}
    </h3>
  ),
  p: (html) => (
    <p
      style={{ textAlign: "justify" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ),
  ul: (items) => (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          style={{
            textAlign: "justify",
            fontSize: "18px",
            fontFamily: "Times New Roman,Times,serif",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  ),
  ol: (items) => (
    <ol>
      {items.map((item, index) => (
        <li
          key={index}
          style={{
            textAlign: "justify",
            fontSize: "18px",
            fontFamily: "Times New Roman,Times,serif",
          }}
        >
          {item}
        </li>
      ))}
    </ol>
  ),
  img: (src, alt, width, height) => (
    <p style={{ textAlign: "center" }}>
      <img
        alt={alt || ""}
        src={src}
        width={width}
        height={height}
        className="lazy"
        data-src={src}
        onError={(e) =>
          (e.target.src = "/thumbs/400x285x1/assets/images/noimage.png.webp")
        }
      />
    </p>
  ),
});

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [wordHtml, setWordHtml] = useState(null);
  const [wordToc, setWordToc] = useState(null);
  const htmlHelpers = createHTMLHelpers();

  useEffect(() => {
    fetchServiceDetail();
  }, [serviceId]);

  // Initialize lazy loading after content is loaded
  useEffect(() => {
    if (!loading && service) {
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
  }, [loading, service]);

  const fetchServiceDetail = async () => {
    try {
      // Load service basic info only
      const servicesResponse = await fetch("/data/services.json");
      const servicesData = await servicesResponse.json();

      // Search through all categories and their submenus for the service (new 2-level structure)
      let foundService = null;
      if (servicesData.categories && Array.isArray(servicesData.categories)) {
        outer: for (const category of servicesData.categories) {
          if (Array.isArray(category.subMenu)) {
            for (const sub of category.subMenu) {
              if (Array.isArray(sub.services)) {
                const svc = sub.services.find((s) => s.id === serviceId);
                if (svc) {
                  foundService = {
                    ...svc,
                    category: category.name,
                    submenu: sub.name,
                    title: svc.title || svc.name,
                  };
                  break outer;
                }
              }
            }
          }
        }
      }

      if (foundService) {
        setService(foundService);
        // Build a minimal detail object from services.json if it has docxPath
        const inlineDetail = foundService.docxPath
          ? {
              title: foundService.title,
              subtitle: foundService.subtitle,
              docxPath: foundService.docxPath,
            }
          : null;
        setServiceDetail(inlineDetail);
        setServicesData(servicesData);
        // Update page title
        document.title = `${
          foundService.title || foundService.name
        } | LaHi Beauty Center`;
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error loading service details:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // Load Word (.docx) content when available
  useEffect(() => {
    const loadDocxAsHtml = async (docxPath) => {
      try {
        setWordHtml(null);
        setWordToc(null);
        const response = await fetch(docxPath);
        if (!response.ok) return;
        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml(
          { arrayBuffer },
          {
            // Ép mammoth inline ảnh trong file Word thành data URL (base64)
            convertImage: mammoth.images.inline((element) =>
              element.read("base64").then((imageBuffer) => ({
                src: `data:${element.contentType};base64,${imageBuffer}`,
              }))
            ),
          }
        );
        // Build TOC from generated HTML and inject IDs
        const container = document.createElement("div");
        container.innerHTML = result.value || "";

        const headings = Array.from(container.querySelectorAll("h1, h2, h3"));

        const generatedToc = [];
        let currentTop = null;
        let idCounter = 0;

        const stripLeadingIndex = (text) => {
          if (!text) return "";
          return (
            text
              // Remove patterns like "1. ", "1.1. ", "(1) " at start
              .replace(/^\s*(?:\d+\.){1,3}\s*/, "")
              .replace(/^\s*\(\d+\)\s*/, "")
              .trim()
          );
        };

        const generateId = (text) => {
          const base = stripLeadingIndex(text)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-\u00C0-\u1EF9]/gi, "")
            .replace(/\s+/g, "-");
          idCounter += 1;
          return base ? `${base}-${idCounter}` : `section-${idCounter}`;
        };

        headings.forEach((el) => {
          const tag = el.tagName.toUpperCase();
          const rawLabel = el.textContent || "";
          const label = stripLeadingIndex(rawLabel);
          if (!el.id) el.id = generateId(label);

          if (tag === "H2") {
            currentTop = { id: el.id, label, children: [] };
            generatedToc.push(currentTop);
          } else if (tag === "H3") {
            const child = { id: el.id, label };
            if (currentTop) {
              currentTop.children.push(child);
            } else {
              // No H2 before, start a top-level implicitly
              generatedToc.push({ id: el.id, label, children: [] });
            }
          }
        });

        setWordHtml(container.innerHTML);
        setWordToc(generatedToc.length ? generatedToc : null);
      } catch (err) {
        console.error("Failed to load .docx content:", err);
      }
    };

    if (serviceDetail && serviceDetail.docxPath) {
      loadDocxAsHtml(serviceDetail.docxPath);
    }
  }, [serviceDetail]);

  // TOC rendering functions
  const createNumberingMap = (tocData) => {
    const map = {};
    if (!Array.isArray(tocData)) return map;

    tocData.forEach((item, idx) => {
      const level1 = `${idx + 1}`;
      if (item.id) map[item.id] = level1;

      if (Array.isArray(item.children)) {
        item.children.forEach((child, cIdx) => {
          const level2 = `${level1}.${cIdx + 1}`;
          if (child.id) map[child.id] = level2;
        });
      }
    });

    return map;
  };

  const createTOCChildrenMap = (tocData) => {
    const map = {};
    if (!Array.isArray(tocData)) return map;

    tocData.forEach((item, idx) => {
      const level1 = `${idx + 1}`;
      if (item && Array.isArray(item.children)) {
        map[item.id] = item.children.map((child, cIdx) => ({
          ...child,
          number: `${level1}.${cIdx + 1}`,
        }));
      }
    });

    return map;
  };

  const renderTOC = (tocData) => {
    if (!tocData || !Array.isArray(tocData)) return null;

    const handleTOCClick = (event, targetId) => {
      event.preventDefault();
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (!el) return;
      const headerOffset = 100; // adjust if your header height differs
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      if (history && history.replaceState) {
        history.replaceState(null, "", `#${targetId}`);
      }
    };

    const renderTOCItems = (items) => (
      <ul className="toc-list">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={`#${item.id}`}
              data-rel={`#${item.id}`}
              onClick={(e) => handleTOCClick(e, item.id)}
            >
              {item.label}
            </a>
            {Array.isArray(item.children) &&
              item.children.length > 0 &&
              renderTOCItems(item.children)}
          </li>
        ))}
      </ul>
    );

    return (
      <div className="meta-toc">
        <div className="box-readmore">{renderTOCItems(tocData)}</div>
      </div>
    );
  };

  // Content rendering functions
  const renderIntro = (detail, fallback) => {
    const title = (
      detail?.title ||
      fallback?.title ||
      fallback?.name ||
      ""
    ).toUpperCase();
    const subtitle = detail?.subtitle || "";
    const intro =
      (detail?.sections || []).find((s) => s.id === "gioi-thieu") || {};

    return (
      <div>
        {htmlHelpers.h1(title)}
        {subtitle && htmlHelpers.h1(subtitle)}
        {intro.content &&
          htmlHelpers.p(
            `<span style="font-size:18px;font-family:Times New Roman,Times,serif;">${intro.content}</span>`
          )}
        {intro.image && htmlHelpers.img(intro.image, title)}
      </div>
    );
  };

  const renderSection = (section, numberingMap, tocChildrenMap) => {
    const blocks = [];

    // Main heading
    if (section.heading) {
      const num = numberingMap[section.id]
        ? numberingMap[section.id] + ". "
        : "";
      blocks.push(htmlHelpers.h2(section.id, `${num}${section.heading}`));
    }

    // Handle subsections
    if (section.subsections && section.subsections.length) {
      section.subsections.forEach((sub, subIndex) => {
        if (sub.heading) {
          const num = numberingMap[sub.id] ? numberingMap[sub.id] + " " : "";
          blocks.push(htmlHelpers.h3(sub.id, `${num}${sub.heading}`));
        }
        if (sub.content) {
          blocks.push(
            htmlHelpers.p(
              `<span style="font-size:18px;font-family:Times New Roman,Times,serif;">${sub.content}</span>`
            )
          );
        }
        if (Array.isArray(sub.bullets) && sub.bullets.length) {
          blocks.push(htmlHelpers.ul(sub.bullets));
        }
        if (Array.isArray(sub.steps) && sub.steps.length) {
          blocks.push(htmlHelpers.ol(sub.steps));
        }
        if (sub.image) {
          blocks.push(htmlHelpers.img(sub.image, sub.heading));
        }
      });
    } else {
      // Handle regular content
      if (section.content) {
        blocks.push(
          htmlHelpers.p(
            `<span style="font-size:18px;font-family:Times New Roman,Times,serif;">${section.content}</span>`
          )
        );
      }

      // Handle TOC children mapping
      const tocChildren = tocChildrenMap[section.id] || [];
      if (tocChildren.length) {
        renderTOCChildren(blocks, tocChildren, section);
      } else {
        if (Array.isArray(section.bullets) && section.bullets.length) {
          blocks.push(htmlHelpers.ul(section.bullets));
        }
        if (Array.isArray(section.steps) && section.steps.length) {
          blocks.push(htmlHelpers.ol(section.steps));
        }
      }

      // Images and galleries
      if (section.image) {
        blocks.push(htmlHelpers.img(section.image, section.heading, 500));
      }
      if (Array.isArray(section.gallery) && section.gallery.length) {
        section.gallery.forEach((src, imgIndex) =>
          blocks.push(htmlHelpers.img(src, ""))
        );
      }
    }

    return blocks.map((block, index) => (
      <React.Fragment key={`${section.id}-${index}`}>{block}</React.Fragment>
    ));
  };

  const renderTOCChildren = (blocks, tocChildren, section) => {
    // Render each TOC child as h3 with its content
    tocChildren.forEach((child, index) => {
      // Add the child heading with numbering
      blocks.push(htmlHelpers.h3(child.id, child.label));

      // Add corresponding content from bullets or steps with indentation
      const content =
        Array.isArray(section.bullets) && section.bullets[index]
          ? section.bullets[index]
          : Array.isArray(section.steps) && section.steps[index]
          ? section.steps[index]
          : null;

      if (content) {
        blocks.push(
          htmlHelpers.p(
            `<span style="font-size:18px;font-family:Times New Roman,Times,serif;margin-left:20px;display:block;">${content}</span>`
          )
        );
      }
    });
  };

  const renderAllSections = (detail, numberingMap, tocChildrenMap) => {
    return (detail?.sections || [])
      .filter((s) => s.id !== "gioi-thieu")
      .map((section, index) => (
        <div key={section.id || index}>
          {renderSection(section, numberingMap, tocChildrenMap)}
        </div>
      ));
  };

  // Render related services
  const renderRelatedServices = (relatedServiceIds, allServicesData) => {
    if (
      !relatedServiceIds ||
      !Array.isArray(relatedServiceIds) ||
      relatedServiceIds.length === 0 ||
      !allServicesData ||
      !allServicesData.categories
    ) {
      return null;
    }

    // Find related services by their IDs across all categories/submenus (2-level)
    const relatedServices = [];
    allServicesData.categories.forEach((category) => {
      if (Array.isArray(category.subMenu)) {
        category.subMenu.forEach((sub) => {
          if (Array.isArray(sub.services)) {
            sub.services.forEach((svc) => {
              if (relatedServiceIds.includes(svc.id)) {
                relatedServices.push({
                  ...svc,
                  category: category.name,
                  title: svc.title || svc.name,
                });
              }
            });
          }
        });
      }
    });

    if (relatedServices.length === 0) {
      return null;
    }

    return (
      <div className="wrap-all">
        <div className="wrap-main">
          <div className="title-main">
            <h2
              style={{
                fontSize: "46px",
              }}
            >
              Dịch vụ liên quan
            </h2>
          </div>

          {/* Services Grid */}
          <div className="container">
            <div className="gridNews">
              {relatedServices.map((service) => (
                <div key={service.id} className="dvnb_item">
                  <Link
                    to={`/service/${service.id}`}
                    className="dvnb_box position-relative d-block"
                  >
                    <div className="dvnb_pic service-pic scale-img hover-glass">
                      <picture>
                        <source
                          srcSet={`/${encodeURIComponent(service.image)}`}
                          media="(min-width: 0px)"
                        />
                        <img
                          className="d-inline-block w-100"
                          data-src={`/${encodeURIComponent(service.image)}`}
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Đang tải chi tiết dịch vụ...</p>
      </div>
    );
  }

  if (notFound || !service) {
    return (
      <div className="text-center py-5">
        <h3 className="text-danger">Không tìm thấy dịch vụ này.</h3>
        <p>
          Vui lòng kiểm tra lại đường dẫn hoặc quay lại{" "}
          <Link to="/services">trang dịch vụ</Link>.
        </p>
      </div>
    );
  }

  // Render content based on data availability
  const renderContent = () => {
    if (!service) return null;

    // Prefer Word-rendered content if provided
    if (serviceDetail && serviceDetail.docxPath && wordHtml) {
      return (
        <div className="service-detail-container">
          {wordToc ? renderTOC(wordToc) : null}
          <div id="toc-content" className="content-main w-clear markdownEditor">
            <div
              className="word-content"
              dangerouslySetInnerHTML={{ __html: wordHtml }}
            />
            <div className="share">
              <b>Chia sẻ:</b>
              <div className="social-plugin w-clear">
                <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                  <a
                    className="a2a_dd"
                    href="https://www.addtoany.com/share"
                  ></a>
                  <a className="a2a_button_facebook"></a>
                  <a className="a2a_button_twitter"></a>
                  <a className="a2a_button_facebook_messenger"></a>
                  <a className="a2a_button_copy_link"></a>
                </div>
                <div
                  className="zalo-share-button"
                  data-href={window.location.href}
                  data-oaid="579745863508352884"
                  data-layout="3"
                  data-color="blue"
                  data-customize="false"
                ></div>
              </div>
            </div>
            {renderRelatedServices(service.relatedServices, servicesData)}
          </div>
        </div>
      );
    }

    // If we have detailed service data, render with TOC
    if (serviceDetail && serviceDetail.toc) {
      const numberingMap = createNumberingMap(serviceDetail.toc);
      const tocChildrenMap = createTOCChildrenMap(serviceDetail.toc);

      return (
        <div className="service-detail-container">
          {renderTOC(serviceDetail.toc)}
          <div id="toc-content" className="content-main w-clear markdownEditor">
            {renderIntro(serviceDetail, service)}
            {renderAllSections(serviceDetail, numberingMap, tocChildrenMap)}
            <div className="share">
              <b>Chia sẻ:</b>
              <div className="social-plugin w-clear">
                <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                  <a
                    className="a2a_dd"
                    href="https://www.addtoany.com/share"
                  ></a>
                  <a className="a2a_button_facebook"></a>
                  <a className="a2a_button_twitter"></a>
                  <a className="a2a_button_facebook_messenger"></a>
                  <a className="a2a_button_copy_link"></a>
                </div>
                <div
                  className="zalo-share-button"
                  data-href={window.location.href}
                  data-oaid="579745863508352884"
                  data-layout="3"
                  data-color="blue"
                  data-customize="false"
                ></div>
              </div>
            </div>
            {renderRelatedServices(service.relatedServices, servicesData)}
          </div>
        </div>
      );
    }

    // Fallback: render basic service info
    return (
      <div className="service-detail-container">
        <div className="service-detail-header">
          <img
            src={`/${encodeURIComponent(service.image)}`}
            alt={service.title}
            className="service-detail-image"
          />
          <h1 className="service-detail-title">{service.title}</h1>
          <p className="service-detail-category">
            Danh mục: {service.category}
          </p>
          <p className="service-detail-price">Giá: {service.price}</p>
          <p className="service-detail-duration">
            Thời lượng: {service.duration}
          </p>
        </div>

        {service.description && (
          <div className="service-detail-section">
            <h3>Mô tả dịch vụ</h3>
            <div dangerouslySetInnerHTML={{ __html: service.description }} />
          </div>
        )}

        {service.benefits && service.benefits.length > 0 && (
          <div className="service-detail-section">
            <h3>Lợi ích</h3>
            <ul>
              {service.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {service.process && service.process.length > 0 && (
          <div className="service-detail-section">
            <h3>Quy trình thực hiện</h3>
            <ol>
              {service.process.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {service.suitable_for && (
          <div className="service-detail-section">
            <h3>Phù hợp với</h3>
            <p>{service.suitable_for}</p>
          </div>
        )}

        {service.not_suitable_for && (
          <div className="service-detail-section">
            <h3>Không phù hợp với</h3>
            <p>{service.not_suitable_for}</p>
          </div>
        )}

        {service.aftercare && (
          <div className="service-detail-section">
            <h3>Chăm sóc sau điều trị</h3>
            <p>{service.aftercare}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
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
                <Link className="text-decoration-none" to="/services">
                  <span>Dịch vụ</span>
                </Link>
              </li>
              <li className="breadcrumb-item active">
                <span>{service?.title}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="wrap-all">
        <div className="wrap-main">
          <div className="title-main">
            <h2>{service?.title || "Chi tiết dịch vụ"}</h2>
          </div>

          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
