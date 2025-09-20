import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle URL parameters from header menu
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Initialize lazy loading after services are loaded
  useEffect(() => {
    if (!loading && services.length > 0) {
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
  }, [loading, services]);

  const fetchServices = async () => {
    try {
      const response = await fetch("/data/services.json");
      const data = await response.json();

      // Flatten the services from all categories
      const allServices = [];
      if (data.categories && Array.isArray(data.categories)) {
        data.categories.forEach((category) => {
          if (category.services && Array.isArray(category.services)) {
            category.services.forEach((service) => {
              allServices.push({
                ...service,
                category: category.name,
                title: service.name || service.title,
              });
            });
          }
        });
      }

      setServices(allServices);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices =
    selectedCategory === "all"
      ? services || []
      : (services || []).filter(
          (service) => service.category === selectedCategory
        );

  const categories = [
    "all",
    ...new Set((services || []).map((service) => service.category)),
  ];

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
    <div className="wrap-all">
      <div className="wrap-main">
        <div className="title-main">
          <h2>Dịch vụ chăm sóc da chuyên nghiệp</h2>
        </div>

        {/* Services Grid */}
        <div className="gridNews" id="services-grid">
          {filteredServices.length === 0 ? (
            <div className="text-center py-5">
              <h3>Không có dịch vụ nào trong danh mục này.</h3>
            </div>
          ) : (
            filteredServices.map((service) => (
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
                        alt={service.title}
                        onError={(e) =>
                          (e.target.src =
                            "/thumbs/300x345x2/assets/images/noimage.png.webp")
                        }
                      />
                    </picture>
                  </div>
                  <div className="dvnb_bottom"></div>
                  <div className="dvnb_info">
                    <h3 className="dvnb__name text-split">{service.title}</h3>
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

export default Services;
