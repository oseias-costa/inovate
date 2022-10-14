import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const SelecUsuarios = ({ value, onChange }) => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    onValue(ref(db, "usuarios"), (snapshot) => {
      setLista([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((lista) => {
          setLista((oldArray) => [...oldArray, lista]);
        });
      }
    });
  }, []);

  lista.sort(function (a, b) {
    if (a.nome < b.nome) {
      return -1;
    } else {
      return true;
    }
  });

  const SelectUsuarios = lista.map((itens, index) => {
    return <option key={index}>{itens.nome}</option>;
  });
  return (
    <>
      <select value={value} onChange={onChange}>
        <option disabled={+true} value="">
          Responsável
        </option>
        {SelectUsuarios}
      </select>
    </>
  );
};
