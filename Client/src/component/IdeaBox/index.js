import React, { useRef, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { Modal, Switch } from "antd";
import { Store } from "../../Store";
import "../assets/css/HomeScreen.css";
import { useDispatch, useSelector } from "react-redux";
import {
  topicsState$,
  modalState$,
  categoryState$,
} from "../../redux/seclectors";
import { PictureOutlined, CloseOutlined } from "@ant-design/icons";
import { Input, Select, Button } from "antd";
import { Link } from "react-router-dom";
import DrawExpand from "./Drawer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as actions from "../../redux/actions";
import Responsive from "../ResponsiveCode/Responsive";

const { Option } = Select;

export default function IdeaBox() {
  const dispatch = useDispatch();
  const topics = useSelector(topicsState$);
  const categories = useSelector(categoryState$);
  const { isXs } = Responsive();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckChange = (isChecked) => {
    setIsChecked(isChecked);
  };

  const departmentref = useRef(null);
  const cateref = useRef(null);
  const Topicref = useRef(null);
  const { isShow } = useSelector(modalState$);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const user = state.userInfo;

  const [data, setdata] = React.useState({
    title: "",
    author: "",
    content: "",
    department: "",
    topic: "",
    attachment: "",
    filePath: "",
    filePathName: "",
    isAnonymous: false,
  });

  const departget = (e) => {
    setdata({ ...data, department: e });
    data.department = departmentref.current.value;
  };
  const categet = (e) => {
    setdata({ ...data, category: e });
    data.category = cateref.current.value;
  };
  const Topicget = (e) => {
    setdata({ ...data, topic: e });
    data.topic = Topicref.current.value;
  };
  const handleOk = React.useCallback(() => {
    dispatch(actions.hideModal());
  }, [dispatch]);
  const viewModal = React.useCallback(() => {
    dispatch(actions.showModal());
  }, [dispatch]);
  const onSubmit = React.useCallback(() => {
    dispatch(actions.createPosts.createPostsRequest(data));
    handleOk();
  }, [data, dispatch, handleOk]);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const checkToPost = () => {
    return (
      data.title === "" ||
      data.content === "" ||
      data.attachment === "" ||
      isChecked === false
    );
  };
  const [fileInputState] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5 megabytes");
      return;
    }
    if (file.type.startsWith("image/")) {
      previewFile(file);
    } else {
      alert("Only accept image file");
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setdata({ ...data, attachment: reader.result });
    };
  };

  const [filePathInputState, setFilePathInputState] = useState("");
  const handleFilePathInputChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      alert("Image files are not allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5 megabytes");
      return;
    }
    setFilePathInputState(file.name);
    previewFilePath(file);
  };
  const previewFilePath = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setdata({ ...data, filePath: reader.result, filePathName: file.name });
    };
  };
  const holder = "What's on your mind " + user.fullName + "?";
  const modules = {
    toolbar: [[{ size: [] }], ["bold", "italic", "underline"]],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} lg={12} className="idea">
          <div>
            <Link to="/profile">
              <img alt={user?.fullName} src={user?.avatar} />
            </Link>
          </div>
          <div className="idea-create" onClick={viewModal}>
            &nbsp; What's on your mind?
          </div>
        </Grid>
      </Grid>
      <Modal
        open={isShow}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
        className="container"
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} lg={12} className="row-new-post">
            <center>Create new post</center>
          </Grid>
          <Grid item xs={7} lg={7} className="upload">
            {data.attachment ? (
              <div className="upload-file">
                <img
                  style={{ borderRadius: "0" }}
                  src={data.attachment}
                  alt="a"
                />
                {data.attachment && (
                  <CloseOutlined
                    onClick={() => setdata({ ...data, attachment: "" })}
                    className="close-upload"
                  />
                )}
              </div>
            ) : (
              <div className="upload-file">
                <div>
                  <PictureOutlined
                    style={{
                      fontSize: "100px",
                    }}
                  />
                </div>
                <div className="input-file">
                  <input
                    type="file"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                  />
                </div>
                <div className="already-uploaded"></div>
              </div>
            )}
          </Grid>
          <Grid item xs={5} lg={5} className="user-fill">
            <div className="user-container">
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="post-user user-mg">
                  <span>
                    <img src={user.avatar} alt={user.fullName} />
                  </span>
                  <span>{user.fullName}</span>
                </div>
              </Link>
              <div className="user-mg">
                <Input
                  allowClear
                  placeholder="Any good title?"
                  size="large"
                  // value={data.title}
                  onChange={(e) =>
                    setdata({
                      ...data,
                      title: e.target.value,
                      author: userInfo._id,
                      department: userInfo.department._id,
                    })
                  }
                  required
                />
              </div>
              <div className="user-mg">
                <ReactQuill
                  placeholder={holder}
                  theme="snow"
                  modules={modules}
                  // formats={formats}
                  value={data.content}
                  onChange={(e) => setdata({ ...data, content: e })}
                />
              </div>
              <div className="user-mg">
                <Select
                  defaultValue="Choose a category"
                  style={{ width: "100%" }}
                  size="large"
                  required
                  onChange={(e) => categet(e)}
                  ref={cateref}
                >
                  {categories?.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>

                <Select
                  defaultValue="Choose a topic"
                  style={{ width: "100%", top: "20px" }}
                  size="large"
                  required
                  onChange={(e) => Topicget(e)}
                  ref={Topicref}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={topics
                    ?.filter((topic) => topic?.status === "Processing")
                    ?.map((topic) => ({
                      value: topic._id,
                      label: topic.name,
                    }))}
                >
                  {topics
                    ?.filter((topic) => topic?.status === "Processing")
                    ?.map((topic) => (
                      <Option key={topic._id} value={topic._id}>
                        {topic.name} - End at: {topic.end}
                      </Option>
                    ))}
                </Select>
              </div>
              <div>
                <Switch
                  style={{ width: "100%", top: "20px" }}
                  checkedChildren="Anonymous"
                  unCheckedChildren={user.fullName}
                  onChange={(checked) =>
                    setdata({
                      ...data,
                      isAnonymous: checked,
                    })
                  }
                />
              </div>
              <div>
                <input
                  type="file"
                  onChange={(e) => handleFilePathInputChange(e)}
                  style={{ marginTop: 35 }}
                />
              </div>
              <div
                style={{
                  marginTop: isXs ? "20%" : "1%",
                  fontSize: isXs ? "10px" : "16px",
                }}
              >
                Click to view{" "}
                <span className="term" onClick={showDrawer}>
                  GreFeed Terms and Conditions
                </span>
                <DrawExpand
                  onClose={onClose}
                  open={open}
                  onCheckChange={handleCheckChange}
                />
                <Button
                  disabled={checkToPost()}
                  type="primary"
                  block
                  onClick={onSubmit}
                >
                  Post
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
