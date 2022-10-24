import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { SelectEmpresas } from "../Companies/SelectEmpresas";
import { db } from "../firebase";
import { TableTasks } from "./TableTasks";
import { FiltroSelect } from "./FiltroSelect";
import {
  MonthData,
  FrequencyData,
  StatusData,
  YearData
} from "./FilterData/FilterData";
import { EnviarBotao } from "./EnviarBotao";
import { SelecUsuarios } from "../Usuarios/components/SelectUsuarios";

export const ListaAtividades = ({ onSubmit, deletAtiv }) => {
  const [company, setCompany] = useState("");
  const [responsible, setResponsible] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [frequency, setFrequency] = useState("");
  const [list, setList] = useState([]);
  const [editarAtividade, setEditarAtividade] = useState("");

  useEffect(() => {
    onValue(ref(db, "atividades"), (snapshot) => {
      setList([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((lista) => {
          setList((oldArray) => [...oldArray, lista]);
        });
      }
    });
  }, []);

  const busca = () =>
    list.filter(
      (item) =>
        item.realizado.includes(status) &&
        item.empresa.includes(company) &&
        item.responsavel.includes(responsible) &&
        item.mes.includes(month) &&
        item.ano.toString().includes(year) &&
        item.frequencia.includes(frequency)
    );

  const callback = (item) => {
    setEditarAtividade(item);
    onSubmit(item);
  };
  const deletItem = (item) => {
    deletAtiv(item);
    console.log('lista de atividades', item)
  };

  const cleanFilter = () => {
    setCompany("");
    setResponsible("");
    setFrequency("");
    setMonth("");
    setYear("");
    setStatus("");
  };

  return (
    <div>
      <SelectEmpresas
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <SelecUsuarios
        value={responsible}
        onChange={(e) => setResponsible(e.target.value)}
      />

      <FiltroSelect
        id="Mês"
        data={MonthData}
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <FiltroSelect
        id="Frequência"
        data={FrequencyData}
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />
      <FiltroSelect
        id="Status"
        data={StatusData}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <FiltroSelect
        id="Ano"
        data={YearData}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <EnviarBotao id="Limpar" onClick={cleanFilter} />

      <TableTasks
        data={busca(list)}
        callback={callback}
        deletItem={deletItem}
      />
    </div>
  );
};
