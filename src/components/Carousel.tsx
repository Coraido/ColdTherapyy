import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import './Carousel.css';

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
        <div className="slide-container">
          <img src="https://media.istockphoto.com/id/683468832/photo/ice-cream-scoops-in-white-cups-of-chocolate-strawberry-vanilla-and-green-tea-flavours-isolated.jpg?s=612x612&w=0&k=20&c=VulWuv4JmJx7MkuIvaG2H0A7rtSqSLl81inLSaFHFYk=" alt="Special Treats" />
          <div className="slide-text">
            <h2>Special Treats</h2>
            <p>Indulge in our premium ice cream selection</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-container">
          <img src="https://media.istockphoto.com/id/2186795819/photo/ice-cream.jpg?s=612x612&w=0&k=20&c=e_e5CKONGmvo2CqvMZVj0Ac7_80zqCMCqBCJf0ulWKY=" alt="New Flavors" />
          <div className="slide-text">
            <h2>New Flavors</h2>
            <p>Discover our latest delicious creations</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-container">
          <img src="https://media.istockphoto.com/id/844795842/photo/happy-father-and-son-at-the-ice-cream-shop.jpg?s=612x612&w=0&k=20&c=8RM93FWzlz29rQMzYD0YAvG2MTBsmxcrA0EcfLIs_50=" alt="Delectable" />
          <div className="slide-text">
            <h2>Delectable</h2>
            <p>Experience the joy of Cold Therapy</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
