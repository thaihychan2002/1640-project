import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { topicsLoading$, topicsState$ } from "../../../redux/seclectors";
import * as actions from "../../../redux/actions";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Button, Modal, Input, Typography, Tag } from "antd";
import LoadingBox from "../../../component/LoadingBox/LoadingBox";
import Topic from "./topic";
import moment from "moment";
import { DatePicker } from "antd";
import { downloadCSV } from "../../../api";
import DownloadButton from "../../../component/DownloadButton";
import { CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

const { TextArea } = Input;
export default function TopicManage() {
  const dispatch_Topic = useDispatch();
  const topics = useSelector(topicsState$);
  const loading = useSelector(topicsLoading$);

  const [ModalTopicOpen, setModalTopicOpen] = useState(false);
  const [Topic_data, setTopic_data] = React.useState({
    name: "",
    description: "",
    begin: "",
    end: "",
    status: "Processing",
  });
  const today = useMemo(() => {
    new Date();
  }, []);
  const current = moment(today).format("MM:DD:YYYY");
  const topic = topics?.map((topic) => ({
    key: topic._id,
    name: topic.name,
    description: topic.description,
    begindate: topic.begin,
    enddate: topic.end,
    status:
      moment(topic.end).format("MM:DD:YYYY") >= current
        ? "Processing"
        : "Ended",
  }));
  const deletedepartHandler = React.useCallback(
    (record_Topic) => {
      dispatch_Topic(
        actions.deleteTopics.deleteTopicsRequest(record_Topic.key)
      );
    },
    [dispatch_Topic]
  );
  const disabledPassDates = React.useCallback(
    (current) => {
      return current && current < moment(today);
    },
    [today]
  );
  React.useEffect(() => {
    topics
      .filter((topic) => topic.status === "Processing")
      ?.map(
        (item) =>
          moment(item.end).format("MM:DD:YYYY") < current &&
          dispatch_Topic(
            actions.updateTopicStatus.updateTopicStatusRequest({
              _id: item._id,
              status: "Ended",
            })
          )
      );
  }, [topics, dispatch_Topic, current]);
  const columns = [
    {
      title: "Topic",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "15%",
    },
    {
      title: "Begin date",
      dataIndex: "begindate",
      key: "begin",
      type: String,
      width: "15%",
    },
    {
      title: "End date",
      dataIndex: "enddate",
      key: "end",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (_, record) => {
        let colorType = {
          Processing: "yellow",
          Ended: "red",
        };
        let iconType = {
          Processing: <SyncOutlined spin />,
          Ended: <CloseCircleOutlined />,
        };
        let color = colorType[record.status];
        let icon = iconType[record.status];
        return (
          <Tag icon={icon} color={color}>
            {record.status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record_Topic) => (
        <Space
          size="middle"
          style={{ display: "flex", flexDirection: "column", marginBottom: 15 }}
        >
          <Button>
            <Topic key={record_Topic._id} record_Topic={record_Topic}></Topic>
          </Button>
          <Button>
            <Link onClick={() => deletedepartHandler(record_Topic)}>
              Delete
            </Link>
          </Button>
          {record_Topic.status === "Ended" && (
            <DownloadButton
              download={() => downloadPosts(record_Topic)}
              textDownload={`Download Ideas`}
            />
          )}
        </Space>
      ),
    },
  ];
  const viewModal = React.useCallback(() => {
    setModalTopicOpen(true);
  }, []);
  const handleclose = React.useCallback(() => {
    setModalTopicOpen(false);
  }, []);
  const onSubmit = React.useCallback(() => {
    dispatch_Topic(actions.createTopics.createTopicsRequest(Topic_data));
    handleclose();
  }, [Topic_data, dispatch_Topic, handleclose]);

  const checkToTopic = () => {
    return Topic_data.name === "";
  };
  function onSelectBegin(date, dateString) {
    Topic_data.begin = dateString;
  }
  function onSelectEnd(date, dateString) {
    Topic_data.end = dateString;
  }
  const downloadPosts = async (record) => {
    try {
      const topic = record.key;
      const response = await downloadCSV(topic);
      const data = response.data;
      const csvUrl = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = csvUrl;
      link.setAttribute("download", "idea.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        <Button type="primary" onClick={viewModal}>
          {" "}
          Add new topic
        </Button>
        <Modal
          open={ModalTopicOpen}
          onOk={handleclose}
          onCancel={handleclose}
          footer={null}
          style={{ width: 400, height: 350 }}
        >
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} lg={12} className="row-new-post">
              <center>Create new topic</center>
            </Grid>
            <Grid item xs={6} lg={6} className="row-new-post">
              <Typography>Begin date of the collection</Typography>
              <DatePicker
                format="MM-DD-YYYY"
                disabledDate={disabledPassDates}
                onChange={onSelectBegin}
              />
            </Grid>
            <Grid item xs={6} lg={6} className="row-new-post">
              <Typography>End date of the collection</Typography>
              <DatePicker
                format="MM-DD-YYYY"
                disabledDate={disabledPassDates}
                onChange={onSelectEnd}
              />
            </Grid>
            <Grid item xs={12} lg={12} className="row-new-post">
              <Typography>Write the name of the topic</Typography>
              <Input
                allowClear
                placeholder="Name of topic"
                size="large"
                value={Topic_data.name}
                onChange={(e) =>
                  setTopic_data({ ...Topic_data, name: e.target.value })
                }
                required
              />
              <Typography>Write the description for the collection</Typography>
              <TextArea
                allowClear
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                placeholder="Describe your topic"
                size="large"
                value={Topic_data.description}
                onChange={(e) =>
                  setTopic_data({ ...Topic_data, description: e.target.value })
                }
                style={{ marginBottom: 15 }}
                required
              />
              <Button
                disabled={checkToTopic()}
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
          <Table columns={columns} dataSource={topic} />
        )}
      </Grid>
    </Grid>
  );
}
