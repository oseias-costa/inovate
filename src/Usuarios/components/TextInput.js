export const TextInput = ({ id, value, onchange, type }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={id}
        id={id}
        defaultValue={value}
        onChange={onchange}
      />
    </div>
  );
};
