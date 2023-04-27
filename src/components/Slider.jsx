import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const MySlider = () => {
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );

  const settings = {
    prevArrow: <SlickButtonFix></SlickButtonFix>,
    nextArrow: <SlickButtonFix> </SlickButtonFix>,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>hola</div>
      <div>
        <h3>Slide 2</h3>
      </div>
      <div>
        <h3>Slide 3</h3>
      </div>
      <div>
        <h3>Slide 4</h3>
      </div>
      <div>
        <h3>Slide 5</h3>
      </div>
    </Slider>
  );
};
