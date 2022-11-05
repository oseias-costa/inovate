import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Nut } from "../Components/icons/Nut";
import { OutIcon } from "../Components/icons/OutIcon";
import { LogoutSessao } from "../Components/utils/services";
import { AuthContext } from "../context/UserAuthContext";
import { auth } from "../firebase";
import { ModalPerfil } from "../Perfil/components/ModalPerfil";
import  "./Header.css";
import { PhotoUser } from './PhotoProfile'

export const Header = () => {
  const { currentUser, userLogged } = useContext(AuthContext);
  const [headerStyle, setHeaderStyle] = useState('hidden')
  const [modalPerfil, setModalPerfil] = useState('hidden')
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser !== null){
      setHeaderStyle('show')
    } else {
      setHeaderStyle('hidden')
    }
  },[currentUser])

  useEffect(() => {
    if(userLogged[0] !== undefined){
    setUser(
      {
        image : <img src={userLogged[0].image} />,
        nome: userLogged[0].nome,
        email: userLogged[0].email
      }
    )
  }
  }, [userLogged])

  
  const logoutSessao = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
    return navigate("/Login");
  };

  const handleModal = () => {
    modalPerfil == 'hidden' ? setModalPerfil('Header__ModalPerfil') : setModalPerfil('hidden')
  }

  const handleOutsideClick = (event) => {
    console.log(event.currentTarget)
    }

  return (
    <header className={headerStyle}>
      <svg
        width="130px"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 412 1100 430"
        fill="#154DA4"
      >
        <title>Inovate Ambiental</title>
        <g>
          <g>
            <path d="M35.96,532.789H7.3c-4.436,0-7.3,2.955-7.3,7.528v167.43c0,4.574,2.866,7.529,7.3,7.529H35.96c4.436,0,7.3-2.955,7.3-7.529V540.316C43.263,535.744,40.4,532.789,35.96,532.789Z" />
            <path d="M213.094,532.789H184.436c-4.435,0-7.3,2.955-7.3,7.528v93.392L114.3,541.886l-.367-.52c-4.1-5.792-6.519-8.577-16.819-8.577H74.772c-4.436,0-7.3,2.955-7.3,7.528v167.43c0,4.574,2.866,7.529,7.3,7.529H103.43c4.436,0,7.3-2.955,7.3-7.529V609.877l66.941,98.164c3.888,5.273,7.8,7.234,14.435,7.234h20.985c4.436,0,7.3-2.955,7.3-7.529V540.316C220.4,535.744,217.53,532.789,213.094,532.789Z" />
            <path d="M321.628,531.435c-31.394,0-49.689,6.034-61.172,20.177C249.343,565.3,244.6,587.023,244.6,624.256c0,36.992,4.744,58.571,15.863,72.15,11.476,14.014,29.767,19.995,61.163,19.995s49.689-5.979,61.164-19.995c11.119-13.58,15.863-35.159,15.863-72.15,0-37.234-4.741-58.959-15.854-72.645C371.319,537.468,353.024,531.435,321.628,531.435Zm0,38.749c27.4,0,33.315,9.6,33.315,54.073,0,43.916-5.916,53.4-33.315,53.4s-33.313-9.482-33.313-53.4C288.315,579.784,294.231,570.183,321.628,570.183Z" />
            <path d="M555.7,535.138a6.671,6.671,0,0,0-5.584-2.349H521.229c-5.315,0-6.384,4.279-6.957,6.562L479.53,675.844a24.187,24.187,0,0,1-1.21,3.8,4.541,4.541,0,0,1-.531.035c-.343-.759-.819-2.32-1.281-3.838l-35.2-136.507-.168-.534c-.843-2.539-2-6.016-6.785-6.016H405.471a6.673,6.673,0,0,0-5.586,2.351c-1.233,1.581-1.544,3.642-.911,6.172l38.14,145.338C444.059,712.508,449.4,716.4,477.9,716.4c29.275,0,34.7-3.9,41.477-29.8l37.238-145.34A6.841,6.841,0,0,0,555.7,535.138Z" />
            <path d="M696.512,706.906,656.744,561.4l0-.006c-7.165-26.036-12.678-29.956-42.137-29.956-28.364,0-34.144,4.2-41.232,29.945L532.985,706.7l-.09.406c-.156.937-.632,3.787,1.24,6a7.071,7.071,0,0,0,5.558,2.178H568.35c5.313,0,6.263-3.8,6.932-6.476l12.288-44.069h54.511L654.13,708.7c.695,2.774,1.645,6.574,6.733,6.574h28.883a6.843,6.843,0,0,0,5.508-2.216,7.038,7.038,0,0,0,1.29-5.957Zm-83.77-134.184.024-.09a32.782,32.782,0,0,1,1.021-3.546c.176-.015.438-.031.819-.031a10.077,10.077,0,0,1,1.386.07,31.893,31.893,0,0,1,1.068,3.3l14.988,55.137H597.637Z" />
            <path d="M807.658,532.789H677.91c-4.436,0-7.3,2.866-7.3,7.3v24.145c0,4.436,2.866,7.3,7.3,7.3h43.243V707.746c0,4.574,2.866,7.529,7.3,7.529h28.656c4.436,0,7.3-2.955,7.3-7.529V571.537h43.243c4.5,0,7.528-2.935,7.528-7.3V540.09C815.185,535.722,812.16,532.789,807.658,532.789Z" />
            <path d="M953,571.537c4.436,0,7.3-2.866,7.3-7.3V540.09c0-4.435-2.866-7.3-7.3-7.3H839.948c-4.436,0-7.3,2.866-7.3,7.3V707.746c0,4.574,2.866,7.529,7.3,7.529H953c4.436,0,7.3-2.866,7.3-7.3V683.827c0-4.436-2.866-7.3-7.3-7.3h-77.09V643.969H946c4.5,0,7.528-2.935,7.528-7.3V613.651c0-4.367-3.025-7.3-7.528-7.3h-70.1V571.537Z" />
          </g>
        </g>
      </svg>
      <div className="Header__User" onClick={handleModal}>
      <PhotoUser />
      <div className={modalPerfil} onClick={handleOutsideClick}>
        <div className="Header__ModalPerfil-top"></div>
        <div className="Header__ModalPerfil-data">
          {user.image}
          <p>{user.nome}</p>
          <p>{user.email}</p>
        </div>
        <ul className="Header__ModalPerfil-menu">
          <li>
            <NavLink className='Header__User-NavLink' to='./Perfil'>
              Meu Perfil
            </NavLink>
          </li>
          <li>
            <NavLink className='Header__User-NavLink' to='./Atividades'>
              Atividades
            </NavLink>
          </li>
          <li>
          <a onClick={logoutSessao} className='Header__User-NavLink'>
          <OutIcon /> Sair
        </a>
          </li>
        </ul>
      </div>
      </div>
    </header>
  );
};
