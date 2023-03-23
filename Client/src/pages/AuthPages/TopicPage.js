import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Header from "../../component/header/index";
import { Grid, Tabs, Tab } from "@material-ui/core";
import AccountManage from "../../component/Account/AccountSwitch";
import { Helmet } from "react-helmet-async";
import { Button, FloatButton, Pagination } from "antd";
import { Select } from "antd";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { topicsState$ } from "../../redux/seclectors";
import { fetchPostsByTopic, fetchTopicsPaginated } from "../../api";
import Post from "../../component/PostList/Post";
import NoPost from "../../component/NoPost";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import Responsive from "../../component/ResponsiveCode/Responsive";

const { Option } = Select;
export default function TopicPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const topics = useSelector(topicsState$);
  const [selectedViewTopic, setSelectedViewTopic] = useState("");
  const [visibleTopics, setVisibleTopics] = useState([]);
  const [topicsLimit, setTopicsLimit] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setVisibleTopics(topics.slice(0, topicsLimit));
  }, [topics, topicsLimit]);

  const changePostsView = (value) => {
    setSelectedViewTopic(value);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchPostsByTopic(
          selectedViewTopic || topics[0]?._id
        );
        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchPosts();
  }, [topics, selectedViewTopic]);

  React.useEffect(() => {
    dispatch(actions.getTopics.getTopicsRequest());
  }, [dispatch]);

  return (
    <Container style={{ maxWidth: "100vw" }} className="{}">
      <Helmet>
        <title>Topics</title>
      </Helmet>
      <Header />
      <Grid container alignItems="stretch">
        <Grid item xs={2} sm={2} />
        <Grid item xs={7} sm={7}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} sm={12}>
              {/* <IdeaBox /> */}
            </Grid>
            <Grid item xs={12} sm={12}>
              <div>
                <Tabs
                  value={value}
                  TabIndicatorProps={{ style: { backgroundColor: "#1677ff" } }}
                  onChange={(event, newValue) => {
                    const tabKey = topics[newValue]._id;
                    setSelectedViewTopic(tabKey);
                    setValue(newValue);
                  }}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {topics?.map((topic) => (
                    <Tab key={topic._id} label={topic.name} />
                  ))}
                </Tabs>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <LoadingBox />
              ) : posts.length > 0 ? (
                posts?.map((post) => <Post key={post._id} post={post} />)
              ) : (
                <NoPost />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} sm={3}>
          <AccountManage />
        </Grid>
      </Grid>
      <FloatButton.BackTop />
    </Container>
  );
}
