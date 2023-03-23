import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Header from "../../component/header/index";
import PostList from "../../component/PostList";
import { Grid } from "@material-ui/core";
import AccountManage from "../../component/Account/AccountSwitch";
import { Helmet } from "react-helmet-async";
import { FloatButton, Select } from "antd";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Responsive from "../../component/ResponsiveCode/Responsive";
import IdeaBox from "../../component/IdeaBox";
const { Option } = Select;
export default function HomePage() {
  const dispatch = useDispatch();
  const [selectedView, setSelectedView] = useState("recently");
  React.useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest(selectedView));
  }, [dispatch, selectedView]);
  React.useEffect(() => {
    const token = localStorage.getItem("userInfo");
    const user = jwtDecode(token)
    dispatch(actions.filterActionsLog.filterActionsLogRequest({ author: user._id }));
    dispatch(actions.getDepartments.getDepartmentsRequest());
    dispatch(actions.getTopics.getTopicsRequest());
    dispatch(actions.getComments.getCommentsRequest());
  }, [dispatch])
  const changePostsView = (value) => {
    setSelectedView(value);
  };
  const { isXs, isMd } = Responsive();
  return (
    <Container style={{ maxWidth: "100vw" }} className="{}">
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <Header />
      <Grid container alignItems="stretch">
        <Grid item xs={2} sm={2} />
        <Grid item xs={7} sm={7}>
          <IdeaBox />
        </Grid>
        <Grid item xs={3} sm={3} />
        <Grid item xs={2} sm={2} />
        <Grid item xs={7} sm={7}>
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
        <Grid item xs={3} sm={3} />
        <Grid item xs={2} sm={2} />
        <Grid item xs={7} sm={7}>
          <PostList />
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
