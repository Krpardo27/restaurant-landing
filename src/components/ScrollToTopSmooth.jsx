import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopSmooth = () => {
  const { pathname, hash, key } = useLocation();
  const previousRoute = useRef(null);

  useLayoutEffect(() => {
    const pathChanged = previousRoute.current?.pathname !== pathname;
    const hashRemoved = Boolean(previousRoute.current?.hash) && !hash;
    previousRoute.current = { pathname, hash };
    if (!hash) {
      // Query-only updates (QR categories and products) preserve position.
      if (pathChanged || hashRemoved) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    let observer;
    let frame;
    let timeout;
    const findAndScroll = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      observer?.disconnect();
      clearTimeout(timeout);
      frame = requestAnimationFrame(() => {
        const headerHeight = document.getElementById("site-header")?.offsetHeight ?? 0;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
          top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - 12),
          behavior: reduced ? "instant" : "smooth",
        });
      });
      return true;
    };
    if (!findAndScroll()) {
      observer = new MutationObserver(findAndScroll);
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = setTimeout(() => observer.disconnect(), 15000);
    }
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToTopSmooth;