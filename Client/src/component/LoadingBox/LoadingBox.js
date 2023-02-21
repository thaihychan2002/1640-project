import React from "react";
import "../assets/css/LoadingBox.css";
import { Skeleton } from "antd";

export default function LoadingBox() {
  return (
    <div>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </div>
  );
}
