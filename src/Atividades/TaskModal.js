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
    const [text, setText] = useState('');

    console.log('dados vindo:', editAtiv)
    const showModal = () => {
      modal == 'hidden' ? setModal('Tasks__Modal') : setModal('hidden')
    }
 
    useEffect(() => { 
        setText('excluir')
        if(editAtiv){getData(editAtiv)}
        if(deleteAtiv){deleteData(deleteAtiv)}          
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
  };

  let buttonForm;
      if (editar) {
          buttonForm = (
              <>
            <EnviarBotao id="Editar" onClick={saveEdit} />
            <EnviarBotao id="Cancelar" onClick={clearInputs} />
          </>
        );
      } else if (delet) {
        
        buttonForm = (
          <>
            <EnviarBotao id="Excluir" onClick={deletAtiv} />
            <EnviarBotao id="Cancelar" onClick={clearInputs} />
          </>
        );
      } else {
        buttonForm = (
          <>
            <EnviarBotao id="Adicionar" onClick={addAtividade} />
            <EnviarBotao id="Cancelar" onClick={clearInputs} />
          </>
        );
      }


  console.log('text', text)
    return(
        <div className={modal}>
        <div className="Companies__Modal-top">
            <h2>{text}</h2>
            <div className="Companies__Modal-topX">
              <CloseX />
            </div>
        </div>
        <div className="Tasks__Modal-container">
            <SelectEmpresas
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
            <TextInput
              id="Atividade"
              value={atividade}
              onChange={(e) => setAtividade(e.target.value)}
            />
            <TextInput
              id="Situaçãp"
              value={situacao}
              onChange={(e) => setSituacao(e.target.value)}
            />
            <SelecUsuarios
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
            />
            <FiltroSelect
              id="Status"
              data={StatusData}
              value={realizado}
              onChange={(e) => setRealizado(e.target.value)}
            />
            <FiltroSelect
              id="Frequência"
              data={FrequencyData}
              value={frequencia}
              onChange={(e) => setFrequencia(e.target.value)}
            />
            <input
              type="date"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
            />
            <RecebeDadosInput value={mes} />
            <RecebeDadosInput value={ano} />
            {buttonForm}
      
        </div>
      </div>
    )
}