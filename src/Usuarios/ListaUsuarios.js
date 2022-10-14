import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { SelecUsuarios } from "./SelectUsuarios";

export const ListaUsuarios = () => {
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

  console.log(lista);
  const usuariosLista = lista.map((itens) => {
    return (
      <tr key={itens.id}>
        <td>{itens.nome}</td>
        <td>{itens.email}</td>
        <td>{itens.senha}</td>
        <td>{itens.nivel}</td>
      </tr>
    );
  });

  return (
    <>
      <SelecUsuarios />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Nível</th>
          </tr>
        </thead>
        <tbody>{usuariosLista}</tbody>
      </table>
    </>
  );
};
