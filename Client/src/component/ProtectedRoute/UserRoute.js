import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { Navigate } from "react-router-dom";
import { Store } from "../../Store";

export default function UserRoute({ children }) {
  const { state } = useContext(Store);
  const [navigate, setNavigate] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userInfo");
        !token ? setNavigate(<Navigate to="/login" />) : setNavigate(children);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchUser();
  }, [children, state?.userInfo]);
  return navigate;
}
