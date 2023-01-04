import { signOut } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Nut } from "../Components/icons/Nut";
import { OutIcon } from "../Components/icons/OutIcon";
import { UserCircle } from "../Components/icons/UserCircle";
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
        image : userLogged[0].image,
        nome: userLogged[0].nome,
        email: userLogged[0].email
      }
    )
  }
  }, [userLogged])

  const myRef = useRef()
  
  const logoutSessao = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
    return navigate("/Login");
  };

  const goLink = (path) => {
    navigate('/'+ path)
    setModalPerfil('hidden')
  } 
  
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
  },[])

  const handleOutsideClick = (event) => {
    myRef.current.contains(event.target) 
    ? setModalPerfil('Header__ModalPerfil')
    : setModalPerfil('hidden')
  }

  return (
    <header className={headerStyle} onClick={handleOutsideClick}>
      <svg
        width="150px"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2800.000000 500.000000"
        fill="#154DA4"
      >
        <title>Inovate Ambiental</title>
        <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
            fill="#154DA4" stroke="none">
            <path d="M9545 4038 c-485 -54 -942 -333 -1212 -738 -218 -326 -312 -659 -300
              -1060 7 -246 42 -414 127 -617 163 -391 520 -746 920 -916 313 -133 716 -169
              1075 -96 577 117 1084 569 1273 1135 114 340 114 786 1 1133 -42 132 -136 317
              -217 431 -75 105 -244 286 -337 359 -146 117 -328 219 -485 276 -245 87 -575
              124 -845 93z m490 -373 c426 -95 789 -373 965 -740 145 -301 176 -641 90 -980
              -175 -691 -856 -1118 -1580 -991 -115 21 -225 57 -346 116 -308 149 -584 463
              -688 783 -51 156 -61 228 -61 447 0 178 3 219 23 309 125 559 551 964 1122
              1067 97 17 377 11 475 -11z"/>
            <path d="M1900 2315 l0 -1655 185 0 185 0 0 1655 0 1655 -185 0 -185 0 0
              -1655z"/>
            <path d="M3890 2315 l0 -1655 190 0 190 0 2 1217 3 1218 1059 -1215 1059
              -1215 58 -3 59 -3 0 1656 0 1655 -185 0 -185 0 -2 -1233 -3 -1233 -1070 1233
              -1070 1233 -52 0 -53 0 0 -1655z"/>
            <path d="M12810 3903 c16 -38 335 -781 709 -1653 l680 -1585 53 -3 53 -3 712
              1638 c392 901 715 1646 719 1656 6 16 -8 17 -193 17 l-200 0 -543 -1245 c-299
              -685 -545 -1243 -548 -1240 -3 3 -244 562 -536 1243 l-531 1237 -202 3 -202 2
              29 -67z"/>
            <path d="M18188 3488 c-125 -266 -477 -1011 -782 -1655 l-554 -1173 207 0 206
              0 251 533 252 532 693 2 694 3 255 -535 255 -535 198 0 c108 0 197 3 197 8 -1
              4 -346 747 -768 1652 l-768 1645 -54 3 -55 2 -227 -482z m547 -853 l255 -540
              -259 -3 c-143 -1 -378 -1 -524 0 l-264 3 261 553 c167 353 264 548 269 540 5
              -7 123 -256 262 -553z"/>
            <path d="M21110 3790 l0 -180 363 -2 362 -3 3 -1473 2 -1472 185 0 185 0 2
              1472 3 1473 363 3 362 2 0 180 0 180 -915 0 -915 0 0 -180z"/>
            <path d="M24290 2315 l0 -1655 950 0 950 0 -2 178 -3 177 -767 3 -768 2 0 620
              0 620 770 0 770 0 0 180 0 180 -767 2 -768 3 0 490 0 490 773 3 772 2 0 180 0
              180 -955 0 -955 0 0 -1655z"/>
          </g>
      </svg>
      <div className="Header__User" onClick={() => setModalPerfil('Header__ModalPerfil')} ref={myRef}>
      { user.image ? <PhotoUser /> : <UserCircle /> }
      <div className={modalPerfil} >
        <div className="Header__ModalPerfil-top"></div>
        <div className="Header__ModalPerfil-data">
          <NavLink to='./Perfil' className='Header__ModalPerfil-dataImg'>
          { user.image ? <img src={user.image} /> : <UserCircle /> }
          </NavLink>
          <p>{user.nome}</p>
          <p>{user.email}</p>
        </div>
        <ul className="Header__ModalPerfil-menu">
          <li>
            <a className='Header__User-NavLink' onClick={() => goLink('Perfil')}>
              Meu Perfil
            </a>
          </li>
          <li>
            <NavLink className='Header__User-NavLink' to='./Atividades'>
              Atividades
            </NavLink>
          </li>
          <li>
          <a onClick={logoutSessao} className='Header__User-NavLink'>
           Sair
        </a>
          </li>
        </ul>
      </div>
      </div>
    </header>
  );
};
