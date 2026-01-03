import { Link } from "react-scroll";

const navItems = [
  { label: "Inicio", to: "home" },
  { label: "Menú", to: "menu" },
  { label: "Nosotros", to: "about" },
  { label: "Galería", to: "gallery" },
  { label: "Contacto", to: "contact" },
];

const MobileMenu = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/60
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-72
          bg-[#141414]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 flex flex-col gap-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="self-end text-white text-2xl"
            aria-label="Cerrar menú"
          >
            ×
          </button>

          {/* Nav */}
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={600}
                offset={-64}
                onClick={onClose}
                className="
                  text-lg text-neutral-200
                  hover:text-accent transition
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <button
            className="
              mt-auto
              bg-accent hover:bg-accentDark
              text-white
              py-3 rounded-lg
              transition
            "
          >
            Reservar
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
