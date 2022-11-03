import {
    uploadBytesResumable,
    ref,
    getDownloadURL
  } from "@firebase/storage";
import { stripBasename } from "@remix-run/router";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/UserAuthContext"
import { storage } from "../firebase";
import {SaveUrl} from './components/SaveUrl'
import './Upload.css'


export const Upload = ({modal}) => {
    const {userLogged} = useContext(AuthContext)
    const [progress, setProgress] = useState('')
    const [imgURL, setImgURL] = useState('')
    const [image, setImage] = useState(null)
    const [name, setName ] = useState('')

    useEffect(()=>{
         const listImg = ref(storage, `/usuarios/${userLogged[0].id}`);
      getDownloadURL(listImg).then((url)=>{       
          setImage(url)
        
      }).catch(error => console.log(error.message))
    },[imgURL])
   
    useEffect(() => {
      setName('')
    }, [modal])

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

      const selectPhoto = (event) => {
        const inputTarget = event.target
        const file = inputTarget.files[0]
        setName(file.name)
        }
      
      
      return(
        <>
        <form onSubmit={enviarFoto} className='Upload__Form'>
        <label className="Upload__Label" for='upload'>Selecione a imagem</label>  
        <p>{name}</p>
        <input type="file" id='upload' onChange={selectPhoto} />
        <button className="btn-blue">Enviar</button>
      </form>
       <progress value={progress} max="100" />
      {image && <SaveUrl image={image} id={userLogged[0].id} />}
      {image && <img src={image} height={150} className='Upload__Photo' />}
        </>
    )
}