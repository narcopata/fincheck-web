import { httpClient } from "@services/httpClient";

export const remove = async (transactionId: string) => {
  const data = await httpClient.delete(`transactions/${transactionId}`);

  return data;
};
