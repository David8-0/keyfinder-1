// src/components/SignIn.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import backgroundImg from "../../assets/Login/login.svg";
import { login } from "../../network/auth.js";

const roletypes = {
  buyer: "buyer",
  broker: "broker",
  admin: "admin"
};

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errMessage,setErrMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await login({
        email:email,
        password:password
      })
      const userData =response?.data;
  
  if(userData?.data?.user.role === roletypes.admin){
    console.log("admin")
  }else{
    console.log("other")
  }
    }catch(err){
      setErrMessage(err.response.data.message)
    }

    // localStorage.setItem("user", JSON.stringify({ email }));
  };
  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Home icon */}
      <Link
        to="/"
        className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
      >
        <FaHome size={24} />
      </Link>

      <div className="bg-[#002349] p-8 rounded-xl shadow-xl w-full max-w-sm text-white">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2">Sign in</h2>
        <p className="text-sm mb-6">
          Save searches, save your favorite properties, and more.
          <br />
          New to the site?{" "}
          <Link to="/signup" className="underline">
            Sign Up for An Account
          </Link>
        </p>

        {/* Sub-header */}
        <p className="text-red-700 ">{errMessage}</p>
        <p className="font-semibold mb-4">Sign In with email address</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="
              w-full 
              bg-transparent 
              border-b-2 border-white 
              placeholder-white/70 
              text-white 
              focus:outline-none 
              mb-6
            "
          />

          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            className="
              w-full 
              bg-transparent 
              border-b-2 border-white 
              placeholder-white/70 
              text-white 
              focus:outline-none 
              mb-6
            "
          />

          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="form-checkbox h-4 w-4 text-white"
              />
              <span className="ml-2">Keep Me Signed In</span>
            </label>
            <Link
              to="/forgot-password"
              className="underline hover:text-gray-300"
            >
              Forget Password?
            </Link>
          </div>

          <p className="text-xs text-white/70 mb-6">
            By submitting this form, you acknowledge that you accept our{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="underline">
              Terms of Use
            </Link>
            .
          </p>

          <button
            type="submit"
            className="
              w-full py-3 
              bg-white text-blue-900 font-semibold 
              rounded hover:bg-gray-100 transition
            "
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
