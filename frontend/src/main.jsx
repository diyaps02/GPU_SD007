import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PaginationProvider } from "./components/PaginationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PaginationProvider>
      <App />
    </PaginationProvider>
  </StrictMode>
);
