import { createStore, Store } from "solid-js/store";
import { Component } from "solid-js";
import { Index } from "solid-js/web";
import getVariant, {
  alphabetsDB,
  modifiersDB,
  WritingParams,
} from "./unicodeStuff.ts";
import { Show } from "solid-js";
import { createEffect } from "solid-js";

function DBView<D extends Record<string, Record<string, string>>>(
  props: {
    title: string;
    db: D;
    onSelect: (path: [keyof D, keyof D[keyof D]]) => void;
    display: Component<{ path: [keyof D, keyof D[keyof D]] }>;
  },
) {
  return (
    <div>
      <h3>{props.title}</h3>
      <Index each={Object.entries(props.db)}>
        {(entry) => (
          <ul>
            <Index each={Object.keys(entry()[1])}>
              {(key) => (
                <li
                  onClick={() => props.onSelect([entry()[0], key()])}
                  style={{ cursor: "pointer" }}
                >
                  <props.display path={[entry()[0], key()]} />
                </li>
              )}
            </Index>
          </ul>
        )}
      </Index>
    </div>
  );
}

export default function Library(props: { params: Store<WritingParams> }) {
  const [params, setParams] = createStore(props.params);

  const ActiveMark = () => <strong style={{ color: "green" }}>(actif)</strong>;

  let wasVerlan = params.alphabet.variant === "srevnela";
  createEffect(() => {
    if (params.alphabet.variant === "srevnela") {
      setParams("verlan", true);
      wasVerlan = true;
    } else {
      if (wasVerlan) setParams("verlan", false);
      wasVerlan = false;
    }
  });

  return (
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <DBView
        title="Alphabets"
        db={alphabetsDB}
        onSelect={(e) => {
          setParams("alphabet", "font", e[0]);
          setParams("alphabet", "variant", e[1]);
        }}
        display={(props) => (
          <>
            {getVariant(`${props.path[0]} (${props.path[1]})`, {
              alphabet: { font: props.path[0], variant: props.path[1] },
              modifiers: [],
              verlan: false,
            })}
            <Show
              when={params.alphabet.font === props.path[0] &&
                params.alphabet.variant === props.path[1]}
            >
              {" "}
              <ActiveMark />
            </Show>
          </>
        )}
      />
      <DBView
        title="Modificateurs"
        db={modifiersDB}
        onSelect={(e) => {
          const thing: string = modifiersDB[e[0]][e[1]];
          if (params.modifiers.includes(thing)) {
            setParams("modifiers", (modifiers) =>
              modifiers.filter((x) => x !== thing));
          } else {
            setParams("modifiers", params.modifiers.length, thing);
          }
        }}
        display={(props) => (
          <>
            {() => {
              return getVariant(`${props.path[0]} (${props.path[1]})`, {
                alphabet: { font: "normal", variant: "normal" },
                modifiers: [modifiersDB[props.path[0]][props.path[1]]],
                verlan: false,
              });
            }}
            <Show
              when={params.modifiers.includes(
                modifiersDB[props.path[0]][props.path[1]],
              )}
            >
              {" "}
              <ActiveMark />
            </Show>
          </>
        )}
      />
    </div>
  );
}
