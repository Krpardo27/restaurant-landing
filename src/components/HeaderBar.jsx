import "../styles/header.css";

const HeaderBar = ({ children, fixed = false, id, className = "" }) => (
  <header id={id} className={`site-header${fixed ? " site-header-fixed" : ""}${className ? ` ${className}` : ""}`}>
    <div className="site-header-inner">{children}</div>
  </header>
);

export default HeaderBar;
