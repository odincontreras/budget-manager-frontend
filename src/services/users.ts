import {
  Expense,
  Income,
  ItemsResponse,
  NewExpense,
  NewIcome,
  TotalExpensesAndIncomesFilters,
  TotalMovements,
  UserCurrency,
} from "../types";
import Axios from "../libs/axios";
import useAuthStore from "@/store";

export async function getUserIncomes(
  params?: Record<string, unknown> | undefined
): Promise<ItemsResponse<Income>> {
  const user = useAuthStore.getState().data?.user;

  const { data } = await Axios.get(`/users/${user?.id}/incomes`, {
    params,
  });

  return {
    data: data.incomes,
    total: data._count.incomes,
  };
}

export async function getUserTotalIncomes(
  params: TotalExpensesAndIncomesFilters
): Promise<TotalMovements> {
  const user = useAuthStore.getState().data?.user;

  const { data } = await Axios.get(`/users/${user?.id}/incomes/total`, {
    params,
  });

  return data;
}

export async function createUserIncome(data: NewIcome) {
  const user = useAuthStore.getState().data?.user;

  return Axios.post(`/users/${user?.id}/incomes`, data);
}

export async function deleteUserIncome(incomeId: number) {
  const user = useAuthStore.getState().data?.user;

  return Axios.delete(`/users/${user?.id}/incomes/${incomeId}`);
}

export async function updateUserIncome({
  incomeId,
  update,
}: {
  incomeId: number;
  update: NewIcome;
}) {
  const user = useAuthStore.getState().data?.user;

  return Axios.patch(`/users/${user?.id}/incomes/${incomeId}`, update);
}

export async function getUserExpenses(
  params?: Record<string, unknown> | undefined
): Promise<ItemsResponse<Expense>> {
  const user = useAuthStore.getState().data?.user;

  const { data } = await Axios.get(`/users/${user?.id}/expenses`, {
    params,
  });

  return {
    data: data.expenses,
    total: data._count.expenses,
  };
}

export async function getUserTotalExpenses(
  params: TotalExpensesAndIncomesFilters
): Promise<TotalMovements> {
  const user = useAuthStore.getState().data?.user;

  const { data } = await Axios.get(`/users/${user?.id}/expenses/total`, {
    params,
  });

  return data;
}

export async function createUserExpense(data: NewExpense) {
  const user = useAuthStore.getState().data?.user;

  return Axios.post(`/users/${user?.id}/expenses`, data);
}

export async function deleteUserExpense(expenseId: number) {
  const user = useAuthStore.getState().data?.user;

  return Axios.delete(`/users/${user?.id}/expenses/${expenseId}`);
}

export async function updateUserExpense({
  expenseId,
  update,
}: {
  expenseId: number;
  update: NewExpense;
}) {
  const user = useAuthStore.getState().data?.user;

  return Axios.patch(`/users/${user?.id}/expenses/${expenseId}`, update);
}

export async function getUserCurrencies() {
  const user = useAuthStore.getState().data?.user;

  return Axios.get(`/users/${user?.id}/currencies`);
}

export async function updateUser({
  name,
  lastName,
  currencies,
}: {
  name: string;
  lastName: string;
  currencies: UserCurrency[];
}) {
  const user = useAuthStore.getState().data?.user;

  return Axios.patch(`/users/${user?.id}/profile`, {
    name,
    lastName,
    currencies,
  });
}

export async function verifyToken() {
  return Axios.get("/auth/verify-token");
}
