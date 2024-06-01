import { Route, Routes } from "react-router-dom";
import NavBar from "./components/common/nav/Nav";
import Blogs from "./pages/blogs/Blogs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
