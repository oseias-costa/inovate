import { useEffect } from "react"

export const Head = (props) => {
    useEffect(()=>{
        document.title = props.title
    }, [props])
}