import { connectAuthEmulator, updatePassword } from "firebase/auth"
import { ref, update } from "firebase/database"
import { useContext, useEffect, useState } from "react"
import { Spinner } from "../../Components/Spinner"
import { AuthContext } from "../../context/UserAuthContext"
import { db } from "../../firebase"
import './UpdatePassword.css'

export const UpdatePassword = () => {
    const { currentUser, userLogged } = useContext(AuthContext)
    const [newPassword, setNewPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [message, setMessage] = useState('')
    const [ showLoading, setShowLoading ] = useState(false)

    const handleUpdate = () => {
        
        if(userLogged[0].senha !== oldPassword){
            setMessage('Senha atual incorreta!')
        } else if(newPassword === ''){
            setMessage('A senha não pode ser vazia!')
        } else if(newPassword.length < 6) {
            setMessage('A senha deve ter pelo menos 6 caracteres!')
        } else {
            setShowLoading(true)
        updatePassword(currentUser, newPassword).then(()=> {
                setMessage('Senha Alterada!')
                update(ref(db, `usuarios/${userLogged[0].id}`),{
                    senha: newPassword
                }).catch(err => console.log('senha não salva', err))
                console.log('senha alterada', newPassword)
                setNewPassword('')
                setOldPassword('')
                setShowLoading(false)
                
            }).catch((error)=>{
             
                setMessage(error.message)
                setNewPassword('')
                setOldPassword('')
                setShowLoading(false)
            })
    }
    
    
}
    return(
        <div className="UpdatePassword">
            { message && 
            <p className= { 
                message === 'Senha Alterada!' 
                ? 'UpdatePassword__GreenMessage'
                : 'UpdatePassword__RedMessage'
                }>
                {message}
            </p> }
            <input value={oldPassword} 
            onChange={e => setOldPassword(e.target.value)} 
            required={+true}
            placeholder='Senha Atual'
            className="UpdatePassword__Inputs"
            />
            <input value={newPassword} 
            onChange={e => setNewPassword(e.target.value)} 
            required={+true}
            placeholder='Nova Senha'
            className="UpdatePassword__Inputs"
            />
            <button className="btn-blue" onClick={handleUpdate}>Alterar</button>
            { showLoading && <Spinner /> }
        </div>
    )
}