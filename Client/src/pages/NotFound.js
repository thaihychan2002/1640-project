import React from "react";
import { Link } from "react-router-dom";
import "../component/assets/css/NotFound.css";
import { Helmet } from "react-helmet-async";
const NotFound = () => {
  return (
    <div className="error-page">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you're looking for could not be found.</p>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
};

export default NotFound;
