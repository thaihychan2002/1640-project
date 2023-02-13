import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../Store";
export default function UserRoute({ children }) {
  const { state } = useContext(Store);
  console.log(state.userInfo);
  return !state.userInfo ? <Navigate to="/login" /> : children;
}
