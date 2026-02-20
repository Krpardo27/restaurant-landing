import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { galleryImages } from "../data";

import "../styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cld, cldSrcSet, cldThumb, cldThumbSrcSet } from "../utils/cloudinary";


const PHONE = "56912345678";

const GallerySlider = () => {
  return (
    <section id="gallery" className="lg:py-24 py-14 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* TEXTO */}
        <div className="space-y-6 max-w-xl">
          <h2 className="font-serif text-4xl">
            Una experiencia que entra por los ojos 🍕
          </h2>

          <p className="text-zinc-400">
            Pizzas artesanales horneadas a alta temperatura, ingredientes
            frescos y recetas italianas auténticas.
          </p>

          <a
            href={`https://wa.me/${PHONE}?text=Hola,%20quiero%20hacer%20una%20reserva`}
            target="_blank"
            className="inline-block bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full shadow-lg"
          >
            📲 Reservar mesa
          </a>
        </div>

        {/* SLIDER SOLO DESKTOP */}
        <div className="hidden lg:block">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            className="hero-swiper rounded-3xl overflow-hidden"
          >
            {galleryImages.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={cld(item.image, 1200)}
                  srcSet={cldSrcSet(item.image)}
                  sizes="(max-width:1024px) 95vw, 50vw"
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[420px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* GRID MOBILE */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {galleryImages.slice(0, 4).map((img) => (
            <img
              key={img.id}
              src={cldThumb(img.image, 240)}
              srcSet={cldThumbSrcSet(img.image)}
              sizes="50vw"
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="rounded-xl object-cover h-36 w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;
