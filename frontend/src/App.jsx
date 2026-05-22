import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./features/auth/components/Footer";
import Navbar from "./features/auth/components/Navbar";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/auth/pages/Home";
import Protected from "./features/auth/components/Protected";

const App = () => {
  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
