import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { galleryImages } from "../data";

import "../styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GallerySlider = () => {
  return (
    <section id="gallery" className="lg:py-24 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div
          className="
          grid grid-cols-1
          lg:grid-cols-2
          gap-16
          items-center
        "
        >
          {/* Texto */}
          <div className="max-w-xl space-y-6">
            <h2
              className="
              font-serif
            text-3xl md:text-5xl
            mb-4
            "
            >
              Una experiencia que entra por los ojos
            </h2>

            <p className="text-muted text-lg leading-relaxed">
              Cada pizza es elaborada a mano, horneada a alta temperatura y
              servida con ingredientes frescos. Nuestra cocina es abierta,
              honesta y pensada para disfrutar sin prisa.
            </p>

            <p className="text-muted">
              Desde la masa hasta el último ingrediente, cuidamos cada detalle
              para ofrecer una experiencia auténtica.
            </p>

            <button
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                text-accent
                hover:underline
                transition
              "
            >
              Ver nuestro menú →
            </button>
          </div>

          {/* Slider */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              loop
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="gallery-swiper rounded-3xl overflow-hidden shadow-soft"
            >
              {galleryImages.map((item) => (
                <SwiperSlide key={item.id}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="
                      w-full
                      h-[320px] md:h-[420px]
                      object-cover
                    "
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;
