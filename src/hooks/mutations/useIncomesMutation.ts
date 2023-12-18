import { MutationFunction, useMutation } from "@tanstack/react-query";
import {
  createUserIncome,
  deleteUserIncome,
  updateUserIncome,
} from "@/services/users";
import { INCOMES_QUERY_KEY } from "@/constants";
import { useQueryInvalidation } from "./useQueryInvalidation";
import { MutationCustomHookProps } from "@/types";

const useIncomesMutation = ({
  action = "create",
  extraOnSuccess = () => {},
}: MutationCustomHookProps) => {
  const { invalidateQueryHandler } = useQueryInvalidation(INCOMES_QUERY_KEY);

  const mutationFn =
    action === "delete"
      ? deleteUserIncome
      : action === "update"
      ? updateUserIncome
      : createUserIncome;

  const mutation = useMutation({
    mutationFn: mutationFn as MutationFunction<unknown, unknown>,
    onSuccess: () => {
      invalidateQueryHandler();
      extraOnSuccess();
    },
  });

  return mutation;
};

export default useIncomesMutation;
