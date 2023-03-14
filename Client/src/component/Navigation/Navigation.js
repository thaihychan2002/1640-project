import Icon, {
  UserOutlined,
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
import { fetchUserByID } from "../../api";
import NavMobile from "./NavMobile";
import { useMediaQuery } from "@material-ui/core";
const { Sider } = Layout;

export default function Navigation() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const isXs = useMediaQuery("(max-width:400px)");

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
          "/topics",
          "/dashboard",
          "/profile",
          "#signout",
        ]
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
    <div>
      {!isXs ? (
        <Sider className="sider-style" breakpoint="lg" collapsedWidth="80">
          <Menu
            className="menu-style"
            mode="inline"
            defaultSelectedKeys={["0"]}
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
                key: String(index + 1),
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
              .filter((item) => item.key !== "4")}
          />
        </div>
      )}
    </div>
  );
}
