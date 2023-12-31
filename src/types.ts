import { SorterResult } from "antd/es/table/interface";

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
  currencyId: number;
  description?: string;
  date: Date;
  createdAt: string;
  updatedAt: string;
}

export interface TotalMovements {
  amount: number;
}

export interface MutationCustomHookProps {
  action?: "create" | "update" | "delete";
  extraOnSuccess?: () => void;
}

export interface QueryCustomHookProps {
  reqParams?: Record<string, unknown>;
  orderBy?: Record<string, unknown>;
}

export type ItemsResponse<T> = {
  data: T[];
  total: number;
};
export interface TotalExpensesAndIncomesFilters {
  currencyId?: number;
}

export interface ExpensesAndIncomesFilters
  extends TotalExpensesAndIncomesFilters {
  date?: {
    gte?: string;
    lte?: string;
  };
}

export interface QueryParams<ModelType, RequestFilters> {
  take?: number;
  skip?: number;
  orderBy?: Partial<Record<keyof ModelType, "asc" | "desc">>;
  filters?: RequestFilters;
}

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

export type ChartConfig = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  type?:
    | "area"
    | "line"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap"
    | undefined;
  options: ApexCharts.ApexOptions;
};

export type TablesSorter =
  | SorterResult<Expense>
  | SorterResult<Expense>[]
  | SorterResult<Income>
  | SorterResult<Income>[];

export type NewIcome = Omit<Income, "id" | "createdAt" | "updatedAt">;

export type ModalActions = {
  open: string | number | boolean;
  onToggleOpen: () => void;
  onSetOpen: (value: boolean | number | string) => void;
};
