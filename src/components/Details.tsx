import { JSX } from "solid-js";
import { ParentProps } from "solid-js";

// TODO: Add open state param
export default function Details(props: ParentProps<{ summary: JSX.Element }>) {
  return (
    <details>
      <summary>{props.summary}</summary>
      {props.children}
    </details>
  );
}
