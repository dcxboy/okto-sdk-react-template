import { signInWithPopup, User } from "firebase/auth";
import { useState } from "react";
import { auth, Providers } from "../../config/firebase";

type Props = {
  user: User | null;
};

const SignInWithGoogle = ({ user }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, Providers.google)
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <div>
      {user ? (
        <div>Welcome, {user.displayName}!</div>
      ) : (
        <button disabled={disabled} onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default SignInWithGoogle;
