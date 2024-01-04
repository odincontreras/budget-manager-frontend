import { useQuery } from "@tanstack/react-query";
import { getUserTotalExpenses } from "@/services/users";
import { TOTAL_EXPENSES_QUERY_KEY } from "@/constants";
import { TotalExpensesAndIncomesFilters } from "@/types";

const useTotalExpensesQuery = (params: TotalExpensesAndIncomesFilters = {}) => {
  const queryData = useQuery({
    queryKey: [TOTAL_EXPENSES_QUERY_KEY, params],
    queryFn: ({ queryKey }) => getUserTotalExpenses(queryKey[1] as TotalExpensesAndIncomesFilters),
  });

  return queryData;
};

export default useTotalExpensesQuery;
