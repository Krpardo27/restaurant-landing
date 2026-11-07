import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribeReducedMotion = (onChange) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useCarouselEnvironment = (sectionRef) => {
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    const updateEditing = () => setEditing(Boolean(document.activeElement?.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]',
    )));
    updateEditing();
    document.addEventListener("visibilitychange", updateVisibility);
    document.addEventListener("focusin", updateEditing);
    document.addEventListener("focusout", updateEditing);
    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.15), { threshold: [0, 0.15] })
      : null;
    if (observer && sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("focusin", updateEditing);
      document.removeEventListener("focusout", updateEditing);
    };
  }, [sectionRef]);

  return { visible, pageVisible, editing };
};

export const useExperienceCarousel = (slideCount) => {
  const sectionRef = useRef(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );
  const [swiper, setSwiper] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { visible, pageVisible, editing } = useCarouselEnvironment(sectionRef);
  const autoplayEnabled = !reducedMotion && playing && visible && pageVisible && slideCount > 1;
  const isPlaying = !reducedMotion && playing;
  const playbackLabel = isPlaying ? "Pausar carrusel" : "Reanudar carrusel";

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;

    if (autoplayEnabled) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
    swiper.wrapperEl.setAttribute("aria-live", autoplayEnabled ? "off" : "polite");

    return () => {
      if (!swiper.destroyed) swiper.autoplay.stop();
    };
  }, [swiper, autoplayEnabled]);

  const onFocusCapture = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPlaying(false);
  };

  return {
    sectionRef,
    reducedMotion,
    activeIndex,
    autoplayEnabled,
    isPlaying,
    playbackLabel,
    playbackTitle: reducedMotion
      ? "Reproducción automática desactivada por tu preferencia de movimiento reducido"
      : playbackLabel,
    keyboard: { enabled: visible && pageVisible && !editing, onlyInViewport: true, pageUpDown: false },
    onSwiper: setSwiper,
    onSlideChange: (instance) => setActiveIndex(instance.realIndex),
    onFocusCapture,
    togglePlayback: () => setPlaying((current) => !current),
    slidePrev: () => swiper?.slidePrev(),
    slideNext: () => swiper?.slideNext(),
  };
};