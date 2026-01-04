import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import MenuButton from "./MenuButton";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER NO ANIMADO */}
      <header
        className={`
          fixed top-0 inset-x-0 z-50
          border-b
          ${
            scrolled
              ? "bg-[#141414] border-white/10 shadow-lg"
              : "bg-neutral-900/70 backdrop-blur-md border-white/5"
          }
        `}
      >
        {/* CONTENIDO ANIMADO */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{
            paddingTop: scrolled ? 12 : 16,
            paddingBottom: scrolled ? 12 : 16,
          }}
        >
          {/* LOGO */}
          <motion.div
            animate={{ scale: scrolled ? 0.95 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="text-xl font-bold tracking-wide text-white">
              PIZZA<span className="text-accent">NOVA</span>
            </Link>
          </motion.div>

          {/* NAV */}
          <Navbar scrolled={scrolled} />

          {/* CTA DESKTOP */}
          <div className="hidden lg:flex gap-3">
            <MenuButton />
            <Link
              to="/contact"
              className="bg-accent hover:bg-accentDark text-white text-sm font-medium px-5 py-2 rounded-lg transition"
            >
              Reservar
            </Link>
          </div>

          {/* BURGER MOBILE */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-white"
            aria-label="Abrir menú"
          >
            <div className="space-y-1.5">
              <span className="block w-6 h-[2px] bg-white" />
              <span className="block w-6 h-[2px] bg-white" />
              <span className="block w-6 h-[2px] bg-white" />
            </div>
          </button>
        </motion.div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
