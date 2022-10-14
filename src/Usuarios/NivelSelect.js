export const NivelSelect = ({ value, onchange }) => {
  return (
    <select value={value} onChange={onchange}>
      <option disable={+true} select={+true} value="">
        Selecione
      </option>
      <option>Administrador</option>
      <option>Usuário</option>
    </select>
  );
};
