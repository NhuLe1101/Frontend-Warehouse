const Map = () => {
  return (
    <section className="home_map" id="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3097.9680764145587!2d106.67968337377468!3d10.759922359500482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e1!3m2!1svi!2s!4v1731526983401!5m2!1svi!2s"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="home_map_iframe"
      ></iframe>
    </section>
  );
};

export default Map;
