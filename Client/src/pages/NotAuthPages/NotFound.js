import React from "react";
import { Link } from "react-router-dom";
import "../../component/assets/css/NotFound.css";
import { Helmet } from "react-helmet-async";
import { Button, Modal } from "antd";
import { useState } from "react";
const NotFound = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnotherModalOpen, setIsAnotherModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showAnotherModal = () => {
    setIsAnotherModalOpen(true);
  };
  const handleAnotherOk = () => {
    setIsAnotherModalOpen(false);
  };
  const handleAnotherCancel = () => {
    setIsAnotherModalOpen(false);
  };

  return (
    <div className="error-page">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you're looking for could not be found.</p>
      <Link to="/">Go back to the home page</Link>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Button type="primary" onClick={showAnotherModal}>
        Open Another Modal
      </Button>
      <Modal
        title="Another Modal"
        open={isAnotherModalOpen}
        onOk={handleAnotherOk}
        onCancel={handleAnotherCancel}
      >
        <p>Another modal...</p>
        <p>Another modal...</p>
        <p>Another modal...</p>
      </Modal>
    </div>
  );
};

export default NotFound;
