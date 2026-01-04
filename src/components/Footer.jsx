import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 border-t border-white/10 mt-24">
      <div className="container mx-auto px-6 max-w-7xl py-16">
        {/* Grid principal */}
        <div
          className="
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-12
        "
        >
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4 text-white">
              Pizza<span className="text-accent">Nova</span>
            </h3>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Pizzas artesanales elaboradas con ingredientes frescos, masa de
              fermentación lenta y recetas inspiradas en la tradición italiana.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navegación</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link to="/" className="hover:text-accent transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/#menu" className="hover:text-accent transition">
                  Nuestras Pizzas
                </Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-accent transition">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-accent transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Horarios</h4>
            <ul className="text-sm text-muted space-y-2">
              <li>Lunes a Viernes: 12:00 – 22:30</li>
              <li>Sábados: 13:00 – 23:30</li>
              <li>Domingos: 13:00 – 21:30</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contacto</h4>
            <ul className="text-sm text-muted space-y-2">
              <li>📍 Av. Italia 1234, Santiago</li>
              <li>📞 +56 9 1234 5678</li>
              <li>✉️ contacto@pizzanova.cl</li>
            </ul>

            {/* Redes */}
            <div className="flex gap-4 mt-6 text-white">
              {["Instagram", "Facebook", "WhatsApp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="
                    text-xs
                    px-3 py-2
                    border border-white/10
                    rounded-full
                    hover:border-accent
                    hover:text-accent
                    transition
                  "
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10" />

        {/* Bottom */}
        <div
          className="
          flex flex-col md:flex-row
          items-center justify-between
          gap-4
          text-sm text-muted
        "
        >
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
