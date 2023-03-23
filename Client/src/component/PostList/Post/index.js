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
import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles.js";

import { actionslogLoading$, actionslogState$, commentsState$, departmentsState$, topicsState$,categoryState$, } from "../../../redux/seclectors";
import { Modal, Button, Input, Select, Switch, Dropdown, Space } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import FileBase64 from "react-file-base64";
import { Link, useNavigate } from "react-router-dom";
import { animalList } from "./anonymousAnimal.js";
import CommentList from "../../CommentList/index.js";
import * as actions from "../../../redux/actions";
import ReactQuill from "react-quill";
import jwtDecode from "jwt-decode";
import { Store } from "../../../Store.js";

const { Option } = Select;

export default function Post({ post }) {
  const { state } = useContext(Store);
  const user = state.userInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const topics = useSelector(topicsState$);
  const categories = useSelector(categoryState$);
  const comments = useSelector(commentsState$);
  const actionslog = useSelector(actionslogState$)
  const actiondata = useRef({
    _id: '',
    action: ''
  })
  const actionview = useRef({
    _id: ''
  })
  React.useEffect(() => {
    const token = localStorage.getItem("userInfo");
    const user = jwtDecode(token)
    dispatch(actions.filterActionsLog.filterActionsLogRequest({ author: user._id }));
  }, [dispatch])
  const checkaction = actionslog.filter((action) => action.postID._id === post._id && action.action !== 'Viewed')
  checkaction.map((action) => actiondata.current._id = action._id)
  checkaction.map((action) => actiondata.current.action = action.action)
  const checkviewed = actionslog.filter((action) => action.postID._id === post._id && action.action === 'Viewed')
  checkviewed.map((action) => actionview.current._id = action._id)
  const sortedcmt = comments?.filter((comment) => comment?.postID?._id === post._id)
  const [Modalupdate, setModalUpdate] = useState(false);
  const [Modalcomment, setModalcomment] = useState(false);
  const departmentref = useRef(null);
  const caetgoryref = useRef(null);
  const cateref = useRef(null);
  const [data, setdata] = React.useState({});
  const [defaultValue] = React.useState({
    title: post.title,
    author: post.author || "none",
    content: post.content,
    department: post?.department?.name,
    topic: post?.topic?.name,
    attachment: post.attachment,
    filePath: post?.filePath,
    isAnonymous: post.isAnonymous,
  });
  // Anonymous animal.currents
  const getRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animalList.length);
    return animalList[randomIndex];
  };
  const animal = useRef("");
  animal.current = getRandomAnimal()
  const departget = (e) => {
    setdata({ ...data, department: e });
    data.department = departmentref.current.value;
  };
  const topicget = (e) => {
    setdata({ ...data, topics: e });
    data.topics = caetgoryref.current.value;
  };

  const handleOk = React.useCallback(() => {
    setModalUpdate(false);
  }, []);
  const commentclose = React.useCallback(() => {
    dispatch(actions.getComments.getCommentsRequest());
    setModalcomment(false);
  }, [dispatch]);
  const viewComment = React.useCallback(() => {
    setModalcomment(true);
  }, []);
  const viewModal = React.useCallback(() => {
    setModalUpdate(true);
  }, []);
  const classes = useStyles();
  const [likeActive, setLikeActive] = React.useState(actiondata.current.action === 'Like' ? true : false);
  const [dislikeActive, setDislikeActive] = React.useState(actiondata.current.action === 'Dislike' ? true : false);
  const onLikeBtnClick = React.useCallback(() => {
    if (likeActive) {
      setLikeActive(false);
      actiondata.current.action = 'Initial_value'
      dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
      dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Like', author: user._id, postID: post._id })))
      dispatch(
        actions.updatePostsLike.updatePostsLikeRequest({
          ...post,
          view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
          likeCount: post.likeCount - 1,
        })
      );
    } else {
      setLikeActive(true);
      actiondata.current.action = 'Like'
      dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
      dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Like', author: user._id, postID: post._id })))
      dispatch(
        actions.updatePostsLike.updatePostsLikeRequest({
          ...post,
          view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
          likeCount: post.likeCount + 1,
        })
      );
      if (dislikeActive) {
        setDislikeActive(false);
        dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Like', author: user._id, postID: post._id })))
        dispatch(
          actions.updatePostsLike.updatePostsLikeRequest({
            ...post,
            likeCount: post.likeCount + 1,
            dislikeCount: post.dislikeCount === 0 ? 0 : post.dislikeCount - 1,
          })
        );
      }
    }
  }, [dispatch, post, likeActive, dislikeActive, user, actiondata, checkaction, checkviewed]);
  const onDislikeBtnClick = React.useCallback(() => {
    if (dislikeActive) {
      setDislikeActive(false);
      actiondata.current.action = 'Initial_value'
      dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
      dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Dislike', author: user._id, postID: post._id })))
      dispatch(
        actions.updatePostsLike.updatePostsLikeRequest({
          ...post,
          view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
          dislikeCount: post.likeCount + 1,
        }),
      );
    } else {
      setDislikeActive(true);
      actiondata.current.action = 'Dislike'
      dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
      dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Dislike', author: user._id, postID: post._id })))
      dispatch(
        actions.updatePostsLike.updatePostsLikeRequest({
          ...post,
          view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
          dislikeCount: post.dislikeCount + 1,
        })
      );
      if (likeActive) {
        setLikeActive(false);
        dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Dislike', author: user._id, postID: post._id })))
        dispatch(
          actions.updatePostsLike.updatePostsLikeRequest({
            ...post,
            likeCount: post.likeCount === 0 ? 0 : post.likeCount - 1,
            dislikeCount: post.dislikeCount + 1
          })
        );
      }
    }
  }, [dispatch, post, likeActive, dislikeActive, user, checkaction, actiondata, checkviewed]);
  const updatehandler = React.useCallback(() => {
    dispatch(
      actions.updatePosts.updatePostsRequest({
        _id: post._id,
        author: post.author,
        department: user.department._id,
        ...data,
      })
    );
    handleOk();
  }, [dispatch, data, post, handleOk,user]);
  const modules = {
    toolbar: [[{ size: [] }], ["bold", "italic", "underline"]],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const items = [
    {
      key: "1",
      label: <div>Report</div>,
    },
    {
      key: "2",
      label: <div>Save post</div>,
    },
  ];
  const setviewpostdetail=React.useCallback((slug)=>{
    dispatch(actions.viewPostsBySlug.viewPostRequestBySlug(slug));
    dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
    dispatch(
      actions.updatePostsLike.updatePostsLikeRequest({
        ...post,
        view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
      }))
  },[dispatch,checkviewed,actionview,post,user])
  return (
    <>
      <Card className={classes.card} key={post._id}>
        <CardHeader
          avatar={
            post.isAnonymous ? (
              <img src={animal.current.avatar} alt={`${animal.current.name} Avatar`} />
            ) : (
              <img src={post?.author?.avatar} alt={post?.author?.fullName} />
            )
          }
          title={
            post.isAnonymous
              ? `Anonymous ${animal.current.name}`
              : post?.author?.fullName
          }
          subheader={moment(post.createdAt).format("LLL")}
          action={
            post.author._id === user._id ? (
              <IconButton onClick={viewModal} title="Edit post">
                <MoreVertIcon />
              </IconButton>
            ) : (
              <IconButton title="Edit post">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <Space onClick={(e) => e.preventDefault()}>
                    <MoreVertIcon />
                  </Space>
                </Dropdown>
              </IconButton>
            )
          }
        />

        <Button
          type="button"
          onClick={() => {
            navigate(`/idea/${post?.slug}`);
            setviewpostdetail(post.slug);
          }}
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
            dangerouslySetInnerHTML={{
              __html:
                post?.content?.length > 528
                  ? `${post?.content.substring(0, 528)}...`
                  : post?.content,
            }}
          ></Typography>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <IconButton
              onClick={onLikeBtnClick}
              style={{ color: likeActive ? "red" : "" }}
            >
              <FavoriteIcon />
              <Typography component="span" color="textSecondary"> {`${post.likeCount} likes`}</Typography>
            </IconButton>
            <IconButton
              onClick={onDislikeBtnClick}
              style={{ color: dislikeActive ? "blue" : "" }}
            >
              -<FavoriteIcon />
              <Typography component="span" color="textSecondary">{`${post.dislikeCount} dislikes`}</Typography>
            </IconButton>

          </div>
          <div>{post.view} Views</div>
        </CardActions>
        <Grid
          container
          spacing={2}
          alignItems="stretch"
          style={{ marginLeft: "20px", paddingBottom: "10px" }}
        >
          <Grid item xs={9} lg={9} className="idea">
            <div>
              <Link to="/profile">
                <img alt={user?.fullName} src={user?.avatar} />
              </Link>
            </div>
            <Input
              placeholder="Any comments?"
              className="idea-create"
              onClick={viewComment}
            />
          </Grid>
          <Grid item xs={3} lg={3} className="idea">
            <Button
              type="link"
              onClick={viewComment}
              style={{ display: "flex", justifyContent: "end" }}
            >
              Show {sortedcmt.length} comments
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Modal
        open={Modalcomment}
        onOk={commentclose}
        onCancel={commentclose}
        footer={null}
        style={{ width: "500px", height: "250px" }}
        className="container-comment"
      >
        <CommentList post={post} user={user}></CommentList>
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
                <ReactQuill
                  placeholder={
                    defaultValue?.content?.length > 200
                      ? `${defaultValue?.content.substring(0, 200)}...`
                      : defaultValue?.content
                  }
                  theme="snow"
                  modules={modules}
                  value={data.content}
                  onChange={(e) => setdata({ ...data, content: e })}
                  required
                />
              </div>
              <div className="user-mg">
                <Select
                  defaultValue={defaultValue.category}
                  style={{ width: "100%" }}
                  size="large"
                  required
                  onChange={(e) => departget(e)}
                  ref={cateref}
                >
                  {categories?.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
                <Select
                  defaultValue={defaultValue.topic}
                  style={{ width: "100%", top: "20px" }}
                  size="large"
                  required
                  onChange={(e) => topicget(e)}
                  ref={caetgoryref}
                >
                  {topics
                    ?.filter((topic) => topic?.status === "Processing")
                    ?.map((topic) => (
                      <Option key={topic._id} value={topic._id}>
                        {topic.name}
                      </Option>
                    ))}
                </Select>
                <Switch
                  style={{ width: "100%", top: "35px", marginBottom: 10 }}
                  checkedChildren="Anonymous"
                  unCheckedChildren={user.fullName}
                  onChange={(checked) =>
                    setdata({
                      ...data,
                      isAnonymous: checked,
                    })
                  }
                ></Switch>
              </div>
              <Button
                type="primary"
                block
                style={{ bottom: "-7%" }}
                onClick={() => {
                  updatehandler();
                  setdata({ ...data, department: user.department._id });
                  console.log(data);
                }}
              >
                Update
              </Button>
            </div>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
