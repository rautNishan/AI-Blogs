import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../common/constants/backend.base.url";
import { AuthContext } from "../../common/context/auth.context";

interface IProfile {
  id: number | string | null;
  email: string | null;
  userName: string | null;
}

export function Profile() {
  const navigate = useNavigate();

  const { setAuthenticated } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState<IProfile | null>(null);

  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  };

  //Fetch UserInfromation
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/user/auth-me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("This is Response: ", response.data.data);

        setUserInfo(response.data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            setAuthenticated(false);
            localStorage.removeItem("token");
            alert("Token Expired");
            navigate("/login");
          }
        }
      }
    };

    fetchUserProfile();
  }, [token, setAuthenticated, navigate]);

  return (
    <div>
      <h1>This is Profile</h1>
      <button onClick={handleLogOut}>LogOut</button>
      <h1>{userInfo?.id}</h1>
      <h1>{userInfo?.email}</h1>
      <h1>{userInfo?.userName}</h1>
    </div>
  );
}
