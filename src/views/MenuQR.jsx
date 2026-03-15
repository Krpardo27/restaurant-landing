import { useSearchParams } from "react-router-dom";
import Menu from "../sections/Menu";

const PHONE = "56990914436";

const MenuQR = () => {
  const [params] = useSearchParams();
  const mesa = params.get("mesa");

  const message = mesa
    ? `Hola, estoy en la mesa ${mesa} y quiero hacer un pedido`
    : `Hola, quiero hacer un pedido`;

  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-zinc-950 text-white pt-24 pb-24 min-h-screen">
      
      {/* HEADER */}
      <div className="max-w-3xl mx-auto px-6 mb-16 text-center">
        
        <div className="inline-block px-4 py-1 mb-4 rounded-full bg-red-500/10 text-red-400 text-sm">
          Menú Digital
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-red-500 mb-4">
          🍕 Nuestro Menú
        </h1>

        <p className="text-zinc-400 text-lg">
          Pizzas artesanales con ingredientes frescos y masa de fermentación lenta.
        </p>

        {mesa && (
          <p className="mt-3 text-sm text-zinc-500">
            Mesa <span className="text-red-400 font-semibold">{mesa}</span>
          </p>
        )}
      </div>

      {/* MENU */}
      <Menu hideHeader />

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 mt-20">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            bg-green-600 hover:bg-green-700
            text-white font-semibold
            py-4 rounded-xl shadow-xl
            transition transform hover:scale-[1.02]
          "
        >
          📲 Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default MenuQR;