import { Store, unwrap } from "solid-js/store";
import { createStore } from "solid-js/store";
import { deepMerge } from "../lib/utils.ts";

export function setDefaults<T extends object>(
  storage: Store<object>,
  defaults: T,
) {
  const [newStorage, setNewStorage] = createStore<T>(storage as T);
  setNewStorage(deepMerge(unwrap(defaults), unwrap(storage as T)));
  return [newStorage, setNewStorage] as [
    typeof newStorage,
    typeof setNewStorage,
  ];
}
