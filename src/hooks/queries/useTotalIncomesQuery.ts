import { useQuery } from "@tanstack/react-query";
import { getUserTotalIncomes } from "@/services/users";
import { TOTAL_INCOMES_QUERY_KEY } from "@/constants";
import { TotalExpensesAndIncomesFilters } from "@/types";

const useTotalIncomesQuery = (params: TotalExpensesAndIncomesFilters = {}) => {
  const queryData = useQuery({
    queryKey: [TOTAL_INCOMES_QUERY_KEY, params],
    queryFn: ({ queryKey }) => getUserTotalIncomes(queryKey[1] as TotalExpensesAndIncomesFilters),
  });

  return queryData;
};

export default useTotalIncomesQuery;
