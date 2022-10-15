import { useContext } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
    <header>
      <h2>Cabeçalho</h2>
      <NavLink to="/" end>
        Home
      </NavLink>
      {"  "}
      <NavLink to="Empresas">Empresas</NavLink>
      {"  "}
      <NavLink to="Login">Login</NavLink>
      {"  "}
      <NavLink to="Usuarios">Usuários</NavLink>
      {"  "}
      <NavLink to="Atividades">Atividades</NavLink>
      {"  "}
      <NavLink to="Perfil">Perfil</NavLink>

    </header>
  );
};
