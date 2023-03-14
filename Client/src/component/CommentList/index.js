import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid, useMediaQuery } from "@material-ui/core";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { Input, Button, Typography } from "antd";
import { Store } from "../../Store";
import { commentsLoading$, commentsState$ } from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";
import { Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
export default function CommentList({ post }) {
  const dispatch = useDispatch();
  const comments = useSelector(commentsState$);
  const isLoading = useSelector(commentsLoading$);
  const [selectedcdt, setSelectedcdt] = useState("recently");
  const { state } = useContext(Store);
  const isXs = useMediaQuery("(max-width:400px");
  React.useEffect(() => {
    dispatch(actions.getConditionCmts.getCmtsRequest({ status: selectedcdt }));
  }, [dispatch, selectedcdt]);
  const user = state.userInfo;
  const [comment, setcomment] = React.useState({
    author: "",
    content: "",
    postID: post._id,
  });
  const changeCommentsView = React.useCallback(
    (value) => {
      setSelectedcdt(value);
    },
    []
  );
  const commenthandler = React.useCallback(() => {
    dispatch(actions.createComments.createCommentsRequest(comment));
  }, [comment, dispatch]);
  return (
    <Grid container spacing={1} alignItems="stretch">
      <Grid container>
        <Grid item xs={false} sm={1} />
        <Grid
          item
          xs={12}
          sm={9}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <Link to="/profile">
              <img alt={user?.fullName} src={user?.avatar} />
            </Link>
            {user.fullName}
          </div>
          <div>
            <Text type="secondary" style={{ marginLeft: "-10%" }}>
              {comments.length} comments
            </Text>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} />
      <Grid item xs={12} sm={11}>
        <TextArea
          placeholder="Any comments?"
          className="idea-create"
          allowClear
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
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

      <Grid item xs={10} sm={8} />
      <Grid item xs={2} sm={2}>
        <Button type="primary" block onClick={commenthandler}>
          Post
        </Button>
      </Grid>
      <Grid style={{ marginTop: "40px" }} item xs={12} sm={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Select
            defaultValue="View Recently"
            onChange={changeCommentsView}
            style={{
              width: isXs ? "50%" : "20%",
              marginBottom: "20px",
            }}
          >
            <Option value="recently">View Recently </Option>
            <Option value="mostLikes">View Most Likes </Option>
          </Select>
        </div>
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
