import React from 'react';
import { Link } from "react-router-dom";

// Firebase 
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../AuthContext";

const Header = () => {
    const { user, isAdmin } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <Link to="/" className="chef-icon" aria-label="Home">
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 28H44V50H20z" />
                        <path d="M14 22C12 18 15 12 22 12C28 8 36 8 42 12C49 12 52 18 50 22C52 26 50 30 46 30H18C14 30 12 26 14 22Z" />
                    </svg>
                </Link>

                <Link to="/" className="brand">
                    <span className="brand-title">4 The Fork Of IT</span>
                    <span className="brand-tagline">BBQ • Comfort • Catering</span>
                </Link>
            </div>

            <div className="header-right">
                {isAdmin && (
                    <Link to="/admin/menu" className="header-btn header-btn-outline">
                        Admin Menu
                    </Link>
                )}

                {user ? (
                    <>
                        <Link to="/account" className="header-btn">
                            My Account
                        </Link>
                        <button
                            type="button"
                            className="header-btn header-btn-ghost"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="header-btn">
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;