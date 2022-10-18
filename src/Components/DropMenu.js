import style from './DropMenu.css'
import {useState} from 'react'
import { DropSettingIcon } from './icons/DropSettingIcon'

export const DropMenu = ({itens, deletItemCallback, editItemCallback}) => {
    const [classDrop, setTClassDrop] = useState('hidden')
    const abrir = () => {
        classDrop == 'dropMenu' ? setTClassDrop('hidden') : setTClassDrop('dropMenu')
    }
    return(

        <div className='drop'>
            <a onClick={abrir}><DropSettingIcon /></a>
            <div className={classDrop}>
                <a onClick={() => deletItemCallback(itens)}>Deletar</a>
                <a onClick={() => editItemCallback(itens)}>Editar</a>
            </div>
        </div>
    )
}