import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./context/UserAuthContext";
import { auth } from "./firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

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
        console.log(err.message);
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
  const registrar = async () => {
    await createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        console.log(error.message);
      }
    );
    limpaCampo();
  };

  const limpaCampo = () => {
    setEmail("");
    setPassword("");
  };

  if (currentUser) {
    return navigate("/");
  }

  return (
    <div>
      <h1>Entrar</h1>
      {error}
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={handleOnChangeEmail}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handleOnChangePassword}
      />
      <br />
      <button onClick={entrar}>Login</button>
      <button onClick={registrar}>Registrar</button>
    </div>
  );
};
