import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { pizzas } from "../data";
import { cldCard, cldCardSrcSet } from "../utils/cloudinary";
import { imageFallback } from "../utils/imageFallback";

const PHONE = "56912345678";

const Pizzas = () => (
  <section id="pizzas" className="home-pizzas home-section" aria-labelledby="home-pizzas-title">
    <div className="home-container">
      <header className="home-pizzas-heading">
        <div>
          <p className="home-eyebrow">Un clásico, a nuestra manera</p>
          <h2 id="home-pizzas-title" className="home-title">La primera porción<br />siempre enamora.</h2>
        </div>
        <div className="home-pizzas-heading-copy">
          <p>De la Margherita a tu próxima favorita. Masa artesanal y combinaciones que hablan por sí solas.</p>
          <Link to="/menu?category=pizzas" className="home-inline-link">Ver la carta completa <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </header>
      <div className="home-pizza-grid">
        {pizzas.map((pizza) => {
          const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(`Hola, quiero la pizza ${pizza.name}`)}`;
          return (
            <article key={pizza.id} className="home-pizza-card">
              <Link to={`/pizza/${pizza.slug}`} className="home-pizza-photo" aria-label={`Ver pizza ${pizza.name}`}>
                <img
                  src={cldCard(pizza.image, 480)}
                  srcSet={cldCardSrcSet(pizza.image)}
                  sizes="(max-width: 479px) calc(100vw - 40px), (max-width: 1023px) 45vw, (max-width: 1248px) 22vw, 280px"
                  width={480}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  onError={imageFallback}
                  alt={`Pizza ${pizza.name}`}
                />
                {(pizza.popular || pizza.vegan || pizza.spicy) && <span className="home-pizza-badge">{pizza.vegan ? "Vegana" : pizza.spicy ? "Un toque picante" : "Popular"}</span>}
                <span className="home-pizza-photo-arrow" aria-hidden="true"><FiArrowUpRight /></span>
              </Link>
              <div className="home-pizza-copy">
                <h3><Link to={`/pizza/${pizza.slug}`}>{pizza.name}</Link></h3>
                <p>{pizza.description}</p>
                <div className="home-pizza-card-bottom">
                  <span className="home-pizza-price">{pizza.price}</span>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="home-pizza-order" aria-label={`Pedir pizza ${pizza.name} por WhatsApp`}><FaWhatsapp aria-hidden="true" /> Pedir</a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="home-pizzas-note"><span>¿Hoy te apetece algo más?</span><Link to="/menu" className="home-inline-link">Pastas, antipasti y mucho más <FiArrowUpRight aria-hidden="true" /></Link></div>
    </div>
  </section>
);

export default Pizzas;
