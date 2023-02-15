import { Store } from "../Store";
import react, { useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";

export default function Profile() {
  const { state } = useContext(Store);
  const user = state.userInfo;

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Grid item xs={2} sm={2} />
      <Grid item xs={7} sm={7}>
        <Form
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item>
            <Upload
              //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <img src={user.avatar} alt={user.fullName} />
          </Form.Item>
          <Form.Item label="Full Name">
            <Input value={user.fullName} />
          </Form.Item>

          <Form.Item>
            <Button>Submit</Button>
          </Form.Item>
        </Form>
      </Grid>
      <Grid item xs={3} sm={3} />
    </Grid>
  );
}
