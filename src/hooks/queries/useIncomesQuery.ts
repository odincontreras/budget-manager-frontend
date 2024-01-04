import { useQuery } from "@tanstack/react-query";
import { getUserIncomes } from "@/services/users";
import { INCOMES_QUERY_KEY } from "@/constants";
import { ExpensesAndIncomesFilters, Income, QueryParams } from "@/types";

const useIncomesQuery = (
  params: QueryParams<Income, ExpensesAndIncomesFilters> = {}
) => {
  const queryData = useQuery({
    queryKey: [INCOMES_QUERY_KEY, params],
    queryFn: ({ queryKey }) =>
      getUserIncomes(queryKey[1] as Record<string, unknown>),
  });

  return queryData;
};

export default useIncomesQuery;
