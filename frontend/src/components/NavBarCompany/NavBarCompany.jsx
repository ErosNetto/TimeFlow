// Barra de navegação da empresa

import "./NavBarCompany.css";

// Components
import { NavLink, Link } from "react-router-dom";

const NavBarCompany = () => {
  return (
    <nav className="navBar">
      <div className="navBar-left">
        <h1>
          <Link to="/company">TimeFlow Company</Link>
        </h1>
      </div>
      <form>
        <input type="text" placeholder="Pesquisar serviços ou empresas" />
      </form>
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
