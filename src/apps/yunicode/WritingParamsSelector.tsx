import { createStore, Store } from "solid-js/store";
import getVariant, {
  alphabetsDB,
  getDefaultParams,
  WritingParams,
} from "./unicodeStuff.ts";
import { deepMerge, keys } from "../../lib/utils.ts";
import Details from "../../components/Details.tsx";
import { Index } from "solid-js/web";
import { Show } from "solid-js";

export default function WritingParamsSelector(
  props: { params: Store<WritingParams> },
) {
  const [params, setParams] = createStore(props.params);
  return (
    <>
      <div>
        <select
          value={params.alphabet.font}
          onInput={(e) => {
            const newFont = e.currentTarget.value as keyof typeof alphabetsDB;
            setParams(
              "alphabet",
              "font",
              newFont,
            );

            const variants = keys(alphabetsDB[newFont]);
            if (!variants.includes(params.alphabet.variant)) {
              setParams("alphabet", "variant", variants[0]);
            }
          }}
        >
          <Index each={keys(alphabetsDB)}>
            {(key) => (
              <option value={key()}>
                {getVariant(
                  key(),
                  deepMerge(getDefaultParams(), { alphabet: { font: key() } }),
                )}
              </option>
            )}
          </Index>
        </select>{" "}
        <select
          value={params.alphabet.variant}
          onInput={(e) =>
            setParams(
              "alphabet",
              "variant",
              e.currentTarget
                .value as keyof (typeof alphabetsDB)[keyof typeof alphabetsDB],
            )}
        >
          <Index each={keys(alphabetsDB[params.alphabet.font])}>
            {(key) => (
              <option value={key()}>
                {getVariant(
                  key(),
                  deepMerge(getDefaultParams(), {
                    alphabet: { font: params.alphabet.font, variant: key() },
                  }),
                )}
              </option>
            )}
          </Index>
        </select>
      </div>
      <br />
      <Details summary={`Modificateurs (${params.modifiers.length})`}>
        <fieldset>
          <Show when={params.modifiers.length === 0}>
            <br />
            <small>(Essayez de regarder dans la bibliothèque)</small>
          </Show>

          <ul>
            <Index each={params.modifiers}>
              {(mod, i) => (
                <li>
                  <input
                    style={{ width: "5rem" }}
                    value={mod()}
                    onInput={(e) =>
                      setParams("modifiers", i, e.currentTarget.value)}
                  />{" "}
                  <button
                    type="button"
                    onClick={() =>
                      setParams("modifiers", (m) => {
                        m.splice(i, 1);
                        return [...m]; // reassign to trigger reactivity
                      })}
                  >
                    Supprimer
                  </button>
                </li>
              )}
            </Index>
          </ul>

          <button
            type="button"
            onClick={() => setParams("modifiers", (m) => [...m, ""])}
          >
            Ajouter
          </button>{" "}
          <button
            type="button"
            disabled={params.modifiers.length === 0}
            onClick={() => setParams("modifiers", [])}
          >
            Tout supprimer
          </button>
        </fieldset>
      </Details>
    </>
  );
}
