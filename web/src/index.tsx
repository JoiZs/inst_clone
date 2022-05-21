import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Loading from "./components/loading";
import ContextProviders from "./context";

const App = React.lazy(() => import("./App"));

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProviders>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </ContextProviders>
    </BrowserRouter>
  </React.StrictMode>
);
