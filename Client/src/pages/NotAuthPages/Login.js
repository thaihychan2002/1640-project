import { Button, Divider, Form, Input } from "antd";
import { Helmet } from "react-helmet-async";
import { useState, useContext, useEffect } from "react";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { loginUser, loginGoogleUser } from "../../api/index.js";
import jwtDecode from "jwt-decode";
import "../../component/assets/css/Login.css";
import { Grid } from "@material-ui/core";
import Responsive from "../../component/ResponsiveCode/Responsive";
const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async () => {
    try {
      const { data } = await loginUser(email, password);
      console.log(data);
      ctxDispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("userInfo", data.token);
      navigate(redirect || "/");
      navigate(0);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCallbackResponse = async (response) => {
    let user = jwtDecode(response.credential);
    let email = user.email;
    let fullName = user.name;
    let avatar = user.picture;
    try {
      const { data } = await loginGoogleUser(email, fullName, avatar);
      ctxDispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("userInfo", data.token);
      navigate(redirect || "/");
      navigate(0);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const { isXs } = Responsive();
  useEffect(() => {
    const googleService = () => {
      window?.google?.accounts?.id?.initialize({
        client_id:
          "524537065604-pfst28oopm5kq31je7u6qtjcb22td9h6.apps.googleusercontent.com",
        callback: handleCallbackResponse,
        context: "singin",
      });
      const parent = document.getElementById("loginDiv");
      window?.google?.accounts?.id?.renderButton(parent, {
        type: "standard",
        width: isXs ? 300 : 400,
        text: "signin_with",
        locale: "en-US",
      });
      window?.google?.accounts?.id?.prompt();
    };

    setTimeout(googleService, 100);
  }, [isXs]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="login">
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: 400,
            }}
            onFinish={submitHandler}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Helmet>
              <title>Login</title>
            </Helmet>
            <Form.Item
              label="Email"
              name="email"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100px" }}
              >
                Login
              </Button>
            </Form.Item>
            {/* <Form.Item
          wrapperCol={{
            offset: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Create an account?</p>
            <p>
              <Link to="/register">
                <Button>Go to Register</Button>
              </Link>
            </p>
          </div>
        </Form.Item> */}
            <Divider>Or login by Google</Divider>
            <div id="loginDiv"></div>
            <center>
              <p
                style={{
                  color: "#1686ff",
                  fontSize: 16,
                  marginTop: 15,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </p>
            </center>
          </Form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Login;
