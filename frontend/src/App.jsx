import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginCustomer from "./pages/Customer/Login";
import SignUpCustomer from "./pages/Customer/SignUp";
import HomepageAdmin from "./pages/Admin/Homepage";
import LoginAdmin from "./pages/Admin/Login";
import DashboardPage from "./pages/Admin/Dashboard";
import StackManagementPage from "./pages/Admin/StockManagement";
import {
  ProductReviewLandingPage,
  ProductReviewDetailPage,
} from "./pages/Admin/ProductReviews";
import TrackOrderPage from "./pages/Admin/TrackOrders";
import TrackOrdersDetailPage from "./pages/Admin/TrackOrdersDetail";
import ProductEditPage from "./pages/Admin/ProductEdit";
import CustomerManagementPage from "./pages/Admin/CustomerManagement";
import AdminManagementPage from "./pages/Admin/AdminManagement";
import AdminProfilePage from "./pages/Admin/AdminProfile";
import FlashSalesAddPage from "./pages/Admin/FlashSalesAdd";
import FlashSalesListPage from "./pages/Admin/FlashSalesList";
import ReportPage from "./pages/Admin/Report";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";

const ROUTES = {
  CUSTOMER: [
    { path: "/customer/login", element: <LoginCustomer /> },
    { path: "/customer/signup", element: <SignUpCustomer /> },
    {
      path: "/customer/homepage",
      element: (
        //<PrivateRoute requiredRole="customer">
          {/* Customer Dashboard */}
        //</PrivateRoute>
      ),
    },
  ],
  ADMIN: [
    { path: "/admin/login", element: <LoginAdmin /> },
    {
      path: "/admin/homepage",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <HomepageAdmin />
        //</PrivateRoute>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <DashboardPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "/admin/inventory/stock-management",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <StackManagementPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "/admin/inventory/stock-management/:productId",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <ProductEditPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "/admin/inventory/products-reviews",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <ProductReviewLandingPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "/admin/inventory/products-reviews/:productId",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <ProductReviewDetailPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "admin/orders/track",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <TrackOrderPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "admin/orders/track/:orderId",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <TrackOrdersDetailPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "admin/user/customers",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <CustomerManagementPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "admin/user/admins",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <AdminManagementPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "admin/user/admins/:adminId",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <AdminProfilePage />
        //</PrivateRoute>
      ),
    },
    {
      path: "admin/flash-sales",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <FlashSalesListPage />
        //</PrivateRoute>
      ),
    },
    // {
    //   path: "admin/flash-sales/add",
    //   element: (
    //     //<PrivateRoute requiredRole="Super Admin">
    //       <FlashSalesAddPage />
    //     //</PrivateRoute>
    //   ),
    // },
    {
      path: "admin/flash-sales/edit/:id",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <FlashSalesAddPage />
        //</PrivateRoute>
      ),
    },
    {
      path: "/admin/report",
      element: (
        //<PrivateRoute requiredRole="Super Admin">
          <ReportPage />
        //</PrivateRoute>
      ),

    },
  ],
  REDIRECTS: [
    { path: "/", element: <Navigate to="/customer/homepage" replace /> },
    { path: "/admin/", element: <Navigate to="/admin/homepage" replace /> },
  ],
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Redirects */}
        {ROUTES.REDIRECTS.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Customer Routes */}
        {ROUTES.CUSTOMER.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Admin Routes */}
        {ROUTES.ADMIN.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;