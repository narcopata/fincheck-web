import { httpClient } from "@services/httpClient";

const deleteAccount = async (id: string) => {
  await httpClient.delete(`bank-accounts/${id}`);
};

export { deleteAccount };
