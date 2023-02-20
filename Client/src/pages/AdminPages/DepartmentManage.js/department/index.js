import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../../../redux/seclectors";
import * as actions from "../../../../redux/actions";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Input } from "antd";

const { TextArea } = Input;
export default function DepartmentManage({record}) {

  const dispatch = useDispatch()
  const { isShow } = useSelector(modalState$);
  const [data, setdata] = React.useState({
    name: "",
  });
  const viewModal = React.useCallback(() => {
    dispatch(actions.showModal());
  }, [dispatch])
  const handleOk = React.useCallback(() => {
    dispatch(actions.hideModal());
  }, [dispatch]);
  const onSubmit = React.useCallback(() => {
    dispatch(actions.updateDepartments.updateDepartmentsRequest({ ...record, department: data.name }))
    handleOk();
  }, [data, dispatch, handleOk,record]);
  const checkToDepartment = () => {
    return data.name === "";
  };
  return (
    <Grid container spacing={2} alignItems="stretch">
     <Link onClick={viewModal}>Update</Link>
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
                Update information
              </Button>
            </Grid>
          </Grid>
        </Modal>
      </Grid>
  );
}