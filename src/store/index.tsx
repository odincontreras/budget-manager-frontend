import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { ApiErrorResponse, User, UserCurrency } from "@/types";
import { login } from "@/features/auth/services";
import { updateUser, verifyToken } from "@/services/users";
import { NavigateFunction } from "react-router-dom";

interface AuthStore {
  isLoading: boolean;
  isAuthenticated: boolean;
  data: {
    user: User;
    token: string;
  } | null;
  error: ApiErrorResponse | boolean | null;
  toogleLoading: () => void;
  loginHandler: (
    email: string,
    password: string
  ) => Promise<Pick<AuthStore, "data" | "error">>;
  updateUserHandler: (update: {
    name: string;
    lastName: string;
    currencies: UserCurrency[];
  }) => Promise<void>;
  verifyToken: (props: {
    navigate: NavigateFunction;
    pathname: string;
    authToken?: string;
  }) => Promise<void>;
}

const useAuthStore = create(
  devtools<AuthStore>(
    (set, get) => ({
      isLoading: false,
      isAuthenticated: false,
      data: null,
      error: null,
      toogleLoading() {
        set((state) => ({ isLoading: !state.isLoading }));
      },
      async loginHandler(email, password) {
        try {
          get().toogleLoading();

          const data = await login(email, password);

          if (data) {
            localStorage.setItem("bugget-manager-auth-token", data.token);
          }

          set({ data, isAuthenticated: true });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            set({ error: error?.response?.data as ApiErrorResponse });
          } else {
            set({ error: true });
          }
        } finally {
          get().toogleLoading();
        }

        return {
          data: get().data,
          error: get().error,
        };
      },
      async updateUserHandler(update: {
        name: string;
        lastName: string;
        currencies: UserCurrency[];
      }) {
        try {
          get().toogleLoading();

          const { data: userUpdate } = await updateUser(update);

          const prevData = get().data as {
            user: User;
            token: string;
          };

          set({
            data: { ...prevData, user: { ...prevData.user, ...userUpdate } },
          });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            set({ error: error?.response?.data as ApiErrorResponse });
          } else {
            set({ error: true });
          }
        } finally {
          get().toogleLoading();
        }
      },
      async verifyToken({ navigate, pathname, authToken }) {
        try {
          get().toogleLoading();

          const { data } = await verifyToken();

          set({
            data: { user: data, token: authToken as string },
            isAuthenticated: true,
          });

          if (!pathname.includes("/dashboard")) {
            navigate("/dashboard");
          }
        } catch (error) {
          set({ isAuthenticated: false, data: null });
          localStorage.removeItem("bugget-manager-auth-token");
          navigate("/login");
        } finally {
          get().toogleLoading();
        }
      },
    }),
    {
      store: "authStore",
      name: "authStore",
    }
  )
);

export default useAuthStore;
