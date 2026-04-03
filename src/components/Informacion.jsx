import { Link } from "react-router-dom";
import { IoRestaurantOutline } from "react-icons/io5";

const Informacion = () => {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* INFO RESTAURANTE */}
      <span className="text-xs text-zinc-400 hidden xl:block">
        📍 Maipú Centro · ⏰ 13:00–23:30
      </span>

      {/* CTA MENÚ */}
      <Link
        to="/menu"
        className="
          group hidden lg:inline-flex items-center gap-2
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
    </div>
  );
};

export default Informacion;
