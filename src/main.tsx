import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import "./index.css";
import App from "./App.tsx";
import UserProvider from "./providers/UserProvider.tsx";

const { app } = await Pear.versions();
console.log("app", app);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </StrictMode>
);
