import { combineReducers } from "redux";
import posts from "./posts.js";
import allPosts from "./allPosts.js";
import modal from "./modal.js";
import departments from "./departments.js";
import topics from "./topics.js";
import comments from "./comments.js";
import subcomments from "./subcomments.js";
import category from "./category.js";
export default combineReducers({
  posts,
  modal,
  departments,
  category,
  topics,
  allPosts,
  comments,
  subcomments,
});
