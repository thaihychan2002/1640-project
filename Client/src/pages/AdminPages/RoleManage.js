import { Grid } from "@material-ui/core";
import { useEffect, useReducer, useState } from "react";

import {
  fetchRoles,
  deleteRole,
  createRole,
} from "../../api/index";
import { Button, Input, Modal, Space, Table } from "antd";
import reducer from "../../component/Reducer/Reducer.js";
import { toast } from "react-toastify";
import { getError } from "../../utils";

import React from "react";
import { Link } from "react-router-dom";

const RoleManage = () => {
  const [role, setRole] = useState("");
  const [{ roles }, dispatch] = useReducer(reducer, {
    loading: true,
  });
  useEffect(() => {
    const fetchAllRoles = async () => {
      try {
        dispatch({ type: "FETCH_ROLE_REQUEST" });
        const { data } = await fetchRoles();
        dispatch({ type: "FETCH_ROLE_SUCCESS", payload: data });
      } catch (err) {
        toast.error(getError(err));
        dispatch({
          type: "FETCH_ROLE_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchAllRoles();
  }, []);

  const data = roles?.map((role) => ({
    key: role._id,
    role: role.name,
  }));
  const columns = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "30%",
      render: (text) => text,
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Link onClick={() => deleteRoleHandler(record)}>Delete</Link>
        </Space>
      ),
    },
  ];

  const deleteRoleHandler = async (record) => {
    if (window.confirm("Are you sure to delete this role?")) {
      try {
        const id = record.key;
        await deleteRole(id);
        toast.success("Role deleted successfully");
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  const onSubmit = async () => {
    try {
      await createRole(role);
      toast.success("Role created successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const [ModalOpen, setModalOpen] = useState(false);
  const handleClose = React.useCallback(() => {
    setModalOpen(false);
  }, []);
  const viewModal = React.useCallback(() => {
    setModalOpen(true);
  }, []);
  const checkToRole = () => {
    return role === "";
  };
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        <Button type="primary" onClick={viewModal}>
          Add new role
        </Button>
        <Table columns={columns} dataSource={data} />
        <Modal
          open={ModalOpen}
          onOk={handleClose}
          onCancel={handleClose}
          footer={null}
          style={{ width: 100, height: 150 }}
        >
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} lg={12} className="row-new-post">
              <center>Create new role</center>
            </Grid>
            <Grid item xs={3} lg={3} />
            <Grid item xs={6} lg={6} className="row-new-post">
              <Input
                allowClear
                placeholder="Write the name of role"
                size="large"
                onChange={(e) => setRole(e.target.value)}
                style={{ marginBottom: 15 }}
                required
              />
              <Button
                disabled={checkToRole()}
                type="primary"
                block
                onClick={onSubmit}
              >
                Add new
              </Button>
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    </Grid>
  );
};
export default RoleManage;
