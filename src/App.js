import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Empresas } from "./Empresas";
import { Header } from "./Header/Header";
import { Home } from "./Home";
import { Login } from "./Login";
import { NaoEncontrada } from "./NaoEncontrada";
import { Usuarios } from "./Usuarios";
import { Atividades } from "./Atividades/Atividades";
import { AuthProvider } from "./context/UserAuthContext";
import { PrivateRoutes } from "./context/PrivateRoutes";
import { Perfil } from "./Perfil/Perfil";
import { MenuSideBar } from "./menu/MenuSideBar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="LayoutPrincipal">
          <div className="MenuSideBar"><MenuSideBar /></div>
          <div className="MainContainer">
          <Routes>
              <Route path="/Login" element={<Login />} />
              <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="empresas" element={<Empresas />} />
              <Route path="Usuarios" element={<Usuarios />} />
              <Route path="Atividades" element={<Atividades />} />
              <Route path="*" element={<NaoEncontrada />} />
              <Route path="Perfil" element={<Perfil />} />
            </Route>
          </Routes>
          </div>
        </div>
        
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
