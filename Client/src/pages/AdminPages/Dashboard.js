import { Tabs } from "antd";
import UserManage from "./UserManage";
import DepartmentManage from "./DepartmentManage";
import PostManage from "./PostManage";
import {
  UserOutlined,
  ApartmentOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
const DashBoard = () => {
  const children = [<UserManage />, <DepartmentManage />, <PostManage />];
  const tabName = ["Users Manage", "Departments Manage", "Posts Manage"];
  const icon = [<UserOutlined />, <ApartmentOutlined />, <FormOutlined />];
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Tabs
        defaultActiveKey="1"
        centered
        items={new Array(3).fill(null).map((_, i) => {
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
