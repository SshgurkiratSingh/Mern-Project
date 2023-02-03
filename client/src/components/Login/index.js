import React, { Component, useState } from "react";
import "./index.css";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function click(ev) {
    ev.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }
  return (
    <>
      <div className="container">
        <form className="Login" onSubmit={click}>
          <h1>Login</h1>
          <div className="username t-input">
            <input
              type="text"
              required=""
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
            <div className="b-line"></div>
          </div>
          <div className="password t-input">
            <input
              type="password"
              required=""
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <div className="b-line"></div>
          </div>

          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
