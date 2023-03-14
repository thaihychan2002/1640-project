import React, { useContext, useEffect, useState } from "react";
import "../assets/css/AccountSwitch.css";
import { Store } from "../../Store";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Input } from "antd";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postsLoading$, postsState$ } from "../../redux/seclectors";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import * as actions from "../../redux/actions";
import Search from "../Search/index";
import { countViewBySlug, logout } from "../../api";

export default function AccountSwitch() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  let user = state.userInfo;
  const logoutHandler = async () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
    await logout();
  };
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  const isLoading = useSelector(postsLoading$);
  const [selectedView, setSelectedView] = useState("recently");
  React.useEffect(() => {
    try {
      dispatch(actions.getPosts.getPostsRequest(selectedView));
    } catch (err) {
      toast.error(getError(err));
    }
  }, [dispatch, selectedView]);
  const [randomPosts, setRandomPosts] = useState([]);
  useEffect(() => {
    if (posts && posts.length > 0) {
      // Generate an array of 5 unique random indices
      const randomIndices = [];
      while (randomIndices.length < 5 && posts.length >= 5) {
        const index = Math.floor(Math.random() * posts.length);
        if (!randomIndices.includes(index)) {
          randomIndices.push(index);
        }
      }

      // Use the random indices to extract 5 random posts from the array
      const randomPosts = randomIndices.map((index) => posts[index]);

      setRandomPosts(randomPosts);
    }
  }, [posts]);
  const countView = async (slug) => {
    console.log(slug);
    await countViewBySlug(slug);
  };
  return (
    <div className="account-switch">
      <Grid container alignItems="stretch">
        <Grid item xs={11} sm={11}>
          <Search />
        </Grid>
        <Grid item xs={11} sm={11}>
          <Link to="/profile">
            <img alt={user?.fullName} src={user?.avatar} />
          </Link>
        </Grid>
        <Grid
          item
          xs={11}
          sm={11}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
            >
              <span>{user?.fullName}</span>
            </Link>
          </div>
          <div>
            <Button>
              <Link
                className="switch"
                to="#logout"
                style={{ textDecoration: "none" }}
                onClick={() => logoutHandler()}
              >
                Logout
              </Link>
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="stretch">
        <Divider style={{ marginTop: 25, marginBottom: 25 }}>
          Suggestions for you
        </Divider>
        {randomPosts.map((post) => (
          <Grid item xs={11} sm={11} key={post._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {post.title}
              <Button
                type="button"
                onClick={() => {
                  navigate(`/idea/${post?.slug}`);
                  countView(post.slug);
                }}
              >
                View
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
