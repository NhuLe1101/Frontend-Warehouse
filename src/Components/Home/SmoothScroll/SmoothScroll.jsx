import React, { useEffect, useRef } from "react";
import "./SmoothScroll.css";
import useWindowSize from "./useWindowSize";

const SmoothScroll = ({ children }) => {
  const windowSize = useWindowSize();
  const scrollingContainerRef = useRef();
  const contactRef = useRef(null);

  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  //   useEffect(() => {
  //     setBodyHeight();
  //   }, ["360vh"]);

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/") {
      setBodyHeight();
      requestAnimationFrame(() => smoothScrollingHandler());
    }

    return () => {
      document.body.style.height = "auto"; // Xóa style khi component unmount
    };
  }, [windowSize.height]);

  const setBodyHeight = () => {
    document.body.style.height = "auto";
  };

  const smoothScrollingHandler = () => {
    if (window.location.href !== "http://localhost:3000/") return;

    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;

    requestAnimationFrame(() => smoothScrollingHandler());
  };

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/") {
      requestAnimationFrame(() => smoothScrollingHandler());
    }
  }, []);

  return (
    <div className="parent">
      <div ref={scrollingContainerRef} className="scrolling-container">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
