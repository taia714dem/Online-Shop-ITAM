import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Store from "./authLogic/store/store.ts";

interface State {
  store: Store;
}
const store = new Store();
export const Context = createContext<State>({
  store,
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Context.Provider value={{
        store
      }}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </StrictMode>
);
