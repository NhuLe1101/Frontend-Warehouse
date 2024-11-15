import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
const transition = { duration: 1, ease: "easeInOut" };

const Intro = () => {
  const handleContactClick = () => {
    window.scrollTo({
      top: window.innerHeight * 2.5,
      behavior: "smooth",
    });
  };
  return (
    <section className="home_intro" id="intro">
      <div className="home_intro_left">
        <h2>CHÀO MỪNG BẠN ĐẾN VỚI CHÚNG TÔI</h2>
        <p>
          Nếu bạn đang tìm kiếm một giải pháp quản lý kho hàng thông minh, hiệu
          quả và tiết kiệm chi phí, hãy đến với chúng tôi. Chúng tôi cung cấp
          các giải pháp quản lý kho hàng thông minh hàng đầu tại Việt Nam.
        </p>
        <br />
        <p>Số điện thoại: +84 123 456 78</p>
        <p>whs@gmail.com</p>
        <div className="home_intro_left_button">
          <Button variant="outlined" onClick={handleContactClick}>
            Liên hệ ngay
          </Button>
        </div>
      </div>
      <div className="home_intro_right">
        {/* <img src="images/Results (2).png" alt="" /> */}
        <motion.img
          initial={{ x: "40%" }}
          whileInView={{ x: "0%" }}
          transition={transition}
          src="images/Results (2).png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Intro;
