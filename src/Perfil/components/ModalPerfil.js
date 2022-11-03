import { useEffect, useState } from "react";
import { CloseX } from "../../Components/icons/CloseX"
import { Upload } from "../Upload";
import './ModalPerfil.css'

export const ModalPerfil = ({open, handleModal}) => {
  const [modal, setModal] = useState('Perfil__Modal');

  const modalShow = () => {
    modal === 'hidden' ?  setModal('Perfil__Modal') : setModal('hidden')
  }
  useEffect(()=> {
    if(open) {
        modalShow()
    }
  },[open])


    return(
        <div className={modal}>
        <div className="Perfil__Modal-container">
          <div className="Perfil__Modal-top">
            <h2>Alterar Informações</h2>
            <div className="Perfil__Modal-topX" onClick={handleModal(open)}>
              <CloseX />
            </div>
          </div>
          <div className="Perfil__Modal-content"> 
                <span>Alterar Foto de Perfil</span>      
                <Upload modal={modal} />
            
            </div>
            <div className="Perfil__Modal-btns">
              <button  className='btn-grey' onClick={modalShow}>Cancelar</button>
              <button  className='btn-blue'>Adicionar</button>
            </div>
        </div>
      </div>
    )
}