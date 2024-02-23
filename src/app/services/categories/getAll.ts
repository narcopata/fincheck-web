import type { Category } from "@entities/Category";
import { httpClient } from "@services/httpClient";

export const getAll = async (): Promise<Category[]> => {
  const categories = await httpClient.get("categories/mine").json<Category[]>();

  return categories;
};
