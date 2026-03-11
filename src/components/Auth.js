import { useState } from "react";
import { auth, provider } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";



export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonColor = "bg-sky-500 hover:bg-sky-700 rounded-lg";

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={buttonColor} onClick={signUp}>
        Click Me
      </button>
      <button
        className="bg-sky-500 hover:bg-sky-700 rounded-lg hover:border-sky-700"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};
