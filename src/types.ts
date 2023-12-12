export interface User {
  id: string;
  name: string;
  email: string;
  lastName: string;
  password: string;
  isVerified: boolean;
  confimationToken: string;
  userCurrencies: UserCurrency[];
}

export interface UserCurrency {
  userId: number;
  currencyId: number;
  weeklySpendingGoal?: number;
  monthlySpendingGoal?: number;
  isDefault: boolean;
}

export interface Income {
  id: string;
  amount: number;
  currency: string;
  description?: string;
  date: Date;
  createdAt: string;
  updatedAt: string;
}

export interface TotalMovements {
  amount: number;
}

export type NewIcome = Omit<Income, "id" | "createdAt" | "updatedAt">;

export interface Expense {
  id: number;
  amount: number;
  description?: string;
  userId: number;
  currencyId: number;
  categoryId: number;
  date: Date;
  createdAt: string;
  updatedAt: string;
}

export type NewExpense = Omit<Expense, "id" | "createdAt" | "updatedAt">;

export interface Currency {
  id: number;
  name: string;
  symbol: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface AuthUser {
  user: User;
  token: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}
