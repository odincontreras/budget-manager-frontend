import { EXPENSES_QUERY_KEY } from "@/constants";
import { getUserExpenses } from "@/services/users";
import { Expense, QueryParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ExpensesAndIncomesFilters } from "../../types";

const useExpensesQuery = (
  params: QueryParams<Expense, ExpensesAndIncomesFilters> = {}
) => {
  const queryData = useQuery({
    queryKey: [EXPENSES_QUERY_KEY, params],
    queryFn: ({ queryKey }) =>
      getUserExpenses(queryKey[1] as Record<string, unknown>),
  });

  return queryData;
};

export default useExpensesQuery;
