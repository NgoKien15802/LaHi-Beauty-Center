import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/DetailPages.css";
import "../styles/News.css";

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

const NewsDetail = () => {
  const { newsSlug } = useParams();
  const [news, setNews] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const htmlHelpers = createHTMLHelpers();

  useEffect(() => {
    fetchNewsDetail();
  }, [newsSlug]);

  // Initialize lazy loading after content is loaded
  useEffect(() => {
    if (!loading && news) {
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
  }, [loading, news]);

  const fetchNewsDetail = async () => {
    try {
      // Load news detail data
      const detailResponse = await fetch(`/data/news-details/${newsSlug}.json`);
      let newsDetailData = null;

      if (detailResponse.ok) {
        newsDetailData = await detailResponse.json();
      }

      // Load news basic info
      const newsResponse = await fetch("/data/news.json");
      const newsData = await newsResponse.json();

      // Find the news article
      let foundNews = null;
      if (newsData.news && Array.isArray(newsData.news)) {
        foundNews = newsData.news.find((article) => article.slug === newsSlug);
      }

      if (foundNews) {
        setNews(foundNews);
        setNewsDetail(newsDetailData);
        setNewsData(newsData);
        // Update page title
        document.title = `${foundNews.title} | LaHi Beauty Center`;
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error loading news details:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

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

    const renderTOCItems = (items) => (
      <ul className="toc-list">
        {items.map((item, index) => (
          <li key={index}>
            <a href={`#${item.id}`} data-rel={`#${item.id}`}>
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
    const title = (detail?.title || fallback?.title || "").toUpperCase();
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

      // Add corresponding content from bullets or steps
      const content =
        Array.isArray(section.bullets) && section.bullets[index]
          ? section.bullets[index]
          : Array.isArray(section.steps) && section.steps[index]
          ? section.steps[index]
          : null;

      if (content) {
        blocks.push(
          htmlHelpers.p(
            `<span style="font-size:18px;font-family:Times New Roman,Times,serif;">${content}</span>`
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

  // Render related news
  const renderRelatedNews = (relatedNewsIds, allNewsData) => {
    if (
      !relatedNewsIds ||
      !Array.isArray(relatedNewsIds) ||
      relatedNewsIds.length === 0 ||
      !allNewsData ||
      !allNewsData.news
    ) {
      return null;
    }

    // Find related news articles by their IDs
    const relatedArticles = relatedNewsIds
      .map((id) => allNewsData.news.find((article) => article.id === id))
      .filter((article) => article); // Remove undefined items

    if (relatedArticles.length === 0) {
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
              Tin tức liên quan
            </h2>
          </div>

          {/* News Grid */}
          <div className="gridNews">
            {relatedArticles.map((article) => (
              <div key={article.id} className="news_item">
                <Link to={`/news/${article.slug}`} className="news_box">
                  <div className="news_pic scale-img hvr-double-box">
                    <picture>
                      <source
                        srcSet={`/${article.image}`}
                        media="(min-width: 0px)"
                      />
                      <img
                        className="d-inline-block lazy w-100"
                        data-src={`/${article.image}`}
                        alt="Her Skinlab"
                        width="400"
                        height="285"
                        src="/thumbs/400x285x2/assets/images/noimage.png.webp"
                      />
                    </picture>
                  </div>
                  <div className="news_info">
                    <h3 className="news__name text-split">{article.title}</h3>
                    <div className="news__date d-block">
                      <i
                        className="fa-light fa-clock"
                        style={{ marginRight: "5px" }}
                      ></i>
                      {article.dateFormatted}
                    </div>
                    <div className="news__desc text-split news__desc-detail">
                      {article.description}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
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
        <p className="mt-3">Đang tải chi tiết tin tức...</p>
      </div>
    );
  }

  if (notFound || !news) {
    return (
      <div className="text-center py-5">
        <h3 className="text-danger">Không tìm thấy tin tức này.</h3>
        <p>
          Vui lòng kiểm tra lại đường dẫn hoặc quay lại{" "}
          <Link to="/news">trang tin tức</Link>.
        </p>
      </div>
    );
  }

  // Render content based on data availability
  const renderContent = () => {
    if (!news) return null;

    // If we have detailed news data, render with TOC
    if (newsDetail && newsDetail.toc) {
      const numberingMap = createNumberingMap(newsDetail.toc);
      const tocChildrenMap = createTOCChildrenMap(newsDetail.toc);

      return (
        <div className="news-detail-container">
          {renderTOC(newsDetail.toc)}
          <div id="toc-content" className="content-main w-clear markdownEditor">
            {renderIntro(newsDetail, news)}
            {renderAllSections(newsDetail, numberingMap, tocChildrenMap)}
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
            {renderRelatedNews(news.relatedNews, newsData)}
          </div>
        </div>
      );
    }

    // Fallback: render basic news info
    return (
      <div className="news-detail-container">
        <div className="news-detail-header">
          <img
            src={`/${news.image}`}
            alt={news.title}
            className="news-detail-image"
          />
          <h1 className="news-detail-title">{news.title}</h1>
          <div className="news-meta">
            <span className="news-date">
              <i className="fa-light fa-clock"></i>
              {news.dateFormatted}
            </span>
            <span className="news-category">{news.category}</span>
            <span className="news-author">Tác giả: {news.author}</span>
          </div>
        </div>

        {news.description && (
          <div className="news-detail-section">
            <div dangerouslySetInnerHTML={{ __html: news.description }} />
          </div>
        )}

        {news.content && (
          <div className="news-detail-section">
            <div
              dangerouslySetInnerHTML={{
                __html: news.content.replace(/\n/g, "<br>"),
              }}
            />
          </div>
        )}

        {news.tags && news.tags.length > 0 && (
          <div className="news-tags">
            <strong>Tags: </strong>
            {news.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                {index < news.tags.length - 1 && ", "}
              </span>
            ))}
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
                <Link className="text-decoration-none" to="/news">
                  <span>Tin tức</span>
                </Link>
              </li>
              <li className="breadcrumb-item active">
                <span>{news?.title}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="wrap-all">
        <div className="wrap-main">
          <div className="title-main">
            <h2>{news?.title || "Chi tiết tin tức"}</h2>
          </div>

          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
