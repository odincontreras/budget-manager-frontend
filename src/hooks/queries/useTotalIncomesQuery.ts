import { useQuery } from "@tanstack/react-query";
import { getUserTotalIncomes } from "@/services/users";
import { TOTAL_INCOMES_QUERY_KEY } from "@/constants";

const useTotalIncomesQuery = () => {
  const queryData = useQuery({
    queryKey: [TOTAL_INCOMES_QUERY_KEY],
    queryFn: getUserTotalIncomes,
  });

  return queryData;
};

export default useTotalIncomesQuery;
