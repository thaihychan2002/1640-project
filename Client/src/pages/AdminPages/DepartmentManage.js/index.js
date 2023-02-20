import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { departmentsLoading$, departmentsState$, modalState$ } from "../../../redux/seclectors";
import * as actions from "../../../redux/actions";
import React from "react";
import { Link } from "react-router-dom";
import Department from './department'
import { Space, Table, Button, Modal, Input } from "antd";
import LoadingBox from "../../../component/LoadingBox/LoadingBox";

const { TextArea } = Input;
export default function DepartmentManage() {

  const dispatch = useDispatch()
  const departments = useSelector(departmentsState$)
  const loading = useSelector(departmentsLoading$)
  const { isShow } = useSelector(modalState$);
  const [data, setdata] = React.useState({
    name: "",
  });
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  const depart = departments?.map((department) => ({
    key: department._id,
    department: department.name,
  }));
  const viewModal = React.useCallback(() => {
    dispatch(actions.showModal());
  }, [dispatch])
  const deletedepartHandler = React.useCallback((record) => {
    dispatch(actions.deleteDepartments.deleteDepartmentsRequest(record.key))
  }, [dispatch])
  const columns = [
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
          <Department depart={record}></Department>
          <Link onClick={() => deletedepartHandler(record)}>Delete</Link>
        </Space>
      ),
    },
  ]
  const handleOk = React.useCallback(() => {
    dispatch(actions.hideModal());
  }, [dispatch]);
  const onSubmit = React.useCallback(() => {
    dispatch(actions.createDepartments.createDepartmentsRequest(data));
    handleOk();
  }, [data, dispatch, handleOk]);
  const checkToDepartment = () => {
    return data.name === "";
  };
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        <Button type="primary" onClick={viewModal}> Add new department</Button>
        <Modal open={isShow}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          className="container">
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} lg={12} className="row-new-post">
              <center>Create new department</center>
            </Grid>
            <Grid item xs={12} lg={12} className="row-new-post">
              <TextArea
                allowClear
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                placeholder='Write the name of department'
                size="large"
                value={data.name}
                onChange={(e) =>
                  setdata({ ...data, name: e.target.value })
                }
                required
              />
              <Button
                disabled={checkToDepartment()}
                type="primary"
                block
                onClick={onSubmit}
              >
                Add new
              </Button>
            </Grid>
          </Grid>
        </Modal>
        {loading ? (
          <LoadingBox />
        ) : (
          <Table columns={columns} dataSource={depart} />
        )}
      </Grid>
    </Grid>
  );
}
