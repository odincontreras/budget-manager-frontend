import { useQuery } from "@tanstack/react-query";
import { getUserIncomes } from "@/services/users";
import { DASHBOARD_INCOMES_QUERY_KEY } from "@/constants";

const useDashboardIncomesQuery = () => {
  const queryData = useQuery({
    queryKey: [DASHBOARD_INCOMES_QUERY_KEY],
    queryFn: getUserIncomes,
  });

  return queryData;
};

export default useDashboardIncomesQuery;
