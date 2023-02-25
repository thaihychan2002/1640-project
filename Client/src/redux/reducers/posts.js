import { INIT_STATE } from "../../constant";
import {
  createPosts,
  getPosts,
  getType,
  updatePosts,
  deletePosts,
} from "../actions";

export default function postsReducers(state = INIT_STATE.posts, action) {
  switch (action.type) {
    case getType(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPosts.getPostsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPosts.getPostsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createPosts.createPostsSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updatePosts.updatePostsSuccess):
      return {
        ...state,
        data: state.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case getType(deletePosts.deletePostsSuccess):
      return {
        ...state,
        // data: state.data.map((post) =>
        //    action.payload._id ? action.payload : [...state.data]
        // ),
      };
    default:
      return state;
  }
}
