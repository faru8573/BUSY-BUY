import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = ({ setIsAuthorized }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showName, setShowName] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");
      setIsAuthorized(true);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
      setIsAuthorized(true);
      localStorage.setItem("loginStatus", true);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center justify-center rounded-md shadow-lg bg-white w-full max-w-md p-8 mt-6">
        {error && <div className="text-red-500">{error}</div>}
        {showName && (
          <input
            type="text"
            placeholder="Name"
            className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            onClick={showName ? handleSignUp : handleSignIn}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {showName ? "Sign Up" : "Sign In"}
          </button>
        </div>
        <p className="text-2xl font-bold" onClick={() => setShowName(true)}>
          Or Sign Up instead
        </p>
      </div>
    </div>
  );
};

export default Auth;
