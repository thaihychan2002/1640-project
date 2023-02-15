import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import UserManage from "../pages/UserManage";
import UserRoute from "../component/ProtectedRoute/UserRoute";
import AdminRoute from "../component/ProtectedRoute/AdminRoute";
export const AllRoutes = [
  {
    path: "/",
    element: (
      <UserRoute>
        <HomePage />
      </UserRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/register", element: <Register /> },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/usermanage",
    element: (
      <AdminRoute>
        <UserManage />
      </AdminRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <UserRoute>
        <Profile />
      </UserRoute>
    ),
  },
];
export default AllRoutes;
