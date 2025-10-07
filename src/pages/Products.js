import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/data/products.json');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Đang tải danh sách sản phẩm...</p>
      </div>
    );
  }

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
              <li className="breadcrumb-item active">
                <span>Sản phẩm</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="wrap-all">
        <div className="wrap-main">
          <div className="title-main">
            <h2>Sản phẩm chăm sóc da</h2>
          </div>

          <div className="container">
            <ProductList
              products={products}
              loading={false}
              pageSize={pageSize}
              scrollToId="products-grid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
