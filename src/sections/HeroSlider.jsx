import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { heroSlides } from "../data.js";

import "../styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cld, cldSrcSetHero } from "../utils/cloudinary.js";

const HeroSlider = () => {
  return (
    <section id="home" className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        className="hero-swiper w-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full min-h-[100svh] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
              <img
                src={cld(slide.image, 1600)}
                srcSet={cldSrcSetHero(slide.image)}
                sizes="100vw"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="absolute inset-0 w-full h-full object-cover"
                alt={slide.title}
              />

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
