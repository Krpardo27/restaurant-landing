import { scroller } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Inicio", to: "home" },
  { label: "Menú", to: "menu" },
  { label: "Nosotros", to: "about" },
  { label: "Galería", to: "gallery" },
  { label: "Contacto", to: "contact" },
];

const Navbar = ({ scrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Estado UI (underline persistente)
  const [active, setActive] = useState("home");

  const handleNavigation = (target) => {
    setActive(target);

    const scrollOpts = {
      smooth: true,
      duration: 600,
      offset: -72, // ajusta a tu header real
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scroller.scrollTo(target, scrollOpts), 120);
    } else {
      scroller.scrollTo(target, scrollOpts);
    }
  };

  return (
    <LayoutGroup id="nav">
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = active === item.to;

          return (
            <motion.button
              key={item.to}
              onClick={() => handleNavigation(item.to)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={`
                relative text-sm font-medium
                transition-colors duration-300
                ${
                  scrolled
                    ? "text-neutral-300 hover:text-white"
                    : "text-neutral-200 hover:text-white"
                }
                ${isActive ? "!text-white" : ""}
              `}
            >
              {item.label}

              {/* underline activo (persistente y animado entre items) */}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 36 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </LayoutGroup>
  );
};

export default Navbar;
