import { useRef, useEffect } from "react";
import { cldDetail, cldDetailSrcSet } from "../utils/cloudinary";

const PHONE = "56912345678";

const PizzaDetailModal = ({ pizza, mesa, onClose }) => {
  const dialogRef = useRef();

  useEffect(() => {
    if (pizza) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [pizza]);

  if (!pizza) return null;

  const message = mesa
    ? `Hola, estoy en la mesa ${mesa} y quiero ${pizza.name} 🍕`
    : `Hola, quiero la ${pizza.name} 🍕`;

  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  const handleClose = () => {
    dialogRef.current?.close();
    onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      className="
        w-full lg:max-w-lg rounded-2xl
         overflow-hidden
        bg-zinc-900
        text-white
        backdrop:bg-black/70 backdrop:backdrop-blur-sm
        shadow-2xl shadow-black/40
        border border-zinc-800
      "
      onClose={onClose}
    >
      <div className="relative">
        {/* CERRAR */}
        <button
          onClick={handleClose}
          className="
            absolute top-4 right-4 z-20
            bg-black/60 hover:bg-black
            text-white text-sm w-8 h-8 rounded-full
            flex items-center justify-center
            transition
          "
        >
          ✕
        </button>

        {/* IMAGEN */}
        {pizza.image && (
          <div className="h-64 overflow-hidden relative">
            <img
              src={cldDetail(pizza.image, 800)}
              srcSet={cldDetailSrcSet(pizza.image)}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              alt={pizza.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        )}

        {/* CONTENIDO */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-red-500">
              {pizza.name}
            </h3>

            <p className="text-xs text-zinc-400 italic mt-1">
              Pizzería artesanal 🍕
            </p>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed">
            {pizza.longDescription || pizza.description}
          </p>

          {/* INGREDIENTES */}
          {pizza.ingredients && pizza.ingredients.length > 0 && (
            <div className="bg-zinc-800 rounded-xl p-3 border border-zinc-700">
              <p className="text-xs font-semibold text-red-400 mb-1">
                Ingredientes
              </p>

              <p className="text-xs text-zinc-400">
                {pizza.ingredients.join(" · ")}
              </p>
            </div>
          )}

          {/* BADGES */}
          <div className="flex gap-2">
            {pizza.spicy && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                🌶️ Picante
              </span>
            )}

            {pizza.vegan && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                🌱 Vegano
              </span>
            )}
          </div>

          {/* PRECIO + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
            <span className="text-2xl font-bold text-red-500">
              {pizza.price}
            </span>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="
                bg-green-600 hover:bg-green-700
                px-5 py-2.5 rounded-xl
                text-sm font-semibold
                transition
              "
            >
              📲 Pedir
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default PizzaDetailModal;