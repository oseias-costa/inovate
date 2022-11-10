export const NivelSelect = ({ value, onchange, onBlur, name, className }) => {
  return (
    <select value={value} onChange={onchange} onBlur={onBlur} name={name} className={className}>
      <option disable={+true} select={+true} value="">
        Selecione
      </option>
      <option>Administrador</option>
      <option>Usuário</option>
    </select>
  );
};
