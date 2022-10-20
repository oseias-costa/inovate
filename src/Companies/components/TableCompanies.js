export const TableCompanies = ({listaEmpresas}) => {
    return(
        <table className='Companies__Table'>
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
    )
}