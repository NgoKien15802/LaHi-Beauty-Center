import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.log("Fetching news from /data/news.json");
      const response = await fetch("/data/news.json");
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched data:", data);
      console.log("News array:", data.news);
      
      setNews(data.news || []);
    } catch (error) {
      console.error("Error loading news:", error);
      // Try alternative path
      try {
        console.log("Trying alternative path: ./data/news.json");
        const altResponse = await fetch("./data/news.json");
        const altData = await altResponse.json();
        console.log("Alternative fetch successful:", altData);
        setNews(altData.news || []);
      } catch (altError) {
        console.error("Alternative fetch also failed:", altError);
      }
    } finally {
      setLoading(false);
    }
  };


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
          <h2>Tin tức</h2>
        </div>

        {/* News Grid */}
        <div className="gridNews">
          {news.length === 0 ? (
            <div className="text-center py-5">
              <h3>Không có tin tức nào.</h3>
            </div>
          ) : (
            news.map((article) => (
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
                        src="/thumbs/400x285x2/assets/images/noimage.png.webp"
                      />
                    </picture>
                  </div>
                  <div className="news_info">
                    <h3 className="news__name text-split">
                      {article.title}
                    </h3>
                    <div className="news__date d-block">
                      <i className="fa-light fa-clock" style={{ marginRight: "5px" }}></i>
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
