import React from 'react';

const Feedback = () => {
  return (
    <div className="wrap-all">
      <div className="wrap-main">
        <div className="title-main">
          <h2>Phản hồi từ khách hàng</h2>
        </div>
        <div className="content-main w-clear markdownEditor">
          <div style={{textAlign: 'center', padding: '50px'}}>
            <h3>Đang cập nhật phản hồi</h3>
            <p>Chúng tôi đang thu thập và cập nhật các phản hồi từ khách hàng.</p>
            <p>Nếu bạn đã sử dụng dịch vụ của chúng tôi, vui lòng gửi phản hồi qua hotline <strong>096 165 88 66</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
