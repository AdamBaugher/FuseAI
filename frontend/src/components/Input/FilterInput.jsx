// A simple input field component to avoid repetition of input rendering logic.
export default function FilterInput({ name, value, onChange, placeholder }) {
    return (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
    );
  }
  