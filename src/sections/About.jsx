import { Link } from "react-router-dom";
import { galleryImages } from "../data";
import { cldGallery, cldGallerySrcSet } from "../utils/cloudinary";
import { imageFallback } from "../utils/imageFallback";
import "../styles/home-story.css";

const storyImage = galleryImages[1];

const About = () => {
  return (
    <section id="about" className="home-section story-section" aria-labelledby="story-title">
      <div className="home-container story-layout">
        <figure className="story-figure">
          <div className="story-image-frame">
            <img
              src={cldGallery(storyImage.image, 800)}
              srcSet={cldGallerySrcSet(storyImage.image)}
              sizes="(min-width: 1248px) 540px, (min-width: 900px) 44vw, calc(100vw - 48px)"
              width="800"
              height="600"
              alt={storyImage.alt}
              loading="lazy"
              decoding="async"
              onError={imageFallback}
            />
          </div>
          <figcaption>Tradición italiana. Espíritu local.</figcaption>
        </figure>

        <div className="story-content">
          <p className="home-eyebrow">Nuestra historia</p>
          <h2 id="story-title" className="home-title story-title">
            El buen sabor lleva su tiempo.
          </h2>
          <p className="home-description story-intro">
            PIZZANOVA nació en Chile para volver a lo esencial: masa de
            fermentación lenta, ingredientes frescos y el oficio de hacer pizza.
            Raíces italianas, carácter local.
          </p>

          <dl className="story-values">
            <div className="story-value">
              <dt>Masa</dt>
              <dd>Más de 48 horas de fermentación para una base ligera y bordes con carácter.</dd>
            </div>
            <div className="story-value">
              <dt>Ingredientes</dt>
              <dd>Productos frescos y quesos seleccionados. Cada ingrediente tiene su lugar.</dd>
            </div>
            <div className="story-value">
              <dt>Horno</dt>
              <dd>Alta temperatura para cuidar la textura y concentrar el sabor de cada receta.</dd>
            </div>
          </dl>

          <Link to="/menu" className="home-button home-button-outline story-menu-link">
            Explorar el menú
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
