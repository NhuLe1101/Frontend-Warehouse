import React, { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import Button from "@mui/material/Button";
const ContactForm = () => {
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
          window.scrollTo(0, 0);
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
    <section className="home_contact" id="contact">
      <div className="home_contact_left">
        <h2>LIÊN HỆ VỚI CHÚNG TÔI NGAY</h2>
      </div>
      <div className="home_contact_right">
        <form onSubmit={handleSubmit} className="home_contact_right_form">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Họ và tên"
          />
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Số điện thoại"
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Nội dung liên hệ"
          ></textarea>
          <Button type="submit" variant="contained">
            Gửi
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
