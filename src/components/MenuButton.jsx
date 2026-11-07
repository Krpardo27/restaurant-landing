import { Link } from "react-router-dom";

const MenuButton = () => (
  <Link to="/menu" className="inline-flex items-center justify-center bg-accent hover:bg-accentDark text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors">
    Ver menú
  </Link>
);

export default MenuButton;