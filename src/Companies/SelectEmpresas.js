import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const SelectEmpresas = ({ value, onChange }) => {
  const [empresas, setEmpresas] = useState([]);
  useEffect(() => {
    onValue(ref(db, "empresas"), (snapshot) => {
      setEmpresas([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((itens) =>
          setEmpresas((antigoArray) => [...antigoArray, itens])
        );
      }
    });
  }, []);

  console.log(empresas);

  empresas.sort(function (a, b) {
    if (a.nome < b.nome) {
      return -1;
    } else {
      return true;
    }
  });

  const selectEmpresas = empresas.map((itens) => {
    return <option key={itens.id}>{itens.nome}</option>;
  });

  return (
    <select value={value} onChange={onChange} >
      <option disabled={+true} value=''>
        Empresa
      </option>
      {selectEmpresas}
    </select>
  );
};
