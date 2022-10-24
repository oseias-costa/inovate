import './TableTasks.css'
import { DropMenu } from "../Components/DropMenu";
import { TaskModal } from './TaskModal';
import { useState } from 'react';

export const TableTasks = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [deleteAtiv, setDeleteAtiv] = useState('')
  const [editAtiv, setEditAtiv] = useState('')

  const openModal = () => {
    setOpen(true)
  }

  const handleModal = () => {
    setOpen(false)
    setDeleteAtiv('')
    setEditAtiv('')
  }

  const dataHoje = new Date();

  const difference = (item, dataHoje) => {
    const past = new Date(item).getTime();
    return past;
  }; 

  const deletItemCallback = (item) =>{
    openModal()
    setDeleteAtiv(item)
  }

  const editItemCallback = (item) => {
    openModal()
    setEditAtiv(item)
  }
  return (
    <>
      <TaskModal 
      open={open} 
      handleModal={handleModal} 
      deleteAtiv={deleteAtiv} 
      editAtiv={editAtiv}
      />
      <table className='Tasks__Table'>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Atividade</th>
            <th>Situação</th>
            <th>Realizado</th>
            <th>Frequência</th>
            <th>Prazo</th>
            <th>Dias</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} id={item.id}>
              <td>{item.empresa}</td>
              <td><div className='Tasks__Table-resp'><p>{item.atividade}</p><p className='Tasks__Table-name'>{item.responsavel}</p></div></td>
              <td>{item.situacao}</td>
              <td><p className={'Tasks__' + item.realizado}>{item.realizado}</p></td>
              <td>{item.frequencia}</td>
              <td>{item.prazo}</td>
              <td>
                {Math.ceil(
                  (difference(item.prazo) - dataHoje) / 1000 / 60 / 60 / 24
                )}
              </td>
              <td>
               { /*<button onClick={() => callback(item)}>Editar</button>
                <button onClick={() => deletItem(item)}>Excluir</button>*/}
                <DropMenu 
                itens={item} 
                deletItemCallback={deletItemCallback}
                editItemCallback={editItemCallback} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
