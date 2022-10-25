import { RecebeDadosInput } from "./RecebeDadosInput";
import { TextInput } from "./TextInput";
import { uid } from "uid";
import { get, ref, remove, serverTimestamp, set, update } from "firebase/database";
import { db } from "../firebase";
import { MonthData, FrequencyData, StatusData } from "./components/FilterData";
import { SelecUsuarios } from "../Usuarios/components/SelectUsuarios";
import { useEffect, useState } from "react";
import { SelectEmpresas } from "../Companies/SelectEmpresas";
import { EnviarBotao } from "./EnviarBotao";
import { FiltroSelect } from "./FiltroSelect";
import './Tasks.css'
import { CloseX } from "../Components/icons/CloseX";
import { TitleModal } from "./components/TitleModal";
import './Tasks__Modal.css'
import { SpanModal } from "./components/SpanModal";

export const TaskModal = ({open, handleModal, deleteAtiv, editAtiv}) => {
    const [id, setId] = useState("");
    const [idedit, setIdEdit] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [atividade, setAtividade] = useState("");
    const [situacao, setSituacao] = useState("");
    const [frequencia, setFrequencia] = useState("");
    const [prazo, setPrazo] = useState("");
    const [realizado, setRealizado] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [editar, setEditar] = useState(false);
    const [delet, setDelet] = useState(false);
    const [modal, setModal] = useState('hidden');
    const [text, setText] = useState('Adicionar Atividade');

    console.log('dados vindo:', editAtiv)
    const showModal = () => {
      modal == 'hidden' ? setModal('Tasks__Modal') : setModal('hidden')
    }
 
    useEffect(() => { 
      if(editAtiv){
        getData(editAtiv)
        setText('Editar Atividade')
        }
        if(deleteAtiv){
          deleteData(deleteAtiv)
          setText('Excluir Atividade')
        }          
    },[editAtiv, deleteAtiv])

  
    useEffect(()=> {
        if(open) {
            showModal()
        }
    },[open])

  const novaData = new Date(prazo);
  useEffect(() => {
    const dadosAno = novaData.getFullYear();
    if (dadosAno) {
      setAno(dadosAno);
    }
  });

  useEffect(() => {
    const pegaMes = MonthData[novaData.getMonth() + 1];
    if (pegaMes) {
      return setMes(pegaMes);
    }
  });

  useEffect(() => {
    const id = uid();
    setId(id);
  }, []);

  const addAtividade = () => {
    set(ref(db, `atividades/${id}`), {
      id,
      empresa,
      atividade,
      situacao,
      responsavel,
      realizado,
      frequencia,
      prazo,
      mes,
      ano,
      createdAt: serverTimestamp()
    });
    clearInputs();
  };

  const getData = (item) => {
    setDelet(false);
    setIdEdit(item.id);
    setEmpresa(item.empresa);
    setAtividade(item.atividade);
    setSituacao(item.situacao);
    setResponsavel(item.responsavel);
    setRealizado(item.realizado);
    setMes(item.mes);
    setAno(item.ano);
    setFrequencia(item.frequencia);
    setPrazo(item.prazo);
    setEditar(true);
  };

  const deleteData = (item) => {
    setEditar(false);
    setIdEdit(item.id);
    setEmpresa(item.empresa);
    setAtividade(item.atividade);
    setSituacao(item.situacao);
    setResponsavel(item.responsavel);
    setRealizado(item.realizado);
    setMes(item.mes);
    setAno(item.ano);
    setFrequencia(item.frequencia);
    setPrazo(item.prazo);
    setDelet(true);
  };

  const saveEdit = () => {
    update(ref(db, `atividades/${idedit}`), {
      id: idedit,
      empresa,
      atividade,
      realizado,
      situacao,
      responsavel,
      frequencia,
      prazo,
      mes,
      ano
    });
    setEditar(false);
    clearInputs();
  };

  const deletAtiv = () => {
    remove(ref(db, `atividades/${idedit}`));
    setDelet(false);
    clearInputs();
  };



  const clearInputs = () => {
    handleModal(open)
    showModal()
    setEmpresa("");
    setAtividade("");
    setSituacao("");
    setResponsavel("");
    setRealizado("");
    setMes("");
    setAno("");
    setFrequencia("");
    setPrazo("");
    setIdEdit("");
    setEditar(false);
    setDelet(false);
    setText('Adicionar Atividade')
  };

  let buttonForm;
      if (editar) {
          buttonForm = (
              <>
            <EnviarBotao id="Editar" onClick={saveEdit} className='btn-blue' />
            <EnviarBotao id="Cancelar" onClick={clearInputs} className='btn-grey' />
          </>
        );
      } else if (delet) {
        
        buttonForm = (
          <>
            <EnviarBotao id="Excluir" onClick={deletAtiv} className='btn-blue' />
            <EnviarBotao id="Cancelar" onClick={clearInputs} className='btn-grey' />
          </>
        );
      } else {
        buttonForm = (
          <>
            <EnviarBotao id="Adicionar" onClick={addAtividade} className='btn-blue' />
            <EnviarBotao id="Cancelar" onClick={clearInputs} className='btn-grey' />
          </>
        );
      }

      const handleOutsideClick = (event) => {
        if(event.target === event.currentTarget){
          clearInputs()
        }
      }

    return(
        <div className={modal} onClick={handleOutsideClick}>
        <div className="Tasks__Modal-container">
        <div className="Companies__Modal-top">
            <TitleModal text={text} />
            <div className="Companies__Modal-topX" onClick={clearInputs}>
              <CloseX />
            </div>
        </div>
        <div className="Tasks__Modal-content">
          <div><p>Ilustracao</p></div>
          <div className="Tasks__Modal-inputs">
          <SpanModal value='Empresa' />
            <SelectEmpresas
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
            <SpanModal value='Atividade' />
            <TextInput
              id="Atividade"
              value={atividade}
              onChange={(e) => setAtividade(e.target.value)}
            />
            <SpanModal value='Situação' />
            <textarea 
            value={situacao} 
            onChange={(e) => setSituacao(e.target.value)} 
            />
            <SpanModal value='Responsável' />
            <SelecUsuarios
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
            />
            <SpanModal value='Status' />
            <FiltroSelect
              id="Status"
              data={StatusData}
              value={realizado}
              onChange={(e) => setRealizado(e.target.value)}
            />
            <SpanModal value='Frequência' />
            <FiltroSelect
              id="Frequência"
              data={FrequencyData}
              value={frequencia}
              onChange={(e) => setFrequencia(e.target.value)}
            />
            <SpanModal value='Prazo' />
            <input
              type="date"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
            />
            <SpanModal value='Mês' />
            <RecebeDadosInput value={mes} />
            <SpanModal value='Ano' />
            <RecebeDadosInput value={ano} />
            </div>
            </div>
            <div className="Tasks__Modal-btns">
              <div>{buttonForm}</div>
            </div>
      
        </div>
      </div>
    )
}