import { httpClient } from "../httpClient";

type Response = {
  name: string;
  email: string;
};

export const me = async (): Promise<Response> => {
  const data = await httpClient.get("users/me").json<Response>();

  return data;
};
