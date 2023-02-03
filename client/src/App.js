import "./App.css";

import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./components/Login";
import RegistrationPage from "./components/Registration";
import { UserContextProvider } from "./UserContext";
import CreatePage from "./components/create";
import IndexPage from "./components/indexPage";
import PostPages from "./components/postPage";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegistrationPage />} />
          <Route path={"/create"} element={<CreatePage />} />
          <Route path="/post/:id" element={<PostPages />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
