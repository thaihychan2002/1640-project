import React, { useEffect, useState } from "react";
import { Container, useMediaQuery } from "@material-ui/core";
import Header from "../../component/header/index";
import PostList from "../../component/PostList";
import { Grid } from "@material-ui/core";
import AccountManage from "../../component/Account/AccountSwitch";
import { Helmet } from "react-helmet-async";
import { FloatButton } from "antd";
import IdeaBox from "../../component/IdeaBox";
import { Select } from "antd";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { categoriesState$ } from "../../redux/seclectors";
import { fetchPostsByCategory } from "../../api";
import Post from "../../component/PostList/Post";
import NoPost from "../../component/NoPost";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import Responsive from "../../component/ResponsiveCode/Responsive";

const { Option } = Select;
export default function CategoryPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const categories = useSelector(categoriesState$);
  const [selectedViewCategory, setSelectedViewCategory] = useState("");
  const changePostsView = (value) => {
    setSelectedViewCategory(value);
  };
  const { isXs, isMd } = Responsive();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchPostsByCategory(
          selectedViewCategory || categories[0]?._id
        );
        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchPosts();
  }, [categories, selectedViewCategory]);

  React.useEffect(() => {
    try {
      dispatch(actions.getCategories.getCategoriesRequest());
    } catch (err) {
      toast.error(getError(err));
    }
  }, [dispatch]);

  return (
    <Container style={{ maxWidth: "100vw" }} className="{}">
      <Helmet>
        <title>Categories</title>
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
                  defaultValue="View Any Categories"
                  onChange={changePostsView}
                  style={{
                    width: isXs ? "100%" : isMd ? "35%" : "25%",
                    marginTop: 10,
                  }}
                >
                  {categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
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
