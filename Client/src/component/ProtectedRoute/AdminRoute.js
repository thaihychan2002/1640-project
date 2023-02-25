import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../Store";

import { toast } from "react-toastify";
import { getError } from "../../utils";
export default function AdminRoute({ children }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [navigate, setNavigate] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = state?.userInfo;
        if (user.role === "Admin") {
          setNavigate(children);
        } else if (user.role === "Staff") {
          setNavigate(<Navigate to="/" />);
        }
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchUser();
  }, [children, state?.userInfo]);
  return navigate;
}
