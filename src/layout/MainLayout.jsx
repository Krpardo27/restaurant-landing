import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopSmooth from "../components/ScrollToTopSmooth";

const MainLayout = () => {
  const location = useLocation();
  const isPizzaDetail = location.pathname.includes("/pizza/");

  const waLink = `https://wa.me/56990914436?text=Hola,%20quiero%20hacer%20una%20reserva`;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <ScrollToTopSmooth />
      <Header simple={isPizzaDetail} />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* CTA FLOAT */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed bottom-5 right-5 z-50
          bg-green-700 hover:bg-green-800
          text-white font-semibold
          px-6 py-3 rounded-full
          shadow-lg transition
        "
      >
        📲 Pedir
      </a>

      <Footer />
    </div>
  );
};

export default MainLayout;
