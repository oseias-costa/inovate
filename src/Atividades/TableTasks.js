import './TableTasks.css'
import { DropMenu } from "../Components/DropMenu";
import { TaskModal } from './TaskModal';
import { useEffect, useState } from 'react';

export const TableTasks = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [deleteAtiv, setDeleteAtiv] = useState('')
  const [editAtiv, setEditAtiv] = useState('')
  const [itensPerPage, SetItensPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const tasks = data.sort((a, b) => b.createdAt - a.createdAt)

  const pages = Math.ceil(tasks.length / itensPerPage)
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = tasks.slice(startIndex, endIndex)

  useEffect(() => { 
    setCurrentPage(0)
  },[itensPerPage])
 
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
      <div className='Task__Pagination'>
          <p>Página:</p> 
          <div>{Array.from(Array(pages), (item, index) =>{
            return (
              <button 
                value={index} 
                onClick={
                  (e) => setCurrentPage(Number(e.target.value))
                } 
                className={ index === currentPage ? 'Task__Pagination-Active' : 'Task__Pagination-btn'}>
                {index + 1}
              </button>
            )
          })}</div>
          <p>Itens por página:</p>
          <div>
            <select value={itensPerPage} onChange={e => SetItensPerPage(Number(e.target.value))} className='Task__Pagination-select'>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
            </select>
          </div> 
      </div>
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
          {currentItens.map((item) => (
            <tr key={item.id} id={item.id}>
              <td>{item.empresa}</td>
              <td><div className='Tasks__Table-resp'><p>{item.atividade}</p><p className='Tasks__Table-name'>{item.responsavel}</p></div></td>
              <td>{item.situacao}</td>
              <td><p className={'Tasks__' + item.realizado}>{item.realizado}</p></td>
              <td>{item.frequencia}</td>
              <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(item.prazo + 'T10:00:00-03:00'))}</td>
              <td>
                {Math.ceil(
                  (difference(item.prazo) - dataHoje) / 1000 / 60 / 60 / 24
                )}
              </td>
              <td>
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
