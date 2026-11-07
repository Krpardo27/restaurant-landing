import { Outlet } from "react-router-dom";
import ScrollToTopSmooth from "../components/ScrollToTopSmooth";

const QRLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <ScrollToTopSmooth />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default QRLayout;
