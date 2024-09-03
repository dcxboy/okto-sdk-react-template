import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BuildType, OktoProvider } from "okto-sdk-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OktoProvider
      apiKey="ee2d0d67-6160-44b0-8c5a-52a927acbd74"
      buildType={BuildType.SANDBOX}
    >
      <App />
    </OktoProvider>
  </StrictMode>
);
