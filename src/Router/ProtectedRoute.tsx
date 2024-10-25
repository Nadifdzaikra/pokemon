import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Arahkan ke halaman login jika tidak terautentikasi
  }

  return children; // Tampilkan halaman jika terautentikasi
};

export default ProtectedRoute;
