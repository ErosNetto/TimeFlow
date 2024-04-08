import "./NavBar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import Search from "../Search/Search";

const NavBar = () => {
  return (
    <div>
      <nav className="navBar">
        <div className="navBar-left">
          <h1>
            <Link to="/">TimeFlow</Link>
          </h1>
        </div>
        <Search />
        <div className="navBar-right">
          <ul className="navBar-links">
            <li className="navBar-link">
              <NavLink to="/user/login">Entrar / Cadastrar</NavLink>
            </li>
            <li className="navBar-link">
              <NavLink to="/company/login">Empresa</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
