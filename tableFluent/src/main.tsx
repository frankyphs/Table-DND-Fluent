import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
initializeIcons();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={webLightTheme}>
    <App />
  </FluentProvider>
);
