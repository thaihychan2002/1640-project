import { Grid } from "@material-ui/core";
import { useEffect, useReducer, useState } from "react";
import { fetchUsers, deleteUser } from "../../api/index";
import { Space, Table } from "antd";
import reducer from "../../component/Reducer/Reducer.js";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import React from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../api/index";
import { Select } from "antd";
const { Option } = Select;
const UserManage = () => {
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        dispatch({ type: "FETCH_USER_REQUEST" });
        const { data } = await fetchUsers();
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
  const [role, setRole] = useState("");
  const updateUserHandler = async (record) => {
    if (window.confirm("Are you sure to update this user?")) {
      try {
        const userID = record.key;
        await updateUser(userID, role);
        toast.success(`User updated to ${role} successfully`);
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  const deleteUserHandler = async (record) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        const userID = record.key;
        await deleteUser(userID);
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
      render: (_, record) => (
        <Select
          size="large"
          defaultValue={record.role}
          style={{ width: "100%" }}
          onChange={(event) => setRole(event)}
        >
          <Option value="Admin">Admin</Option>
          <Option value="Staff">Staff</Option>
        </Select>
      ),
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
          <Link onClick={() => updateUserHandler(record)}>Update </Link>
          <Link onClick={() => deleteUserHandler(record)}>Delete</Link>
        </Space>
      ),
    },
  ];

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
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
