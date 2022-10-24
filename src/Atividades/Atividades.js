import { ListaAtividades } from "./ListaAtividades";
import './Tasks.css'
import { TaskModal } from "./TaskModal";
import { useState } from "react";

export const Atividades = () => {
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
        <h1>Atividades</h1>
        <button className="btn-blue" onClick={openModal}>Adicionar</button>
      </div>
      <TaskModal open={open} handleModal={handleModal}/>
      <ListaAtividades  />
    </div>
  );
};
