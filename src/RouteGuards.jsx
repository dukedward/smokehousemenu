// src/RouteGuards.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

export const RequireAdmin = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/" replace />;
    return children;
};