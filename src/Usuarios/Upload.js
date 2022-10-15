import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import { storage } from "../firebase"


export const Upload = () => {
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState(null)

    const handleImageChange = (e) => {
        if (e.targe.file[0]){
            setImg(e.target.file[0])
        }
    }

    const handleSubmit = () => {
        const imageRef = ref(storage, 'image')
        uploadBytes(imageRef, img).then(() => {
            getDownloadURL(imageRef).then((url)=>{
                setUrl(url)
            }).catch((error) => console.log('error url', error.message))
            setImg(null)
        }).catch((error) => console.log('error upload', error.message))
    }
return(
    <div>
        <img src={url} />
        <input type='file' onChange={handleImageChange} />
        <button onClick={handleSubmit}>Submit</button>
    </div>
)

    }

