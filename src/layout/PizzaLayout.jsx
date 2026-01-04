import { Outlet, Link } from "react-router-dom";
import ScrollToTopSmooth from "../components/ScrollToTopSmooth";
import Footer from "../components/Footer";

const PageLayout = () => {
  return (
    <>
      <ScrollToTopSmooth match="/pizza/" />
      <header className="fixed top-0 inset-x-0 z-50 bg-[#141414] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            PIZZA<span className="text-accent">NOVA</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-neutral-300 hover:text-white transition"
          >
            ← Volver al menú
          </Link>
        </div>
      </header>
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
