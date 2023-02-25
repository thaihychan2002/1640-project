import {
  UserOutlined,
  HomeOutlined,
  ApartmentOutlined,
  BarsOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import "../assets/css/Navigation.css";
import { Layout, Menu, theme } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Store } from "../../Store";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { fetchUserByID } from "../../api";
const { Sider } = Layout;

export default function Navigation() {
  useEffect(() => {
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
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const navName = [
    "Home",
    "Department",
    "Categories",
    "Admin Dashboard",
    "QA Coordinator",
  ];
  const linkRoutes = ["/", "/department", "/categories", "/dashboard", "/qa"];
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // Hide navbar when route === /login or /register
  const withOutNavbarRoutes = ["/login", "/register"];
  const { pathname } = useLocation();
  if (withOutNavbarRoutes.some((item) => pathname.includes(item))) return null;
  //

  return (
    <Sider
      className="sider-style"
      breakpoint="lg"
      collapsedWidth="80"
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
    >
      <Menu
        className="menu-style"
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={[
          HomeOutlined,
          ApartmentOutlined,
          BarsOutlined,
          LineChartOutlined,
          UserOutlined,
        ].map((icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: (
            <Link style={{ textDecoration: "none" }} to={linkRoutes[index]}>
              {navName[index]}
            </Link>
          ),
        }))}
      />
    </Sider>
  );
}
