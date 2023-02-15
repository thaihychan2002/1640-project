import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Post from "./Post";
import IdeaBox from "../IdeaBox";
import { postsState$, postsLoading$ } from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";
export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  const isLoading = useSelector(postsLoading$);
  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sm={12}>
        <IdeaBox></IdeaBox>
      </Grid>
      <Grid item xs={12} sm={12} >
        {isLoading ? (
          <LoadingBox />
        ) : (
          <>
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </>
        )}
      </Grid>
    </Grid>
  );
}
