import { useEffect, useState } from "react";
import { NivelSelect } from "./NivelSelect";
import { TextInput } from "./TextInput";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { UploadFoto } from "./UploadFoto";
import { ListaUsuarios } from "./ListaUsuarios";
import { Upload } from "./Upload";

export const AddUsuarios = () => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nivel, setNivel] = useState("");

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
  };

  const limpaInput = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setNivel("");
  };

  return (
    <div>
      <p>Add Usuarios</p>
      <TextInput
        id="Nome"
        value={nome}
        onchange={(e) => setNome(e.target.value)}
      />
      <TextInput
        id="Email"
        value={email}
        onchange={(e) => setEmail(e.target.value)}
      />
      <TextInput id="Senha" value={senha} readonly />
      <NivelSelect value={nivel} onchange={(e) => setNivel(e.target.value)} />
      <button onClick={addUsuario}>Adicionar</button>
      <br />
      <br />
      <br />
      <UploadFoto id={id} />
      <ListaUsuarios />
      <Upload />
    </div>
  );
};
