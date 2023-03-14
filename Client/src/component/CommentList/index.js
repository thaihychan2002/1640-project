import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import { Store } from "../../Store";
import { commentsLoading$, commentsState$ } from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";
import { Select } from "antd";

import { toast } from "react-toastify";
import { getError } from "../../utils";

const { Option } = Select;
const { TextArea } = Input;
export default function CommentList({ post }) {
  const dispatch = useDispatch();
  const comments = useSelector(commentsState$);
  // const [comments, setComments] = useState([]);

  console.log(comments);
  const isLoading = useSelector(commentsLoading$);
  const [selectedcdt, setSelectedcdt] = useState("recently");
  const { state } = useContext(Store);
  React.useEffect(() => {
      dispatch(actions.getConditionCmts.getCmtsRequest({status:selectedcdt}));
  }, [dispatch, selectedcdt]);
  // useEffect(() => {
  //   const fetchCmts = async () => {
  //     try {
  //       setisLoading(true);
  //       let data = [];
  //       if (selectedcdt === "recently") {
  //         ({ data } = await fetchRecentlyCmts(post._id));
  //       } else if (selectedcdt === "mostLikes") {
  //         ({ data } = await fetchCmtsByMostLikes(post._id));
  //       }
  //       setComments(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     } finally {
  //       setisLoading(false);
  //     }
  //   };
  //   fetchCmts();
  // }, [post._id, selectedcdt]);

  const user = state.userInfo;
  const [comment, setcomment] = React.useState({
    author: "",
    content: "",
    postID: post._id,
  });

  const changeCommentsView = (value) => {
    setSelectedcdt(value);
  };
  React.useEffect(() => {
    try {
      dispatch(actions.getConditionCmts.getCmtsRequest(selectedcdt));
    } catch (err) {
      toast.error(getError(err));
    }
  }, [dispatch, selectedcdt]);

  const commenthandler = React.useCallback(() => {
    dispatch(actions.createComments.createCommentsRequest(comment));
  }, [comment, dispatch]);
  return (
    <Grid container spacing={1} alignItems="stretch">
      <Grid item xs={12} sm={12}>
        <div>
          <Link to="/profile">
            <img alt={user?.fullName} src={user?.avatar} />
          </Link>
          {user.fullName}
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextArea
          placeholder="Any comments ?"
          className="idea-create"
          allowClear
          size="large"
          onChange={(e) =>
            setcomment({
              ...comment,
              content: e.target.value,
              author: user._id,
            })
          }
          required
        />
      </Grid>
      <Grid item xs={9} sm={9}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Select
            defaultValue="View Recently"
            onChange={changeCommentsView}
            style={{ width: "50%" }}
          >
            <Option value="recently">View Recently </Option>
            <Option value="mostLikes">View Most Likes </Option>
          </Select>
        </div>
      </Grid>
      <Grid item xs={3} sm={3}>
        <Button type="primary" block onClick={commenthandler}>
          Post
        </Button>
      </Grid>
      <Grid style={{ marginTop: "40px" }} item xs={12} sm={12}>
        {isLoading ? (
          <LoadingBox />
        ) : (
          comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}

      </Grid>
      <Grid item xs={9} sm={9}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Select
            defaultValue="View Recently"
            onChange={changeCommentsView}
            style={{ width: "50%" }}
          >
            <Option value="recently">View Recently </Option>
            <Option value="mostLikes">View Most Likes </Option>
          </Select>
        </div>
      </Grid>
      <Grid item xs={3} sm={3}>
        <Button type="primary" block onClick={commenthandler}>
          Post
        </Button>
      </Grid>
      <Grid style={{ marginTop: "40px" }} item xs={12} sm={12}>
        {isLoading ? (
          <LoadingBox />
        ) : (
          comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </Grid>
    </Grid>
  );
}
