import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, Providers } from "../../config/firebase";

type Props = {};

const SignInWithGoogle = ({}: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, Providers.google)
      .then(() => {})
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <div>
      <button disabled={disabled} onClick={signInWithGoogle}>
        Sign In With Google
      </button>
      <div>{errorMessage}</div>
    </div>
  );
};

export default SignInWithGoogle;
