export const TabelaAtividades = ({ data, callback, deletItem }) => {
  const dataHoje = new Date();
  console.log("", dataHoje);

  const difference = (item, dataHoje) => {
    const past = new Date(item).getTime();
    return past;
  }; 
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Atividade</th>
            <th>Situação</th>
            <th>Responsável</th>
            <th>Realizado</th>
            <th>Frequência</th>
            <th>Prazo</th>
            <th>Dias</th>
            <th>Mês</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} id={item.id}>
              <td>{item.empresa}</td>
              <td>{item.atividade}</td>
              <td>{item.situacao}</td>
              <td>{item.responsavel}</td>
              <td>{item.realizado}</td>
              <td>{item.frequencia}</td>
              <td>{item.prazo}</td>
              <td>
                {Math.ceil(
                  (difference(item.prazo) - dataHoje) / 1000 / 60 / 60 / 24
                )}
              </td>
              <td>{item.mes}</td>
              <td>{item.ano}</td>
              <td>
                <button onClick={() => callback(item)}>Editar</button>
                <button onClick={() => deletItem(item)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
