import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import AuthRegister from './pages/auth/register';
import AuthLogin from './pages/auth/login';
import AdminLayout from './components/admin-view/layout';
import AdminOrders from './pages/admin-view/orders';
import AdminFeatures from './pages/admin-view/features';
import AdminProducts from './pages/admin-view/products';
import AdminDashboard from './pages/admin-view/dashboard';
import ShoppingLayout from './components/shopping-view/layout';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import NotFound from './pages/not-found';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page'; // Corrected the name here

function App() {

  const isAuthenticated = false;
  const user =null;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Shopping Routes */}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="/unauth-page" element={<UnauthPage />} /> {/* Fixed component name */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
