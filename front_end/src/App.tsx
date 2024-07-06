import { Route, Routes } from "react-router-dom";
import NavBar from "./components/common/nav/Nav";
import Blogs from "./pages/blogs/Blogs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Profile } from "./pages/profile/Profile";
import { AuthProvider } from "./common/context/auth.context";
function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
