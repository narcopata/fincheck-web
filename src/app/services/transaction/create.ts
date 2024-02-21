import { httpClient } from "@services/httpClient";

export const create = async () => {
  const data = await httpClient.post("transaction");

  return data;
};
