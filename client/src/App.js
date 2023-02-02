import "./App.css";
import Post from "./components/Post/post";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <main>
            <Navbar />
            <Post />
            <Post />
            <Post />
          </main>
        }
      />
      <Route
        path={"/login"}
        element={
          <main>
            <Navbar />
            <div>Hi</div>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
