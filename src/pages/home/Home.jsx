import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import "./home.scss";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID_1 = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_1;
    const templateID_2 = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_2;
    const userID = process.env.REACT_APP_EMAILJS_USER_ID;

    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      to_email: "thieuviethoang7b@gmail.com",
    };
    emailjs.send(serviceID, templateID_2, templateParams, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        Swal.fire({
          icon: "success",
          text: "Email liên hệ của bạn đã được tiếp nhận, chúng tôi sẽ phản hồi trong vòng 24 - 48h. Hãy kiểm tra hộp thư của bạn!",
        }).then(() => {
          window.location.reload();
        });
      },
      (err) => {
        console.log("FAILED...", err);
        Swal.fire({
          icon: "error",
          text: "Đã xảy ra lỗi, vui lòng thử lại sau.",
        });
      }
    );

    // Send confirmation email to the user
    const userTemplateParams = {
      name: formData.name,
      to_email: formData.email,
      message:
        "Email liên hệ của bạn đã được tiếp nhận, chúng tôi sẽ phản hồi trong vòng 24 - 48h",
    };
    emailjs.send(serviceID, templateID_1, userTemplateParams, userID).then(
      (response) => {
        console.log(
          "User confirmation email sent!",
          response.status,
          response.text
        );
      },
      (err) => {
        console.log("Failed to send user confirmation email...", err);
      }
    );
  };
  return (
    <div className="home">
      <main>
        <section id="home">
          <h2>DỊCH VỤ CHO THUÊ KHO HÀNG CHẤT LƯỢNG - UY TÍN - SỐ 1 VIỆT NAM</h2>
          <div className="home_content">
            <div>
              <h2>SỰ LỰA CHỌN CỦA HƠN 200+ DOANH NGHIỆP VỪA VÀ NHỎ</h2>
            </div>
            <div>
              <img src="/images/Capture.PNG" alt="" width={"400"} />
            </div>
          </div>
        </section>
        <section id="services">
          <h2>CHẤT LƯỢNG ĐẶT LÊN HÀNG ĐẦU</h2>
          <div className="home_content">
            <div>
              <img
                src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/465782789_1008053704668312_518326042432083353_n.jpg?stp=dst-jpg_tt6&_nc_cat=110&cb=99be929b-6bbdfb60&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH2VZ_fwrSfseeKJlRlAo-yZ8sShNtROrpnyxKE21E6uqxRZI0zq-SO_73NLx0qXP6rdqpANW_k55II23JwJIsi&_nc_ohc=p3Ia4UyqixoQ7kNvgGPp_hY&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=A507CUXzcG9NAAWviUwS62y&oh=00_AYDmE6B8lwFUxVbhNsEC8SB_cmUcQXL3NDtJW9hMjhTsEQ&oe=672FCB10"
                alt=""
                width={"400"}
              />
            </div>
            <div>
              <h2>KHO HÀNG CHẤT LƯỢNG VÀ ĐẦY ĐỦ TIỆN NGHI</h2>
            </div>
          </div>
        </section>
        <section id="contact">
          <h2>LIÊN HỆ VỚI CHÚNG TÔI NGAY</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Số điện thoại:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">Tin nhắn:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Gửi</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Home;
