import axios from "axios";

export const URL = "http://localhost:5000";
export const token = localStorage.getItem("userInfo");
// posts
export const fetchPosts = () =>
  axios.get(`${URL}/posts`, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const createPosts = (payload) =>
  axios.post(`${URL}/posts/create`, payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const updatePosts = (payload) =>
  axios.post(`${URL}/posts/update`, payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const deletePosts = (payload) =>
  axios.post(`${URL}/posts/delete`, payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
// department
export const fetchDepartments = () =>
  axios.get(`${URL}/departments`, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const createDepartments = (payload) =>
  axios.post(`${URL}/departments/create`,payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const updateDepartments = (payload) =>
  axios.post(`${URL}/departments/update`, payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const deleteDepartments = (payload) =>
  axios.post(`${URL}/departments/delete/${payload}`,payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
// category
export const fetchCategories = () =>
  axios.get(`${URL}/s`, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const createCategories = (payload) =>
  axios.post(`${URL}/categories/create`,payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const updateCategories = (payload) =>
  axios.post(`${URL}/categories/update`,payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const deleteCategories = (payload) =>
  axios.post(`${URL}/categories/delete`, payload,{
    headers: { Authorization: `Bearer ${token} ` },
  });
// fetch usertoken
export const fetchUsers = () =>
  axios.get(`${URL}/users/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
// update user
export const updateUser = (userID, role) =>
  axios.put(
    `${URL}/users/updateUser/${userID}`,
    { role },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
export const updateUserProfile = (userID, fullName, data) =>
  axios.put(
    `${URL}/users/updateUserProfile/${userID}`,
    { fullName, data },
    { headers: { Authorization: `Bearer ${token}` } }
  );
//delete user
export const deleteUser = (userID) =>
  axios.delete(`${URL}/users/deleteUser/${userID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
