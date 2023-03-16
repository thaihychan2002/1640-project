import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { Button, Divider, Input } from "antd";
import { forgotPassword } from "../../api";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { Helmet } from "react-helmet-async";
import Icon, { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await forgotPassword(email);
      toast.success(`Email has been sent to ${email}. Please check it`);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Grid container>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <Grid item xs={false} sm={3} md={5} />
      <Grid item xs={12} sm={6} md={3}>
        <div className="forgot-password-not-signedin">
          <center className="item">
            <img
              style={{
                width: 128,
                height: 128,
                marginBottom: 15,
                marginTop: 50,
              }}
              src="https://cdn-icons-png.flaticon.com/512/625/625086.png"
              alt="lock"
            />
            <p style={{ marginBottom: 15 }}>Trouble logging in?</p>
            <span style={{ fontSize: 16, marginBottom: 15 }}>
              Enter your email and we'll send you a link to get back into your
              account.
            </span>
            <Input
              type="email"
              id="email"
              placeholder="Input your email"
              style={{ width: "80%", marginBottom: 15 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="primary"
              style={{ width: "80%", marginBottom: 15 }}
              onClick={(e) => handleSubmit(e)}
            >
              Reset Password
            </Button>
            <Divider>OR</Divider>
            <Button
              style={{ width: "80%", marginBottom: 15 }}
              onClick={() => navigate("/login")}
            >
              Back to login
            </Button>
          </center>
        </div>
      </Grid>
    </Grid>
  );
}

export default ForgotPassword;
