import { onValue, ref } from "firebase/database";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [list, setList] = useState([]);
  const [userLogged, setUserLogged] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
    setCurrentUser(null)
  }, []);

  useEffect(() => {
    onValue(ref(db, "/usuarios"), (snapshot) => {
      setList([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((list) => {
          setList((oldArray) => [...oldArray, list]);
        });
      }
    })    
  }, [currentUser]);

  useEffect (() => {
    if(currentUser){
      const response = JSON.stringify(currentUser);
      const convertedResponse = { ...JSON.parse(response) };
      const email = convertedResponse.email

      async function getData(id){

      const novo =  list.filter(item => item.email.includes(id))
      setUserLogged(novo)
      }
      getData(email) 
    }
   
  },[list, currentUser])

  return (
    <AuthContext.Provider value={{ userLogged, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
