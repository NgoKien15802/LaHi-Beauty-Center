import React from 'react';

const News = () => {
  return (
    <div className="wrap-all">
      <div className="wrap-main">
        <div className="title-main">
          <h2>Tin tức & Blog</h2>
        </div>
        <div className="content-main w-clear markdownEditor">
          <div style={{textAlign: 'center', padding: '50px'}}>
            <h3>Tin tức đang được cập nhật</h3>
            <p>Chúng tôi đang chuẩn bị các bài viết về chăm sóc da và xu hướng làm đẹp.</p>
            <p>Theo dõi fanpage <strong>LaHi Beauty Center</strong> để cập nhật tin tức mới nhất.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
