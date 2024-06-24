export interface ReturnProps {
  errorMessageForUserNameOrEmail: string | null;
  forEmail: string | null;
  errorMessageForPassword: string | null;
  isEmpty: boolean | null;
}

export function validationForm(
  userName?: string | null,
  email?: string | null,
  password?: string | null
): ReturnProps {
  const returnObject: ReturnProps = {
    errorMessageForUserNameOrEmail: null, //default null
    forEmail: null,
    errorMessageForPassword: null, //default null
    isEmpty: false, //default false
  };

  if (!userName && !email) {
    returnObject.errorMessageForUserNameOrEmail =
      "User name or Email field cannot be empty";
    returnObject.isEmpty = true;
  }

  if (!password) {
    returnObject.errorMessageForPassword = "Password field cannot be empty";
    returnObject.isEmpty = true;
  }
  return returnObject;
}
