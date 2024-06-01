import { Link } from "react-router-dom";
import Forms from "../../components/common/forms/Forms";
import LoginStyle from "./Login.module.css";
export default function Login() {
  //Login Logic
  const login = () => {
    console.log("THis is Login");
  };

  return (
    <div className={LoginStyle.login}>
      <Forms formType="Login" fun={login} register={false} />
      <div className={LoginStyle.newToApp}>
        <p>
          New to the site? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
