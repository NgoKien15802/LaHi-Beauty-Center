import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchNews();
  }, []);

  // Initialize lazy loading after news are loaded
  useEffect(() => {
    if (!loading && news.length > 0) {
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

  const fetchNews = async () => {
    try {
      const response = await fetch("/data/news.json");
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews =
    selectedCategory === "all"
      ? news || []
      : (news || []).filter(
          (article) => article.category === selectedCategory
        );

  const categories = [
    "all",
    ...new Set((news || []).map((article) => article.category)),
  ];

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Đang tải danh sách tin tức...</p>
      </div>
    );
  }

  return (
    <div className="wrap-all">
      <div className="wrap-main">
        <div className="title-main">
          <h2>Tin tức & Blog</h2>
        </div>

        {/* Category Filter */}
        <div className="category-filter mb-4">
          <div className="btn-group" role="group">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`btn ${
                  selectedCategory === category ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "Tất cả" : category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="gridNews">
          {filteredNews.length === 0 ? (
            <div className="text-center py-5">
              <h3>Không có tin tức nào trong danh mục này.</h3>
            </div>
          ) : (
            filteredNews.map((article) => (
              <div key={article.id} className="news_item">
                <Link
                  to={`/news/${article.slug}`}
                  className="news_box"
                >
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
                        onError={(e) =>
                          (e.target.src = "/thumbs/400x285x1/assets/images/noimage.png.webp")
                        }
                        src="/thumbs/400x285x2/assets/images/noimage.png.webp"
                      />
                    </picture>
                  </div>
                  <div className="news_info">
                    <h3 className="news__name text-split">
                      {article.title}
                    </h3>
                    <div className="news__date d-block">
                      <i className="fa-light fa-clock"></i>
                      {article.dateFormatted}
                    </div>
                    <div className="news__desc text-split news__desc-detail">
                      {article.description}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
