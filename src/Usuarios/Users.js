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
import { Spinner } from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const { userLogged } = useContext(AuthContext)
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nivel, setNivel] = useState("");
  const [errorCheck, setErrorCheck] = useState({
    Nome: false,
    Email: false,
    Senha: false,
    Nivel: false,
  });
  const [modal, setModal] = useState('hidden')
  const [ showLoading, setShowLoading ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const id = uid();
    setId(id);
  }, []);

 const handleCheckEmail = (e) => {

    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailUser = pattern.test(e.target.value)
 
    let newProp = errorCheck

    if(!emailUser){
      newProp[e.target.name] = 'O email não é válido' 
      setErrorCheck({...newProp})
    } else if(e.target.value === '') {
      newProp[e.target.name] = 'O email não pode estar vazio' 
      setErrorCheck({...newProp})
    } else {
      newProp[e.target.name] = true 
      setErrorCheck({...newProp})
    }
 }

 const handleCheckFields = (e) => {

  let newProp = errorCheck

  if(e.target.value === ''){
      newProp[e.target.name] = `O campo não pode estar vazio`
      setErrorCheck({...newProp,})
  } else if (e.target.value.length < 6) {
      newProp[e.target.name] = 'Por favor insira no mínimo 6 caracteres'
      setErrorCheck({...newProp})
  } else {
      newProp[e.target.name] = true
      setErrorCheck({...newProp})
    }
 }

 const handleCheckSelect = (e) => {

  let newProp = errorCheck
  if(e.target.value === ''){
    newProp[e.target.name] = 'Por favor selecione um nível'
      setErrorCheck({...newProp})
  } else {
    newProp[e.target.name] = true
      setErrorCheck({...newProp})
  }
 }

  const addUser = async () => {
    if(errorCheck.Nome && errorCheck.Senha && errorCheck.Email && errorCheck.Nivel){
      setShowLoading(true)
    await createUserWithEmailAndPassword(auth, email, senha).catch((error) =>{
      console.log(error.message)
      setShowLoading(false)
    }
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
    setShowLoading(false)
    navigate('/')
    }
    setShowLoading(false)
    
}
  const limpaInput = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setNivel("");
    setErrorCheck({
      Nome: false,
      Email: false,
      Senha: false,
      Nivel: false,
    })
    setShowLoading(false)
  };

  const modalShow = () => {
    modal === 'hidden' ?  setModal('Users__Modal') : setModal('hidden')
    limpaInput()
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
            </div>
            <div className="Users__Modal-inputs">
            <SpanInput content='Nome' />
            <TextInput
              id="Nome"
              value={nome}
              onchange={(e) => setNome(e.target.value)}
              onBlur={e => handleCheckFields(e)}
              name='Nome'
            />
            <p className='Users__Check-error'>{ errorCheck.Nome !== '' && errorCheck.Nome}</p>
            <SpanInput content='Email' />
            <TextInput
              id="Email"
              value={email}
              onchange={(e) => setEmail(e.target.value)}
              type='Email'
              onBlur={e => handleCheckEmail(e)}
              name='Email'
            />
            <p className='Users__Check-error'>{ errorCheck.Email !== '' && errorCheck.Email}</p>
            <SpanInput content='Senha' />
            <TextInput 
              id="Senha" 
              name='Senha' 
              value={senha} 
              onchange={e => setSenha(e.target.value)} 
              onBlur={e => handleCheckFields(e)}
              readonly 
            />
            <p className='Users__Check-error'>{ errorCheck.Senha !== '' && errorCheck.Senha}</p>
            <SpanInput content='Nivel' />
            <NivelSelect 
              value={nivel} 
              onchange={(e) => setNivel(e.target.value)} 
              name='Nivel'
              onBlur={handleCheckSelect}
            />
            <p className='Users__Check-error'>{ errorCheck.Nivel !== '' && errorCheck.Nivel}</p>
            </div>
            </div>
            <div className="Users__Modal-btns">
              <button onClick={modalShow} className='btn-grey'>Cancelar</button>
              <button onClick={addUser} className='btn-blue'>Adicionar</button>
            </div>
        </div>
      </div>
      <UsersTable nivel={userLogged[0].nivel} />
      { showLoading && <Spinner /> }
    </div>
  );
};
