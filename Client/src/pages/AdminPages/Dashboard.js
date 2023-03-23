import { Tabs } from "antd";
import React from "react";
import UserManage from "./UserManage";
import DepartmentManage from "./DepartmentManage.js/index.js";
import TopicManage from "./TopicManage";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import {
  UserOutlined,
  ApartmentOutlined,
  BarsOutlined,
  BulbOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import PostManage from "./PostManage";
import RoleManage from "./RoleManage";
import CategoryManage from "./CategoryManage";
const DashBoard = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getCategory.getCategoryRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getTopics.getTopicsRequest());
  }, [dispatch]);
  const children = [
    <UserManage />,
    <RoleManage />,
    <DepartmentManage />,
    <CategoryManage />,
    <TopicManage />,
    <PostManage />,
  ];
  const tabName = [
    <span>User Manage</span>,
    <span>Role Manage</span>,
    <span>Department Manage</span>,
    <span>Category Manage</span>,
    <span>Topic Manage</span>,
    <span>Post Manage</span>,
  ];
  const icons = [
    <UserOutlined />,
    <SettingOutlined />,
    <ApartmentOutlined />,
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
        items={new Array(6).fill(null).map((_, i) => {
          return {
            label: (
              <span>
                {icons[i]}
                {tabName[i]}
              </span>
            ),
            key: i,
            children: children[i],
          };
        })}
      />
    </div>
  );
};
export default DashBoard;
