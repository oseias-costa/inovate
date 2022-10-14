export const TextInput = ({ id, value, onchange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={id}
        id={id}
        defaultValue={value}
        onChange={onchange}
      />
    </div>
  );
};
