import { useQuery } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "@/constants";
import { getCategories } from "@/services/categories";

const useCategoriesQuery = () => {
  const queryData = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: getCategories,
  });

  return queryData;
};

export default useCategoriesQuery;
