import axios from "axios";

export const URL = "http://localhost:5000";
// posts
export const fetchPosts = () => axios.get(`${URL}/posts`);
export const createPosts = (payload) => axios.post(`${URL}/posts/create`,payload);
export const updatePosts = (payload) => axios.post(`${URL}/posts/update`,payload);
// department
export const fetchDepartments = () => axios.get(`${URL}/departments`);

// users
export const fetchUserByID = (userID) =>
  axios.get(`${URL}/users/getUserById/${userID}`);
export const loginUser = (email, password) =>
  axios.post(`${URL}/users/login/`, { email, password });
export const loginGoogleUser = (email, fullName, avatar) =>
  axios.post(`${URL}/users/google/login/`, { email, fullName, avatar });

export const registerUser = (fullName, email, password) =>
  axios.post(`${URL}/users/register/`, { fullName, email, password });
export const registerGoogleUser = (fullName, email, avatar, password) =>
  axios.post(`${URL}/users/google/register`, {
    fullName,
    email,
    avatar,
    password,
  });
