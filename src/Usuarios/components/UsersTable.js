import { onValue, ref, remove } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import './UsersTable.css'
import { DropMenuUser } from "./DropMenuUser";
import { UserCircle } from "../../Components/icons/UserCircle";

export const UsersTable = ({nivel}) => {
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

  const deletItemCallback =  (itens) => {
    delUser(itens)
  }
    const delUser = (user) => {
      remove(ref(db, `usuarios/${user.id}`));
   }
   const admDelete = nivel === 'Usuário' ? '' : deletItemCallback

  const usuariosLista = lista.map((itens) => {
    return (
      <tr key={itens.id}>
        <td>{itens.image ? <img src={itens.image} className="Users__Table-photo" /> : <UserCircle />}</td>
        <td>{itens.nome}</td>
        <td>{itens.email}</td>
        <td>{ nivel === "Administrador" ? itens.senha : '***********'}</td>
        <td>{itens.nivel}</td>
        <td><DropMenuUser itens={itens} deletItemCallback={admDelete}/></td>
      </tr>
    );
  });

  

  return (
    <>
      <table className="Users__Table">
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{usuariosLista}</tbody>
      </table>
    </>
  );
};
