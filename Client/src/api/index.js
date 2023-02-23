import axios from "axios";
import { URL, token } from "./config.js";

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
  axiosInstance.put(`/posts/update`, payload);
export const deletePosts = (payload) =>
  axiosInstance.delete(`/posts/delete/${payload}`, payload);

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

// fetch usertoken
export const fetchUsers = () => axiosInstance.get(`/users`);
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
  axiosInstance.put(`/users/updateUser/${userID}`, { role });
export const updateUserProfile = (userID, fullName, data) =>
  axiosInstance.put(`/users/updateUserProfile/${userID}`, {
    fullName,
    data,
  });
//delete user
export const deleteUser = (userID) =>
  axiosInstance.delete(`/users/deleteUser/${userID}`);
