import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext()



export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    
useEffect(()=> {
        getAuth().onAuthStateChanged(user => {
    if(user){
        setCurrentUser(user)
    } else{
        setCurrentUser(null)
    }

})
},[])


    return(
        <AuthContext.Provider  value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}