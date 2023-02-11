import axios from "axios";

export const URL = "http://localhost:5000";
export const fetchPosts = () => axios.get(`${URL}/posts`);
