import "./NavBarCompany.css";

// Components
import { NavLink, Link } from "react-router-dom";
import Search from "../Search/Search";

const NavBarCompany = () => {
  return (
    <nav className="navBar">
      <div className="navBar-left">
        <h1>
          <Link to="/">TimeFlow Company</Link>
        </h1>
      </div>
      <Search />
      <div className="navBar-right">
        <ul className="navBar-links">
          <li className="navBar-link">
            <NavLink to="/company/login">Entrar / Cadastrar</NavLink>
          </li>
          <li className="navBar-link">
            <NavLink to="/">User</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarCompany;
