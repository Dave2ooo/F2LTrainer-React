import { Provider } from "@/components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStateProvider } from "./state/GlobalStateContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </Provider>
  </React.StrictMode>
);
