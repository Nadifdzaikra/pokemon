// import { createBrowserRouter, Navigate } from "react-router-dom";
import { createHashRouter } from "react-router-dom";
import LayoutMain from "../Components/Layouts/LayoutMain";
import HomePage from "../pages/HomePage";
// import LoginPage from "../Pages/LoginPage";
// import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";
import ContextPage from "../pages/Context";
// Status autentikasi dari localStorage
// const isAuthenticated = localStorage.getItem("authToken") !== null;
const router = createHashRouter(
  [
    {
      path: "/",
      element: (
        // <ProtectedRoute isAuthenticated={isAuthenticated}>
        <LayoutMain />
        // </ProtectedRoute>
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
        {
          path: "/context",
          element: <ContextPage />,
        },
      ],
    },
    //   {
    //     path: "/login",
    //     element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
    //   },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]
  //   { basename: import.meta.env.BASE_URL }
);

export default router;
