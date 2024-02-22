import { httpClient } from "@services/httpClient";
import type { Category } from "../../entities/Category";

export const getAll = async (): Promise<Category[]> => {
  const categories = await httpClient.get("categories/mine").json<Category[]>();

  return categories;
};
