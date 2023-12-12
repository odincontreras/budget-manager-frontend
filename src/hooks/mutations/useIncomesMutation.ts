import { useMutation } from "@tanstack/react-query";
import { createUserIncome } from "@/services/users";
import { INCOMES_QUERY_KEY } from "@/constants";
import { useQueryInvalidation } from "./useQueryInvalidation";

const useIncomesMutation = () => {
  const { invalidateQueryHandler } = useQueryInvalidation(INCOMES_QUERY_KEY);

  const mutation = useMutation({
    mutationFn: createUserIncome,
    onSuccess: invalidateQueryHandler,
  });

  return mutation;
};

export default useIncomesMutation;
