import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { categoryLoading$, categoryState$ } from "../../../redux/seclectors";

import * as actions from "../../../redux/actions";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Category from "./category";
import { Space, Table, Button, Modal, Input } from "antd";
import LoadingBox from "../../../component/LoadingBox/LoadingBox";
const { TextArea } = Input;
export default function CategoryManage() {
  const dispatch_cate = useDispatch();
  React.useEffect(() => {
    dispatch_cate(actions.getCategory.getCategoryRequest());
  }, [dispatch_cate]);
  const categories = useSelector(categoryState$);
  const loading = useSelector(categoryLoading$);
  const [ModaldepOpen, setModaldepOpen] = useState(false);
  const [data, setdata] = React.useState({
    name: "",
  });
  const cate = categories?.map((category) => ({
    key: category._id,
    name: category.name,
  }));
  const viewModal = React.useCallback(() => {
    setModaldepOpen(true);
  }, []);
  const deletecateHandler = React.useCallback(
    (record) => {
      console.log(record.key);
      dispatch_cate(actions.deleteCategory.deleteCategoryRequest(record.key));
    },
    [dispatch_cate]
  );
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
      render: (_, record_cat) => (
        <Space size="middle">
          {console.log(record_cat)}
          <Category key={record_cat._id} record_cat={record_cat}></Category>
          <Link onClick={() => deletecateHandler(record_cat)}>Delete</Link>
        </Space>
      ),
    },
  ];
  const handleclose = React.useCallback(() => {
    setModaldepOpen(false);
  }, []);
  const onSubmit = React.useCallback(() => {
    dispatch_cate(actions.createCategory.createCategoryRequest(data));
    handleclose();
  }, [data, dispatch_cate, handleclose]);
  const checkToCategory = () => {
    return data.name === "";
  };

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        <Button type="primary" onClick={viewModal}>
          {" "}
          Add new category
        </Button>
        <Modal
          open={ModaldepOpen}
          onOk={handleclose}
          onCancel={handleclose}
          footer={null}
          style={{ width: 100, height: 150 }}
        >
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} lg={12} className="row-new-post">
              <center>Create new category</center>
            </Grid>
            <Grid item xs={3} lg={3} />

            <Grid item xs={6} lg={6} className="row-new-post">
              <Input
                allowClear
                placeholder="Write the name of category"
                size="large"
                value={data.name}
                onChange={(e) => setdata({ ...data, name: e.target.value })}
                style={{ marginBottom: 15 }}
                required
              />
              <Button
                disabled={checkToCategory()}
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
          <Table columns={columns} dataSource={cate} />
        )}
      </Grid>
    </Grid>
  );
}
