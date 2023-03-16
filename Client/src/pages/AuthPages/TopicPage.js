import React, { useEffect, useState } from "react";
import { Container, useMediaQuery } from "@material-ui/core";
import Header from "../../component/header/index";
import { Grid } from "@material-ui/core";
import AccountManage from "../../component/Account/AccountSwitch";
import { Helmet } from "react-helmet-async";
import { FloatButton } from "antd";
import { Select } from "antd";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { topicsState$ } from "../../redux/seclectors";
import { fetchPostsByTopic } from "../../api";
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
  const changePostsView = (value) => {
    setSelectedViewTopic(value);
  };
  const { isXs, isMd } = Responsive();
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
    try {
      dispatch(actions.getTopics.getTopicsRequest());
    } catch (err) {
      toast.error(getError(err));
    }
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
