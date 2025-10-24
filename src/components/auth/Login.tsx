import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../context/authContext";
import { AiOutlineClose } from "react-icons/ai";
import { RouteKey } from "../../routes/route-key";

const GoogleIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="block"
    width={20}
    height={20}
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    ></path>
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    ></path>
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    ></path>
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    ></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

const Login: React.FC = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (userLoggedIn) {
      navigate(`/${RouteKey.dashboard}`);
    }
  }, [userLoggedIn, navigate]);

  const onGoogleSignIn = async () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      setError("");
      setShowError(true);
      try {
        const result = await doSignInWithGoogle();
        console.log("Google sign-in result:", result);
        setIsSigningIn(false);
        navigate(`/${RouteKey.dashboard}`);
      } catch (err: any) {
        console.error("Google sign-in error:", err);
        setError(err.message || "Google login failed");
        setIsSigningIn(false);
        setShowError(true);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/backgroundImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {error && showError && (
        <div className="absolute top-6 right-6 z-50 flex items-start gap-3 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg min-w-[300px]">
          <AiOutlineClose
            className="w-5 h-5 mt-1 cursor-pointer text-red-400 hover:text-red-600"
            onClick={() => setShowError(false)}
            title="Dismiss"
          />
          <div>
            <div className="font-semibold flex items-center gap-2">
              <span>Error</span>
            </div>
            <div className="mt-1 text-sm">{error}</div>
          </div>
        </div>
      )}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mx-2 sm:mx-auto">
        <div className="mb-8 text-center">
          <img
            src="/logo.jpg"
            alt="Hello KTV Logo"
            className="mx-auto mb-2 rounded-full shadow-lg w-20 h-20 object-cover border-4 border-indigo-100"
            style={{ background: '#fff' }}
          />
          <p className="text-gray-600 text-base font-medium mb-2">
            Welcome back! Please sign in to book your room.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <button
            type="button"
            className="gsi-material-button flex items-center justify-center w-full"
            onClick={onGoogleSignIn}
            disabled={isSigningIn}
            style={{
              backgroundColor: "white",
              border: "1px solid #747775",
              borderRadius: "20px",
              height: "40px",
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: "14px",
              color: "#1f1f1f",
              boxShadow:
                "0 1px 2px 0 rgba(60,64,67,.30), 0 1px 3px 1px rgba(60,64,67,.15)",
              maxWidth: "400px",
              minWidth: "min-content",
              padding: "0 12px",
              marginTop: 0,
            }}
          >
            <span className="gsi-material-button-content-wrapper flex items-center w-full justify-center">
              <span className="gsi-material-button-icon mr-3">
                <GoogleIcon />
              </span>
              <span className="gsi-material-button-contents font-medium">
                {isSigningIn ? "Signing in..." : "Sign in with Google"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
