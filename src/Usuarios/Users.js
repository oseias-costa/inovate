import { useEffect, useState } from "react";
import { NivelSelect } from "./components/NivelSelect";
import { TextInput } from "./components/TextInput";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { UsersTable } from "./components/UsersTable";
import { Head } from "../Components/Head";
import './Users.css'
import { CloseX } from "../Components/icons/CloseX";
import { SpanInput } from "./components/SpanInput";
import { AddUserIcon } from "./components/AddUserIcon";

export const Users = () => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nivel, setNivel] = useState("");
  const [modal, setModal] = useState('hidden')

  const [file, setFile] = useState("");

  useEffect(() => {
    const id = uid();
    setSenha(id);
    setId(id);
  }, []);

  const addUsuario = async () => {
    await createUserWithEmailAndPassword(auth, email, senha).catch((error) =>
      console.log(error.message)
    );
    set(ref(db, `/usuarios/${id}`), {
      id,
      nome,
      email,
      senha,
      nivel
    });
    limpaInput();
    modalShow()
  };

  const limpaInput = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setNivel("");
  };

  const modalShow = () => {
    modal === 'hidden' ?  setModal('Users__Modal') : setModal('hidden')
  }

  return (
    <div>
      <Head title="Inovate - Usuários" />
      <div className="Users__Top">
        <h1>Usuários</h1>
        <a onClick={modalShow} className='btn-blue'>Adicionar</a>
      </div>
      <div className={modal}>
        <div className="Users__Modal-container">
          <div className="Users__Modal-top">
            <h2>Adicionar Usuário</h2>
            <div className="Users__Modal-topX" onClick={modalShow}>
              <CloseX />
            </div>
          </div>
          <div className="Users__Modal-content">
            <div className="Users__Modal-iconUsers">
              <AddUserIcon />
            </div>
            <div className="Users__Modal-inputs">
            <SpanInput content='Nome' />
            <TextInput
              id="Nome"
              value={nome}
              onchange={(e) => setNome(e.target.value)}
            />
            <SpanInput content='Email' />
            <TextInput
              id="Email"
              value={email}
              onchange={(e) => setEmail(e.target.value)}
            />
            <SpanInput content='Senha' />
            <TextInput id="Senha" value={senha} readonly />
            <SpanInput content='Nivel' />
            <NivelSelect value={nivel} onchange={(e) => setNivel(e.target.value)} />
            </div>
            </div>
            <div className="Users__Modal-btns">
              <button onClick={modalShow} className='btn-grey'>Cancelar</button>
              <button onClick={addUsuario} className='btn-blue'>Adicionar</button>
            </div>
        </div>
      </div>
      <UsersTable />
    </div>
  );
};
