import { scroller, Events } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Inicio", to: "home" },
  { label: "Nosotros", to: "about" },
  { label: "Galería", to: "gallery" },
];

const Navbar = ({ scrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [active, setActive] = useState("home");

  // 🔹 underline en tiempo real según scroll
  useEffect(() => {
    if (!isHome) return;

    Events.scrollEvent.register("end", (to) => {
      setActive(to);
    });

    return () => {
      Events.scrollEvent.remove("end");
    };
  }, [isHome]);

  // 🔹 limpiar active si no estás en home
  useEffect(() => {
    if (!isHome) setActive(null);
  }, [isHome]);

  const handleNavigation = (target) => {
    setActive(target);

    const scrollOpts = { smooth: true, duration: 600 };

    if (!isHome) {
      navigate("/");
      setTimeout(() => scroller.scrollTo(target, scrollOpts), 120);
    } else {
      scroller.scrollTo(target, scrollOpts);
    }
  };

  return (
    <LayoutGroup id="nav">
      <nav className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = active === item.to;

          return (
            <motion.a
              key={item.to}
              href={`#${item.to}`} 
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item.to);
              }}
              whileTap={{ scale: 0.96 }}
              className={`
    relative text-sm font-medium transition-colors
    ${
      scrolled
        ? "text-zinc-300 hover:text-white"
        : "text-zinc-200 hover:text-white"
    }
    ${isActive ? "!text-white" : ""}
  `}
            >
              {item.label}

              {isActive && isHome && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-[2px] w-full bg-red-500"
                />
              )}
            </motion.a>
          );
        })}
      </nav>
    </LayoutGroup>
  );
};

export default Navbar;
