import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex">
      <nav className="navbar bg-base-100 ">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl font-bold m-2"
          >
            Blog Project
          </Link>
        </div>
        <div className="flex-none p-2 bg-base-100">
          <Link to="/login" className="btn  btn-ghost m-2">
            Login
          </Link>
          <Link to="/register" className="btn  btn-ghost m-2">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
