import React, { Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import "./slider.css";

const swiperConfig = {
  modules: [Pagination, Autoplay],
  pagination: {
    clickable: true,
    type: "bullets",
    bulletElement: "span",
    bulletClass: "pagination-icon",
    bulletActiveClass: "pagination-icon-active",
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  },
  autoplay: {
    disableOnInteraction: false,
  },
};

const Slider = ({ autoplayDelay = 2500, children }) => {
  swiperConfig.autoplay.delay = autoplayDelay;
  return (
    <Swiper {...swiperConfig}>
      {Children.toArray(children).map((child) => (
        <SwiperSlide key={child.key}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
