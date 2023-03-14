import HomePage from "../pages/AuthPages/HomePage";
import NotFound from "../pages/NotAuthPages/NotFound";
import Login from "../pages/NotAuthPages/Login";
import Register from "../pages/NotAuthPages/Register";
import Profile from "../pages/AuthPages/Profile";
import DashBoard from "../pages/AdminPages/Dashboard";
import QA from "../pages/QAPages/QA";
import UserRoute from "../component/ProtectedRoute/UserRoute";
import AdminRoute from "../component/ProtectedRoute/AdminRoute";
import PostDetails from "../pages/AuthPages/PostDetails";
import SearchPage from "../pages/AuthPages/SearchPage";
import DepartmentPage from "../pages/AuthPages/DepartmentPage";
import TopicPage from "../pages/AuthPages/TopicPage";
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
  // { path: "/register", element: <Register /> },
  {
    path: "*",
    element: (
      <UserRoute>
        <NotFound />
      </UserRoute>
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
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashBoard />
      </AdminRoute>
    ),
  },
  // {
  //   path: "/qa",
  //   element: (
  //     <AdminRoute>
  //       <QA />
  //     </AdminRoute>
  //   ),
  // },
  {
    path: "/idea/:slug",
    element: <PostDetails />,
  },
  {
    path: "/search/:keyword",
    element: <SearchPage />,
  },
  {
    path: "/departments",
    element: <DepartmentPage />,
  },
  {
    path: "/topics",
    element: <TopicPage />,
  },
];
export default AllRoutes;
