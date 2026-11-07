import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Informacion = () => {
  return (
      <Link
        to="/menu"
        className="site-header-link"
      >
        Ver carta <FiArrowUpRight aria-hidden="true" />
      </Link>
  );
};

export default Informacion;
