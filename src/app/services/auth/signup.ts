import { httpClient } from "../httpClient";

export type SignupParams = {
  name: string;
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
};

export const signup = async (params: SignupParams): Promise<Response> => {
  const data = await httpClient
    .post("auth/signup", {
      json: params,
    })
    .json<Response>();

  return data;
};
