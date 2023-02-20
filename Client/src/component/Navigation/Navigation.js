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
import { getError } from "../../utils";
import { toast } from "react-toastify";
import { fetchUserByID } from "../../api/index";
const { Sider } = Layout;

export default function Navigation() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const navName = [
    "Home",
    "Department",
    "Categories",
    "Admin Dashboard",
    "User Manage",
  ];
  const linkRoutes = [
    "/",
    "/department",
    "/categories",
    "/dashboard",
    "/usermanage",
  ];
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
