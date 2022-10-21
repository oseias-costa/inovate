import { getDownloadURL, ref } from "firebase/storage"
import { useEffect, useState } from "react"
import { storage } from "../firebase"
import style from './PhotoProfile.module.css'

export const PhotoProfile = ({idPhoto}) => {
    const [image, setImage] = useState(null)

    useEffect(()=>{
         const listImg = ref(storage, `/usuarios/${idPhoto}`);
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