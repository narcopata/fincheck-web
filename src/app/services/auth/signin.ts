import { httpClient } from "../httpClient";

export type SignInParams = { email: string; password: string };

type Response = { accessToken: string };

export const signin = async (params: SignInParams): Promise<Response> => {
  const data = await httpClient
    .post("auth/signin", {
      json: params,
    })
    .json<Response>();

  return data;
};
