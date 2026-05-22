import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    await handleRegister({ name, email, password });

    setEmail("");
    setName("");
    setPassword("");

    navigate("/login");
  };

  if (loading) {
    return (
      <main className="flex items-center justify-between">
        <h1 className="text-2xl">Loading......</h1>
      </main>
    );
  }

  return (
    <div>
      <main className="flex items-center justify-center h-[80vh] w-[35%] m-auto">
        <div className="w-full">
          <h1 className="text-4xl text-gray-200 font-bold">Register</h1>
          <form onSubmit={(e) => submitHandler(e)} className="mt-8 w-full">
            <p className="text-gray-200 text-lg mb-1 ">Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-300  px-4 py-3 rounded-lg outline-none text-lg w-full"
              placeholder="Enter name"
            />

            <p className="text-gray-200 text-lg mb-1 mt-5">Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-300  px-4 py-3 rounded-lg outline-none text-lg w-full"
              placeholder="Enter email address"
            />

            <p className="text-gray-200 text-lg mb-1 mt-5">Password</p>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-300  px-4 py-3 rounded-lg outline-none text-lg w-full"
              placeholder="Enter password"
            />

            <button
              type="submit"
              className="w-full px-4 py-3 mt-5 bg-pink-600 text-white rounded-lg cursor-pointer transform transition-transform duration-150 active:scale-95"
            >
              Register
            </button>
          </form>

          <p className="text-right mt-6 text-sm text-gray-200">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-400 text-md hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
