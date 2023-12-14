import { useSelector } from "react-redux";
import NavBar from "./Component/NavBar/NavBar";
import Post from "./Component/Post/Post";
import { SinglePost } from "./Component/SinglePost/SinglePost";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import logo from "./logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Write from "./Pages/Write/Write";
import Setting from "./Pages/Home/Setting";
import Update from "./Pages/Update/Update";

function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Setting /> : <Home />} />
        <Route path="/update/:postId" element={user ? <Update /> : <Home />} />
        <Route path="/post/:postId" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;
