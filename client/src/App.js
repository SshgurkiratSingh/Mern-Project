import "./App.css";
import Post from "./components/Post/post";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./components/Login";
import RegistrationPage from "./components/Registration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Post />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
