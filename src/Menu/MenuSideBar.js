import { NavLink } from "react-router-dom";
import "./MenuSideBar.css";
import { Dashboard } from "./Icons/Dashboard";
import { Tasks } from "./Icons/Tasks";

export const MenuSideBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbarNav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/" end>
            <span className="link-text logo-text">Menu</span>
            <svg
              width="46"
              height="46"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.25 11.25H3.75a.75.75 0 1 0 0 1.5h16.5a.75.75 0 1 0 0-1.5Z"></path>
              <path d="M3.75 6.75h16.5a.75.75 0 1 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Z"></path>
              <path d="M20.25 17.25H3.75a.75.75 0 1 0 0 1.5h16.5a.75.75 0 1 0 0-1.5Z"></path>
            </svg>
          </NavLink>
          {/*https://iconer.app/phosphor*/}
        </li>
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
