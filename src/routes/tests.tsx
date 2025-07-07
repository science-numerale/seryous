import { createStore } from "solid-js/store";
import { For } from "solid-js";
import Select from "../components/Select.tsx";
import { createSignal } from "solid-js";

type Todos = Record<number, string>;

export default function App() {
  const [val, setVal] = createSignal<string | undefined>(undefined);

  return (
    <div>
      {JSON.stringify(val())}
      <Select
        value={val()}
        setValue={setVal}
        choices={{ value: "coucou", display: "1" }}
        placeHolder="place"
      />
    </div>
  );
}
