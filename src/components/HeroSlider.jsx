import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "../styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { heroSlides } from "../data";
import { cldHero, cldHeroSrcSet } from "../utils/cloudinary";

const HeroSlider = () => {
  const slides = heroSlides.slice(1); // excluye hero principal

  if (!slides.length) return null;

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500 }}
        loop
        className="w-full hero-swiper overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[420px] overflow-hidden">
              <img
                src={cldHero(slide.image, 1200)}
                srcSet={cldHeroSrcSet(slide.image)}
                sizes="100vw"
                loading="lazy"
                decoding="async"
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 text-center px-6 max-w-2xl mx-auto top-1/2 -translate-y-1/2">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-neutral-200">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
