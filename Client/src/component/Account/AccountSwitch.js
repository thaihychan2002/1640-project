import React, { useContext} from "react";
import "../assets/css/AccountSwitch.css";
import { Store } from "../../Store";
import { Link } from "react-router-dom";
import { Button } from "antd";
export default function AccountSwitch() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  let user = state.userInfo;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };
  return (
    <div className="account-switch">
      <div>
        <Link to="/profile">
          <img alt={user?.fullName} src={user?.avatar} />
        </Link>
      </div>
      <div className="as-flex">
        <div>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <span>{user?.fullName}</span>
          </Link>
        </div>
        <div>
          <Button style={{ marginRight: "50px" }}>
            <Link
              className="switch"
              to="#logout"
              onClick={() => signoutHandler()}
            >
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
