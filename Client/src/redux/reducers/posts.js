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
<<<<<<< HEAD
      case getType(deletePosts.deletePostsSuccess):
        const newData =state.data.filter((post)=>{ return post._id !== action.payload._id});
        console.log(newData)
        return {
            ...state,
            data: newData,
        };
=======
    case getType(deletePosts.deletePostsSuccess):
      return {
        ...state,
        // data: state.data.map((post) =>
        //    action.payload._id ? action.payload : [...state.data]
        // ),
      };
>>>>>>> c8c199e155fdd253558a7cd53153a5f6e045abfd
    default:
      return state;
  }
}
