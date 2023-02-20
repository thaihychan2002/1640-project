import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { Helmet } from "react-helmet-async";
import { departmentsState$ } from "../../redux/seclectors/";
import { useSelector, useDispatch } from "react-redux";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import * as actions from "../../redux/actions";

export default function DepartmentManage() {
  const dispatch = useDispatch();

  const departments = useSelector(departmentsState$);
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);

  const data = departments?.map((department) => ({
    key: department._id,
    department: department.name,
  }));

  const columns = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: "70%",
    },
    {
      title: "Action",
      key: "action",
      width: "30%",

      render: (_, record) => (
        <Space size="middle">
          <Link>Update </Link>
          <Link>Delete</Link>
        </Space>
      ),
    },
  ];

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        <Table columns={columns} dataSource={data} />
      </Grid>
    </Grid>
  );
}
