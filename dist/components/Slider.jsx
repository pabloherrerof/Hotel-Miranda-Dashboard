var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
const FotoSlider = styled(Slider) `
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
`;
export const MySlider = ({ data }) => {
    const SlickButtonFix = (_a) => {
        var { currentSlide, slideCount, children } = _a, props = __rest(_a, ["currentSlide", "slideCount", "children"]);
        return (<span {...props}>{children}</span>);
    };
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
    return (<FotoSlider {...settings}>
      {data.map((image, i) => {
            return (<div key={i}>
              <img src={image} alt=""/>
            </div>);
        })}
    </FotoSlider>);
};
