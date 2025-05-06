// This component renders a dropdown for selecting company size.
const sizeOptions = [
  "", "1-10", "11-50", "51-200", "201-500",
  "501-1000", "1001-5000", "5001-10000", "10000+"
];

export default function SizeSelector({ size, onChange }) {
  return (
    <select
      name="size"
      value={size}
      onChange={onChange}
      className="input"
    >
      {sizeOptions.map((size) => (
        // Mapping through the size options and displaying them as options in the dropdown.
        <option key={size} value={size}>
          {size || "Any Size"}
        </option>
      ))}
    </select>
  );
}
