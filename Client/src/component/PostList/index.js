import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Post from "./Post";
import IdeaBox from "../IdeaBox";
import {
  postsState$,
  postsLoading$,
} from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";
import { Select } from "antd";
const { Option } = Select;
export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  const isLoading = useSelector(postsLoading$);
  const [selectedView, setSelectedView] = useState("recently");
  // console.log(actions.getPosts.getPostsRequest(selectedView));
  React.useEffect(() => {
      dispatch(actions.getPosts.getPostsRequest(selectedView));
  }, [dispatch, selectedView]);
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getCategories.getCategoriesRequest());
  }, [dispatch]);
  const changePostsView = (value) => {
    setSelectedView(value);
  };
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
            style={{ width: "25%" }}
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
          posts?.map((post) => <Post key={post._id} post={post} />)
        )}
      </Grid>
    </Grid>
  );
}
