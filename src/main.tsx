import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { PokemonProvider } from "./context/PokemonContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
  </StrictMode>
);
