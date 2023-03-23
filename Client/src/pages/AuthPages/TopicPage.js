import React, { useEffect, useRef, useState } from "react";
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
import { postsLoading$, poststopicState$, topicsState$ } from "../../redux/seclectors";
import { fetchPostsByTopic, fetchTopics } from "../../api";
import Post from "../../component/PostList/Post";
import NoPost from "../../component/NoPost";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import Responsive from "../../component/ResponsiveCode/Responsive";
import jwtDecode from "jwt-decode";

const { Option } = Select;
export default function TopicPage() {
  const dispatch = useDispatch();
  // const [selectedViewTopic, setSelectedViewTopic] = useState("");
  // const [visibleTopics, setVisibleTopics] = useState([]);
  // const [topicsLimit, setTopicsLimit] = useState(1);
  // const [loadMore, setLoadMore] = useState(false);
  // const [value, setValue] = useState(0);

  // useEffect(() => {
  //   setVisibleTopics(topics.slice(0, topicsLimit));
  // }, [topics, topicsLimit]);

  // const changePostsView = (value) => {
  //   setSelectedViewTopic(value);
  // };

  React.useEffect(() => {
    dispatch(actions.getTopics.getTopicsRequest());
  }, [dispatch]);
  const isLoading = useSelector(postsLoading$)
  const changePostsView = (value) => {
    settopicID(value)
  };
  const posts = useSelector(poststopicState$);
  const topics = useSelector(topicsState$);
  const [topicID, settopicID] = useState('')
  React.useEffect(() => {
    const token = localStorage.getItem("userInfo");
    const user = jwtDecode(token)
    dispatch(actions.filterActionsLog.filterActionsLogRequest({ author: user._id }));
  }, [dispatch,isLoading])
  const { isXs, isMd } = Responsive();
  React.useEffect(() => {
    dispatch(actions.viewPostsByTopics.viewPostRequestByTopics({ _id: topicID || topics[0]?._id }));
  }, [dispatch, topicID, topics])

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
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* <div>
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
              </div> */}
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Select
                  defaultValue="View Any Topics"
                  onChange={changePostsView}
                  style={{
                    width: isXs ? "100%" : isMd ? "35%" : "25%",
                    marginTop: 10,
                  }}
                >
                  {topics.map((topic) => (
                    <Option key={topic._id} value={topic._id}>
                      {topic.name}
                    </Option>
                  ))}
                </Select>
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
