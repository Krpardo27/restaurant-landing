import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Informacion from "./Informacion";

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
      <header
        className={`
          fixed top-0 inset-x-0 z-50 border-b
          ${
            scrolled
              ? "bg-zinc-950 border-red-500/20 shadow-lg"
              : "bg-zinc-950/70 backdrop-blur-md border-white/5"
          }
        `}
      >
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{
            paddingTop: scrolled ? 10 : 16,
            paddingBottom: scrolled ? 10 : 16,
          }}
        >
          {/* LOGO + SLOGAN */}
          <motion.div animate={{ scale: scrolled ? 0.95 : 1 }}>
            <Link to="/" className="flex flex-col leading-tight">
              <span className="text-xl font-serif text-white tracking-wide">
                PIZZERÍA <span className="text-red-500">NOVA</span>
              </span>
              <span className="text-[11px] text-zinc-400 italic">
                Pizzería y sabores de Italia 🇮🇹
              </span>
            </Link>
          </motion.div>

          {/* NAV */}
          <Navbar scrolled={scrolled} />

          <Informacion />

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
