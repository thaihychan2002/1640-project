import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../Store";

import { toast } from "react-toastify";
import { getError } from "../../utils";
import { fetchUserByID } from "../../api";
import jwtDecode from "jwt-decode";
export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const [navigate, setNavigate] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userInfo");
        if (token) {
          const userID = jwtDecode(token)._id;
          const { data } = await fetchUserByID(userID);
          if (data.role === "Admin") {
            setNavigate(children);
          } else {
            setNavigate(<Navigate to="/" />);
          }
        } else {
          setNavigate(<Navigate to="/login" />);
        }
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchUser();
  }, [children, state?.userInfo]);
  return navigate;
}
