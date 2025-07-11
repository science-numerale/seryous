/// <reference types="npm:vite/client" />
import { RouteDefinition, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import Layout from "./Layout.tsx";
import useMainStorage from "./mainStorage.ts";
import "./black-white.css";
import "./app.css";
import apps from "./apps/apps.ts";
import { Suspense } from "solid-js";
import { ErrorBoundary } from "solid-js";
import Error from "./Error.tsx";

export function App() {
  const [mainStorage, setMainStorage] = useMainStorage();

  function getStorage(name: string) {
    setMainStorage(name, mainStorage[name] ?? {});
    return mainStorage[name];
  }

  return (
    <Router
      base={import.meta.env.SERVER_BASE_URL}
      root={(p) => (
        <Layout>
          <Suspense>{p.children}</Suspense>
        </Layout>
      )}
    >
      {...[
        ...(FileRoutes() as RouteDefinition[]),
        ...(Object.entries(apps).map(([id, infos]) => ({
          path: `/app/${id}`,
          component: () => (
            <ErrorBoundary
              fallback={(err) => <Error
                code={err.code}
                message={err.message}
              />}
            >
              <infos.component
                storage={getStorage(id)}
              />
            </ErrorBoundary>
          ),
        })) as RouteDefinition[]),
      ]}
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <ErrorBoundary
      fallback={(err) => (
        <Layout>
          <Error code={err.code} message={err.message} />
        </Layout>
      )}
    >
      <App />
    </ErrorBoundary>
  );
}
