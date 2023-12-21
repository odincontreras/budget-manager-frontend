import { useQuery } from "@tanstack/react-query";
import { getUserIncomes } from "@/services/users";
import { INCOMES_QUERY_KEY } from "@/constants";
import { QueryCustomHookProps } from "@/types";

const useIncomesQuery = ({ reqParams = {} }: QueryCustomHookProps) => {
  const queryData = useQuery({
    queryKey: [INCOMES_QUERY_KEY, reqParams],
    queryFn: ({ queryKey }) =>
      getUserIncomes(queryKey[1] as Record<string, unknown>),
  });

  return queryData;
};

export default useIncomesQuery;
