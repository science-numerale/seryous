import getVariant, { getDefaultParams, WritingParams } from "./unicodeStuff.ts";
import Library from "./Library.tsx";
import WritingParamsSelector from "./WritingParamsSelector.tsx";
import Editor from "./Editor.tsx";
import Details from "../../components/Details.tsx";
import { setDefaults } from "../utils.tsx";
import { AppProps } from "../apps.ts";
import { Title } from "@solidjs/meta";

interface Storage {
  current: WritingParams;
  text: string;
}

export default function Yunicode(props: AppProps) {
  const def: Storage = {
    current: getDefaultParams(),
    text: "",
  };

  if (navigator.userAgent.includes("Android")) {
    alert(
      "Yunicode n'est pas compatible avec tous les appareils Android. Essayez de visiter le site sur ordinateur si vous rencontrez des dysfontionnements.",
    );
  }

  const [storage] = setDefaults(props.storage, def);

  return (
    <>
      <Title>{getVariant("Yunicode", storage.current)}</Title>
      <h1>{getVariant("Yunicode", storage.current)}</h1>
      <br />
      <div
        style={{
          display: "inline-flex",
          "flex-direction": "column",
          gap: "1rem",
          width: "100%",
          "max-width": "50rem",
        }}
        class="box"
      >
        <div
          style={{ display: "inline-flex", "flex-wrap": "wrap", gap: "1rem" }}
        >
          <div>
            <WritingParamsSelector params={storage.current} />
          </div>
          <div
            style={{ "flex-grow": 1, "flex-basis": "max(min-content, 15rem)" }}
            class="box"
          >
            <Editor {...storage} />
          </div>
        </div>
        <div class="box">
          <Details summary="Bibliothèque">
            <Library params={storage.current} />
          </Details>
        </div>
      </div>
    </>
  );
}
