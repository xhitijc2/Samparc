import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle';
const Slider = ({ slides }) => {
  return (
    <Swiper className="swiper"
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      navigation = {true}
      loop ={true}
      autoplay={{ delay: 2000 }}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {slides.map((slide) => (
        <SwiperSlide className="swiper-slide" key={slide.image}>
          <img src={slide.image} alt={slide.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
