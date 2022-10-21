import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/UserAuthContext";
import { auth, db, secondaryApp } from "../../firebase";
import { PhotoUser } from "../../Header/PhotoProfile";
import './UsersTable.css'
import {SpanInput} from './SpanInput'
import { DropMenuUser } from "./DropMenuUser";
import { deleteUser, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

export const UsersTable = () => {
  const { userLogged } = useContext(AuthContext)
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

  const deletItemCallback = (itens) => {
    console.log(itens)
    deleteUser(itens)
  }
   const deleteUser = (itens) => {
    signInWithEmailAndPassword(auth, itens.email, itens.senha)
    .then(res => console.log('resposta: ', res))

    const user = auth.currentUser;
    deleteUser(user).then(() => {
      // User deleted
      console.log('usuario deletado')
    }).catch((error) => {
      // An error ocurred
      // ...
    });



   }

  const usuariosLista = lista.map((itens) => {

    console.log(itens.id)
    return (
      <tr key={itens.id}>
        <td><img src={itens.image} className="Users__Table-photo" /></td>
        <td>{itens.nome}</td>
        <td>{itens.email}</td>
        <td>{ userLogged[0].nivel === "Administrador" ? itens.senha : '***********'}</td>
        <td>{itens.nivel}</td>
        <td><DropMenuUser itens={itens} deletItemCallback={deletItemCallback}/></td>
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
