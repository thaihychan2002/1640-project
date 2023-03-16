import { Store } from "../../Store";
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, CardMedia, useMediaQuery } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button, Divider, Tabs } from "antd";
import * as actions from "../../redux/actions";
import "../../component/assets/css/Profile.css";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { updateUserProfile } from "../../api/index";
import { allPostsState$, allPostsLoading$ } from "../../redux/seclectors";
import { token } from "../../api/config";
import jwtDecode from "jwt-decode";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import { useNavigate } from "react-router-dom";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import Responsive from "../ResponsiveCode/Responsive";
export default function EditProfile() {
  const { state } = useContext(Store);
  const user = state.userInfo;
  const [previewSource, setPreviewSource] = useState("");
  const userID = jwtDecode(token)._id;
  const [fileInputState] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

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
  const updateUserProfileHandler = async (e) => {
    e.preventDefault();
    let data = previewSource;
    try {
      await updateUserProfile(userID, fullName, data);
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const contentEnd = {
    display: "flex",
    justifyContent: "end",
    marginBottom: 25,
  };
  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
    }
  }, [user]);
  const { isMd } = Responsive();
  return (
    <div>
      <Grid container>
        <Grid item xs={3} md={2} style={contentEnd}>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileInputChange}
            value={fileInputState}
            style={{ display: "none" }}
          />
          {!previewSource ? (
            <label htmlFor="image">
              <img
                style={{ width: 44, height: 44 }}
                src={user?.avatar}
                alt={user.fullName}
              />
            </label>
          ) : (
            <label htmlFor="image">
              <img
                src={previewSource}
                alt="chosen"
                onChange={handleFileInputChange}
                value={fileInputState}
                style={{ width: 44, height: 44 }}
              />
            </label>
          )}
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={8} md={9}>
          <p>{user.fullName}</p>
          <label htmlFor="profile-photo-input" style={{ color: "#1686ff" }}>
            Change profile photo
          </label>

          <input
            type="file"
            id="profile-photo-input"
            accept="image/*"
            onChange={handleFileInputChange}
            value={fileInputState}
            style={{ display: "none" }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3} md={2} style={contentEnd}>
          Name
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={8} md={9}>
          <Input
            style={{ width: isMd ? "90%" : "60%" }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3} md={2} style={contentEnd}>
          Email
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={8} md={9}>
          <Input
            style={{ width: isMd ? "90%" : "60%" }}
            value={email}
            disabled
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3} md={2} style={contentEnd}>
          Role
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={8} md={9}>
          <Input
            style={{ width: isMd ? "90%" : "60%" }}
            disabled
            value={user?.role}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3} md={2} style={contentEnd}>
          Department
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={8} md={9}>
          <Input
            style={{ width: isMd ? "90%" : "60%" }}
            disabled
            value={user?.department?.name}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3} md={2} style={contentEnd} />

        <Grid item xs={1} md={1} />
        <Grid item xs={8} md={9}>
          <Button type="primary" onClick={(e) => updateUserProfileHandler(e)}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
