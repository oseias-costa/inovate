import { ListaAtividades } from "./LoList";
import './Lo.css'
import { TaskModal } from "./LoModal";
import { useState } from "react";

export const Lo = () => {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const handleModal = () => {
    setOpen(false)
  }

  return (
    <div>
      <div className="Tasks__Top">
        <h1>Licenças Operacionais</h1>
        <button className="btn-blue" onClick={openModal}>Adicionar</button>
      </div>
      <TaskModal open={open} handleModal={handleModal}/>
      <ListaAtividades  />
    </div>
  );
};
