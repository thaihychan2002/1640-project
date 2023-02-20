import { Store } from "../../Store";
import react, { useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import "../../component/assets/css/Profile.css";
import { Divider } from "antd";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { updateUserProfile } from "../../api/index";
import axios from "axios";
export default function Profile() {
  const { state } = useContext(Store);
  const user = state.userInfo;
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [fullName, setFullName] = useState(user.fullName);
  const [toggle, setToggle] = useState(false);
  const toggleEdit = () => {
    setToggle(!toggle);
  };

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
    let token = localStorage.getItem("userInfo");
    let userID = jwtDecode(token)._id;
    let data = previewSource;
    try {
      await updateUserProfile(userID, fullName, data);
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Grid item xs={4} sm={4} />
      <Grid container item xs={8} sm={8}>
        <Grid item xs={2} sm={2}>
          <div style={{ marginTop: "10px" }}>
            {!previewSource ? (
              <label htmlFor="image">
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "100px",
                  }}
                  src={user.avatar}
                  alt={user.fullName}
                />
                {toggle && (
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    style={{ display: "none" }}
                  />
                )}
              </label>
            ) : (
              <label htmlFor="image">
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "100px",
                  }}
                  onChange={handleFileInputChange}
                  value={fileInputState}
                />
                {toggle && (
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    style={{ display: "none" }}
                  />
                )}
              </label>
            )}
          </div>
        </Grid>
        <Grid item xs={10} sm={10}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {toggle ? (
              <div>
                <Input
                  value={fullName}
                  className="profile-name"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <Input
                  value={fullName}
                  className="profile-name"
                  bordered={false}
                />
              </div>
            )}

            <Form.Item className="edit-profile">
              <Button onClick={() => toggleEdit()}>Edit Profile</Button>
              {toggle && (
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={(e) => updateUserProfileHandler(e)}
                >
                  Save
                </Button>
              )}
            </Form.Item>
          </div>
          <div style={{ marginLeft: "20px" }}>0 posts</div>
        </Grid>
      </Grid>
      <Divider>Posts</Divider>
      {/* Post item */}
      <Grid item xs={3} sm={3} />
    </Grid>
  );
}
