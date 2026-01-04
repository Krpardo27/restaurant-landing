import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { heroSlides } from "../data.js";

// Import Swiper styles
import "../styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {

  return (
    <section id="home" className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        className="hero-swiper w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="
            relative
            w-full
            min-h-[100svh] lg:min-h-[800px]
            bg-cover bg-center
            flex items-center justify-center
          "
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Content */}
              <div className="relative z-10 text-center px-6 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-neutral-200">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
