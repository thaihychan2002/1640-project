import { Grid } from "@material-ui/core";
import { useEffect, useReducer, useState } from "react";
import { fetchUsers, deleteUser } from "../api/index";
import { Space, Table } from "antd";
import reducer from "../component/Reducer/Reducer.js";
import { toast } from "react-toastify";
import { getError } from "../utils";
import LoadingBox from "../component/LoadingBox/LoadingBox";
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UserManage = () => {
  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    const fetchAllUsers = async () => {
      try {
        dispatch({ type: "FETCH_USER_REQUEST" });
        const { data } = await fetchUsers(token);
        dispatch({ type: "FETCH_USER_SUCCESS", payload: data });
      } catch (err) {
        toast.error(getError(err));
        dispatch({
          type: "FETCH_USER_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchAllUsers();
  }, []);
  const deleteUserHandler = async (record) => {
    const token = localStorage.getItem("userInfo");
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        const userID = record.key;
        await deleteUser(userID, token);
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  const [{ loading, users }, dispatch] = useReducer(reducer, {
    loading: true,
  });
  const data = users?.map((user) => ({
    key: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    department: user.department,
  }));
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "30%",
      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",

      render: (_, record) => (
        <Space size="middle">
          <Link to="/update">Update </Link>
          <Link onClick={() => deleteUserHandler(record)}>Delete</Link>
        </Space>
      ),
    },
  ];

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Helmet>
        <title>User Manage</title>
      </Helmet>
      <Grid item xs={2} sm={2}></Grid>
      <Grid item xs={10} sm={10}>
        {loading ? (
          <LoadingBox />
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
      </Grid>
    </Grid>
  );
};
export default UserManage;
