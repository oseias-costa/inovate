import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Empresas } from "./Empresas";
import { Header } from "./Header";
import { Home } from "./Home";
import { Login } from "./Login";
import { NaoEncontrada } from "./NaoEncontrada";
import { Usuarios } from "./Usuarios";
import { Atividades } from "./Atividades/Atividades";
import {
  AuthProvider
} from "./context/UserAuthContext";
import { PrivateRoutes } from "./context/PrivateRoutes";
import { Perfil } from "./Perfil/Perfil";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/Login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="empresas" element={<Empresas />} />
            <Route path="Usuarios" element={<Usuarios />} />
            <Route path="Atividades" element={<Atividades />} />
            <Route path="Perfil" element={<Perfil />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
