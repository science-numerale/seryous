import { createEffect } from "solid-js";
import { untrack } from "solid-js";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";

export default function CopyButton(props: { text: string }) {
  const [timeouts, setTimeouts] = createStore<number[]>([]);
  createEffect(() => {
    props.text;
    untrack(() => {
      for (const id of timeouts) {
        clearTimeout(id);
      }
      setTimeouts([]);
    });
  });
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(props.text);
        let id = -1;
        id = setTimeout(() => {
          setTimeouts((thisId) => thisId.filter((yep) => (yep !== id)));
        }, 3000);
        setTimeouts(timeouts.length, id);
      }}
    >
      <Show when={timeouts.length > 0} fallback="Copier">
        Copié !
      </Show>
    </button>
  );
}
