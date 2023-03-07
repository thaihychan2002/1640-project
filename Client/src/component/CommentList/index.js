import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import { Store } from "../../Store";
import {
  commentsLoading$,
  commentsState$
} from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";
import { Select } from "antd";
const { Option } = Select;
const { TextArea } = Input;
export default function CommentList({ post }) {
  const dispatch = useDispatch();
  const comments = useSelector(commentsState$);
  const isLoading = useSelector(commentsLoading$);
  const [selectedcdt, setSelectedcdt] = useState("recently");
  const { state } = useContext(Store);
  const user = state.userInfo;
  const [comment, setcomment] = React.useState({
    author: "",
    content: "",
    postID: post._id,
  });
  const changePostsView = (value) => {
    setSelectedcdt(value);
    dispatch(actions.getConditionCmts.getCmtsRequest(selectedcdt));
  };
  const commenthandler = React.useCallback(() => {
    dispatch(actions.createComments.createCommentsRequest(comment));
  }, [comment, dispatch])
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
        <TextArea placeholder="Any comments ?" className="idea-create" allowClear
          size="large"
          onChange={(e) =>
            setcomment({
              ...comment,
              content: e.target.value,
              author: user._id,
            })
          }
          required />
      </Grid>
      <Grid item xs={9} sm={9}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Select
            defaultValue="View Recently Comment"
            onChange={changePostsView}
            style={{ width: "50%" }}
          >
            {/* <Option value="">View All Posts</Option> */}
            <Option value="recently">View Recently </Option>
            <Option value="mostLikes">View Most Likes </Option>
          </Select>
        </div>
      </Grid>
      <Grid item xs={3} sm={3}>
        <Button
          type="primary"
          block
          onClick={commenthandler}
        >
          Post
        </Button>
      </Grid>
      <Grid style={{ marginTop: '40px' }} item xs={12} sm={12}>
        {isLoading ? (
          <LoadingBox />
        ) : (
          comments?.map((comment) => <Comment key={comment._id} comment={comment} />)
        )}
      </Grid>
    </Grid>
  );
}