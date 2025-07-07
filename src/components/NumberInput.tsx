import { JSX } from "solid-js";

export default function NumberInput(
  props: {
    label: JSX.Element;
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
  },
) {
  return (
    <label>
      <input
        type="number"
        value={props.value}
        onInput={(e) => props.setValue(+e.target.value)}
        min={props.min}
        max={props.max}
        style={{ width: "4rem" }}
        autocomplete="off"
      />{" "}
      {props.label}
    </label>
  );
}
