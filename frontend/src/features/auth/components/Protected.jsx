import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading } = useAuth();

  const token = localStorage.getItem("token");

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <h1 className="text-white text-2xl">Loading...</h1>
      </main>
    );
  }

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
