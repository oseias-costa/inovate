import {
  uploadBytesResumable,
  ref,
  getDownloadURL,
  listAll, 
  deleteObject
} from "@firebase/storage";
import { useState } from "react";
import { storage } from "../firebase";

export const UploadFoto = (props) => {
  const [imgURL, setImgURL] = useState("");
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState(0);
  const id = props.id;

  const enviarFoto = (event) => {
    const file = event.target[0]?.files[0];
    if (!file) return;

    event.preventDefault();

    const storageRef = ref(storage, `/usuarios/${id}`);
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
  console.log(imgURL);
  // Create a reference under which you want to list
  const listRef = ref(storage, "/usuarios/");

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        console.log(getDownloadURL(folderRef))
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.

        //console.log(getDownloadURL(itemRef))
      }).then((response) => setImage(response));
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });


    const listImg= ref(storage, "/usuarios/330f693213a");
    getDownloadURL(listImg).then((url)=>{
      setImage(url)
      console.log(url)
    }).catch(error => console.log(error.message))

    /*
    
    deleteObject(listImg).then(()=> {
      console.log('file deleted')
    }).catch((error) => {
      console.log(error, 'Error with file deletion')
    })
*/

      
    
    

  return (
    <div>
      <p>{id}</p>
      <form onSubmit={enviarFoto}>
        <input type="file" />
        <button>Enviar</button>
      </form>
      <br />
      {!imgURL && <progress value={progress} max="100" />}
      {imgURL && <img src={imgURL} alt="imagem " height={150} />}
      {image && <img src={image} alt="imagem " height={150} />}

    </div>
  );
};
