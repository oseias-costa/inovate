import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserAuthContext";
import { db } from "../firebase";
import { ListActivities } from "./ListActivities";
import { Upload } from "./Upload";
import './Perfil.css'
import { parcialTask, finishedTask } from "./utils/data";
import { ButtonStatus } from "./components/ButtonStatus";
import { ModalPerfil } from "./components/ModalPerfil";
import { Nut } from "../Components/icons/Nut";
import { UserCircle } from "../Components/icons/UserCircle";

export const Perfil = () => {
  const { userLogged, currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState('')
  const [filterType, setFilterType] = useState('')
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({})

  const dataUser = (result) => {
    tasks === '' && setTasks(result)
  }
  
  const realizado = finishedTask(tasks)
  const parcial = parcialTask(tasks)
  const total = tasks !== '' && tasks.length

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
  }, [userLogged, open])
  
  const openModal = () => {
    setOpen(true)
  }
  const handleModal = () => {
    setOpen(false)
  }
  return (
    <div>
      <div className="Perfil__Top">
      </div>
      <div className="Perfil__Top-user">
        <div className="Perfil__Top-photo">
          { user.image 
          ? <img className="Perfil__Top-photo" src={user.image} /> 
          : <UserCircle /> }
        </div>
        <div className="Perfil__Top-name">
          <h2>{user.nome}</h2>
          <p>{user.email}</p>
          <a className="Perfil__Top-link" onClick={openModal}> <Nut /> Editar Perfil</a>
        </div>
        <div className="Perfil__Top-userData">
          <div className="Perfil__Top-userDataItem">
          <strong>{total}</strong>
          <p>Atividades</p>
          </div>
        </div>
        </div>
        <ModalPerfil open={open} handleModal={handleModal} />
        <ul className="Perfil__Menu">
          <li><ButtonStatus text='Realizado' 
              atividade={filterType} onClick={() => 
              setFilterType('Realizado')} />
          </li>
          <li><ButtonStatus text='Parcial' 
              atividade={filterType} 
              onClick={() => setFilterType('Parcial')}/>
          </li>
          <li><ButtonStatus text='Pendente' 
              atividade={filterType} 
              onClick={() => setFilterType('Pendente')}/>
          </li>
          <li><ButtonStatus text='LO' 
              atividade={filterType} 
              onClick={() => setFilterType('LO')}/>
          </li>
        </ul>
       
      <ListActivities handleUser={dataUser} type={filterType} />
    </div>
  );
};
