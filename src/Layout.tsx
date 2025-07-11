import { ParentProps } from "solid-js";
import { A } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import apps from "./apps/apps.ts";
import { ErrorBoundary } from "solid-js";

export default function Layout(props: ParentProps) {
  const seriouslyThatsTheNameOfTheConst = { padding: "1rem" };
  return (
    <MetaProvider>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          height: "100dvh",
        }}
      >
        <header style={seriouslyThatsTheNameOfTheConst}>
          <nav style={{ display: "flex", "flex-wrap": "wrap", gap: "1rem" }}>
            {/* We have to use an ErrorBoudary cause Layout can also be used outside Router */}
            <ErrorBoundary
              fallback={() => (
                <>
                  <a href={`${import.meta.env.SERVER_BASE_URL}/`}>À propos</a>
                  {Object.entries(apps).map(([id, infos]) => (
                    <a href={`${import.meta.env.SERVER_BASE_URL}/app/${id}`}>
                      {infos.name}
                    </a>
                  ))}
                </>
              )}
            >
              <A href="/">À propos</A>
              {Object.entries(apps).map(([id, infos]) => (
                <A href={`/app/${id}`}>{infos.name}</A>
              ))}
            </ErrorBoundary>
          </nav>
        </header>

        <main
          style={{
            "flex-grow": 1,
            "margin": "0 1rem",
            "padding": "1rem",
            "overflow": "auto",
          }}
        >
          {props.children}
        </main>

        <footer style={seriouslyThatsTheNameOfTheConst}>
          serYous est un projet sérieux qui offre des outils pratiques, à
          l'inverse de{" "}
          <a href="https://science-numerale.github.io/yuser/">Yuser</a>
        </footer>
      </div>
    </MetaProvider>
  );
}
