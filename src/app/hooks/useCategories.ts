import { QUERY_KEYS } from "@config/queryKeys";
import { categoriesService } from "@services/categories";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.CATEGORIES_GET_ALL,
    queryFn: categoriesService.getAll,
  });

  return {
    categories: data ?? [],
    isPending,
  };
};
