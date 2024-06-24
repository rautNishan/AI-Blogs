import { BASE_URL } from "../../constants/base.url.constant";
import { CustomError } from "../../errors/custom.error";

export interface ILoginRequestProps {
  userName?: string | null;
  email?: string | null;
  password?: string | null;
}
export async function LoginRequest(dataToSend: ILoginRequestProps) {
  console.log("This is DataToSend: ", dataToSend);
  const response = await fetch(`${BASE_URL}/user/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log("This is Error: ", error.message);
    throw new CustomError(error);
  }

  return await response.json();
}
