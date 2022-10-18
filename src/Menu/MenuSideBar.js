import { NavLink } from "react-router-dom";
import "./MenuSideBar.css";
import { Dashboard } from "./Icons/Dashboard";
import { Tasks } from "./Icons/Tasks";

export const MenuSideBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbarNav">
          {/*https://iconer.app/phosphor*/}
  
        <li className="nav-item">
          <NavLink className="nav-link" to="/" end>
            <span className="link-text">Início</span>
            <Dashboard />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Atividades">
            <span className="link-text">Atividades</span>
            <Tasks />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Empresas">
            <span className="link-text">Empresas</span>
            <Tasks />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Login">
            <span className="link-text">Login</span>
            <Tasks />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Usuarios">
            <span className="link-text">Usuários</span>
            <Tasks />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Perfil">
            <span className="link-text">Perfil</span>
            <Tasks />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
