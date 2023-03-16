import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
//post
export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (err) => err,
});
export const getAllPosts = createActions({
  getAllPostsRequest: undefined,
  getAllPostsSuccess: (payload) => payload,
  getAllPostsFailure: (err) => err,
});
export const createPosts = createActions({
  createPostsRequest: (payload) => payload,
  createPostsSuccess: (payload) => payload,
  createPostsFailure: (err) => err,
});
export const updatePosts = createActions({
  updatePostsRequest: (payload) => payload,
  updatePostsSuccess: (payload) => payload,
  updatePostsFailure: (err) => err,
});
export const updatePostsLike = createActions({
  updatePostsLikeRequest: (payload) => payload,
  updatePostsLikeSuccess: (payload) => payload,
  updatePostsLikeFailure: (err) => err,
});
export const updatePostAccept = createActions({
  updatePostAcceptRequest: (payload) => payload,
  updatePostAcceptSuccess: (payload) => payload,
  updatePostAcceptFailure: (err) => err,
});
export const updatePostReject = createActions({
  updatePostRejectRequest: (payload) => payload,
  updatePostRejectSuccess: (payload) => payload,
  updatePostRejectFailure: (err) => err,
});
export const deletePosts = createActions({
  deletePostsRequest: (payload) => payload,
  deletePostsSuccess: (payload) => payload,
  deletePostsFailure: (err) => err,
});
export const deletePostByAdmin = createActions({
  deletePostRequestByAdmin: (payload) => payload,
  deletePostSuccessByAdmin: (payload) => payload,
  deletePostFailureByAdmin: (err) => err,
});
//department
export const getDepartments = createActions({
  getDepartmentsRequest: undefined,
  getDepartmentsSuccess: (payload) => payload,
  getDepartmentsFailure: (err) => err,
});
export const createDepartments = createActions({
  createDepartmentsRequest: (payload) => payload,
  createDepartmentsSuccess: (payload) => payload,
  createDepartmentsFailure: (err) => err,
});
export const updateDepartments = createActions({
  updateDepartmentsRequest: (payload) => payload,
  updateDepartmentsSuccess: (payload) => payload,
  updateDepartmentsFailure: (err) => err,
});
export const deleteDepartments = createActions({
  deleteDepartmentsRequest: (payload) => payload,
  deleteDepartmentsSuccess: (payload) => payload,
  deleteDepartmentsFailure: (err) => err,
});
//topic
export const getTopics = createActions({
  getTopicsRequest: undefined,
  getTopicsSuccess: (payload) => payload,
  getTopicsFailure: (err) => err,
});
export const createTopics = createActions({
  createTopicsRequest: (payload) => payload,
  createTopicsSuccess: (payload) => payload,
  createTopicsFailure: (err) => err,
});
export const updateTopics = createActions({
  updateTopicsRequest: (payload) => payload,
  updateTopicsSuccess: (payload) => payload,
  updateTopicsFailure: (err) => err,
});
export const deleteTopics = createActions({
  deleteTopicsRequest: (payload) => payload,
  deleteTopicsSuccess: (payload) => payload,
  deleteTopicsFailure: (err) => err,
});
export const updateTopicStatus = createActions({
  updateTopicStatusRequest: (payload) => payload,
  updateTopicStatusSuccess: (payload) => payload,
  updateTopicStatusFailure: (err) => err,
});
//comment
export const getConditionCmts = createActions({
  getCmtsRequest: undefined,
  getCmtsSuccess: (payload) => payload,
  getCmtsFailure: (err) => err,
});
export const getComments = createActions({
  getCommentsRequest: (payload) => payload,
  getCommentsSuccess: (payload) => payload,
  getCommentsFailure: (err) => err,
});
export const createComments = createActions({
  createCommentsRequest: (payload) => payload,
  createCommentsSuccess: (payload) => payload,
  createCommentsFailure: (err) => err,
});
export const updateComments = createActions({
  updateCommentsRequest: (payload) => payload,
  updateCommentsSuccess: (payload) => payload,
  updateCommentsFailure: (err) => err,
});
export const deleteComments = createActions({
  deleteCommentsRequest: (payload) => payload,
  deleteCommentsSuccess: (payload) => payload,
  deleteCommentsFailure: (err) => err,
});
//Subcomment
export const getSubcomments = createActions({
  getSubcommentsRequest: (payload) => payload,
  getSubcommentsSuccess: (payload) => payload,
  getSubcommentsFailure: (err) => err,
});
export const createSubcomments = createActions({
  createSubcommentsRequest: (payload) => payload,
  createSubcommentsSuccess: (payload) => payload,
  createSubcommentsFailure: (err) => err,
});
export const updateSubcomments = createActions({
  updateSubcommentsRequest: (payload) => payload,
  updateSubcommentsSuccess: (payload) => payload,
  updateSubcommentsFailure: (err) => err,
});
export const deleteSubcomments = createActions({
  deleteSubcommentsRequest: (payload) => payload,
  deleteSubcommentsSuccess: (payload) => payload,
  deleteSubcommentsFailure: (err) => err,
});
export const showModal = createAction("SHOW_CREATE_POST_MODEL");
export const hideModal = createAction("HIDE_CREATE_POST_MODAL");
