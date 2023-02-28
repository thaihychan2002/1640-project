import { Tabs } from "antd";
import UserManage from "./UserManage";
import DepartmentManage from "./DepartmentManage.js/index.js";
import CategoryManage from "./CategoryManage";
import {
  UserOutlined,
  ApartmentOutlined,
  BarsOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import PostManage from "./PostManage";
const DashBoard = () => {
  const children = [
    <UserManage />,
    <DepartmentManage />,
    <CategoryManage />,
    <PostManage />,
  ];
  const tabName = [
    <span>User Manage</span>,
    <span>Department Manage</span>,
    <span>Category Manage</span>,
    <span>Post Manage</span>,
  ];
  const icon = [
    <UserOutlined />,
    <ApartmentOutlined />,
    <BarsOutlined />,
    <BulbOutlined />,
  ];
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Tabs
        defaultActiveKey="1"
        centered
        items={new Array(4).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: (
              <span>
                {icon[id - 1]}
                {tabName[id - 1]}
              </span>
            ),
            key: id,
            children: children[id - 1],
          };
        })}
      />
    </div>
  );
};
export default DashBoard;
