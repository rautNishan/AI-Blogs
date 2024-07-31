import { useState } from "react";
import Styles from "../../components/common/forms/Forms.module.css";
import RegisterStyle from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../common/constants/backend.base.url";
export interface IRegisterProps {
  userName?: string | null;
  email?: string | null;
  password?: string | null;
}
export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //Handle Register
  async function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(userName, email, password);
    const dataToSend: IRegisterProps = {
      userName: userName,
      email: email,
      password: password,
    };
    const response = await fetch(`${BACKEND_BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    if (!response.ok) {
      const error = await response.json();
      console.log("This is Error: ", error);
    } else {
      navigate("/login");
    }
  }

  return (
    <form onSubmit={(e) => register(e)}>
      <div className={Styles.form}>
        <h2>Register</h2>

        <span>User Name: </span>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />

        <span>Email</span>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <span>Password:</span>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button className={RegisterStyle.submitButton}>Add Blog</button>
      </div>
    </form>
  );
}
