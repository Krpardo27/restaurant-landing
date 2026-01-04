import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopSmooth = ({ match}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith(match)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, match]);

  return null;
};

export default ScrollToTopSmooth;
