import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          boxShadow: scrolled
            ? "0 10px 30px rgba(0,0,0,0.35)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          fixed top-0 inset-x-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "bg-[#141414] h-14 shadow-lg border-b border-white/10"
              : "bg-neutral-900/70 backdrop-blur-md h-16 border-b border-white/5"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className={`
              text-xl font-bold tracking-wide
              transition-transform duration-300
              ${scrolled ? "scale-95" : "scale-100"}
            `}
          >
            <span className="text-white">
              PIZZA<span className="text-accent">NOVA</span>
            </span>
          </Link>

          {/* NAV DESKTOP */}
          <Navbar scrolled={scrolled} />

          {/* CTA DESKTOP */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="
                bg-accent hover:bg-accentDark
                text-white text-sm font-medium
                px-5 py-2 rounded-lg
                transition
              "
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
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
