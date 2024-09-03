import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BuildType, OktoProvider } from "okto-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="119953910145-j3hqundi1o6sbgv1pf2kf25p12vhsjl8.apps.googleusercontent.com">
    <StrictMode>
      <OktoProvider
        apiKey="ee2d0d67-6160-44b0-8c5a-52a927acbd74"
        buildType={BuildType.SANDBOX}
      >
        <App />
      </OktoProvider>
    </StrictMode>
  </GoogleOAuthProvider>
);
