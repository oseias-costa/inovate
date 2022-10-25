import { signInWithEmailAndPassword,
} from "@firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { InputLogin } from "./Components/InputText";
import { AuthContext } from "./context/UserAuthContext";
import { auth } from "./firebase";
import './Login.css'
import { SpanInput } from "./Usuarios/components/SpanInput";
import { Logo } from './Components/Logo'

export const Login = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [ errorStyle, setErrorStyle ] = useState('hidden')
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const entrar = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        limpaCampo();
        setError("");
        return navigate("/");
      })
      .catch((err) => {
        setErrorStyle('Login__Form-error')
        switch (err.message) {
          case "Firebase: Error (auth/invalid-email).":
            setError("Email inválido");
            break;
          case "Firebase: Error (auth/user-not-found).":
            setError("Usuário não encontrado");
            break;
          case "Firebase: Error (auth/wrong-password).":
            setError("Senha inválida");
            break;
          default:
            setError("Erro, contate o administrador");
        }
      });
  };

  const limpaCampo = () => {
    setEmail("");
    setPassword("");
  };

  if (currentUser) {
    return navigate("/");
  }

  return (
    <div className="Login">
      <div className="Login__Container">
        <div className="Login__Logo">
            <Logo fill='#fff'/>
        </div>
        <div className="Login__Form">
            <p className={errorStyle}>{error}</p>
            <h1>Entrar</h1>
            <SpanInput content='Email' />
            <InputLogin 
            type='email'
            value={email}
            onChange={handleOnChangeEmail}
            />
            <SpanInput content='Senha' />
            <InputLogin 
            type='password'
            value={password}
            onChange={handleOnChangePassword}
            />
            <button onClick={entrar} className='btn-blue'>Login</button>
        </div>
      </div>
    </div>
  );
};
