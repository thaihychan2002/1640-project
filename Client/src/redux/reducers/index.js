import { combineReducers } from "redux";
import posts from './posts.js'
import modal from './modal.js'
import departments from './departments.js'
export default combineReducers({
    posts,modal,departments
});