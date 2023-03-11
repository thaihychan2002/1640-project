import { Button, Modal, Tabs } from "antd";
import React, { useState } from "react";
import UserManage from "./UserManage";
import DepartmentManage from "./DepartmentManage.js/index.js";
import CategoryManage from "./CategoryManage";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import {
  UserOutlined,
  ApartmentOutlined,
  BarsOutlined,
  BulbOutlined,
  SettingOutlined,
  PieChartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import PostManage from "./PostManage";
import RoleManage from "./RoleManage";
import PieChart from "../../component/Charts/PieChart";
import BarChart from "../../component/Charts/BarChart";
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
  const children = [
    <UserManage />,
    <RoleManage />,
    <DepartmentManage />,
    <CategoryManage />,
    <PostManage />,
  ];
  const childrenReport = [<PieChart />, <BarChart />];
  const tabName = [
    <span>User Manage</span>,
    <span>Role Manage</span>,
    <span>Department Manage</span>,
    <span>Category Manage</span>,
    <span>Post Manage</span>,
  ];
  const icons = [
    <UserOutlined />,
    <SettingOutlined />,
    <ApartmentOutlined />,
    <BarsOutlined />,
    <BulbOutlined />,
  ];
  const chartName = [<span>Total ideas</span>, <span>Ideas per day</span>];
  const iconsChart = [<PieChartOutlined />, <BarChartOutlined />];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const operations = <Button onClick={showModal}>Report Ideas</Button>;

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        centered
        items={new Array(5).fill(null).map((_, i) => {
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

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{
          width: 500,
          height: 550,
        }}
      >
        <center>Report of ideas</center>
        <Tabs
          defaultActiveKey="1"
          centered
          items={new Array(2).fill(null).map((_, i) => {
            return {
              label: (
                <span>
                  {iconsChart[i]}
                  {chartName[i]}
                </span>
              ),
              key: i,
              children: childrenReport[i],
            };
          })}
        />
      </Modal>
    </div>
  );
};
export default DashBoard;
