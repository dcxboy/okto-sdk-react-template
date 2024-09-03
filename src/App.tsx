import { useEffect, useState } from "react";
import { GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "./config/firebase";
import SignInWithGoogle from "./components/okto/SignInWithGoogle";
import { OktoContextType, useOkto } from "okto-sdk-react";

function App() {
  const oktoContext = useOkto() as OktoContextType;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // listen to the authentication state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // get user's ID token
        authUser
          .getIdToken()
          .then((idToken) => {
            console.log(idToken);
            const googleIdToken = GoogleAuthProvider.credential(idToken);
            console.log(googleIdToken);
            if (oktoContext && googleIdToken?.idToken) {
              // login to okto SDK
              oktoContext.authenticate(
                googleIdToken.idToken,
                (result, error) => {
                  if (result) {
                    console.log("Okto Authentication Successful");

                    // user is signed in to Google as well as Okto, set user
                    setUser(authUser);
                  }
                  if (error) {
                    console.error("Okto Authentication Error:", error);
                  }
                }
              );
            } else {
              // handle invalid OktoProvider setup
              console.warn(
                "Okto SDK not initialised correctly, setup `OktoProvider` with a valid API key"
              );
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // user is signed out, reset the user
        setUser(null);

        setLoading(false);
      }
    });

    // cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      <SignInWithGoogle user={user} />
    </div>
  );
}

export default App;
