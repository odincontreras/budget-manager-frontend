import { useQuery } from "@tanstack/react-query";
import { getUserCurrencies } from "@/services/users";
import { USER_CURRENCIES_QUERY_KEY } from "@/constants";

const useUserCurrenciesQuery = () => {
  const queryData = useQuery({
    queryKey: [USER_CURRENCIES_QUERY_KEY],
    queryFn: getUserCurrencies,
  });

  return queryData;
};

export default useUserCurrenciesQuery;
