import { For } from "solid-js";
import { Index } from "solid-js";
import { JSX } from "solid-js";
import { Show } from "solid-js/web";

export default function Select(
  props:
    & ({
      value: string;
      setValue: (value: string) => void;
    } | {
      value?: string;
      setValue: (value?: string) => void;
      placeHolder: JSX.Element;
    })
    & {
      choices: Record<string, JSX.Element>;
    },
) {
  return (
    <select
      value={props.value === undefined ? "" : "v" + props.value}
      onInput={(e) =>
        props.setValue(
          e.target.value === ""
            ? undefined as unknown as string
            : e.target.value.slice(1),
        )}
    >
      <Show when={props.placeHolder !== undefined}>
        <option value="">{props.placeHolder}</option>
      </Show>
      <Index each={Object.entries(props.choices)}>
        {(choice) => <option value={"v" + choice()[0]}>{choice()[1]}</option>}
      </Index>
    </select>
  );
}
