import BooleanInput from "../../components/BooleanInput.tsx";
import CopyButton from "../../components/CopyButton.tsx";
import getVariant, { WritingParams } from "./unicodeStuff.ts";
import { createStore, unwrap } from "solid-js/store";

export default function Editor(
  tempProps: { text: string; current: WritingParams },
) {
  const [props, setProps] = createStore(tempProps);
  const replace = (s: string) => getVariant(s, props.current);

  const pressed = (e: InputEvent & { target: HTMLTextAreaElement }) => {
    if (e.data) {
      e.preventDefault();

      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      const newData = replace(e.data);
      const oldVal = unwrap(props).text;

      const updated = oldVal.slice(0, start) + newData + oldVal.slice(end);
      setProps("text", updated);

      const newCaret = start + (props.current.verlan ? 0 : newData.length);

      // Defer setting selection range
      setTimeout(() => {
        e.target.setSelectionRange(newCaret, newCaret);
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "min-height": "100%",
      }}
    >
      <BooleanInput
        value={props.current.verlan}
        setValue={(v) => {
          setProps("current", "verlan", v);
        }}
        label="verlan"
      />
      <textarea
        value={props.text}
        onInput={(e) => setProps("text", e.currentTarget.value)}
        onBeforeInput={pressed}
        style={{
          resize: "vertical",
          "min-width": "5rem",
          width: "100%",
          height: "5rem",
          "flex-grow": 1,
        }}
        autocapitalize="off"
        placeholder={replace(
          "Choisissez votre police dans la bibliothèque, PUIS écrivez",
        )}
      />
      <CopyButton text={props.text} />
    </div>
  );
}
