import React, { useRef, useContext } from "react";
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
import { Input, Select, Button } from "antd";
const { TextArea } = Input;
const { Option } = Select;

export default function IdeaBox() {
  const dispatch = useDispatch();
  const departments = useSelector(departmentsState$);
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
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
  const privacyClick = (e) => {
    e.preventDefault();
    const container = document.querySelector(".container");
    const privacy = document.querySelector(".container .post .privacy");
    privacy.addEventListener("click", () => {
      container.classList.add("active");
    });
  };
  const arrowBackClick = (e) => {
    e.preventDefault();

    const container = document.querySelector(".container");
    const arrowBack = document.querySelector(
      ".container .audience .arrow-back"
    );
    arrowBack.addEventListener("click", () => {
      container.classList.remove("active");
    });
  };
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
    return data.title === "" || data.content === "" || data.attachment === "";
  };
  const user = state.userInfo;
  const holder = "What's on your mind " + user.fullName + "?";
  return (
    <div className="content-container">
      <Row id="content-style" className="content-style">
        <Col span={10}>
          <Row className="row-create">
            <Col className="icon-create">
              <img src={user.avatar} alt="logo" />
              <div className="idea-create" onClick={viewModal}>
                &nbsp; What's on your mind?
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
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
                    value={data.attachment}
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
              <div className="post-user user-mg">
                <span>
                  <img src={user.avatar} alt={user.fullName} />
                </span>
                <span>{user.fullName}</span>
              </div>
              <div className="user-mg">
                <Input
                  allowClear
                  placeholder="Any good title?"
                  size="large"
                  value={data.title}
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
                  value={data.content}
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
              <Button
                disabled={checkToPost()}
                type="primary"
                block
                style={{ bottom: "-65%" }}
                onClick={onSubmit}
              >
                Post
              </Button>
            </div>
          </Grid>
        </Grid>
        {/* <div className="wrapper">
          <section className="post">
            <header>Create Post</header>
            <form noValidate autoComplete="false">
              <div className="content">
                <img src={user.avatar} alt="logo" />
                <div className="details">
                  <p>{user.fullName}</p>
                  <div className="privacy" onClick={(e) => privacyClick(e)}>
                    <i className="fas fa-user-friends"></i>
                    <span>Departments</span>
                    <i className="fas fa-caret-down"></i>
                  </div>
                </div>
              </div>
              <TextField
                required
                label="Title"
                value={data.title}
                onChange={(e) =>
                  setdata({
                    ...data,
                    title: e.target.value,
                    author: userInfo.fullName,
                  })
                }
              ></TextField>
              <textarea
                value={data.content}
                onChange={(e) => setdata({ ...data, content: e.target.value })}
                placeholder={holder}
                required
              />
              <div className="options">
                <ul className="list">
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    value={data.attachment}
                    onDone={({ base64 }) =>
                      setdata({ ...data, attachment: base64 })
                    }
                  />
                </ul>
              </div>
              <Button
                variant="contained"
                className="button"
                fullWidth
                onClick={onSubmit}
                style={{ marginBottom: "20px" }}
              >
                Post
              </Button>
            </form>
          </section>
          <section className="audience">
            <header>
              <div className="arrow-back" onClick={(e) => arrowBackClick(e)}>
                <i className="fas fa-arrow-left"></i>
              </div>
              <p>Select Department</p>
            </header>
            <div className="content">
              <span>
                Your post will show up in News Feed, on your profile and in
                search results.
              </span>
            </div>
            <select onChange={departget} ref={departmentref}>
              <option>Select department</option>
              {departments.map((department) => (
                <option>
                  <Grid item xs={12} sm={12}>
                    <Department key={department._id} department={department} />
                  </Grid>
                </option>
              ))}
            </select>
          </section>
        </div> */}
      </Modal>
    </div>
  );
}
