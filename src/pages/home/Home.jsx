import React, { useState, useEffect } from "react";
import "./home.css";
import Loader from "../../Components/Loader/Loader";
import Intro from "../../Components/Home/Intro/Intro";
import ServiceInfo from "../../Components/Home/ServiceInfor/ServiceInfo";
import Feature from "../../Components/Home/Feature/Feature";
import Feedback from "../../Components/Home/Feedback/Feedback";
import ContactForm from "../../Components/Home/ContactForm/ContactForm";
import Map from "../../Components/Home/Map/Map";
import SmoothScroll from "../../Components/Home/SmoothScroll/SmoothScroll";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    const handleLoad = () => {
      setLoading(false);
      clearTimeout(timer);
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SmoothScroll>
      <div className="home">
        <Intro />
        <ServiceInfo />
        <Feature />
        <Feedback />
        <ContactForm />
        <Map />
      </div>
    </SmoothScroll>
  );
};

export default Home;
