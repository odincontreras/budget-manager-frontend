import { AuthUser } from "@/types";
import Axios from "@/libs/axios";

export async function login(
  email: string,
  password: string
): Promise<AuthUser> {
  const response = await Axios.post("/auth/login", { email, password });

  return response.data;
}
