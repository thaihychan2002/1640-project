import { Tabs } from "antd";
import React from "react";
import UserManage from "./UserManage";
import DepartmentManage from "./DepartmentManage.js/index.js";
import CategoryManage from "./CategoryManage"
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { UserOutlined, ApartmentOutlined, BarsOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import PostManage from "./PostManage";
const DashBoard = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getCategories.getCategoriesRequest());
  }, [dispatch]);
  const children = [<UserManage />, <DepartmentManage />, <CategoryManage />, <PostManage/>,""];
  const icon =[<UserOutlined/>, <ApartmentOutlined/>,<BarsOutlined/>]
  const tabName = [
    <span>User Manage</span>,
    <span>Department Manage</span>,
    <span>Category Manage</span>,

    <span>Post Manage</span>
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
