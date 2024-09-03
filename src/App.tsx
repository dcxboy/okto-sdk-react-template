import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { OktoContextType, useOkto } from "okto-sdk-react";

import "./App.css";
import OktoUserInfo from "./components/okto/OktouserInfo";

function App() {
  const oktoContext = useOkto() as OktoContextType;

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
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

      <div>
        <OktoUserInfo />
        </div>
    </div>
  );
}

export default App;
