import React from "react";

const ServiceInfo = () => {
  return (
    <section className="home_services" id="service-info">
      <div className="home_services_title">
        <h2>NHỮNG CON SỐ ẤN TƯỢNG MÀ CHÚNG TÔI ĐẠT ĐƯỢC TRONG</h2>
        <h2 className="">6 THÁNG QUA</h2>
      </div>
      <div className="home_services_experience">
        <div className="home_services_experience_achievement">
          <div className="home_services_experience_achievement_circle">
            100+
          </div>
          <span>Khách hàng</span>
        </div>
        <div className="home_services_experience_achievement">
          <div className="home_services_experience_achievement_circle">
            8000+
          </div>
          <span>Sản phẩm nhập - xuất kho</span>
        </div>
        <div className="home_services_experience_achievement">
          <div className="home_services_experience_achievement_circle">
            +2000 m2
          </div>
          <span>Diện tích kho</span>
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
