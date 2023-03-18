import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";
import { AppThemeProvider } from "theme";
import { RouterProvider } from "react-router-dom";
import { router } from "pages";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { PreferencesProvider } from "features/preferences";
import { AppStatusOverlay } from "features/app-status";
import { AlertProvider } from "features/alerts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PreferencesProvider>
      <AppThemeProvider>
        <CssBaseline />
        <AppStatusOverlay />
        <AlertProvider>
          <RouterProvider router={router} />
        </AlertProvider>
      </AppThemeProvider>
    </PreferencesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
