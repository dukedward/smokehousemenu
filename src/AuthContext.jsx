// src/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);        // Firebase user
    const [profile, setProfile] = useState(null);  // Firestore user doc
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (!firebaseUser) {
                setProfile(null);
                setLoading(false);
                return;
            }

            const userRef = doc(db, "users", firebaseUser.uid);
            const snap = await getDoc(userRef);

            if (snap.exists()) {
                setProfile(snap.data());
            } else {
                // Create default profile document
                const defaultProfile = {
                    name: firebaseUser.displayName || "",
                    address: "",
                    avatarUrl: firebaseUser.photoURL || "",
                    paymentProfileId: "",
                    role: "user",
                };
                await setDoc(userRef, defaultProfile);
                setProfile(defaultProfile);
            }

            setLoading(false);
        });

        return () => unsub();
    }, []);

    const value = {
        user,
        profile,
        isAdmin: profile?.role === "admin",
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};