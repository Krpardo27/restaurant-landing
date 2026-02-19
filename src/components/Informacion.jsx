import React from "react";

const PHONE = "56912345678";

const Informacion = () => {
  const waLink = `https://wa.me/${PHONE}?text=Hola,%20quiero%20hacer%20una%20reserva`;

  return (
    <div className="flex items-center gap-2 justify-between">
      {/* INFO RESTAURANTE */}
      <span className="text-xs text-zinc-400 hidden xl:block">
        📍 Maipú Centro · ⏰ 13:00–23:30
      </span>

      {/* CTA WHATSAPP */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
            bg-green-500 hover:bg-green-600
            text-white text-sm font-semibold
            px-5 py-2 rounded-full
            shadow-lg transition
          "
      >
        📲 Reservar
      </a>
    </div>
  );
};

export default Informacion;
