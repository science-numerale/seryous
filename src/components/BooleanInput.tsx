import { JSX } from "solid-js";

export default function BooleanInput(
  props: {
    value: boolean;
    setValue: (value: boolean) => void;
    label: JSX.Element;
  },
) {
  return (
    <label>
      <input
        type="checkbox"
        checked={props.value}
        onChange={() => props.setValue(!props.value)}
      />
      {props.label}
    </label>
  );
}
