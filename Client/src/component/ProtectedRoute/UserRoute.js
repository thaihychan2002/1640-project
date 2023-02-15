import React, { useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { fetchUserByID } from "../../api/index";
import { Navigate } from "react-router-dom";
import { Store } from "../../Store";
export default function UserRoute({ children }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [navigate, setNavigate] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem("userInfo");
      let userID = jwtDecode(token)._id;
      if (userID) {
        try {
          const { data } = await fetchUserByID(userID);
          ctxDispatch({ type: "GET_USER", payload: data });
          token ? setNavigate(children) : setNavigate(<Navigate to="/login" />);
        } catch (err) {
          toast.error(getError(err));
        }
      }
      return;
    };
    fetchUser();
  }, [children, ctxDispatch]);
  return navigate;
}
