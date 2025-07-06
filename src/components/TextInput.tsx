export default function TextInput(
  props: {
    value: string;
    setValue: (newValue: string) => void;
    placeholder?: string;
  },
) {
  return (
    <input
      autocomplete="off"
      value={props.value}
      onInput={(e) => props.setValue(e.target.value)}
      placeholder={props.placeholder}
    />
  );
}
