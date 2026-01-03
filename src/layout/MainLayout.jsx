import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopSmooth from "../components/ScrollToTopSmooth";

const MainLayout = () => {
  return (
    <>
      <ScrollToTopSmooth />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
