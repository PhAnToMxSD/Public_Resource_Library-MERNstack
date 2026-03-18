import { useState, useEffect } from "react";
import { auth, provider } from "../config/firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(
    () => async () => {
      try {
        await signOut(auth);
        setIsSignedIn(false);
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsSignedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsSignedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-wrap">
      <button
        className={isSignedIn ? "btn-danger" : "btn-primary"}
        onClick={
          isSignedIn
            ? () => {
                logout();
              }
            : () => {
                signInWithGoogle();
              }
        }
      >
        {isSignedIn ? "Logout" : "Sign in with Google"}
      </button>
    </div>
  );
};
