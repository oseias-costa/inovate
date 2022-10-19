import { Head } from "../Components/Head";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import './Empresas.css'
import { DropMenu } from "../Components/DropMenu";

export const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);

  const [editarId, setEditarId] = useState("");
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cidade, setCidade] = useState("");
  const [editar, setEditar] = useState(false);
  const [clique, setClique] = useState(false);
  const [modal, setModal] = useState('hidden')
  const [closeDropMenu, setCloseDropMenu] = useState(false)

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

  const deletItemCallback = (itens) =>{
    deletarEmpresa(itens)
  }

  const editItemCallback = (itens) => {
    editarEmpresa(itens)
   
  }

  const selectEmpresas = empresas.map((itens) => {
    return <option key={itens.id}>{itens.nome}</option>;
  });

  const listaEmpresas = empresas.map((itens) => (
    <tr id={itens.id} key={itens.id}>
      <td>{itens.nome}</td>
      <td>{itens.cnpj}</td>
      <td>{itens.cidade}</td>
      <td>
        <DropMenu 
        itens={itens} 
        deletItemCallback={deletItemCallback}
        editItemCallback={editItemCallback} 
        closeDropMenu={closeDropMenu}
        />

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
    modalShow()
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
    modalShow()
  };

  const modalShow = () => {
    modal == 'hidden' ? setModal('CompaniesModal') : setModal('hidden')
  }

  const handlecloseDropMenu = (event) => {
    const currentEvent = event.target.value
    if(!currentEvent){
      setCloseDropMenu(true)
    }
  }

  return (
    <div onClick={handlecloseDropMenu}>
      <Head title="Inovate - Empresas" />
      <h1>Empresas</h1>
      <a onClick={modalShow}>Adicionar</a>
      <div className={modal}>
        <div className="CompaniesModal__container">
          {!editar ? (
            <h2>Adicionar Empresa</h2> 
          ) : (
            <h2>Editar Empresa</h2>
          )}
       <input
        type="text"
        placeholder="Nome da Empresa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="CNPJ"
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
      />
      <input
      placeholder="Cidade"
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />
      {!editar ? (
        <>
        <button onClick={escreverNaBase}>Salvar</button>
        <button onClick={cancelarEdicao}>Cancelar</button>
        </>
      ) : (
        <>
          <button onClick={salvarEdicao}>Salvar Edição</button>
          <button onClick={cancelarEdicao}>Cancelar</button>
        </>
      )} 
        </div>
      </div>
      <table className='companies'>
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
