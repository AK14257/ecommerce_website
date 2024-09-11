import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // If not authenticated and not on the login or register page, redirect to login
  if (!isAuthenticated && !(location.pathname.includes('/register') || location.pathname.includes('/login'))) {
    return <Navigate to="/auth/login" />;
  }

  // If authenticated and trying to access login or register, redirect based on role
  if (isAuthenticated && (location.pathname.includes('/register') || location.pathname.includes('/login'))) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // If authenticated but user is not admin and trying to access admin routes
  if (isAuthenticated && user?.role !=='admin' && location.pathname.includes('admin')) {
    return <Navigate to="/unauth-page" />;
  }

  // If authenticated and admin, access admin dashboard
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
    return <Navigate to="/admin/dashboard" />;
  }
 
  // If everything is fine, return the children (protected content)
  return children;
}

export default CheckAuth;
