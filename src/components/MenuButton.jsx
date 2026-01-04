import { scroller } from "react-scroll";

const MenuButton = () => {
  const handleClick = () => {
    scroller.scrollTo("menu", {
      smooth: true,
      duration: 600,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="
        bg-accent hover:bg-accentDark
        text-white text-sm font-medium
        px-5 py-2 rounded-lg
        transition
      "
    >
      Ver menú
    </button>
  );
};

export default MenuButton;
