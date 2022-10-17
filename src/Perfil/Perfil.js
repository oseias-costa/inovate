import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserAuthContext";
import { db } from "../firebase";
import { ListActivities } from "./ListActivities";
import { Upload } from "./Upload";

export const Perfil = () => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const { userLogged } = useContext(AuthContext);

  return (
    <div>
      <h1>Perfil</h1>

      <Upload />
      <ListActivities />
    </div>
  );
};
