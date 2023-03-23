import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid} from "@material-ui/core";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { Input, Button, Typography, Switch } from "antd";
import { Store } from "../../Store";
import { commentsLoading$, commentsState$ } from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";
import { Select } from "antd";
import Responsive from "../ResponsiveCode/Responsive";

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
export default function CommentList({ post }) {
  const dispatch = useDispatch();
  const comments = useSelector(commentsState$);
  const { state } = useContext(Store);
  const user = state.userInfo;
  const sortedcomments= comments?.filter((comment)=>comment?.postID?._id===post._id)
  const isLoading = useSelector(commentsLoading$);
  
  const { isXs } = Responsive();

  
  const [comment, setcomment] = React.useState({
    author: "",
    content: "",
    isAnonymous: false,
    postID: post._id,
  });
  const changeCommentsView = React.useCallback(
    (value) => {
      dispatch(actions.getConditionCmts.getCmtsRequest({ status: value}));
    },
    [dispatch]
  );
  const commenthandler = React.useCallback(() => {
    dispatch(actions.createComments.createCommentsRequest(comment));
  }, [comment, dispatch]);
  return (
    <Grid container spacing={1} alignItems="stretch" style={{ marginTop: 10 }}>
      <Grid container>
        <Grid item xs={2} sm={2} />
        <Grid
          item
          xs={8}
          sm={8}
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
              {sortedcomments.length} comments
            </Text>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2} sm={2} />
        <Grid item xs={8} sm={8}>
          <TextArea
            placeholder="Any comments?"
            className="idea-create"
            allowClear
            autoSize={{
              minRows: 3,
              maxRows: 4,
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
      </Grid>
      <Grid container>
        <Grid item xs={2} sm={2} />
        <Grid
          item
          xs={8}
          sm={8}
          style={{ display: "flex", justifyContent: "space-between  " }}
        >
          <div>
            <Switch
              style={{ width: "200px", top: "20px" }}
              checkedChildren="Anonymous"
              unCheckedChildren={user.fullName}
              onChange={(checked) =>
                setcomment({
                  ...comment,
                  isAnonymous: checked,
                })
              }
            />
          </div>
          <div>
            <Button
              type="primary"
              style={{ marginTop: 15 }}
              block
              onClick={commenthandler}
            >
              Post
            </Button>
          </div>
        </Grid>
      </Grid>

      {comments.length > 0 && (
        <Grid style={{ marginTop: "100px" }} item xs={12} sm={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Select
              defaultValue="View by default"
              onChange={changeCommentsView}
              style={{
                width: isXs ? "50%" : "50%",
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
            sortedcomments?.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))
          )}
        </Grid>
      )}
    </Grid>
  );
}
