import { httpClient } from "../httpClient";

type Params = {
  name: string;
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
};

export const signup = async (params: Params): Promise<Response> => {
  const data = await httpClient
    .post("auth/signup", {
      json: params,
    })
    .json<Response>();

  return data;
};
