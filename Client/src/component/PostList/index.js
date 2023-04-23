import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { Grid } from "@material-ui/core";
import Post from "./Post";
import { postsState$, postsLoading$, topicsState$ } from "../../redux/seclectors";
import LoadingBox from "../LoadingBox/LoadingBox";


import moment from "moment";


export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  const isLoading = useSelector(postsLoading$);
  const topics = useSelector(topicsState$);
  const today = useMemo(() => {
    new Date();
  }, []);
  const current = moment(today).format("MM:DD:YYYY");
  React.useEffect(() => {
    topics.filter((topic) => topic.status === "Processing")?.map((item) => moment(item.end).format("MM:DD:YYYY") < current && dispatch(actions.updateTopicStatus.updateTopicStatusRequest({ _id: item._id, status: "Ended" })))
  }, [topics, dispatch, current])
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12} sm={12}>
        {isLoading ? (
          <LoadingBox />
        ) : (
          posts
            ?.filter((post) => post?.status === "Accepted")
            .map((post) => <Post key={post._id} post={post} />)
        )}
      </Grid>
    </Grid>
  );
}
