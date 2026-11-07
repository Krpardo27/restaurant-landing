import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/navigation";

const Navbar = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (pathname !== "/") return;
    const update = () => {
      const offset = (document.getElementById("site-header")?.offsetHeight ?? 96) + 24;
      let current = "home";
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= offset) current = item.id;
      }
      // A short footer cannot always reach the top offset at maximum scroll.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        const lastVisible = navItems.findLast((item) => {
          const section = document.getElementById(item.id);
          return section && section.getBoundingClientRect().top < window.innerHeight;
        });
        if (lastVisible) current = lastVisible.id;
      }
      setActive(current);
    };
    const observer = new MutationObserver(update);
    const main = document.getElementById("main-content");
    if (main) observer.observe(main, { childList: true, subtree: true });
    const initialFrame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(initialFrame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <nav aria-label="Navegación principal" className="home-navbar">
      {navItems.map((item) => {
        const isActive = pathname === "/" && active === item.id;
        return (
          <Link
            key={item.id}
            to={`/#${item.id}`}
            aria-current={isActive ? "location" : undefined}
            className={`site-header-link${isActive ? " is-active" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;