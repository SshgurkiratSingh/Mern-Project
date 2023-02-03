import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function Navbar() {
  const { setUserINFO, userINFO } = useContext(UserContext);
  console.log(userINFO);
  useEffect(() => {
    fetch("http://localhost:4000/validate", {
      credentials: "include",
    }).then((response) => {
      response.json().then((info) => {
        setUserINFO(info);
      });
    });
  }, []);
  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserINFO(null);
  }
  const username = userINFO?.username;

  return (
    <header className="flex">
      <nav className="navbar bg-base-100 ">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl font-bold m-2"
          >
            Blog Project {username && <span class="text-xs"> @{username}</span>}
          </Link>
        </div>
        <div className="flex-none p-2 bg-base-100">
          <nav>
            {username && (
              <>
                <Link className="btn  btn-ghost m-2" to="/create">
                  Create New Post
                </Link>
                <Link onClick={logout} className="btn  btn-ghost m-2" to="/">
                  Logout
                </Link>
              </>
            )}
            {!username && (
              <>
                <Link to="/login" className="btn  btn-ghost m-2">
                  Login
                </Link>
                <Link to="/register" className="btn  btn-ghost m-2">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </nav>
    </header>
  );
}
