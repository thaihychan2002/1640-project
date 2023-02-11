import React, { useContext } from "react";
import { Row, Col } from "antd";
import "../assets/css/AccountSwitch.css";
import { Store } from "../../Store";
import { Link } from "react-router-dom";
import { Button } from "antd";
export default function AccountSwitch() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };
  console.log(userInfo.avatar);
  return (
    <Col className="account-switch">
      <Row>
        <Col lg={24} md={18}>
          <Row>
            <Col lg={10} md={6} className="img-switch">
              <img alt={userInfo.fullName} src={userInfo.avatar} />
            </Col>
            <div className="info-switch">
              <Col lg={10} md={10} className="account-info">
                <span>{userInfo.fullName}</span>
              </Col>
              <Col lg={4} md={2}>
                <Button>
                  {" "}
                  <Link
                    className="switch"
                    to="#logout"
                    onClick={() => signoutHandler()}
                  >
                    Logout
                  </Link>
                </Button>
              </Col>
            </div>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
