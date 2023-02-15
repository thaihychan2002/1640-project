import axios from "axios";

export const URL = "http://localhost:5000";
// posts
export const fetchPosts = () => axios.get(`${URL}/posts`);

// fetch user
export const fetchUsers = (token) =>
  axios.get(`${URL}/users/`, { headers: { Authorization: `Bearer ${token}` } });
export const fetchUserByID = (userID) =>
  axios.get(`${URL}/users/getUserById/${userID}`);
//login user
export const loginUser = (email, password) =>
  axios.post(`${URL}/users/login/`, { email, password });
export const loginGoogleUser = (email, fullName, avatar) =>
  axios.post(`${URL}/users/google/login/`, { email, fullName, avatar });
//register user
export const registerUser = (fullName, email, password) =>
  axios.post(`${URL}/users/register/`, { fullName, email, password });
export const registerGoogleUser = (fullName, email, avatar, password) =>
  axios.post(`${URL}/users/google/register`, {
    fullName,
    email,
    avatar,
    password,
  });
//delete user
export const deleteUser = (userID, token) =>
  axios.delete(`${URL}/users/deleteUser/${userID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
