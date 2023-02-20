import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { categoriesLoading$, categoriesState$, modalState$ } from "../../../redux/seclectors";
import * as actions from "../../../redux/actions";
import React from "react";
import { Link } from "react-router-dom";
import { Space, Table, Button, Modal, Input } from "antd";
import LoadingBox from "../../../component/LoadingBox/LoadingBox";
import Category from "./category";

const { TextArea } = Input;
export default function CategoryManage() {

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
    _id: category._id,
    name: category.name,
  }));
  const deletedepartHandler = React.useCallback((record) => {
    dispatch(actions.deleteCategories.deleteCategoriesRequest(record.key))
  }, [dispatch])
  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Category key={record._id} record={record}></Category>
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
    dispatch(actions.createCategories.createCategoriesRequest(data));
    handleOk();
  }, [data, dispatch, handleOk]);
  const checkToCate = () => {
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
                disabled={checkToCate()}
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
