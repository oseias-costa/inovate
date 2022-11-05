import { onValue, ref } from "firebase/database";
import { useCallback, useContext, useEffect, useState } from "react";
import { TableTasks } from "../Atividades/TableTasks"
import { AuthContext } from "../context/UserAuthContext";
import { db } from "../firebase";
import { search } from "./utils/data";

export const ListActivities = ({handleUser, type}) => {
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
              item.responsavel.includes(userLogged[0].nome) &&
              item.realizado.includes(type) 
          )
  
    
       list && handleUser(search(list))
    return(
        <>
        { list ? <TableTasks data={search(list)}/> : 'Loading...'}
        </>
    )
}