import { useQuery } from "@tanstack/react-query";
import { getUserIncomes } from "@/services/users";
import { INCOMES_QUERY_KEY } from "@/constants";

const useIncomesQuery = () => {
  const queryData = useQuery({
    queryKey: [INCOMES_QUERY_KEY],
    queryFn: getUserIncomes,
  });

  return queryData;
};

export default useIncomesQuery;
