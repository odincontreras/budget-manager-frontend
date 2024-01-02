import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./components/Layouts/AuthLayout/index.tsx";
import LoginPage from "./features/auth/pages/Login/index.tsx";
import SigninPage from "./features/auth/pages/SignIn/index.tsx";
import DashboardLayout from "./components/Layouts/DashboardLayout/index.tsx";
import ExpensesPage from "./features/expenses/pages/ExpensesPage.tsx";
import IncomesPage from "./features/incomes/pages/IncomesPage.tsx";
import ProfilePage from "./features/profile/pages/ProfilePage.tsx";
import HomePage from "./features/home/pages/HomePage.tsx";
import VerifyToken from "./features/auth/components/VerifyToken/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <VerifyToken>
        <AuthLayout />
      </VerifyToken>
    ),
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      {
        path: "login",
        element: <LoginPage />,
        index: true,
      },
      {
        path: "signin",
        element: <SigninPage />,
      },
    ],
  },
  {
    path: "/dashboard/",
    element: (
      <VerifyToken>
        <DashboardLayout />
      </VerifyToken>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "expenses",
        element: <ExpensesPage />,
      },
      {
        path: "incomes",
        element: <IncomesPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
