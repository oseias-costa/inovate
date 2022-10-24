import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { TableTasks } from "../Atividades/TableTasks"
import { AuthContext } from "../context/UserAuthContext";
import { db } from "../firebase";

export const ListActivities = () => {
    const { userLogged } = useContext(AuthContext)
    const [ list, setList ] = useState('')

    useEffect(() => {
        onValue(ref(db, "atividades"), (snapshot) => {
          setList([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((lista) => {
              setList((oldArray) => [...oldArray, lista]);
            });
          }
        });
      }, []);
    
      const search = () =>
        list.filter(
          (item) =>
            item.responsavel.includes(userLogged[0].nome)
        );
        console.log(userLogged[0].nome)
    return(
        <>
        { list ? <TableTasks data={search(list)}/> : 'Loading...'}
        </>
    )
}