import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserRoute from "../component/ProtectedRoute/UserRoute";
export const AllRoutes = [
  {
    path: "/",
    element: (
      // <UserRoute>
      <HomePage />
      // </UserRoute>
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
];
export default AllRoutes;
