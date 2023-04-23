import React from "react";

import { Grid} from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { Tabs } from "antd";

import "../../component/assets/css/Profile.css";

import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import EditProfile from "../../component/ProfileEdit/EditProfile";
import ChangePassword from "../../component/ProfileEdit/ChangePassword";
import Responsive from "../../component/ResponsiveCode/Responsive";
export default function AccountEdit() {

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
