import { set, ref, update } from "firebase/database"
import { useEffect } from "react"
import { db } from "../../firebase"

export const SaveUrl = ({image, id}) => {
    useEffect(()=> {
        console.log(id)
    update(ref(db, `/usuarios/${id}`),{ image })
    },[])
    
}