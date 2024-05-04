// Barra de navegação do usuário

import "./NavBarUser.css";

// Components
import { NavLink, Link } from "react-router-dom";

const NavBarUser = () => {
  return (
    <nav className="navBar">
      <div className="navBar-left">
        <h1>
          <Link to="/">TimeFlow</Link>
        </h1>
      </div>
      <form>
        <input type="text" placeholder="Pesquisar serviços ou empresas" />
      </form>
      <div className="navBar-right">
        <ul className="navBar-links">
          <li className="navBar-link">
            <NavLink to="/login">Entrar / Cadastrar</NavLink>
          </li>
          <li className="navBar-link">
            <NavLink to="/company">Empresa</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarUser;
