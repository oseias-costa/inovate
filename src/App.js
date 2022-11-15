import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Empresas } from "./Companies/Empresas";
import { Home } from "./Home";
import { Login } from "./Login";
import { NaoEncontrada } from "./NaoEncontrada";
import { Atividades } from "./Atividades/Atividades";
import { AuthContext, AuthProvider } from "./context/UserAuthContext";
import { PrivateRoutes } from "./context/PrivateRoutes";
import { Perfil } from "./Perfil/Perfil";
import { MenuSideBar } from "./Menu/MenuSideBar";
import { Header } from './Header/Header'
import { useContext, useEffect, useState } from "react";
import { Users } from "./Usuarios/Users";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className='LayoutPrincipal'>
          <div className="MenuSideBar">
            <MenuSideBar />
          </div>
          <div className="MainContainer">
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="Empresas" element={<Empresas />} />
                <Route path="Usuarios" element={<Users />} />
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
