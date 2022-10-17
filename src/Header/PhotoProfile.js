import { getDownloadURL, ref } from "firebase/storage"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/UserAuthContext"
import { storage } from "../firebase"
import style from './PhotoProfile.module.css'

export const PhotoProfile = () => {
    const {userLogged} = useContext(AuthContext)
    const [image, setImage] = useState(null)

    useEffect(()=>{
         const listImg = ref(storage, `/usuarios/${userLogged[0].id}`);
      getDownloadURL(listImg).then((url)=>{       
          setImage(url)
        
      }).catch(error => console.log(error.message))
    },[])
  
    return(
        <>
            {image && <img src={image} className={style.PhotoBox} />}
       </>
    )
}