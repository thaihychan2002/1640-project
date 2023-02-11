import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserRoute from "../component/ProtectedRoute/UserRoute";
export const Routes = [
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
];
