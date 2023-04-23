import { Grid } from "@material-ui/core";
import { Button, Input } from "antd";
import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePasswordUser } from "../../api";
import { token } from "../../api/config";
import { Store } from "../../Store";
import { getError } from "../../utils";
import Responsive from "../ResponsiveCode/Responsive";

export default function ChangePassword() {
  const { state } = useContext(Store);
  const user = state.userInfo;
  const userID = jwtDecode(token)._id;
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const contentEnd = {
    display: "flex",
    justifyContent: "end",
    marginBottom: 40,
  };
  const checkToChangePassword = () => {
    return oldPassword === "" || newPassword === "" || confirmPassword === "";
  };
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === confirmPassword) {
        await changePasswordUser(userID, oldPassword, newPassword);
        toast.success("Changed password successfully");
      } else {
        toast.error("Please make sure both passwords match");
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const { isMd } = Responsive();
  return (
    <div>
      <Grid container>
        <Grid item xs={4} md={2} style={contentEnd}>
          <img
            style={{ width: 44, height: 44 }}
            src={user?.avatar}
            alt={user.fullName}
          />
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={7} md={9}>
          {user.fullName}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} md={2} style={contentEnd}>
          Old password
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={7} md={9}>
          <Input.Password
            placeholder="Input your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={{ width: isMd ? "90%" : "60%" }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} md={2} style={contentEnd}>
          New password
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={7} md={9}>
          <Input.Password
            placeholder="Input your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: isMd ? "90%" : "60%" }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} md={2} style={contentEnd}>
          Confirm password
        </Grid>
        <Grid item xs={1} md={1} />
        <Grid item xs={7} md={9}>
          <Input.Password
            placeholder="Input confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: isMd ? "90%" : "60%" }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} md={2} style={contentEnd} />

        <Grid item xs={1} md={1} />
        <Grid item xs={7} md={9}>
          <Button
            type="primary"
            disabled={checkToChangePassword()}
            onClick={(e) => changePasswordHandler(e)}
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} md={2} style={contentEnd} />

        <Grid item xs={1} md={1} />
        <Grid item xs={7} md={9}>
          <p
            style={{ color: "#1686ff", cursor: "pointer" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
