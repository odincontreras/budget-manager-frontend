import { DASHBOARD_EXPENSES_QUERY_KEY } from "@/constants";
import { getUserExpenses } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const useDashboardExpensesQuery = () => {
  const queryData = useQuery({
    queryKey: [DASHBOARD_EXPENSES_QUERY_KEY],
    queryFn: getUserExpenses,
  });

  return queryData;
};

export default useDashboardExpensesQuery;
