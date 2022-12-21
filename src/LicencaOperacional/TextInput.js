export const TextInput = ({ value, onChange, id }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      id={id}
      placeholder={id}
    />
  );
};
