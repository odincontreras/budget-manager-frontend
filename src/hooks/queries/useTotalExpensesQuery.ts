import { useQuery } from "@tanstack/react-query";
import { getUserTotalExpenses } from "@/services/users";
import { TOTAL_EXPENSES_QUERY_KEY } from "@/constants";

const useTotalExpensesQuery = () => {
  const queryData = useQuery({
    queryKey: [TOTAL_EXPENSES_QUERY_KEY],
    queryFn: getUserTotalExpenses,
  });

  return queryData;
};

export default useTotalExpensesQuery;
