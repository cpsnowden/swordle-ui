import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "theme";
import { RouterProvider } from "react-router-dom";
import { router } from "pages";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { UserPreferenceContextProvider } from "components/UserPreferences/UserPreferences";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserPreferenceContextProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </UserPreferenceContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
