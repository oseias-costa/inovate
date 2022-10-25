import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserAuthContext";
import { db } from "../firebase";
import { ListActivities } from "./ListActivities";
import { Upload } from "./Upload";
import './Perfil.css'

export const Perfil = () => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const { userLogged } = useContext(AuthContext);

  console.log(userLogged)
  return (
    <div>
      <div className="Perfil__Top">
        <div className="Perfil__Top-photo">
          <img src={userLogged[0].image} />
        </div>
        <div className="Perfil__Top-name">
          <h1>{userLogged[0].nome}</h1>
          <p>{userLogged[0].email}</p>
        </div>
      </div>
      <ListActivities />
    </div>
  );
};
