import React, { Component } from "react";
import "./index.css";
class LoginPage extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="container">
          <form className="Login">
            <h1>Login</h1>
            <div className="username t-input">
              <input
                type="text"
                required=""
                id="username"
                placeholder="username"
              />
              <label htmlFor="username">Username</label>
              <div className="b-line"></div>
            </div>
            <div className="password t-input">
              <input
                type="password"
                required=""
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
              <div className="b-line"></div>
            </div>

            <button>Log in</button>
          </form>
        </div>
      </>
    );
  }
}

export default LoginPage;
