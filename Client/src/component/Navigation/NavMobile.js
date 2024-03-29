import Icon, {
  HomeOutlined,
  ApartmentOutlined,
  BarsOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import "../assets/css/Navigation.css";
import { Menu } from "antd";
import { useLocation, Link } from "react-router-dom";
import { Store } from "../../Store";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { fetchUserByID } from "../../api";


export default function NavMobile() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  React.useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userInfo");
      if (token) {
        const userID = jwtDecode(token)._id;
        if (userID) {
          try {
            const { data } = await fetchUserByID(userID);
            ctxDispatch({ type: "GET_USER", payload: data });
          } catch (err) {
            toast.error(getError(err));
          }
        }
        return;
      }
      return;
    };
    fetchUser();
  }, [ctxDispatch]);

  const role = state.userInfo.role;
  const linkRoutes =
    role === "Admin"
      ? [
        "/",
        "/departments",
        "/categories",
        "/dashboard",
        "/profile",
        "#signout",
      ]
      : ["/", "/departments", "/categories", "/profile", "#signout"];
  const navName =
    role === "Admin"
      ? [
        "Home",
        "Departments",
        "Categories",
        "Admin Dashboard",
        "Profile",
        "Log out",
      ]
      : ["Home", "Departments", "Categories", "Profile", "Log out"];
  // Hide navbar when route === /login
  const withOutNavbarRoutes = ["/login"];
  const { pathname } = useLocation();
  if (withOutNavbarRoutes.some((item) => pathname.includes(item))) return null;
  //
  const profile = () => (
    <img
      style={{
        width: "16px",
        height: "16px",
      }}
      src={state.userInfo.avatar}
      alt={state.userInfo.fullName}
    />
  );

  const ProfileOutlined = (props) => <Icon component={profile} {...props} />;

  const icons =
    role === "Admin"
      ? [
        HomeOutlined,
        ApartmentOutlined,
        BarsOutlined,
        LineChartOutlined,
        ProfileOutlined,
        LogoutOutlined,
      ]
      : [
        HomeOutlined,
        ApartmentOutlined,
        BarsOutlined,
        ProfileOutlined,
        LogoutOutlined,
      ];

  const logoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    // <Sider>
    <Menu
      defaultSelectedKeys={["0"]}
      style={{ width: "100vw", position: "fixed", bottom: 0, zIndex: 1 }}
      mode="horizontal"
      breakpoint="lg"
      collapsedWidth="80"
      items={[...icons].map((icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: (
          <Link
            style={{ textDecoration: "none" }}
            to={linkRoutes[index]}
            onClick={() => {
              navName[index] === "Log out" && logoutHandler();
            }}
          ></Link>
        ),
      }))}
    />
    // </Sider>
  );
}
