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
import EditProfile from "../../component/ProfileEdit/EditProfile";
import ChangePassword from "../../component/ProfileEdit/ChangePassword";
import Responsive from "../../component/ResponsiveCode/Responsive";
export default function AccountEdit() {
  const { state } = useContext(Store);
  const user = state.userInfo;
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

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

  //   const updateUserProfileHandler = async (e) => {
  //     e.preventDefault();
  //     let data = previewSource;
  //     try {
  //       await updateUserProfile(userID, fullName, data);
  //       toast.success("User updated successfully");
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  const icons = [<UserOutlined />, <SettingOutlined />];
  const tabName = [<span>Edit Profile</span>, <span>Change Password</span>];
  const children = [<EditProfile />, <ChangePassword />];
  const { isXs } = Responsive();

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Helmet>
        <title>Edit Profile</title>
      </Helmet>
      <Grid item xs={false} sm={2} md={3} />
      <Grid container item xs={12} sm={10} md={9} style={{ marginTop: 25 }}>
        <Grid item xs={12} sm={12} md={10}>
          <Tabs
            defaultActiveKey="1"
            centered
            tabPosition={isXs ? "top" : "left"}
            items={new Array(3).fill(null).map((_, i) => {
              return {
                label: (
                  <span>
                    {icons[i]}
                    {tabName[i]}
                  </span>
                ),
                key: i,
                children: children[i],
              };
            })}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
