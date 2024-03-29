import Icon, {
  HomeOutlined,
  ApartmentOutlined,
  BarsOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../assets/css/Navigation.css";
import { Layout, Menu } from "antd";
import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Store } from "../../Store";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { fetchUserByID, logout, refresh } from "../../api";
import Responsive from "../ResponsiveCode/Responsive";
import { token } from "../../api/config";
const { Sider } = Layout;

export default function Navigation() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { isXs } = Responsive();


  const role = state.userInfo.role;

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userInfo");
      if (token) {
        const logout = async () => {
          ctxDispatch({ type: "USER_LOGOUT" });
          localStorage.removeItem("userInfo");
          window.location.href = "/login";
          await logout();
        };
        const userID = jwtDecode(token)._id;
        const date = jwtDecode(token).exp - Math.floor(Date.now() / 1000);
        if (userID) {
          try {
            const { data } = await fetchUserByID(userID);
            ctxDispatch({ type: "GET_USER", payload: data });
            if (date < 3600) {
              const response = await refresh();
              localStorage.setItem("userInfo", response.data.token);
            }
          } catch (err) {
            toast.error(getError(err));
            getError(err) === "Invalid token" && logout();
          }
        }
        return;
      } else {
        logout();
      }
    };
    fetchUser();
  }, [ctxDispatch]);
  const linkRoutes =
    role === "Admin"
      ? ["/", "/departments", "/topics", "/dashboard", "/profile", "#signout"]
      : ["/", "/departments", "/topics", "/profile", "#signout"];
  const navName =
    role === "Admin"
      ? [
        "Home",
        "Departments",
        "Topics",
        "Admin Dashboard",
        "Profile",
        "Log out",
      ]
      : ["Home", "Departments", "Topics", "Profile", "Log out"];
  // Hide navbar when route === /login
  const withOutNavbarRoutes = token
    ? ["/login", "/reset-password"]
    : ["/login", "/reset-password", "/forgot-password"];
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
  const logoutHandler = async () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
    await logout();
  };
  return (
    <>
      {!isXs ? (
        <Sider className="sider-style" breakpoint="lg" collapsedWidth="80">
          <Menu
            className="menu-style"
            mode="inline"
            defaultSelectedKeys={["0"]}
            items={[...icons].map((icon, index) => ({
              key: String(index),
              icon: React.createElement(icon),
              label: (
                <Link
                  style={{ textDecoration: "none" }}
                  to={linkRoutes[index]}
                  onClick={() => {
                    navName[index] === "Log out" && logoutHandler();
                  }}
                >
                  {navName[index]}
                </Link>
              ),
            }))}
          />
        </Sider>
      ) : (
        <div className="menu-container">
          <Menu
            defaultSelectedKeys={["0"]}
            mode="horizontal"
            breakpoint="md"
            collapsedWidth="80"
            items={[...icons]
              .map((icon, index) => ({
                key: String(index),
                icon: React.createElement(icon),
                label: (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={linkRoutes[index]}
                    onClick={() => {
                      navName[index] === "Log out" && logoutHandler();
                    }}
                  />
                ),
              }))
              .filter((item) =>
                state.userInfo.role === "Admin" ? item.key !== "3" : item.key
              )}
          />
        </div>
      )}
    </>
  );
}
