import { Link } from "react-router-dom";

const Brand = ({ to = "/", label = "Pizzería Nova, inicio" }) => (
  <Link to={to} className="site-brand" aria-label={label}>
    <span className="site-brand-mark" aria-hidden="true">N</span>
    <span className="site-brand-copy">
      <strong>NOVA<span className="site-brand-dot">.</span></strong>
      <small>CUCINA ITALIANA</small>
    </span>
  </Link>
);

export default Brand;
