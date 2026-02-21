import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { heroSlides } from "../data.js";
import "../styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cldHero, cldHeroSrcSet } from "../utils/cloudinary.js";

const HeroSlider = () => {
  const first = heroSlides[0];
  const rest = heroSlides.slice(1);

  return (
    <section id="home" className="relative w-full">
      <div className="relative w-full min-h-[100svh] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
        <img
          src={cldHero(first.image, 1600)}
          srcSet={cldHeroSrcSet(first.image)}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt={first.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {first.title}
          </h1>
          <p className="text-lg md:text-2xl text-neutral-200">
            {first.subtitle}
          </p>
        </div>
      </div>
      {/* SWIPER SOLO PARA LOS OTROS SLIDES */}
      {rest.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          className="hero-swiper w-full"
        >
          {rest.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full min-h-[100svh] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
                <img
                  src={cldHero(slide.image, 1600)}
                  srcSet={cldHeroSrcSet(slide.image)}
                  sizes="100vw"
                  loading="lazy"
                  decoding="async"
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />

                <div className="relative z-10 text-center px-6 max-w-3xl">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-neutral-200">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default HeroSlider;
