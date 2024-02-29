import type { User } from "@entities/User";
import { httpClient } from "../httpClient";

type Response = User;

export const me = async (): Promise<Response> => {
  const data = await httpClient.get("users/me").json<Response>();

  return data;
};
