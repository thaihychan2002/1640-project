import axios from "axios";
import { URL, token } from "./config.js";
// import jwtDecode from "jwt-decode";

// // export const userID = () =>jwtDecode(token)._id;
// export const userID = () => {
//   if (token) return jwtDecode(token)._id;
// };
//config axios
const axiosInstance = axios.create({
  baseURL: URL,
});
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// posts
export const fetchPosts = () => axiosInstance.get(`/posts`);
export const createPosts = (payload) =>
  axiosInstance.post(`/posts/create`, payload);
export const updatePosts = (payload) =>
<<<<<<< HEAD
  axios.put(`${URL}/posts/update`, payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const deletePosts = (payload) =>
  axios.delete(`${URL}/posts/delete/${payload}`, payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
=======
  axiosInstance.put(`/posts/update`, payload);
export const deletePosts = (payload) =>
  axiosInstance.delete(`/posts/delete/${payload}`, payload);

// view posts
export const fetchPostsByMostViews = () =>
  axiosInstance.get("/posts/viewPostsByMostViews");
export const fetchPostsByMostLikes = () =>
  axiosInstance.get("/posts/viewPostsByMostLikes");
export const fetchRecentlyPosts = () =>
  axiosInstance.get("/posts/viewRecentlyPosts");
export const fetchPostsByDepartment = () =>
  axiosInstance.get("/posts/viewPostsByDepartment/:department");
//search posts
export const searchPostsByKeyword = () =>
  axiosInstance.get("/posts/search/:keyword");

>>>>>>> c8c199e155fdd253558a7cd53153a5f6e045abfd
// department
export const fetchDepartments = () => axiosInstance.get(`/departments`);
export const createDepartments = (payload) =>
  axiosInstance.post(`/departments/create`, payload);
export const updateDepartments = (payload) =>
<<<<<<< HEAD
  axios.put(`${URL}/departments/update`, payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const deleteDepartments = (payload) =>
  axios.delete(`${URL}/departments/delete/${payload}`,payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
=======
  axiosInstance.put(`/departments/update`, payload);
export const deleteDepartments = (payload) =>
  axiosInstance.delete(`/departments/delete/${payload}`, payload);

>>>>>>> c8c199e155fdd253558a7cd53153a5f6e045abfd
// category
export const fetchCategories = () => axiosInstance.get(`/categories`);
export const createCategories = (payload) =>
  axiosInstance.post(`/categories/create`, payload);
export const updateCategories = (payload) =>
<<<<<<< HEAD
  axios.put(`${URL}/categories/update`,payload, {
    headers: { Authorization: `Bearer ${token} ` },
  });
export const deleteCategories = (payload) =>
  axios.delete(`${URL}/categories/delete/${payload}`,payload ,{
    headers: { Authorization: `Bearer ${token} ` },
  });
=======
  axiosInstance.put(`/categories/update`, payload);
export const deleteCategories = (payload) =>
  axiosInstance.delete(`/categories/delete/${payload}`, payload);

>>>>>>> c8c199e155fdd253558a7cd53153a5f6e045abfd
// fetch usertoken
export const fetchUsers = () => axiosInstance.get(`/users`);
export const fetchUserByID = (userID) =>
  axiosInstance.post(`/users/getUserById/`, { userID });
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
  axiosInstance.put(`/users/updateUser/`, { role, userID });
export const updateUserProfile = (userID, fullName, data) =>
  axiosInstance.put(`/users/updateUserProfile/`, {
    fullName,
    data,
    userID,
  });
//delete user
export const deleteUser = (userID) =>
  axiosInstance.delete(`/users/deleteUser/`, { userID });
