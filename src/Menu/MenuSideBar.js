import { NavLink } from "react-router-dom";
import "./MenuSideBar.css";
import { Dashboard } from "./Icons/Dashboard";
import { Tasks } from "./Icons/Tasks";
import { FactoryIconMenu } from "./Icons/FactoryIconMenu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserAuthContext";
import { UserIconMenu } from "./Icons/UsersIconMenu";
import { ProfileIconMenu } from "./Icons/ProfileIconMenu";
import { LoIcon } from "./Icons/LoIcon";

export const MenuSideBar = () => {
  const { currentUser } = useContext(AuthContext)
  const [ menuShow, setMenuShow ] = useState('')

  useEffect(() => {
    if(currentUser){
      setMenuShow('navbar')
    } else {
      setMenuShow('hidden')
    }
  },[currentUser])
  return (
    <nav className={menuShow} >
      <ul className="navbarNav">
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
          <NavLink className="nav-link" to="Licenças Operacionais">
            <span className="link-text">Licenças Operacionais</span>
            <LoIcon />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Empresas">
            <span className="link-text">Empresas</span>
            <FactoryIconMenu />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Usuarios">
            <span className="link-text">Usuários</span>
            <UserIconMenu />
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Perfil">
            <span className="link-text">Perfil</span>
            <ProfileIconMenu />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
