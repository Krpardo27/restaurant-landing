import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Informacion from "./Informacion";
import Brand from "./Brand";
import HeaderBar from "./HeaderBar";
import { FiArrowLeft, FiMenu } from "react-icons/fi";

const Header = ({ simple = false }) => {
  const location = useLocation();
  const [menuKey, setMenuKey] = useState(null);
  const open = menuKey === location.key;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches) setMenuKey(null);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <HeaderBar id="site-header" fixed className="home-header">
          <Brand to="/#home" />
          {!simple && <Navbar />}
          <div className="home-header-actions">
            {simple && <Link to="/#pizzas" className="home-header-back"><FiArrowLeft aria-hidden="true" /> Todas las pizzas</Link>}
            <Informacion />
            <button
              type="button"
              onClick={() => setMenuKey(location.key)}
              className="home-menu-toggle"
              aria-label="Abrir menú"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <FiMenu aria-hidden="true" />
            </button>
          </div>
      </HeaderBar>
      <MobileMenu open={open} onClose={() => setMenuKey(null)} />
    </>
  );
};

export default Header;