import { Link } from "react-router-dom";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import "../styles/home-experience.css";

const whatsappUrl = `https://wa.me/56912345678?text=${encodeURIComponent("Hola, me gustaría reservar una mesa en PizzaNova.")}`;

const Footer = () => {
  return (
    <footer className="nova-footer">
      <div className="nova-footer-container home-container">
        <div className="nova-footer-cta">
          <div>
            <p className="nova-footer-eyebrow home-eyebrow">Nos vemos en la mesa</p>
            <h2 className="nova-footer-title home-title">Hay un lugar para ti.</h2>
          </div>
          <div className="nova-footer-cta-actions">
            <a className="nova-footer-reserve home-button home-button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden="true" /> Reservar una mesa
            </a>
            <Link className="nova-footer-menu home-inline-link" to="/menu">
              Ver la carta <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="nova-footer-grid">
          <div className="nova-footer-brand">
            <Link to="/#home" className="nova-footer-logo" aria-label="PizzaNova, inicio">
              Pizza<span>Nova</span><span className="nova-footer-brand-dot">.</span>
            </Link>
            <p className="nova-footer-description home-description">
              Pizzas artesanales elaboradas con ingredientes frescos, masa de
              fermentación lenta y recetas inspiradas en la tradición italiana.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h3 className="nova-footer-heading">Descubre Nova</h3>
            <ul className="nova-footer-list">
              <li><Link to="/#home">Inicio</Link></li>
              <li><Link to="/#pizzas">Pizzas</Link></li>
              <li><Link to="/#about">Nosotros</Link></li>
              <li><Link to="/#gallery">Galería</Link></li>
            </ul>
          </nav>

          <div>
            <h3 className="nova-footer-heading">Horarios</h3>
            <dl className="nova-footer-hours">
              <div><dt>Lunes a Viernes</dt><dd>12:00 – 22:30</dd></div>
              <div><dt>Sábados</dt><dd>13:00 – 23:30</dd></div>
              <div><dt>Domingos</dt><dd>13:00 – 21:30</dd></div>
            </dl>
          </div>

          <div id="contact" className="nova-footer-contact">
            <h3 className="nova-footer-heading">Contacto</h3>
            <address className="nova-footer-address">
              <span>Av. Italia 1234, Santiago</span>
              <a href="tel:+56912345678">+56 9 1234 5678</a>
              <a href="mailto:contacto@pizzanova.cl">contacto@pizzanova.cl</a>
            </address>
            <a className="nova-footer-whatsapp home-inline-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden="true" /> WhatsApp <FaArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="nova-footer-bottom">
          <p>
            © {new Date().getFullYear()} PizzaNova. Todos los derechos
            reservados.
          </p>

          <p>Diseñado & desarrollado por Kevin Pardo para mi Portafolios</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
