import Button from "../button/Button";
import Styles from "./Forms.module.css";
import ButtonStyles from "../button/Button.module.css";
export interface IFromProps {
  formType: string;
  fun: () => void;
  register: boolean;
}

export default function Forms(formType: IFromProps) {
  return (
    <div className={Styles.form}>
      <h2>{formType.formType}</h2>
      {formType.register && (
        <>
          <span>User Name: </span>
          <input type="text" />
        </>
      )}
      {!formType.register ? (
        <span>User Name or Email: </span>
      ) : (
        <span>Email</span>
      )}
      <input type="text" />
      <span>Password:</span>
      <input type="password" />
      <Button className={ButtonStyles.formsButton} onClick={formType.fun}>
        {formType.formType}
      </Button>
    </div>
  );
}
