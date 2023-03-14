import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import React, { useRef, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles.js";

import { departmentsState$, categoriesState$ } from "../../../redux/seclectors";
import { Modal, Button, Input, Select } from "antd";
import { Store } from "../../../Store";
import { PictureOutlined } from "@ant-design/icons";
import FileBase64 from "react-file-base64";
import { Link, useNavigate } from "react-router-dom";
import { animalList } from "./anonymousAnimal.js";
import CommentList from "../../CommentList/index.js";
import * as actions from "../../../redux/actions";

const { TextArea } = Input;
const { Option } = Select;

export default function Post({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useContext(Store);
  const user = state.userInfo;
  const departments = useSelector(departmentsState$);
  const categories = useSelector(categoriesState$);
  const [Modalupdate, setModalUpdate] = useState(false);
  const [Modaloption, setModalOption] = useState(false);
  const [Modalcomment, setModalcomment] = useState(false);
  const departmentref = useRef(null);
  const caetgoryref = useRef(null);
  const [data, setdata] = React.useState({});
  const [defaultValue] = React.useState({
    title: post.title,
    author: post.author || "none",
    content: post.content,
    department: post.department.name,
    category: post.categories.name,
    attachment: post.attachment,
  });
  // Anonymous Animals
  const getRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animalList.length);
    return animalList[randomIndex];
  };

  const animal = getRandomAnimal();

  const departget = (e) => {
    setdata({ ...data, department: e });
    data.department = departmentref.current.value;
  };
  const categet = (e) => {
    setdata({ ...data, categories: e });
    data.categories = caetgoryref.current.value;
  };
  const getcmt = React.useCallback(() => {
    dispatch(actions.getComments.getCommentsRequest(post));
  }, [dispatch, post]);
  const handleOk = React.useCallback(() => {
    setModalUpdate(false);
  }, []);
  const handleoption = React.useCallback(() => {
    setModalOption(false);
  }, []);
  const commentclose = React.useCallback(() => {
    setModalcomment(false);
  }, []);
  const viewComment = React.useCallback(() => {
    getcmt();
    setModalcomment(true);
  }, [getcmt]);
  const viewModal = React.useCallback(() => {
    if (post.author.fullName === user.fullName) {
      setModalUpdate(true);
    } else {
      setModalOption(true);
    }
  }, [user, post]);
  const classes = useStyles();
  const [likeActive, setLikeActive] = React.useState(false);
  const [dislikeActive, setDislikeActive] = React.useState(false);
  const onLikeBtnClick = React.useCallback(() => {
    if (likeActive) {
      setLikeActive(false);
      dispatch(
        actions.updatePosts.updatePostsRequest({
          ...post,
          likeCount: post.likeCount - 1,
        })
      );
    } else {
      setLikeActive(true);
      dispatch(
        actions.updatePosts.updatePostsRequest({
          ...post,
          likeCount: post.likeCount + 1,
        })
      );
      if (dislikeActive) {
        setDislikeActive(false);
        dispatch(
          actions.updatePosts.updatePostsRequest({
            ...post,
            likeCount: post.likeCount + 2,
          })
        );
      }
    }
  }, [dispatch, post, likeActive, dislikeActive]);
  const updatehandler = React.useCallback(() => {
    dispatch(
      actions.updatePosts.updatePostsRequest({
        _id: post._id,
        author: post.author,
        ...data,
      })
    );
    handleOk();
  }, [dispatch, data, post, handleOk]);
  const onDislikeBtnClick = React.useCallback(() => {
    if (dislikeActive) {
      setDislikeActive(false);
      dispatch(
        actions.updatePosts.updatePostsRequest({
          ...post,
          likeCount: post.likeCount + 1,
        })
      );
    } else {
      setDislikeActive(true);
      dispatch(
        actions.updatePosts.updatePostsRequest({
          ...post,
          likeCount: post.likeCount - 1,
        })
      );
      if (likeActive) {
        setLikeActive(false);
        dispatch(
          actions.updatePosts.updatePostsRequest({
            ...post,
            likeCount: post.likeCount - 2,
          })
        );
      }
    }
  }, [dispatch, post, likeActive, dislikeActive]);
  return (
    <>
      <Card className={classes.card} key={post._id}>
        <CardHeader
          avatar={
            post.isAnonymous ? (
              <img src={animal.avatar} alt={`${animal.name} Avatar`} />
            ) : (
              <img src={post.author.avatar} alt={post.author.fullName} />
            )
          }
          title={
            post.isAnonymous ? `Anonymous ${animal.name}` : post.author.fullName
          }
          subheader={moment(post.createdAt).format("LLL")}
          action={
            <IconButton onClick={viewModal} title="Edit post">
              <MoreVertIcon />
            </IconButton>
          }
        />

        <Button
          type="button"
          onClick={() => navigate(`/idea/${post?.slug}`)}
          style={{
            width: "100%",
            height: "300px",
            backgroundColor: "transparent",
            display: "block",
            padding: 0,
            border: "none",
            cursor: "pointer",
          }}
        >
          <CardMedia
            image={post.attachment || ""}
            title="image"
            component="img"
            className={classes.media}
            style={{ width: "100%", height: "100%" }}
          />
        </Button>
        <CardContent>
          <Typography variant="h5" color="textPrimary">
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></Typography>
          <Typography>{post.view} Views</Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={onLikeBtnClick}
            style={{ color: likeActive ? "red" : "" }}
          >
            <FavoriteIcon />
            <Typography component="span" color="textSecondary"></Typography>
          </IconButton>
          <IconButton
            onClick={onDislikeBtnClick}
            style={{ color: dislikeActive ? "blue" : "" }}
          >
            -<FavoriteIcon />
            <Typography component="span" color="textSecondary"></Typography>
          </IconButton>
          {`${post.likeCount} likes`}
        </CardActions>
        <Grid
          container
          spacing={2}
          alignItems="stretch"
          style={{ marginLeft: "20px" }}
        >
          <Grid item xs={8} lg={8} className="idea">
            <div>
              <Link to="/profile">
                <img alt={user?.fullName} src={user?.avatar} />
              </Link>
            </div>
            <Input
              placeholder="Any comments ?"
              className="idea-create"
              onClick={viewComment}
            />
          </Grid>
          <Grid item xs={4} lg={4} className="idea">
            <Button type="link" onClick={viewComment}>
              Show comments
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Modal
        open={Modalcomment}
        onOk={commentclose}
        onCancel={commentclose}
        footer={null}
        style={{ height: "200px" }}
        className="container"
      >
        <CommentList post={post}></CommentList>
      </Modal>
      <Modal
        open={Modalupdate}
        onOk={handleOk}
        onCancel={handleOk}
        footer={null}
        className="container"
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} lg={12} className="row-new-post">
            <center>Update post</center>
          </Grid>
          <Grid item xs={7} lg={7} className="upload">
            {defaultValue.attachment ? (
              <div className="upload-file">
                <img
                  style={{ borderRadius: "0" }}
                  src={defaultValue.attachment}
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
                <Typography>Title</Typography>
                <Input
                  allowClear
                  placeholder={defaultValue.title}
                  size="large"
                  value={data.title}
                  onChange={(e) =>
                    setdata({
                      ...data,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="user-mg">
                <Typography>Content</Typography>
                <TextArea
                  allowClear
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                  placeholder={defaultValue.content}
                  size="large"
                  value={data.content}
                  onChange={(e) =>
                    setdata({ ...data, content: e.target.value })
                  }
                  required
                />
              </div>
              <div className="user-mg">
                <Typography>Choose department</Typography>
                <Select
                  defaultValue={defaultValue.department}
                  style={{ width: "100%" }}
                  size="large"
                  required
                  onChange={(e) => departget(e)}
                  ref={departmentref}
                >
                  {departments?.map((department) => (
                    <Option key={department._id} value={department._id}>
                      {department.name}
                    </Option>
                  ))}
                </Select>
                <Typography>Choose category</Typography>
                <Select
                  defaultValue={defaultValue.category}
                  style={{ width: "100%", top: "20px" }}
                  size="large"
                  required
                  onChange={(e) => categet(e)}
                  ref={caetgoryref}
                >
                  {categories?.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <Button
                type="primary"
                block
                style={{ bottom: "-5%" }}
                onClick={updatehandler}
              >
                Update
              </Button>
            </div>
          </Grid>
        </Grid>
      </Modal>
      <Modal
        open={Modaloption}
        onOk={handleoption}
        onCancel={handleoption}
        footer={null}
        className="container"
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} lg={12}>
            <Button type="primary" block>
              Report
            </Button>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Button type="primary" block>
              Save post
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
