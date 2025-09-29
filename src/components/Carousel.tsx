import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Carousel: React.FC = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src="https://placehold.co/600x400?text=Special+Offer" alt="Special Offer" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://placehold.co/600x400?text=New+Flavors" alt="New Flavors" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://placehold.co/600x400?text=Free+Delivery" alt="Free Delivery" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
