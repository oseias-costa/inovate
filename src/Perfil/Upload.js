import {
    uploadBytesResumable,
    ref,
    getDownloadURL
  } from "@firebase/storage";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/UserAuthContext"
import { storage } from "../firebase";


export const Upload = () => {
    const {userLogged} = useContext(AuthContext)
    const [progress, setProgress] = useState('')
    const [imgURL, setImgURL] = useState('')
    const [image, setImage] = useState(null)

    useEffect(()=>{
         const listImg = ref(storage, `/usuarios/${userLogged[0].id}`);
      getDownloadURL(listImg).then((url)=>{
        setImage(url)
        console.log(url)
      }).catch(error => console.log(error.message))
    },[imgURL])
   


    const enviarFoto = (event) => {
        const file = event.target[0]?.files[0];
        if (!file) return;
    
        event.preventDefault();
    
        const storageRef = ref(storage, `/usuarios/${userLogged[0].id}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => alert(error.message),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setImgURL(url);
            });
          }
        );
      };

  

    return(
        <>
        <h1>{userLogged[0].id}</h1>
        <form onSubmit={enviarFoto}>
        <input type="file" />
        <button>Enviar</button>
      </form>
      {!imgURL && <progress value={progress} max="100" />}
      {image && <img src={image} height={150} />}
        </>
    )
}