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
        <div className='Upload__Form'>
            <form onSubmit={enviarFoto} className='Upload__Form-form'>
                <label className="Upload__Label" for='upload'>Selecione a imagem</label>  
                <p className="Upload__Form-name">{name.substring(0,30)}</p>
                <input type="file" id='upload' onChange={selectPhoto} />
                <button className="Upload__button btn-blue">Enviar</button>
            </form>
            <div className="Upload__Bloco-Foto">
                <progress value={progress} max="100" className={ imgURL && 'Upload__Foto-Progress' } />
                {image && <SaveUrl image={image} id={userLogged[0].id} className='Upload__Photo' />}
                {image && <img src={image} className='Upload__Photo' />}
            </div>
      </div>
    )
}