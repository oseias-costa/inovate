import { Head } from "../Components/Head";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import styles from './Empresas.module.css'
import { DropMenu } from "../Components/DropMenu";

export const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);

  const [editarId, setEditarId] = useState("");
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cidade, setCidade] = useState("");
  const [editar, setEditar] = useState(false);
  const [clique, setClique] = useState(false);

  const escreverNaBase = () => {
    const id = uid();
    set(ref(db, `empresas/${id}`), {
      id,
      nome,
      cnpj,
      cidade
    });
    setClique(true);
    limparInput();
    setClique(false);
  };
  useEffect(() => {
    onValue(ref(db, "empresas"), (snapshot) => {
      setEmpresas([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((itens) =>
          setEmpresas((antigoArray) => [...antigoArray, itens])
        );
      }
    });
  }, [clique]);

  console.log(empresas);

  empresas.sort(function (a, b) {
    if (a.nome < b.nome) {
      return -1;
    } else {
      return true;
    }
  });

  const selectEmpresas = empresas.map((itens) => {
    return <option key={itens.id}>{itens.nome}</option>;
  });

  const listaEmpresas = empresas.map((itens) => (
    <tr id={itens.id} key={itens.id}>
      <td>{itens.nome}</td>
      <td>{itens.cnpj}</td>
      <td>{itens.cidade}</td>
      <td>
        <button onClick={() => deletarEmpresa(itens)}>Deletar</button>
        <button onClick={() => editarEmpresa(itens)}>Editar</button>
      </td>
    </tr>
  ));

  const deletarEmpresa = (itens) => {
    remove(ref(db, `empresas/${itens.id}`));
  };

  const limparInput = () => {
    setNome("");
    setCidade("");
    setCnpj("");
    setEditarId("");
  };

  const editarEmpresa = (itens) => {
    setEditar(true);
    setEditarId(itens.id);
    setNome(itens.nome);
    setCnpj(itens.cnpj);
    setCidade(itens.cidade);
  };

  const salvarEdicao = () => {
    update(ref(db, `/empresas/${editarId}`), {
      id: editarId,
      nome,
      cnpj,
      cidade
    });
    setEditar(false);
    limparInput();
    console.log(editar);
  };

  const cancelarEdicao = () => {
    setEditar(false);
    limparInput();
  };

  return (
    <div>
      <Head title="Inovate - Empresas" />
      <h1>Empresas</h1>
      <DropMenu />
      {/* <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />
      <br />
      {!editar ? (
        <button onClick={escreverNaBase}>Salvar</button>
      ) : (
        <>
          <button onClick={salvarEdicao}>Salvar Edição</button>
          <button onClick={cancelarEdicao}>Cancelar</button>
        </>
      )}  */}

      <table className={styles.companies}>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>CNPJ</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{listaEmpresas}</tbody>
      </table>

      <br />
    </div>
  );
};
