type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function StyleSelector({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="style1">Style 1</option>
      <option value="style2">Style 2</option>
      <option value="style3">Style 3</option>
      <option value="style4">Style 4</option>
      <option value="style5">Style 5</option>
    </select>
  );
}