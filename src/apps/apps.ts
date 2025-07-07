import { lazy } from "solid-js";
import { Store } from "solid-js/store";

const apps = {
  yunicode: {
    name: "Yunicode",
    component: lazy(() => import("./yunicode/Yunicode.tsx")),
  },
  undercover: {
    name: "Undercover",
    component: lazy(() => import("./undercover/Undercover.tsx")),
  },
};

export interface AppProps {
  storage: Store<object>;
}

export default apps;
