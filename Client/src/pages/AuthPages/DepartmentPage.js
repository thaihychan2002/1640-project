import React, { useEffect, useRef, useState } from "react";
import { Container, useMediaQuery } from "@material-ui/core";
import Header from "../../component/header/index";
import { Grid } from "@material-ui/core";
import AccountManage from "../../component/Account/AccountSwitch";
import { Helmet } from "react-helmet-async";
import { FloatButton } from "antd";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { departmentsState$, postsLoading$, postsdepartmentState$ } from "../../redux/seclectors";

import Post from "../../component/PostList/Post";
import NoPost from "../../component/NoPost";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import Responsive from "../../component/ResponsiveCode/Responsive";
import jwtDecode from "jwt-decode";

const { Option } = Select;
export default function DepartmentPage() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  const isLoading = useSelector(postsLoading$)
  const changePostsView = (value) => {
    settopicID(value)
  };
  const posts = useSelector(postsdepartmentState$);
  const departments = useSelector(departmentsState$);
  const [topicID, settopicID] = useState('')
  React.useEffect(() => {
    const token = localStorage.getItem("userInfo");
    const user = jwtDecode(token)
    dispatch(actions.filterActionsLog.filterActionsLogRequest({ author: user._id }));
  }, [dispatch])
  const { isXs, isMd } = Responsive();
  React.useEffect(() => {
    dispatch(actions.viewPostsByDepartment.viewPostRequestByDepartment({ _id: topicID || departments[0]?._id }));
  }, [dispatch, topicID, departments])
  return (
    <Container style={{ maxWidth: "100vw" }} className="{}">
      <Helmet>
        <title>Departments</title>
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
                  defaultValue="View Any Departments"
                  onChange={changePostsView}
                  style={{
                    width: isXs ? "100%" : isMd ? "35%" : "25%",
                    marginTop: 10,
                  }}
                >
                  {departments.map((department) => (
                    <Option key={department._id} value={department._id}>
                      {department.name}
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
