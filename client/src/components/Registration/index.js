import React from "react";

import "../Login/index.css";
import { useState } from "react";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    const dataToSend = JSON.stringify({ username, password });
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: dataToSend,
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok === false) {
      alert("Registration Failed");
    }
    if (response.status !== 200) {
      alert("Registration Failed");
    } else {
      alert("Registered Successful");
    }
  }
  return (
    <>
      <div className="container">
        <form className="Register" onSubmit={register}>
          <h1>Register</h1>
          <div className="username t-input">
            <input
              type="text"
              required={true}
              minLength={6}
              id="username"
              placeholder="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <label htmlFor="username">Username</label>
            <div className="b-line"></div>
          </div>
          <div className="password t-input">
            <input
              type="password"
              required={true}
              minLength={5}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <label htmlFor="password">Password</label>
            <div className="b-line"></div>
          </div>

          <button>Sign Up</button>
        </form>
      </div>
    </>
  );
};
export default RegistrationPage;
