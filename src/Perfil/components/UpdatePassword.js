import { connectAuthEmulator, updatePassword } from "firebase/auth"
import { ref, update } from "firebase/database"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/UserAuthContext"
import { db } from "../../firebase"

export const UpdatePassword = () => {
    const { currentUser, userLogged } = useContext(AuthContext)
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleUpdate = () => {
        console.log(newPassword)
        updatePassword(currentUser, newPassword).then(()=> {
                setMessage('Senha Alterada')
                setNewPassword('')
                update(ref(db, `usuarios/${userLogged[0].id}`),{
                    senha: newPassword
                })

            }).catch((error)=>{
                setMessage('Senha não Alterada ', error)
                console.log(error)
                setNewPassword('')
            })
    } 

    return(
        <div>
            <p>{message}</p>
            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <button className="btn-blue" onClick={handleUpdate}>Alterar</button>
        </div>
    )
}