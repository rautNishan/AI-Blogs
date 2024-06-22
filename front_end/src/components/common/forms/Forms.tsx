import Button from "../button/Button";
import Styles from "./Forms.module.css";
import ButtonStyles from "../button/Button.module.css";
import { useState } from "react";

export interface ILoginErrorProps {
  errorMessageForUserNameOrEmail: string | null;
  errorMessageForPassword: string | null;
}
export interface IFromProps {
  formType: string;
  fun: (data: {
    userName: string;
    password: string;
    email?: string | null;
  }) => void;
  register: boolean;
  errors?: string | null;
  loginErrorMessages?: ILoginErrorProps;
}

export default function Forms(formType: IFromProps) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    formType.fun({ userName, password, email });
  };

  return (
    <div className={Styles.form}>
      {formType.errors}
      <h2>{formType.formType}</h2>
      {formType.register && (
        <>
          <span>User Name: </span>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </>
      )}
      {!formType.register ? (
        <span>User Name or Email: </span>
      ) : (
        <span>Email</span>
      )}
      <input
        type="text"
        onChange={(e) => {
          const emailRegEx = /\S+@\S+\.\S+/;
          setUserName(e.target.value);
          setEmail(e.target.value);
          if (emailRegEx.test(e.target.value)) {
            setUserName("");
          } else {
            setEmail("");
          }
        }}
        placeholder={
          formType.loginErrorMessages?.errorMessageForUserNameOrEmail ||
          "User Name or Email"
        }
      />
      <span>Password:</span>
      <input
        type="password"
        placeholder={
          formType.loginErrorMessages?.errorMessageForPassword || "Password"
        }
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className={ButtonStyles.formsButton} onClick={handleClick}>
        {formType.formType}
      </Button>
    </div>
  );
}
