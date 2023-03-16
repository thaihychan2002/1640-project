import axios from "axios";
import { URL, token } from "./config.js";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const forgotPassword = (email) =>
  axios.post(`${URL}/users/forgot-password`, { email });
export const resetPassword = (token, newPassword) =>
  axios.post(`${URL}/users/reset-password`, { token, newPassword });
export const refresh = () =>
  axios.get(`${URL}/users/refresh`, { withCredentials: true });
// posts
export const fetchPosts = () => axiosInstance.get(`/posts`);
export const fetchPostBySlug = (slug) =>
  axiosInstance.get(`/posts/idea/${slug}`);
export const createPosts = (payload) =>
  axiosInstance.post(`/posts/create`, payload);
export const updatePosts = (payload) =>
  axiosInstance.put(`/posts/update`, payload);
export const countViewBySlug = (slug) =>
  axiosInstance.put("/posts/countView", { slug: slug });
export const deletePosts = (payload) =>
  axiosInstance.delete(`/posts/delete/${payload}`, payload);
export const deletePostByAdmin = (payload) =>
  axiosInstance.delete(`/posts/deletePost/${payload}`, payload);

// view posts
export const fetchPostsByMostViews = () =>
  axiosInstance.get("/posts/viewPostsByMostViews");
export const fetchPostsByMostLikes = () =>
  axiosInstance.get("/posts/viewPostsByMostLikes");
export const fetchRecentlyPosts = () =>
  axiosInstance.get("/posts/viewRecentlyPosts");
export const fetchPostsByDepartment = (departmentID) =>
  axiosInstance.post("/posts/viewPostsByDepartment/", { id: departmentID });
export const fetchPostsByCategory = (categoryID) =>
  axiosInstance.post("/posts/viewPostsByCategory/", { id: categoryID });
//search posts
export const searchPostsByKeyword = (keyword) =>
  axiosInstance.get(`/posts/search/${keyword}`);
// post status
export const acceptPost = (payload) =>
  axiosInstance.put("/posts/accept", payload);
export const rejectPost = (payload) =>
  axiosInstance.put("/posts/reject", payload);
//download csv and zip
export const downloadCSV = () =>
  axiosInstance.get("/posts/export", { responseType: "blob" });

export const downloadZip = (postID) =>
  axiosInstance.post(
    "/posts/download",
    { _id: postID },
    { responseType: "blob" }
  );

//role
export const fetchRoles = () => axiosInstance.get("/roles");
export const createRole = (name) =>
  axiosInstance.post("/roles/create", { name });
export const deleteRole = (id) => axiosInstance.delete(`/roles/delete/${id}`);
export const updateRole = () => axiosInstance.put("/roles/update");
// department
export const fetchDepartments = () => axiosInstance.get(`/departments`);
export const createDepartments = (payload) =>
  axiosInstance.post(`/departments/create`, payload);
export const updateDepartments = (payload) =>
  axiosInstance.put(`/departments/update`, payload);
export const deleteDepartments = (payload) =>
  axiosInstance.delete(`/departments/delete/${payload}`, payload);

// category
export const fetchCategories = () => axiosInstance.get(`/categories`);
export const createCategories = (payload) =>
  axiosInstance.post(`/categories/create`, payload);
export const updateCategories = (payload) =>
  axiosInstance.put(`/categories/update`, payload);
export const deleteCategories = (payload) =>
  axiosInstance.delete(`/categories/delete/${payload}`, payload);

// comment
export const fetchComments = (payload) =>
  axiosInstance.post(`/comments`, payload);
export const createComments = (payload) =>
  axiosInstance.post(`/comments/create`, payload);
export const updateComments = (payload) =>
  axiosInstance.put(`/comments/update`, payload);
export const deleteComments = (payload) =>
  axiosInstance.delete(`/comments/delete/${payload}`, payload);
// view comments
export const fetchCmtsByMostLikes = (payload) =>
  axiosInstance.post("/comments/viewCommentsByMostLikes", payload);
export const fetchRecentlyCmts = (payload) =>
  axiosInstance.post("/comments/viewRecentlyComments", payload);

// fetch usertoken
export const fetchUsers = () => axiosInstance.get(`/users`);
export const fetchUserByID = (userID) =>
  axiosInstance.post(`/users/getUserById/`, { userID });

//logout user
export const logout = () => axiosInstance.post(`/users/logout`);
//login user
export const loginUser = (email, password) =>
  axios.post(
    `${URL}/users/login/`,
    { email, password },
    { withCredentials: true }
  );
export const loginGoogleUser = (email, fullName, avatar) =>
  axios.post(
    `${URL}/users/google/login/`,
    { email, fullName, avatar },
    { withCredentials: true }
  );
//register user
export const registerUser = (fullName, email, password, roleUser, department) =>
  axios.post(`${URL}/users/register/`, {
    fullName,
    email,
    password,
    roleUser,
    department,
  });
export const registerGoogleUser = (fullName, email, avatar, password) =>
  axios.post(`${URL}/users/google/register`, {
    fullName,
    email,
    avatar,
    password,
  });
// update user
export const updateUser = (userID, roleID, departmentID) =>
  axiosInstance.put(`/users/updateUser/`, { userID, roleID, departmentID });
export const updateUserProfile = (userID, fullName, data) =>
  axiosInstance.put(`/users/updateUserProfile/`, {
    fullName,
    data,
    userID,
  });
export const changePasswordUser = (userID, oldPassword, newPassword) =>
  axiosInstance.put("/users/changePassword", {
    userID,
    oldPassword,
    newPassword,
  });
//delete user

export const deleteUser = (userID) =>
  axiosInstance.delete(`/users/deleteUser/${userID}`);
