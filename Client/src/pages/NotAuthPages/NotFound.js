import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../component/assets/css/NotFound.css";
import { Helmet } from "react-helmet-async";
import { Result, Button } from "antd";
import { Grid } from "@material-ui/core";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    document.body.classList.add("not-found");
    return () => {
      document.body.classList.remove("not-found");
    };
  }, []);
  return (
    <div className="error-page">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      {/* <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/" style={{ textDecoration: "none" }}>
              Back Home
            </Link>
          </Button>
        }
      />{" "} */}
      <Grid container alignItems="stretch">
        <Grid item xs={0} sm={1} md={2} />
        <Grid item xs={12} sm={11} md={10}>
          <div>
            <div className="starsec"></div>
            <div className="starthird"></div>
            <div className="starfourth"></div>
            <div className="starfifth"></div>
          </div>

          <div className="lamp__wrap">
            <div className="lamp">
              <div className="cable"></div>
              <div className="cover"></div>
              <div className="in-cover">
                <div className="bulb"></div>
              </div>
              <div className="light"></div>
            </div>
          </div>
          <section className="error">
            <div className="error__content">
              <div className="error__message message">
                <h1 className="message__title">Page Not Found</h1>
                <p className="message__text">
                  We're sorry, the page you were looking for isn't found here.
                  The link you followed may either be broken or no longer
                  exists. Please try again, or take a look at our.
                </p>
              </div>
              <div className="error__nav e-nav">
                <Link to="/" className="e-nav__link"></Link>
              </div>
            </div>
          </section>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
