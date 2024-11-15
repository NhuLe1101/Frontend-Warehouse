import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination } from "swiper";
import "swiper/css/pagination";
const Feedback = () => {
  const clients = [
    {
      review:
        "Tôi thật sự rất hài lòng với dịch vụ của công ty. Họ đã giúp tôi giải quyết vấn đề quản lý kho hàng một cách hiệu quả nhất. - Anh A từ công ty B.",
    },
    {
      review:
        "Dịch vụ tốt, giá cả hợp lý. Tôi sẽ giới thiệu cho bạn bè và người thân của mình. Anh B từ công ty C.",
    },
    {
      review:
        "Tôi đã sử dụng dịch vụ của công ty trong một thời gian dài và tôi rất hài lòng với chất lượng dịch vụ của họ. Anh C từ công ty D.",
    },
    {
      review:
        "Nếu bạn đang tìm kiếm một giải pháp quản lý kho hàng thông minh, hiệu quả và tiết kiệm chi phí, hãy đến với S.Warehouse. Anh D từ công ty E.",
    },
  ];
  return (
    <section className="home_feedback" id="feedback">
      <h2 className="home_feedback_title">ĐÁNH GIÁ CỦA KHÁCH HÀNG</h2>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {clients.map((client, index) => {
          return (
            <SwiperSlide key={index} className="home_feedback_slide">
              <div className="home_feedback_slide_testimonial">
                <img src="images/Results (2).png" alt="" />
                <span>{client.review}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Feedback;
