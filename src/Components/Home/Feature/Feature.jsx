import React from "react";
import { motion } from "framer-motion";
const transition = { duration: 1, ease: "easeInOut" };
const Feature = () => {
  return (
    <section className="home_feature">
      <h2 className="home_feature_title">
        CHÚNG TÔI SỞ HŨU HỆ THỐNG QUẢN LÝ KHO HÀNG HIỆN ĐẠI BẬC NHẤT VIỆT NAM
      </h2>
      <div className="home_feature_1">
        <div className="home_feature_1_left">
          <h3>GIAO DIỆN QUẢN LÝ KHO HÀNG 3D</h3>
          <p>
            Giao diện thông minh và trực quan giúp quản lý kho hàng một cách
            hiệu quả, tiết kiệm chi phí và thời gian.
          </p>
        </div>
        <div className="home_feature_1_right">
          {/* <img src="images/4_copy.png" alt="" /> */}
          <motion.img
            initial={{ x: "40%" }}
            whileInView={{ x: "0%" }}
            transition={transition}
            src="images/4_copy.png"
            alt=""
          />
        </div>
      </div>
      <div className="home_feature_2">
        <div className="home_feature_2_left">
          {/* <img src="images/3_copy.png" alt="" /> */}
          <motion.img
            initial={{ x: "-40%" }}
            whileInView={{ x: "0%" }}
            transition={transition}
            src="images/3_copy.png"
            alt=""
          />
        </div>
        <div className="home_feature_2_right">
          <h3>GIAO DIỆN QUẢN LÝ SẢN PHẨM CHI TIẾT - ĐẦY ĐỦ CHỨC NĂNG</h3>
          <p>
            Giao diên quản lý sản phẩm chi tiết giúp quản lý sản phẩm một cách
            thuận tiện và nhanh chóng. Có thể xem thông tin chi tiết của sản
            phẩm, sửa sản phẩm một cách dễ dàng.
          </p>
        </div>
      </div>
      <div className="home_feature_3">
        <div className="home_feature_3_left">
          <h3>GIAO DIỆN THỐNG KÊ TRỰC QUAN VÀ SINH ĐỘNG</h3>
          <p>
            Giao diện thống kê trực quan và sinh động giúp nắm bắt tình hình kho
            hàng một cách nhanh chóng và chính xác.
          </p>
        </div>
        <div className="home_feature_3_right">
          {/* <img src="images/2_copy.png" alt="" /> */}
          <motion.img
            initial={{ x: "40%" }}
            whileInView={{ x: "0%" }}
            transition={transition}
            src="images/2_copy.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Feature;
