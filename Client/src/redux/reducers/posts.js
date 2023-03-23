import { INIT_STATE } from "../../constant";
import {
  createPosts,
  getPosts,
  getType,
  updatePosts,
  deletePosts,
  updatePostAccept,
  updatePostReject,
  deletePostByAdmin,
  updatePostsLike,
  viewPostsByTopics,
  viewPostsByDepartment,
  viewPostsBySlug,
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
        data: state.data?.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case getType(updatePostsLike.updatePostsLikeSuccess):
      return {
        ...state,
        data: state.data?.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        topicview: state.topicview?.map((post) => post._id === action.payload._id ? action.payload : post),
        departmentview: state.departmentview?.map((post) => post._id === action.payload._id ? action.payload : post),
        detailed: state.detailed?.map((post) => post._id === action.payload._id ? action.payload : post)
      };
    case getType(updatePostAccept.updatePostAcceptSuccess):
      const newDataUpdate = state?.data?.filter((post) => {
        return post._id !== action.payload._id;
      });
      return {
        ...state,
        data: newDataUpdate,
      };
    case getType(updatePostReject.updatePostRejectSuccess):
      const newDataReject = state?.data?.filter((post) => {
        return post._id !== action.payload._id;
      });
      return {
        ...state,
        data: newDataReject,
      };
    case getType(deletePosts.deletePostsSuccess):
      const newData = state?.data?.filter((post) => {
        return post._id !== action.payload._id;
      });
      return {
        ...state,
        data: newData,
      };

    case getType(deletePostByAdmin.deletePostSuccessByAdmin):
      const newDataDelete = state?.data?.filter((post) => {
        return post._id !== action.payload._id;
      });
      return {
        ...state,
        data: newDataDelete,
      };
    case getType(viewPostsByTopics.viewPostRequestByTopics):
      return {
        ...state,
        isLoading: true,
      };
    case getType(viewPostsByTopics.viewPostSuccessByTopics):
      return {
        ...state,
        isLoading: false,
        topicview: action.payload,
      };
    case getType(viewPostsByDepartment.viewPostRequestByDepartment):
      return {
        ...state,
        isLoading: true,
      };
    case getType(viewPostsByDepartment.viewPostSuccessByDepartment):
      return {
        ...state,
        isLoading: false,
        departmentview: action.payload,
      };
    case getType(viewPostsBySlug.viewPostRequestBySlug):
      return {
        ...state,
        isLoading: true,
      };
    case getType(viewPostsBySlug.viewPostSuccessBySlug):
      return {
        ...state,
        isLoading: false,
        detailed: [action.payload],
      };
    default:
      return state;
  }
}
