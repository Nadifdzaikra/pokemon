import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutMain from "../Components/Layouts/LayoutMain";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import NotFoundPage from "../Pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

// Status autentikasi dari localStorage
const isAuthenticated = localStorage.getItem("authToken") !== null;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <LayoutMain />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
