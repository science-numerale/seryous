import { ParentProps } from "solid-js";
import { A } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import apps from "./apps/apps.ts";
import { ErrorBoundary } from "solid-js";
import links from "./links.ts";
import githubLogoWhite from "./assets/github-mark-white.svg";

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
          <nav
            style={{
              display: "flex",
              "flex-wrap": "wrap",
              gap: "1rem",
              "align-items": "center",
            }}
          >
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
                  <div style={{ flex: 1 }}></div>
                  <a href={links.github.main}>
                    <img
                      src={githubLogoWhite}
                      style={{ "max-height": "2rem" }}
                    />
                  </a>
                </>
              )}
            >
              <A href="/">À propos</A>
              {Object.entries(apps).map(([id, infos]) => (
                <A href={`/app/${id}`}>{infos.name}</A>
              ))}

              <div style={{ flex: 1 }}></div>
              <A href={links.github.main}>
                <img src={githubLogoWhite} style={{ "max-height": "2rem" }} />
              </A>
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
