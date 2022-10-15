import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserAuthContext";
import { db } from "../firebase";

export const Perfil = () => {
  const [list, setList] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const response = JSON.stringify(currentUser);
  const convertedResponse = { ...JSON.parse(response) };
  console.log("lastLoginAt:", convertedResponse.lastLoginAt);

  useEffect(() => {
    onValue(ref(db, "/usuarios"), (snapshot) => {
      setList([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((list) => {
          setList((oldArray) => [...oldArray, list]);
        });
      }
    });
  }, []);

  /*if (list !== []) {
    const filtrado = list.filter(function (obj) {
      return obj["email"] == "oseias@email.com";
    });
    console.log(filtrado);
  }*/

  return (
    <div>
      <h1>Perfil</h1>
      <p>{convertedResponse.email}</p>
    </div>
  );
};
