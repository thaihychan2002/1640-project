import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Input, DatePicker, Typography } from "antd";
import moment from "moment";


const { TextArea } = Input;

export default function Topic({ record_Topic }) {
  const dispatch_ca = useDispatch();
  const [ModalCatUpdate, setModalCatUpdate] = useState(false);
  const today = useMemo(() => {
    new Date();
  }, []);
  const current = moment(today).format("MM:DD:YYYY");
  const [data, setdata] = React.useState({
    name: record_Topic.name,
    description: record_Topic.description,
    begin: record_Topic.begindate,
    end: record_Topic.enddate,
    status:
      moment(record_Topic.enddate).format("MM:DD:YYYY") >= current
        ? "Processing"
        : "Ended",
  });
  const handleOk = React.useCallback(() => {
    setModalCatUpdate(false);
  }, []);
  const viewModal = React.useCallback(() => {
    setModalCatUpdate(true);
  }, []);
  const onUpdateHandler = React.useCallback(() => {
    dispatch_ca(
      actions.updateTopics.updateTopicsRequest({
        _id: record_Topic.key,
        ...data,
      })
    );
    handleOk();
  }, [data, dispatch_ca, record_Topic, handleOk]);
  function onSelectBegin(date, dateString) {
    data.begin = dateString;
  }
  function onSelectEnd(date, dateString) {
    data.end = dateString;
  }
  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} lg={12} className="row-new-post">
          <Link onClick={viewModal}>Update</Link>
        </Grid>
      </Grid>
      <Modal
        open={ModalCatUpdate}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
        style={{ width: 400, height: 380 }}
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} lg={12} className="row-new-post">
            <center>Update Topicegory</center>
          </Grid>
          <Grid item xs={6} lg={6} className="row-new-post">
            <Typography>Begin date of the collection</Typography>
            <DatePicker format="MM-DD-YYYY" onChange={onSelectBegin} />
            <Input
              disabled
              placeholder={"CURRENT BEGIN DATE: " + record_Topic.begindate}
            ></Input>
          </Grid>
          <Grid item xs={6} lg={6} className="row-new-post">
            <Typography>End date of the collection</Typography>
            <DatePicker format="MM-DD-YYYY" onChange={onSelectEnd} />
            <Input
              disabled
              placeholder={"CURRENT END DATE: " + record_Topic.enddate}
            ></Input>
          </Grid>
          <Grid item xs={12} lg={12} className="row-new-post">
            <Typography>Write the name of the Topicegory</Typography>
            <Input
              allowClear
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
              placeholder={"CURRENT NAME: " + record_Topic.name}
              size="large"
              value={data.name}
              onChange={(e) => setdata({ ...data, name: e.target.value })}
              required
            />
            <Typography>Write the description for the collection</Typography>
            <TextArea
              allowClear
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
              placeholder={"CURRENT DESCRIBE: " + record_Topic.description}
              size="large"
              value={data.description}
              onChange={(e) =>
                setdata({ ...data, description: e.target.value })
              }
              required
            />

            <Button
              type="primary"
              block
              onClick={onUpdateHandler}
              style={{ marginTop: 15 }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
