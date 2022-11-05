import { useCallback } from "react";
import { useEffect, useState } from "react";
import { CloseX } from "../../Components/icons/CloseX"
import { Upload } from "../Upload";
import './ModalPerfil.css'
import { UpdatePassword } from "./UpdatePassword";

export const ModalPerfil = ({open, handleModal}) => {
  const [modal, setModal] = useState('Perfil__Modal');

  const modalShow = () => {
  modal === 'hidden' ?  setModal('Perfil__Modal') : setModal('hidden')
  }

  useEffect(()=> {
    modalShow()
  },[open])

  const clearInputs = () => {
    handleModal(open)
  }

  const handleOutsideClick = (event) => {
    if(event.target === event.currentTarget){
      clearInputs()
    }
  }


    return(
        <div className={modal} onClick={handleOutsideClick}>
        <div className="Perfil__Modal-container">
          <div className="Perfil__Modal-top">
            <h2>Alterar Informações</h2>
            <div className="Perfil__Modal-topX" onClick={clearInputs}>
              <CloseX />
            </div>
          </div>
          <div className="Perfil__Modal-content"> 
                <div>
                  <span>Alterar Foto de Perfil</span>      
                  <Upload modal={modal} />
                </div>
                <div>
                  <span>Alterar Senha</span>
                  <UpdatePassword />
                </div>
            </div>
            <div className="Perfil__Modal-btns">
              <button className='btn-grey' onClick={clearInputs}>Cancelar</button>
            </div>
        </div>
      </div>
    )
}