import { createStore } from "solid-js/store";
import { For } from "solid-js";

type Todos = Record<number, string>;

export default function App() {
  const [todos, setTodos] = createStore<Todos>({
    1: "Do laundry",
    2: "Buy groceries",
  });

  const [twodo, setTwodo] = createStore(todos);

  return (
    <div>
      {todos[1]}
      <button onClick={() => setTwodo(1, "nope")}>Add</button>
    </div>
  );
}
