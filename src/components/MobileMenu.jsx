import { IoRestaurantOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";

const navItems = [
  { label: "Inicio", to: "home" },
  { label: "Nosotros", to: "about" },
  { label: "Galería", to: "gallery" },
  // { label: "Contacto", to: "contact" },
];

const MobileMenu = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/70 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-full
          bg-zinc-950 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-5 flex flex-col h-full gap-8">
          {/* Header logo */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-serif text-xl">
                PIZZERÍA <span className="text-red-500">NOVA</span>
              </h2>
              <p className="text-xs text-zinc-400 italic">
                Pizzería y sabores de Italia 🇮🇹
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-white text-2xl"
              aria-label="Cerrar menú"
            >
              ×
            </button>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-5 text-lg">
            {navItems.map((item) => (
              <a
                key={item.to}
                href={`#${item.to}`}
                onClick={(e) => {
                  e.preventDefault();
                  scroller.scrollTo(item.to, {
                    smooth: true,
                    duration: 600,
                    offset: -64,
                  });
                  onClose();
                }}
                className="hover:text-red-500 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            to="/menu"
            className="
          group
          max-w-max
          flex items-center gap-2
          text-sm font-medium

          px-4 py-2 rounded-xl
          border border-zinc-200

          text-zinc-700
          bg-white

          transition-all duration-200
          hover:bg-red-500 hover:text-white hover:border-red-500
          active:scale-95
        "
          >
            <IoRestaurantOutline
              size={18}
              className="transition-transform duration-200 group-hover:scale-110"
            />

            <span className="tracking-tight">Ver menú</span>
          </Link>

          {/* Info útil */}
          <div className="text-sm text-zinc-400 border-t border-white/10 pt-4 space-y-1">
            <p>⏰ Lun-Dom 13:00 – 23:30</p>
            <p>📍 Maipú Centro</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
