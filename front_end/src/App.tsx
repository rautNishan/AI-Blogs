import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./common/context/auth.context";
import { ErrorPage } from "./common/errors/error.page";
import NavBar from "./components/common/nav/Nav";
import Blogs from "./pages/blogs/Blogs";
import Login from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import Register from "./pages/register/Register";
function App() {
  const { authenticated } = useContext(AuthContext);
  console.log("This is Authenticated: ", authenticated);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/error" replace /> : <Login />}
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
