import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { categoriesLoading$, categoriesState$, modalState$ } from "../../redux/seclectors";
import * as actions from "../../redux/actions";
import React from "react";
import { Link } from "react-router-dom";
import { Space, Table, Button, Modal, Input } from "antd";
import LoadingBox from "../../component/LoadingBox/LoadingBox";

const { TextArea } = Input;
export default function DepartmentManage() {

  const dispatch = useDispatch()
  const categories = useSelector(categoriesState$)
  const loading = useSelector(categoriesLoading$)
  const { isShow } = useSelector(modalState$);
  const [data, setdata] = React.useState({
    name: "",
  });
  React.useEffect(() => {
    dispatch(actions.getCategories.getCategoriesRequest());
  }, [dispatch]);
  const category = categories?.map((category) => ({
    key: category._id,
    category: category.name,
  }));
  const updatedepartHandler = React.useCallback((record) => {
    dispatch(actions.updateDepartments.updateDepartmentsRequest({ ...record, }))
  }, [dispatch])
  const deletedepartHandler = React.useCallback((record) => {
    dispatch(actions.deleteDepartments.deleteDepartmentsRequest(record.key))
  }, [dispatch])
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Link onClick={() => updatedepartHandler(record)}>Update </Link>
          <Link onClick={() => deletedepartHandler(record)}>Delete</Link>
        </Space>
      ),
    },
  ]
  const viewModal = React.useCallback(() => {
    dispatch(actions.showModal());
  }, [dispatch])
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
        <Button type="primary" onClick={viewModal}> Add new category</Button>
        <Modal open={isShow}
          onOk={handleOk}
          onCancel={handleOk}
          footer={null}
          className="container">
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} lg={12} className="row-new-post">
              <center>Create new category</center>
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
          <Table columns={columns} dataSource={category} />
        )}
      </Grid>
    </Grid>
  );
}
