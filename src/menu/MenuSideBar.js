import { NavLink } from "react-router-dom"
import style from './MenuSideBar.module.css'

export const MenuSideBar = () => {
    return(
        <div className={style.menu}>
        <NavLink className={style.link} to="/" end>Home</NavLink>
        <NavLink className={style.link} to="Empresas">Empresas</NavLink>
        <NavLink className={style.link} to="Login">Login</NavLink>
        <NavLink className={style.link} to="Usuarios">Usuários</NavLink>
        <NavLink className={style.link} to="Atividades">Atividades</NavLink>
        <NavLink className={style.link} to="Perfil">Perfil</NavLink>
        </div>
    )
}