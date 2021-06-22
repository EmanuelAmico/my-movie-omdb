import React from "react";
import '../assets/styles/components/Carousel.scss'

const Carousel = ({ children, title }) => {
  return (
    <section className="carousel">
      <h3 className="carousel__title">{title}</h3>
      <div className="carousel__container">{children}</div>
    </section>
  );
};

export default Carousel;
