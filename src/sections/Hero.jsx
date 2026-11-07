import { Link } from "react-router-dom";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { cldHero, cldHeroSrcSet } from "../utils/cloudinary";
import { imageFallback } from "../utils/imageFallback";

const heroImage = "pizzas/hero-1_wpoo1v";

const Hero = () => (
  <section id="home" className="home-hero" aria-labelledby="home-title">
    <div className="home-container home-hero-grid">
      <div className="home-hero-copy">
        <p className="home-eyebrow"><span className="home-accent-dot" aria-hidden="true" /> Pizzería artesanal · Sabores de Italia</p>
        <h1 id="home-title">La buena pizza<br />no tiene <em>prisa.</em></h1>
        <p className="home-hero-intro">Masa de fermentación lenta, ingredientes de verdad y una mesa que siempre invita a quedarse. Así se disfruta en Nova.</p>
        <div className="home-hero-actions">
          <Link to="/menu" className="home-button home-button-primary">Explorar la carta <FiArrowUpRight aria-hidden="true" /></Link>
          <Link to="/#pizzas" className="home-button home-button-outline">Nuestras pizzas <FiArrowDown aria-hidden="true" /></Link>
        </div>
        <div className="home-hero-signature"><span className="home-italian-mark" aria-hidden="true"><i /><i /><i /></span><span>Alma italiana. Hecho aquí.</span></div>
      </div>
      <figure className="home-hero-visual">
        <div className="home-hero-photo">
          <img
            src={cldHero(heroImage, 1280)}
            srcSet={cldHeroSrcSet(heroImage)}
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1248px) 48vw, 560px"
            width={1000}
            height={1200}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={imageFallback}
            alt="Pizza artesanal recién horneada, lista para compartir"
          />
          <div className="home-hero-photo-shade" aria-hidden="true" />
          <figcaption><span>Fatto con amore</span><p>Hecho a mano.<br />Disfrutado en buena compañía.</p></figcaption>
        </div>
        <div className="home-fermentation-seal"><strong>48<span>h</span></strong><span>FERMENTACIÓN<br />LENTA</span></div>
        <span className="home-hero-side-note" aria-hidden="true">LA DOLCE VITA EMPIEZA EN LA MESA</span>
      </figure>
    </div>
    <div className="home-container home-craft-strip" aria-label="Nuestra forma de hacer pizza">
      <div><span>01</span><p>Masa con tiempo<small>Fermentación lenta y carácter propio.</small></p></div>
      <div><span>02</span><p>Ingredientes reales<small>La sencillez también sabe bien.</small></p></div>
      <div><span>03</span><p>Mejor si se comparte<small>El ingrediente que nunca falta.</small></p></div>
    </div>
  </section>
);

export default Hero;
