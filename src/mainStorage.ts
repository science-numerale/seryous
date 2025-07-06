import { onMount } from "solid-js";
import { createEffect } from "solid-js";
import { createStore, produce, Store } from "solid-js/store";
import { deepMerge } from "./lib/utils.ts";

export default function useMainStorage() {
  const [mainStorage, setMainStorage] = createStore({});
  onMount(() => {
    setMainStorage(
      produce((v) => {
        try {
          deepMerge(v, JSON.parse(localStorage.getItem("seryous") || "{}"));
        } catch {
          console.warn("Can't get JSON from localStorage");
        }
      }),
    );
  });

  createEffect(() =>
    localStorage.setItem("seryous", JSON.stringify(mainStorage))
  );

  // deno-lint-ignore no-explicit-any
  return [mainStorage, setMainStorage] as Store<any>;
}
