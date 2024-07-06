import { Link, useNavigate } from "react-router-dom";
import Forms from "../../components/common/forms/Forms";
import LoginStyle from "./Login.module.css";
import { validationForm } from "../../common/request/login/login.validate";
import { CustomError } from "../../common/errors/custom.error";
import { useContext, useState } from "react";
import { LoginRequest } from "../../common/request/login/Login.request";
import { AuthContext } from "../../common/context/auth.context";

export interface ILoginProps {
  userName?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface ILoginResponse {
  date: string;
  message: string;
  path: string;
  data: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [userNameEmptyError, setUserNameEmptyError] = useState("");
  const [passwordEmptyError, setPasswordEmptyError] = useState("");
  const { setAuthenticated } = useContext(AuthContext);

  async function HandleLogin(data: ILoginProps) {
    try {
      const validatedData = validationForm(
        data.userName,
        data.email,
        data.password
      );

      if (validatedData.isEmpty) {
        if (validatedData.errorMessageForUserNameOrEmail) {
          setUserNameEmptyError(validatedData.errorMessageForUserNameOrEmail);
        }
        if (validatedData.errorMessageForPassword) {
          setPasswordEmptyError(validatedData.errorMessageForPassword);
        }
      } else {
        const finalDataToSend: ILoginProps = {
          userName: data.userName === "" ? null : data.userName,
          email: data.email === "" ? null : data.email,
          password: data.password,
        };
        const loginData: ILoginResponse = await LoginRequest(finalDataToSend);
        localStorage.setItem("token", loginData.data);
        setAuthenticated(true);
        navigate("/profile");
      }
    } catch (error) {
      if (error instanceof CustomError) {
        setErrorMessage(error._error.message);
      }
    }
  }

  return (
    <div className={LoginStyle.login}>
      <Forms
        formType="Login"
        fun={HandleLogin}
        errors={errorMessage}
        loginErrorMessages={{
          errorMessageForUserNameOrEmail: userNameEmptyError,
          errorMessageForPassword: passwordEmptyError,
        }}
        register={false}
      />
      <div className={LoginStyle.newToApp}>
        <p>
          New to the site? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
