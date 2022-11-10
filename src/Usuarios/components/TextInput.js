export const TextInput = ({ id, value, onchange, type, onBlur, name, className }) => {
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
        className={className}
      />
    </div>
  );
};
