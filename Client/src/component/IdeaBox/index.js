import React, { useRef, useContext, useState } from "react";
import { TextField, Grid } from "@material-ui/core";
import { Col, Row, Modal } from "antd";
import { Store } from "../../Store";
import "../assets/css/HomeScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal, createPosts } from "../../redux/actions";
import FileBase64 from "react-file-base64";
import { departmentsState$, modalState$ } from "../../redux/seclectors";
import * as actions from "../../redux/actions";
import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { Input, Select, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

export default function IdeaBox() {
  const dispatch = useDispatch();
  const departments = useSelector(departmentsState$);
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  const [checked, setChecked] = useState(false);
  const onChange = (e) => {
    setChecked(e.target.checked);
  };
  const departmentref = useRef(null);
  const { isShow } = useSelector(modalState$);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [data, setdata] = React.useState({
    title: "",
    author: "",
    content: "",
    department: "",
    categories: "",
    attachment: "",
  });

  const departget = (e) => {
    setdata({ ...data, department: e });
    data.department = departmentref.current.value;
  };
  const handleOk = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);
  const viewModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);
  const onSubmit = React.useCallback(() => {
    dispatch(createPosts.createPostsRequest(data));
    handleOk();
  }, [data, dispatch, handleOk]);
  const checkToPost = () => {
    return (
      data.title === "" ||
      data.content === "" ||
      data.attachment === "" ||
      checked === false
    );
  };
  const user = state.userInfo;
  const holder = "What's on your mind " + user.fullName + "?";
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
          {console.log(data)}
          <Grid item xs={7} lg={7} className="upload">
            {data.attachment ? (
              <div className="upload-file">
                <img
                  style={{ borderRadius: "0" }}
                  src={data.attachment}
                  alt="a"
                />
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
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    // value={data.attachment}
                    onDone={({ base64 }) =>
                      setdata({ ...data, attachment: base64 })
                    }
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
                      author: userInfo.fullName,
                    })
                  }
                  required
                />
              </div>
              <div className="user-mg">
                <TextArea
                  allowClear
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                  placeholder={holder}
                  size="large"
                  // value={data.content}
                  onChange={(e) =>
                    setdata({ ...data, content: e.target.value })
                  }
                  required
                />
              </div>
              <div className="user-mg">
                <Select
                  defaultValue="Choose a department"
                  style={{ width: "100%" }}
                  size="large"
                  required
                  onChange={(e) => departget(e)}
                  ref={departmentref}
                >
                  {departments?.map((department) => (
                    <Option key={department._id} value={department.name}>
                      {department.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div style={{ marginTop: "55%" }}>
                <Checkbox onChange={onChange}>
                  I agree to the <a>GreFeed Agreement</a>
                </Checkbox>
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
