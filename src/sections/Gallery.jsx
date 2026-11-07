import { galleryImages } from "../data";
import { cldGallery, cldGallerySrcSet } from "../utils/cloudinary";
import { imageFallback } from "../utils/imageFallback";
import "../styles/home-story.css";

const PHONE = "56912345678";
const reservationUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent("Hola, quiero hacer una reserva")}`;

const Gallery = () => {
  return (
    <section id="gallery" className="home-section home-gallery-section" aria-labelledby="home-gallery-title">
      <div className="home-container">
        <header className="home-gallery-header">
          <div className="home-gallery-heading">
            <p className="home-eyebrow">A nuestra mesa</p>
            <h2 id="home-gallery-title" className="home-title home-gallery-title">
              Momentos para saborear.
            </h2>
            <p className="home-description home-gallery-description">
              Bordes dorados, ingredientes frescos y una pizza para compartir.
            </p>
          </div>
          <a
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="home-inline-link home-gallery-reservation"
          >
            Reservar mesa
          </a>
        </header>

        <div className="home-gallery-grid">
          {galleryImages.slice(0, 4).map((item) => (
            <figure className="home-gallery-item" key={item.id}>
              <div className="home-gallery-image-frame">
                <img
                  src={cldGallery(item.image, 800)}
                  srcSet={cldGallerySrcSet(item.image)}
                  sizes="(min-width: 1248px) 282px, (min-width: 900px) 23vw, calc((100vw - 64px) / 2)"
                  width="800"
                  height="600"
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  onError={imageFallback}
                />
              </div>
              <figcaption>{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
