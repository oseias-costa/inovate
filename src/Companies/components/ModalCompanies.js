import { FactoryIcon } from "../Menu/Icons/FactoryIcon";

export const ModalCompanies = ({editar}) => {
    return(
        <div className={modal} onClick={handleOutsideClick}>
        <div className="Companies__Modal-container">
          <div className="Companies__Modal-top">
            {!editar ? (
              <h2>Adicionar Empresa</h2> 
            ) : (
              <h2>Editar Empresa</h2>
            )}
            <div className="Companies__Modal-topX" onClick={modalShow}>
              <CloseX />
            </div>
          </div>
        <div className="Companies__Modal-content">
        <div className="Companies__Modal-iconFactory"><FactoryIcon /></div>
        <div className="Companies__Modal-inputs">
          <span>Empresa</span>
            <input
              type="text"
              placeholder="Nome da Empresa"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <span>CNPJ</span>
            <input
              placeholder="CNPJ"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <span>Cidade</span>
            <input
            placeholder="Cidade"
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
      </div>
      </div>
      <div className="Companies__Modal-btns">
          {!editar ? (
            <>
            <button onClick={cancelarEdicao} className='Companies__Top-btnCancel'>Cancelar</button>
            <button onClick={escreverNaBase} className='Companies__Top-btnBlue'>Salvar</button>
            </>
          ) : (
            <>
              <button onClick={cancelarEdicao} className='Companies__Top-btnCancel'>Cancelar</button>
              <button onClick={salvarEdicao} className='Companies__Top-btnBlue'>Editar</button>
            </>
          )} 
      </div>
      </div>
      </div>

    )
}