import React from "react";

const ServiceInfo = () => {
  return (
    <section className="home_services" id="service-info">
      <div className="home_services_title">
        <h2>NHỮNG CON SỐ ẤN TƯỢNG MÀ CHÚNG TÔI ĐẠT ĐƯỢC</h2>
      </div>
      <div className="home_services_experience">
        <div className="home_services_experience_achievement">
          <div className="home_services_experience_achievement_circle">
            100%
          </div>
          <span>Khách hàng hài lòng</span>
        </div>
        <div className="home_services_experience_achievement">
          <div className="home_services_experience_achievement_circle">
            10 năm
          </div>
          <span>Kinh nghiệm</span>
        </div>
        <div className="home_services_experience_achievement">
          <div className="home_services_experience_achievement_circle">
            +20000 m2
          </div>
          <span>Diện tích kho</span>
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
