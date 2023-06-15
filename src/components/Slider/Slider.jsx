import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";


const FotoSlider = styled(Slider)`
 .slick-slide {
  position: relative;
  width: 100%;
  height: 80vh;
}

.slick-slide img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}



`
export const MySlider = (props) => {
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
    <FotoSlider {...settings}>
      {props.data.map((image, i) => {
        return (
          
          
            <div key={i}>
              <img src={image} alt="" />
            </div>
           
         
        )
      })}
    </FotoSlider>
  );
};
