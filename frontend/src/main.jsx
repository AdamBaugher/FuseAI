import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { SavedCompaniesProvider } from "./contexts/SavedCompaniesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SavedCompaniesProvider>
      <App />
    </SavedCompaniesProvider>
  </BrowserRouter>
);
