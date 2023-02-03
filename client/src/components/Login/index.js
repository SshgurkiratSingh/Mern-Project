import React, { Component, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./index.css";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const { setUserINFO } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function click(ev) {
    ev.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    console.log(res);
    if (res.ok) {
      res.json().then((userInfo) => {
        setUserINFO(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong Credentials");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
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
