import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Post from "./Post";
import IdeaBox from "../IdeaBox";
import { postsState$, postsLoading$ } from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";
import { useMediaQuery } from "@material-ui/core";
import { Select } from "antd";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import Responsive from "../ResponsiveCode/Responsive";

const { Option } = Select;
export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  const isLoading = useSelector(postsLoading$);
  const [selectedView, setSelectedView] = useState("recently");
  React.useEffect(() => {
    try {
      dispatch(actions.getPosts.getPostsRequest(selectedView));
    } catch (err) {
      toast.error(getError(err));
    }
  }, [dispatch, selectedView]);
  React.useEffect(() => {
    try {
      dispatch(actions.getDepartments.getDepartmentsRequest());
    } catch (err) {
      toast.error(getError(err));
    }
  }, [dispatch]);
  React.useEffect(() => {
    try {
      dispatch(actions.getTopics.getTopicsRequest());
    } catch (err) {
      toast.error(getError(err));
    }
  }, [dispatch]);
  const changePostsView = (value) => {
    setSelectedView(value);
  };

  const { isXs, isMd } = Responsive();

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sm={12}>
        <IdeaBox />
      </Grid>
      <Grid item xs={12} sm={12}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Select
            defaultValue="View Recently Posts"
            onChange={changePostsView}
            style={{
              width: isXs ? "100%" : isMd ? "35%" : "25%",
              marginTop: 10,
            }}
          >
            {/* <Option value="">View All Posts</Option> */}
            <Option value="recently">View Recently Posts</Option>
            <Option value="mostViews">View Most Views Posts</Option>
            <Option value="mostLikes">View Most Likes Posts</Option>
          </Select>
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        {isLoading ? (
          <LoadingBox />
        ) : (
          posts?.filter((post) => post?.status === 'Accepted').map((post) => <Post key={post._id} post={post} />)
        )}
      </Grid>
    </Grid>
  );
}
