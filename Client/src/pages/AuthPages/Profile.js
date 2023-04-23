import { Store } from "../../Store";
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardMedia} from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { Form, Button, Divider } from "antd";
import * as actions from "../../redux/actions";
import "../../component/assets/css/Profile.css";
import { allPostsState$, allPostsLoading$ } from "../../redux/seclectors";
import { token } from "../../api/config";
import jwtDecode from "jwt-decode";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import { useNavigate } from "react-router-dom";
import Responsive from "../../component/ResponsiveCode/Responsive";
export default function Profile() {
  const navigate = useNavigate();
  // fetch user posts
  const dispatch = useDispatch();
  const posts = useSelector(allPostsState$);
  const loading = useSelector(allPostsLoading$);
  const userID = jwtDecode(token)._id;
  const { isXs } = Responsive();
  //
  const { state } = useContext(Store);
  const user = state.userInfo;
  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
    }
  }, [user]);
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [fullName, setFullName] = useState("");
  // const [toggle, setToggle] = useState(false);
  // const toggleEdit = () => {
  //   setToggle(!toggle);
  // };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  React.useEffect(() => {
    dispatch(actions.getAllPosts.getAllPostsRequest());
  }, [dispatch]);
  const filteredPosts = posts?.filter(
    (post) => post?.author?._id === userID && post?.status === "Accepted"
  );
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Grid item xs={false} sm={2} md={4} />
      <Grid container item xs={12} sm={10} md={8}>
        <Grid item xs={2} sm={3} md={2}>
          <div style={{ marginTop: "10px" }}>
            <label htmlFor="image">
              <img
                src={user.avatar}
                alt={user.fullName}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "100px",
                }}
                onChange={handleFileInputChange}
                value={fileInputState}
              />
            </label>
          </div>
        </Grid>
        <Grid item xs={10} sm={9} md={10}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <p className="profile-name">{user.fullName}</p>
            </div>

            <Form.Item className="edit-profile">
              <Button onClick={() => navigate("/edit")}>Edit Profile</Button>
            </Form.Item>
          </div>
          <div style={{ marginLeft: isXs ? "110px" : "20px" }}>
            You have {filteredPosts.length} ideas now
          </div>
        </Grid>
      </Grid>
      <Divider>Posts</Divider>
      {/* Post item */}
      <Grid item xs={false} sm={2} />
      <Grid container item xs={10} sm={10}>
        {loading ? (
          <LoadingBox />
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                style={{
                  maxWidth: "75%",
                  maxHeight: "300px",
                  marginBottom: "25px",
                }}
              >
                <Button
                  type="button"
                  onClick={() => navigate(`/idea/${post?.slug}`)}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    padding: 0,
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    style={{
                      width: "100%",
                      height: "300px",
                      borderRadius: "0px",
                    }}
                    image={post.attachment}
                    title={post.title}
                    component="img"
                  />
                </Button>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={9}>
            <div className="no-post">
              <img
                style={{ height: "100px", width: "100px" }}
                src="https://thumbs.dreamstime.com/b/pictograph-light-bulb-icon-circle-vector-iconic-design-symbol-white-background-98493546.jpg"
                alt="icon"
              />
            </div>
            <h1 className="no-post">Share ideas</h1>
            <h3 className="no-post">
              When you share photos, they will appear on your profile.
            </h3>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
