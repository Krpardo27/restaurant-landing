import { useEffect, useRef } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { navItems } from "../data/navigation";

const MobileMenu = ({ open, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-labelledby="mobile-menu-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="home-mobile-menu"
    >
      <div className="home-mobile-inner">
        <div className="home-mobile-top">
          <div>
            <h2 id="mobile-menu-title" className="home-mobile-brand">
              NOVA<span>.</span>
            </h2>
            <p className="home-mobile-caption">CUCINA ITALIANA</p>
          </div>
          <button type="button" onClick={onClose} className="home-mobile-close" aria-label="Cerrar menú">
            <FiX aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Navegación móvil" className="home-mobile-links">
          {navItems.map((item, index) => (
            <Link key={item.id} to={`/#${item.id}`} onClick={onClose}>
              <span className="home-mobile-link-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{item.label}</span><FiArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <Link to="/menu" onClick={onClose} className="home-button home-button-primary home-mobile-cta">
          Explorar la carta <FiArrowUpRight aria-hidden="true" />
        </Link>
        <p className="home-mobile-bottom">Buena comida. Buena compañía.<br /><span>Alma italiana, hecha aquí.</span></p>
      </div>
    </dialog>
  );
};

export default MobileMenu;