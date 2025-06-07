import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { TaskProvider } from "./context/TaskContext.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { CreateModalProvider } from "./context/CreateModalContext.tsx";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

console.log("Auth0 Domain:", domain);
console.log("Auth0 Client ID:", clientId);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <UserProvider>
          <CreateModalProvider>
            <TaskProvider>
              <App />
            </TaskProvider>
          </CreateModalProvider>
        </UserProvider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
