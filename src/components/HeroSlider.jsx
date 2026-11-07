import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaPause, FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";

import "swiper/css";
import "../styles/home-experience.css";

import { heroSlides } from "../data";
import { cldHero, cldHeroSrcSet } from "../utils/cloudinary";
import { imageFallback } from "../utils/imageFallback";
import { useExperienceCarousel } from "../hooks/useExperienceCarousel";

const HeroSlider = () => {
  const slides = heroSlides.slice(1);
  const {
    sectionRef, reducedMotion, activeIndex, autoplayEnabled, isPlaying,
    playbackLabel, playbackTitle, keyboard, onSwiper, onSlideChange,
    onFocusCapture, togglePlayback, slidePrev, slideNext,
  } = useExperienceCarousel(slides.length);

  if (!slides.length) return null;

  return (
    <section
      ref={sectionRef}
      className="experience-section home-section"
      aria-label="La experiencia Nova"
      onFocusCapture={onFocusCapture}
    >
      <div className="experience-container home-container">
      <p className="experience-eyebrow home-eyebrow">La experiencia Nova</p>
      <Swiper
        modules={[Autoplay, A11y, Keyboard]}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        keyboard={keyboard}
        a11y={{
          containerRole: "region",
          containerMessage: "La experiencia Nova",
          containerRoleDescriptionMessage: "Carrusel",
          itemRoleDescriptionMessage: "Diapositiva",
          prevSlideMessage: "Diapositiva anterior",
          nextSlideMessage: "Diapositiva siguiente",
          firstSlideMessage: "Esta es la primera diapositiva",
          lastSlideMessage: "Esta es la última diapositiva",
          paginationBulletMessage: "Ir a la diapositiva {{index}}",
          slideLabelMessage: "{{index}} de {{slidesLength}}",
          scrollOnFocus: false,
        }}
        autoplay={{ enabled: false, delay: 6000, disableOnInteraction: false }}
        speed={reducedMotion ? 0 : 500}
        loop={slides.length > 1}
        className="experience-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="experience-slide">
              <img
                onError={imageFallback}
                src={cldHero(slide.image, 1200)}
                srcSet={cldHeroSrcSet(slide.image)}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1248px) calc(100vw - 64px), 1200px"
                width="1600"
                height="900"
                loading="lazy"
                decoding="async"
                alt={slide.title}
                className="experience-image"
              />

              <div className="experience-shade" aria-hidden="true" />

              <div className="experience-copy">
                <span className="experience-kicker">Hecho con tiempo. Compartido contigo.</span>
                <h2 className="experience-title home-title">
                  {slide.title}
                </h2>
                <p className="experience-description home-description">{slide.subtitle}</p>
                <Link to="/menu" className="experience-menu home-button home-button-outline" tabIndex={activeIndex === index ? 0 : -1}>
                  Explorar la carta <FaArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {slides.length > 1 && (
        <div className="experience-controls">
          <span className="experience-counter" aria-live={autoplayEnabled ? "off" : "polite"} aria-atomic="true">
            <span className="experience-current">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span aria-hidden="true"> / </span>
            <span className="experience-total">{String(slides.length).padStart(2, "0")}</span>
          </span>
          <div className="experience-actions">
        <button
          type="button"
          onClick={togglePlayback}
          disabled={reducedMotion}
          aria-label={playbackLabel}
          title={playbackTitle}
          className="experience-playback"
        >
          {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
          {isPlaying ? "Pausar" : "Reanudar"}
        </button>
            <button type="button" className="experience-arrow" onClick={slidePrev} aria-label="Diapositiva anterior" title="Diapositiva anterior">
              <FaArrowLeft aria-hidden="true" />
            </button>
            <button type="button" className="experience-arrow" onClick={slideNext} aria-label="Diapositiva siguiente" title="Diapositiva siguiente">
              <FaArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default HeroSlider;
