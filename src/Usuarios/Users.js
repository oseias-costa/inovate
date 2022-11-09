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
import { useContext } from "react";
import { AuthContext } from "../context/UserAuthContext";

export const Users = () => {
  const { userLogged } = useContext(AuthContext)
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nivel, setNivel] = useState("");
  const [err, setErr] = useState("");
  const [modal, setModal] = useState('hidden')


  useEffect(() => {
    const id = uid();
    setId(id);
    setSenha(id)
  }, []);

  
 const checkFields = () => {

  const check = (field) => {
  const eachField =  field !== '' && field.length >= 6
  return eachField
}

  const nomeUser = check(nome) ? true : setErr('nao esta ok')
  const senhaUser = check(senha) 
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailUser = pattern.test(email)
  const nivelUser = nivel !== ''
  console.log(nivelUser)
 }

  const addUser = async () => {
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


const admButton = userLogged[0].nivel === 'Usuário' ? '' : modalShow
const admClass = userLogged[0].nivel === 'Usuário' ? 'btn-grey' : 'btn-blue'
  
  return (
    <div>
      <Head title="Inovate - Usuários" />
      <div className="Users__Top">
        <h1>Usuários</h1>
        <a onClick={admButton} className={admClass}>Adicionar</a>
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
              <p>{err}</p>
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
              type='Email'
            />
            <SpanInput content='Senha' />
            <TextInput id="Senha" value={senha} onchange={e => setSenha(e.target.value)} readonly />
            <SpanInput content='Nivel' />
            <NivelSelect value={nivel} onchange={(e) => setNivel(e.target.value)} />
            </div>
            </div>
            <div className="Users__Modal-btns">
              <button onClick={modalShow} className='btn-grey'>Cancelar</button>
              <button onClick={checkFields} className='btn-blue'>Adicionar</button>
            </div>
        </div>
      </div>
      <UsersTable nivel={userLogged[0].nivel} />
    </div>
  );
};
