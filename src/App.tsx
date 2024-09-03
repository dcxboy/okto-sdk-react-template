import "./App.css";
import { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { OktoContextType, useOkto } from "okto-sdk-react";

import OktoUserInfo from "./components/okto/OktoUserInfo";
import TransferTokens from "./components/okto/TransferTokens/TransferTokens";

function App() {
  const oktoContext = useOkto() as OktoContextType;
  const [activeTab, setActiveTab] = useState<string>("userDetails");

  const responseMessage = (response: CredentialResponse) => {
    console.log(response);

    try {
      const { credential } = response;
      if (!credential) {
        console.log("credential not found");
        return;
      }

      if (!oktoContext) {
        console.log("okto context is null");
        return;
      }

      console.log("credential", credential);

      oktoContext.authenticate(credential, (result, error) => {
        if (result) {
          console.log("authentication successful");
        }
        if (error) {
          console.error("authentication error:", error);
        }
      });
    } catch (error) {
      console.log("Something went wrong. Please try again");
    }
  };

  const errorMessage = () => {
    console.log("Something went wrong");
  };

  return (
    <div className="container">
      <div className="login-container">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>

      <div className="tabs">
        <button
          className={activeTab === "userDetails" ? "active" : ""}
          onClick={() => setActiveTab("userDetails")}
        >
          User Details
        </button>
        <button
          className={activeTab === "supportedNetworks" ? "active" : ""}
          onClick={() => setActiveTab("supportedNetworks")}
        >
          Supported Networks
        </button>
        <button
          className={activeTab === "portfolio" ? "active" : ""}
          onClick={() => setActiveTab("portfolio")}
        >
          Portfolio
        </button>
        <button
          className={activeTab === "supportedTokens" ? "active" : ""}
          onClick={() => setActiveTab("supportedTokens")}
        >
          Supported Tokens
        </button>
        <button
          className={activeTab === "transferTokens" ? "active" : ""}
          onClick={() => setActiveTab("transferTokens")}
        >
          Transfer Tokens
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "userDetails" && <OktoUserInfo />}
        {activeTab === "supportedNetworks" && <OktoUserInfo tab="networks" />}
        {activeTab === "portfolio" && <OktoUserInfo tab="portfolio" />}
        {activeTab === "supportedTokens" && (
          <OktoUserInfo tab="supportedTokens" />
        )}
        {activeTab === "transferTokens" && <TransferTokens />}
      </div>
    </div>
  );
}

export default App;
