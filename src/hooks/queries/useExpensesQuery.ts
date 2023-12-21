import { EXPENSES_QUERY_KEY } from "@/constants";
import { getUserExpenses } from "@/services/users";
import { QueryCustomHookProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useExpensesQuery = ({ reqParams = {} }: QueryCustomHookProps) => {
  const queryData = useQuery({
    queryKey: [EXPENSES_QUERY_KEY, reqParams],
    queryFn: ({ queryKey }) => getUserExpenses(queryKey[1] as Record<string, unknown>),
  });

  return queryData;
};

export default useExpensesQuery;
