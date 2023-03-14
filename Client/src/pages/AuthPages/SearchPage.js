import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Header from "../../component/header/index";
import PostList from "../../component/PostList";
import { Grid } from "@material-ui/core";
import AccountManage from "../../component/Account/AccountSwitch";
import { Helmet } from "react-helmet-async";
import { FloatButton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { postsLoading$, postsState$ } from "../../redux/seclectors";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import Post from "../../component/PostList/Post";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import * as actions from "../../redux/actions";
import { useParams } from "react-router-dom";
import { searchPostsByKeyword } from "../../api";
import NoPost from "../../component/NoPost";

export default function SearchPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchSearchPosts = async () => {
      try {
        setIsLoading(true);
        // setPosts([]);
        const { data } = await searchPostsByKeyword(params.keyword);
        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchSearchPosts();
  }, [params.keyword]);
  return (
    <Container style={{ maxWidth: "100vw" }} className="{}">
      <Helmet>
        <title>Search</title>
      </Helmet>
      <Header />
      <Grid container alignItems="stretch">
        <Grid item xs={2} sm={2} />

        <Grid item xs={7} sm={7}>
          {/* <PostList /> */}
          {isLoading ? (
            <LoadingBox />
          ) : posts.length > 0 ? (
            posts?.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <NoPost />
          )}
        </Grid>
        <Grid item xs={3} sm={3}>
          <AccountManage />
        </Grid>
      </Grid>
      {/* <BackTop /> */}
      <FloatButton.BackTop />
    </Container>
  );
}
