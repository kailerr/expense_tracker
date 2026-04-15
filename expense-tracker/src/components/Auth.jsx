import React, { useState } from "react";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) return;
    onLogin({ email });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-3 border rounded-lg"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-3 border rounded-lg"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-500 text-white p-3 rounded-lg mb-3 hover:bg-indigo-600"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p className="text-center text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          className="text-indigo-600 cursor-pointer ml-1"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
}
