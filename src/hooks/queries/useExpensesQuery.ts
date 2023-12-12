import { EXPENSES_QUERY_KEY } from "@/constants";
import { getUserExpenses } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const useExpensesQuery = () => {
  const queryData = useQuery({
    queryKey: [EXPENSES_QUERY_KEY],
    queryFn: getUserExpenses,
  });

  return queryData;
};

export default useExpensesQuery;
