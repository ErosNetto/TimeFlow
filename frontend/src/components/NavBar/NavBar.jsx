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
              <NavLink to="/login">Entrar / Increver-se</NavLink>
            </li>
            <li className="navBar-link">
              <NavLink to="/company">Empresa</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
