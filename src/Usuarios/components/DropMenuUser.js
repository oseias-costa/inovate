import {useEffect, useRef, useState} from 'react'
import { DropSettingIcon } from '../../Components/icons/DropSettingIcon'

export const DropMenuUser = ({ itens, deletItemCallback }) => {
    const [classDrop, setClassDrop] = useState(false)

    const openDropMenu = () => {
        setClassDrop(true)
    }
    let menuRef = useRef()
    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if(!menuRef.current.contains(event.target)){
                setClassDrop(false)
            }
        })
    },[])
    
    return(

        <div className='drop'>
            <a onClick={openDropMenu}><DropSettingIcon /></a>
            <div className={classDrop ? 'dropMenu' : 'hidden'} ref={menuRef}>
                <a onClick={() => {
                    deletItemCallback(itens)
                    setClassDrop(false)
                    }
                }><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.96 3.6h3.6a.6.6 0 0 1 .6.6v1.2h-4.8V4.2a.6.6 0 0 1 .6-.6Zm5.4 1.8V4.2a1.8 1.8 0 0 0-1.8-1.8h-3.6a1.8 1.8 0 0 0-1.8 1.8v1.2H5.168a.6.6 0 0 0-.012 0H3.96a.6.6 0 0 0 0 1.2h.646L5.63 19.392A2.4 2.4 0 0 0 8.022 21.6h7.476a2.4 2.4 0 0 0 2.393-2.208L18.915 6.6h.645a.6.6 0 0 0 0-1.2h-1.194a.61.61 0 0 0-.012 0H15.36Zm2.35 1.2-1.015 12.696a1.2 1.2 0 0 1-1.197 1.104H8.022a1.2 1.2 0 0 1-1.196-1.104L5.811 6.6H17.71ZM8.726 7.8a.6.6 0 0 1 .633.564l.6 10.2a.6.6 0 0 1-1.197.072l-.602-10.2a.6.6 0 0 1 .564-.636h.002Zm6.07 0a.6.6 0 0 1 .563.636l-.6 10.2a.6.6 0 1 1-1.197-.072l.6-10.2a.6.6 0 0 1 .633-.564Zm-3.036 0a.6.6 0 0 1 .6.6v10.2a.6.6 0 1 1-1.2 0V8.4a.6.6 0 0 1 .6-.6Z"></path>
              </svg> Deletar</a>
            </div>
        </div>
    )
}