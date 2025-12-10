// src/LoginPage.jsx
import React, { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
    const [mode, setMode] = useState("login"); // "login" | "register"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleEmailPassword = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");

        try {
            if (mode === "login") {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError(err.message || "Authentication failed");
        } finally {
            setBusy(false);
        }
    };

    const handleGoogle = async () => {
        setBusy(true);
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setError(err.message || "Google sign-in failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <section className="screen auth-screen">
            <h1>{mode === "login" ? "Sign In" : "Create Account"}</h1>
            <p className="screen-subtitle">
                {mode === "login"
                    ? "Welcome back! Sign in to manage your orders and favorites."
                    : "Create an account to save your info and make ordering easier."}
            </p>

            <div className="auth-toggle">
                <button
                    type="button"
                    className={`auth-toggle-btn ${mode === "login" ? "auth-toggle-active" : ""
                        }`}
                    onClick={() => setMode("login")}
                >
                    Sign In
                </button>
                <button
                    type="button"
                    className={`auth-toggle-btn ${mode === "register" ? "auth-toggle-active" : ""
                        }`}
                    onClick={() => setMode("register")}
                >
                    Register
                </button>
            </div>

            <form className="form" onSubmit={handleEmailPassword}>
                <label>
                    Email
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={
                            mode === "login" ? "current-password" : "new-password"
                        }
                    />
                </label>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="primary-btn" disabled={busy}>
                    {busy
                        ? "Please wait..."
                        : mode === "login"
                            ? "Sign In"
                            : "Create Account"}
                </button>
            </form>

            <div className="auth-divider">
                <span>or</span>
            </div>

            <button
                type="button"
                className="secondary-btn google-btn"
                onClick={handleGoogle}
                disabled={busy}
            >
                {/* Simple G icon */}
                <span className="google-icon">G</span>
                <span>Continue with Google</span>
            </button>
        </section>
    );
};

export default LoginPage;