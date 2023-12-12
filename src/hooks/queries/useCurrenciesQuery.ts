import { useQuery } from "@tanstack/react-query";
import { CURRENCIES_QUERY_KEY } from "@/constants";
import { getCurrencies } from "@/services/currencies";

const useCurrenciesQuery = () => {
  const queryData = useQuery({
    queryKey: [CURRENCIES_QUERY_KEY],
    queryFn: getCurrencies,
  });

  return queryData;
};

export default useCurrenciesQuery;
