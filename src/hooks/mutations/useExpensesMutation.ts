import { MutationFunction, useMutation } from "@tanstack/react-query";
import { useQueryInvalidation } from "./useQueryInvalidation";
import {
  createUserExpense,
  deleteUserExpense,
  updateUserExpense,
} from "@/services/users";
import { EXPENSES_QUERY_KEY } from "@/constants";
import { MutationCustomHookProps } from "@/types";

const useExpensesMutation = ({
  action = "create",
  extraOnSuccess = () => {},
}: MutationCustomHookProps) => {
  const { invalidateQueryHandler } = useQueryInvalidation(EXPENSES_QUERY_KEY);

  const mutationFn =
    action === "delete"
      ? deleteUserExpense
      : action === "update"
      ? updateUserExpense
      : createUserExpense;

  const mutation = useMutation({
    mutationFn: mutationFn as MutationFunction<unknown, unknown>,
    onSuccess: () => {
      invalidateQueryHandler();
      extraOnSuccess();
    },
  });

  return mutation;
};

export default useExpensesMutation;
