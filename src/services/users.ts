import {
  Expense,
  Income,
  NewExpense,
  NewIcome,
  TotalMovements,
  UserCurrency,
} from "../types";
import Axios from "../libs/axios";
import useAuthStore from "@/store";

export async function getUserIncomes(): Promise<Income[]> {
  const user = useAuthStore.getState().data?.user;

  const { data } = await Axios.get(`/users/${user?.id}/incomes`);

  return data.incomes;
}

export async function getUserTotalIncomes(): Promise<TotalMovements> {
  const user = useAuthStore.getState().data?.user;

  const { data } = await Axios.get(`/users/${user?.id}/incomes/total`);

  return data;
}

export async function createUserIncome(data: NewIcome) {
  const user = useAuthStore.getState().data?.user;

  return Axios.post(`/users/${user?.id}/incomes`, data);
}

export async function getUserExpenses(): Promise<Expense[]> {
  const user = useAuthStore.getState().data?.user;

  const { data } = await Axios.get(`/users/${user?.id}/expenses`);

  return data.expenses;
}

export async function getUserTotalExpenses(): Promise<TotalMovements> {
  const user = useAuthStore.getState().data?.user;

  const { data } = await Axios.get(`/users/${user?.id}/expenses/total`);

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
  update
}: { expenseId: number; update: NewExpense } ) {
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
