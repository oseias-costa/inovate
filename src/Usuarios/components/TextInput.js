export const TextInput = ({ id, value, onchange, type, onBlur, name }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={id}
        id={id}
        defaultValue={value}
        onChange={onchange}
        onBlur={onBlur}
        name={name}
      />
    </div>
  );
};
