import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopSmooth from "../components/ScrollToTopSmooth";

const MainLayout = () => {
  const location = useLocation();
  const isPizzaDetail = location.pathname.includes("/pizza/");

  const waLink = `https://wa.me/56990914436?text=Hola,%20quiero%20hacer%20una%20reserva`;

  return (
    <>
      <ScrollToTopSmooth />
      <Header simple={isPizzaDetail} />

      <main
        className={`min-h-screen ${isPizzaDetail ? "pt-24 bg-zinc-950 text-white" : ""}`}
      >
        <Outlet />
      </main>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed bottom-5 right-5 z-10
          bg-green-500 hover:bg-green-600
          text-white px-4 py-3 rounded-full shadow-xl
        "
      >
        📲 Pedir
      </a>

      <Footer />
    </>
  );
};

export default MainLayout;
