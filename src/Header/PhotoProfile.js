import { getDownloadURL, ref } from "firebase/storage"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/UserAuthContext"
import { storage } from "../firebase"
import style from './PhotoProfile.module.css'

export const PhotoUser = () => {
    const {userLogged} = useContext(AuthContext)
    const [image, setImage] = useState(null)

    useEffect(()=>{
        if(userLogged[0] !== undefined){
         const listImg = ref(storage, `/usuarios/${userLogged[0].id}`);
      getDownloadURL(listImg).then((url)=>{       
          setImage(url)
        
      }).catch(error => console.log(error.message))
    }
    },[userLogged])
  
    return(
        <>
            {image && <img src={image} className={style.PhotoBox} />}
       </>
    )
}