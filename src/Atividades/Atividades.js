import { useEffect, useState } from "react";
import { SelectEmpresas } from "../Empresas/SelectEmpresas";
import { SelecUsuarios } from "../Usuarios/SelectUsuarios";
import { EnviarBotao } from "./EnviarBotao";
import { FiltroSelect } from "./FiltroSelect";
import { ListaAtividades } from "./ListaAtividades";
import { RecebeDadosInput } from "./RecebeDadosInput";
import { TextInput } from "./TextInput";
import { uid } from "uid";
import { ref, remove, serverTimestamp, set, update } from "firebase/database";
import { db } from "../firebase";
import { MonthData, FrequencyData, StatusData } from "./FilterData/FilterData";

export const Atividades = () => {
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

  return (
    <div>
      <p>{idedit}</p>
      <h1>Atividades</h1>
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
      <p>{responsavel}</p>
      <p>{mes}</p>
      <p>{id}</p>
      <ListaAtividades onSubmit={getData} deletAtiv={deleteData} />
    </div>
  );
};
