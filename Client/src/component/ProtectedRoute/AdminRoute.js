import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../Store";
import jwtDecode from "jwt-decode";
import { fetchUserByID } from "../../api/index.js";
export default function AdminRoute({ children }) {
  const [navigate, setNavigate] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem("userInfo");
      let userID = jwtDecode(token)._id;
      if (userID) {
        try {
          const { data } = await fetchUserByID(userID);
          data.role === "Admin"
            ? setNavigate(children)
            : setNavigate(<Navigate to="/" />);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUser();
  }, [children]);
  return navigate;
}
