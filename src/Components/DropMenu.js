import style from './DropMenu.css'
import {useState} from 'react'

export const DropMenu = () => {
    const [test, setTest] = useState('dropMenu')
    const abrir = () => {
        test == 'dropMenu' ? setTest('hidden') : setTest('dropMenu')
    }
    
    return(

        <div className='drop'>
            <button className='btn' onClick={abrir}>Drop</button>
            <div className={test}>
                <a href="#">Link</a>
                <a href="#">Link</a>
                <a href="#">Link</a>
            </div>
        </div>
    )
}