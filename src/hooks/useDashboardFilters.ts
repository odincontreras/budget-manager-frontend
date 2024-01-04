import dayjs from "dayjs";
import React from "react";
import useCurrenciesQuery from "./queries/useCurrenciesQuery";
import useAuthStore from "@/store";
import { ExpensesAndIncomesFilters } from "@/types";

const useDashboardFilters = () => {
  const [filters, setFilters] = React.useState<ExpensesAndIncomesFilters>({});

  const currencyQuery = useCurrenciesQuery();
  const user = useAuthStore((state) => state.data?.user);

  const currentDate = React.useMemo(() => dayjs(), []);

  const firstDayOfMonth = React.useMemo(
    () => currentDate.startOf("month"),
    [currentDate]
  );

  const lastDayOfMonth = React.useMemo(
    () => currentDate.endOf("month"),
    [currentDate]
  );

  React.useEffect(() => {
    if (user && currencyQuery.data) {
      setFilters({
        currencyId: user.userCurrencies.find((currency) => currency.isDefault)
          ?.currencyId,
        date: {
          gte: firstDayOfMonth.toISOString(),
          lte: lastDayOfMonth.toISOString(),
        },
      });
    }
  }, [currencyQuery.data, firstDayOfMonth, lastDayOfMonth, user]);

  const onUpdateFilters = (key: string, value: number | dayjs.Dayjs[]) => {
    if (key === "date" && Array.isArray(value)) {
      setFilters({ ...filters, [key]: { gte: value[0].toISOString(), lte: value[1].toISOString() } });
    } else {
      setFilters({ ...filters, [key]: value });
    }
  };

  return {
    filters,
    onUpdateFilters,
  };
};

export default useDashboardFilters;
