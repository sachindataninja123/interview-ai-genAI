import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./features/auth/components/Footer";
import Navbar from "./features/auth/components/Navbar";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/auth/pages/Home";

const App = () => {
  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
