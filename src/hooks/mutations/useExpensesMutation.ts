import { useMutation } from "@tanstack/react-query";
import { useQueryInvalidation } from "./useQueryInvalidation";
import { createUserExpense } from "@/services/users";
import { EXPENSES_QUERY_KEY } from "@/constants";

const useExpensesMutation = () => {
  const { invalidateQueryHandler } = useQueryInvalidation(EXPENSES_QUERY_KEY);

  const mutation = useMutation({
    mutationFn: createUserExpense,
    onSuccess: invalidateQueryHandler,
  });

  return mutation;
};

export default useExpensesMutation;
