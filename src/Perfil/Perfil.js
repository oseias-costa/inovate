import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserAuthContext";
import { db } from "../firebase";
import { ListActivities } from "./ListActivities";
import { Upload } from "./Upload";
import './Perfil.css'
import { parcialTask, finishedTask } from "./utils/data";

export const Perfil = () => {
  const { userLogged } = useContext(AuthContext);
  const [tasks, setTasks] = useState('')
  
const dataUser = (result) => {
 tasks === '' && setTasks(result)
}

const realizado = finishedTask(tasks)
const parcial = parcialTask(tasks)
const total = tasks !== '' && tasks.length

console.log('teste cpd', realizado)
  return (
    <div>
      <div className="Perfil__Top">
      </div>
      <div className="Perfil__Top-user">
        <div className="Perfil__Top-photo">
          <img src={userLogged[0].image} />
        </div>
        <div className="Perfil__Top-name">
          <h2>{userLogged[0].nome}</h2>
          <p>{userLogged[0].email}</p>
        </div>
        <div className="Perfil__Top-userData">
          <div className="Perfil__Top-userDataItem">
          <strong>{total}</strong>
          <p>Atividades</p>
          </div>
        </div>
        </div>
      <ListActivities handleUser={dataUser} />
    </div>
  );
};
