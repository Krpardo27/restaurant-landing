import { Outlet, useMatch } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopSmooth from "../components/ScrollToTopSmooth";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/landing.css";

const MainLayout = () => {
  const isPizzaDetail = Boolean(useMatch("/pizza/:slug"));

  const waLink = `https://wa.me/56990914436?text=${encodeURIComponent("Hola, quiero hacer un pedido")}`;

  return (
    <div className="landing-shell">
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <ScrollToTopSmooth />

      <Header simple={isPizzaDetail} />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hacer un pedido por WhatsApp (abre otra pestaña)"
        className="home-floating-order"
      >
        <FaWhatsapp aria-hidden="true" /> <span>Pedir</span>
      </a>
    </div>
  );
};

export default MainLayout;
