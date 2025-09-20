import React from 'react';

const Products = () => {
  return (
    <div className="wrap-all">
      <div className="wrap-main">
        <div className="title-main">
          <h2>Sản phẩm chăm sóc da</h2>
        </div>
        <div className="content-main w-clear markdownEditor">
          <div style={{textAlign: 'center', padding: '50px'}}>
            <h3>Sản phẩm đang được cập nhật</h3>
            <p>Chúng tôi đang chuẩn bị danh mục sản phẩm chăm sóc da chất lượng cao.</p>
            <p>Vui lòng quay lại sau hoặc liên hệ hotline <strong>096 165 88 66</strong> để được tư vấn.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
