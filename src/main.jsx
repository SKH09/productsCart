import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter2 from "./AppRouter2";
 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter2 />
    </BrowserRouter>
  </StrictMode>
);
