import { Button, Checkbox, Form, Input } from "antd";
import { Helmet } from "react-helmet-async";
import { useState, useContext, useEffect } from "react";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { loginUser, loginGoogleUser } from "../../api/index.js";
import jwtDecode from "jwt-decode";

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
    } catch (err) {
      toast.error(getError(err));
    }
  };

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
        width: 400,
        text: "signin_with",
        locale: "en-US",
      });
      window?.google?.accounts?.id?.prompt();
    };
    googleService();
  }, []);

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
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

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Create an account?</p>
          <p>
            <Link to="/register">Go to Register</Link>
          </p>
        </div>
      </Form.Item>
      <div id="loginDiv" style={{ marginLeft: "200px" }}></div>
    </Form>
  );
};
export default Login;
