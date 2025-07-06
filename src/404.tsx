import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { onCleanup } from "solid-js";
import { createEffect } from "solid-js";
import { Match, Switch } from "solid-js";

export default function NotFound() {
  const [choice, setChoice] = createSignal<undefined | "red" | "blue">(
    undefined,
  );
  const navigate = useNavigate();

  createEffect(() => {
    if (choice() === "blue") {
      const timeout = setTimeout(() => navigate(-1), 5000);
      onCleanup(() => clearTimeout(timeout));
    }
  });

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        height: "100%",
        opacity: (choice() === "blue") ? "0%" : "100%",
        transition: "all 5s",
      }}
    >
      <Switch
        fallback={
          <>
            <div>
              <h1>Nous somme vraiment désolés...</h1>
              <p>
                Cette page a un... vous savez quoi... un b... bu... gg<br />
                Êtes-vous prêts à affronter cette créature ?
              </p>
            </div>
            <div
              style={{
                display: "flex",
                "flex-grow": 1,
                width: "100%",
                position: "relative",
                "min-height": "10rem",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                  position: "absolute",
                  "pointer-events": "none",
                }}
              >
                <img
                  alt="Matrix : scène des pillules"
                  style={{ "max-width": "100%", "height": "100%" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/8/83/Red_or_blue_pill.svg"
                />
              </div>
              {(["red", "blue"] as const).map((color) => (
                <button
                  type="button"
                  style={{
                    "flex-grow": 1,
                    "background-color": color,
                    border: "none",
                    cursor: "pointer",
                  }}
                  class="pill-button"
                  onClick={() => setChoice(color)}
                />
              ))}
            </div>
          </>
        }
      >
        <Match when={choice() === "red"}>
          <h1 style={{ margin: "auto" }}>404</h1>
        </Match>
        <Match when={choice() === "blue"}>
          <h1>
            {[...Array(404)].map((_, i) => (
              <>
                {`${i + 1}. L'erreur n'a jamais existé`}
                <br />
              </>
            ))}
          </h1>
        </Match>
      </Switch>
    </div>
  );
}
