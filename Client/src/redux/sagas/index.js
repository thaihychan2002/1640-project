import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";
import { toast } from "react-toastify";
import { getError } from "../../utils";

//post
function* fetchPostSaga(action) {
  try {
    let posts;
    if (action.payload === "recently") {
      posts = yield call(api.fetchRecentlyPosts);
    } else if (action.payload === "mostViews") {
      posts = yield call(api.fetchPostsByMostViews);
    } else if (action.payload === "mostLikes") {
      posts = yield call(api.fetchPostsByMostLikes);
    }
    yield put(actions.getPosts.getPostsSuccess(posts?.data));
  } catch (err) {
    yield put(actions.getPosts.getPostsFailure(err));
    toast.error(getError(err));
  }
}
function* fetchAllPostsSaga(action) {
  try {
    const allPosts = yield call(api.fetchPosts);
    yield put(actions.getAllPosts.getAllPostsSuccess(allPosts?.data));
  } catch (err) {
    yield put(actions.getAllPosts.getAllPostsFailure(err));
    toast.error(getError(err));
  }
}
function* createPostSaga(action) {
  try {
    const posts = yield call(api.createPosts, action.payload);
    toast.success(
      "Created idea successfully. Please wait for Admin to accept your idea"
    );
    yield put(actions.createPosts.createPostsSuccess(posts.data));
  } catch (err) {
    yield put(actions.createPosts.createPostsFailure(err));
    toast.error(getError(err));
  }
}
function* updatePostSaga(action) {
  try {
    const updatedPost = yield call(api.updatePosts, action.payload);
    yield put(actions.updatePosts.updatePostsSuccess(updatedPost.data));
    toast.success(
      "Updated post successfully. Wait for Admin to review again your idea"
    );
  } catch (err) {
    console.log(err);
    yield put(actions.updatePosts.updatePostsFailure(err));
    toast.error(getError(err));
  }
}
function* updatePostLikeSaga(action) {
  try {
    const updatedPostLike = yield call(api.updatePostsLike, action.payload);
    yield put(
      actions.updatePostsLike.updatePostsLikeSuccess(updatedPostLike.data)
    );
  } catch (err) {
    console.log(err);
    yield put(actions.updatePosts.updatePostsFailure(err));
    toast.error(getError(err));
  }
}
function* updatePostAcceptSaga(action) {
  try {
    const updatedPost = yield call(api.acceptPost, action.payload);
    yield put(
      actions.updatePostAccept.updatePostAcceptSuccess(updatedPost.data)
    );
    toast.success("Update post to accepted successfully");
  } catch (err) {
    yield put(actions.updatePostAccept.updatePostAcceptFailure(err));
    toast.error(err);
  }
}
function* updatePostRejectSaga(action) {
  try {
    const updatedPost = yield call(api.rejectPost, action.payload);
    yield put(
      actions.updatePostReject.updatePostRejectSuccess(updatedPost.data)
    );
    toast.success("Update post to rejected successfully");
  } catch (err) {
    yield put(actions.updatePostReject.updatePostRejectFailure(err));
    // toast.error(getError(err));
    console.log(err);
  }
}
function* deletePostSaga(action) {
  try {
    const deletedPost = yield call(api.deletePosts, action.payload);
    yield put(actions.deletePosts.deletePostsSuccess(deletedPost.data));
    toast.success("Delete post successfully");
  } catch (err) {
    yield put(actions.deletePosts.deletePostsFailure(err));
    toast.error(getError(err));
  }
}
function* deletePostByAdminSaga(action) {
  try {
    const deletedPost = yield call(api.deletePostByAdmin, action.payload);
    yield put(
      actions.deletePostByAdmin.deletePostSuccessByAdmin(deletedPost.data)
    );
    toast.success("Delete post successfully");
  } catch (err) {
    console.log(err);
    yield put(actions.deletePostByAdmin.deletePostFailureByAdmin(err));
    toast.error(getError(err));
  }
}
//department
function* fetchDepartmentSaga(action) {
  try {
    const departments = yield call(api.fetchDepartments);
    yield put(actions.getDepartments.getDepartmentsSuccess(departments.data));
  } catch (err) {
    yield put(actions.getDepartments.getDepartmentsFailure(err));
    toast.error(getError(err));
  }
}
function* createDepartmentSaga(action) {
  try {
    const departments = yield call(api.createDepartments, action.payload);
    yield put(
      actions.createDepartments.createDepartmentsSuccess(departments.data)
    );
    toast.success("Created department successfully");
  } catch (err) {
    yield put(actions.createDepartments.createDepartmentsFailure(err));
    toast.error(getError(err));
  }
}
function* updateDepartmentSaga(action) {
  try {
    const departments = yield call(api.updateDepartments, action.payload);
    yield put(
      actions.updateDepartments.updateDepartmentsSuccess(departments.data)
    );
    toast.success("Updated department successfully");
  } catch (err) {
    yield put(actions.updateDepartments.updateDepartmentsFailure(err));
    toast.error(getError(err));
  }
}
function* deleteDepartmentSaga(action) {
  try {
    const departments = yield call(api.deleteDepartments, action.payload);
    yield put(
      actions.deleteDepartments.deleteDepartmentsSuccess(departments.data)
    );
    toast.success("Deleted department successfully");
  } catch (err) {
    yield put(actions.deleteDepartments.deleteDepartmentsFailure(err));
    toast.error(getError(err));
  }
}
//category
function* fetchCategorySaga(action) {
  try {
    const categories = yield call(api.fetchCategory);
    yield put(actions.getCategory.getCategorySuccess(categories.data));
  } catch (err) {
    yield put(actions.getCategory.getCategoryFailure(err));
    toast.error(getError(err));
  }
}

function* createCategorySaga(action) {
  try {
    const categories = yield call(api.createCategory, action.payload);
    yield put(actions.createCategory.createCategorySuccess(categories.data));
    toast.success("Created category successfully");
  } catch (err) {
    yield put(actions.createCategory.createCategoryFailure(err));
    toast.error(getError(err));
  }
}

function* updateCategorySaga(action) {
  try {
    const categories = yield call(api.updateCategory, action.payload);
    yield put(actions.updateCategory.updateCategorySuccess(categories.data));
    toast.success("Updated category successfully");
  } catch (err) {
    yield put(actions.updateCategory.updateCategoryFailure(err));
    toast.error(getError(err));
  }
}

function* deleteCategorySaga(action) {
  try {
    const categories = yield call(api.deleteCategory, action.payload);
    yield put(actions.deleteCategory.deleteCategorySuccess(categories.data));
    toast.success("Deleted category successfully");
  } catch (err) {
    yield put(actions.deleteCategory.deleteCategoryFailure(err));
    toast.error(getError(err));
  }
}

// topic
function* fetchTopicSaga(action) {
  try {
    const topics = yield call(api.fetchTopics);
    yield put(actions.getTopics.getTopicsSuccess(topics.data));
  } catch (err) {
    yield put(actions.getTopics.getTopicsFailure(err));
    toast.error(getError(err));
  }
}
function* createTopicSaga(action) {
  try {
    const topics = yield call(api.createTopics, action.payload);
    yield put(actions.createTopics.createTopicsSuccess(topics.data));
    toast.success("Created topic successfully");
  } catch (err) {
    yield put(actions.createTopics.createTopicsFailure(err));
    toast.error(getError(err));
  }
}
function* updateTopicSaga(action) {
  try {
    const topics = yield call(api.updateTopics, action.payload);
    yield put(actions.updateTopics.updateTopicsSuccess(topics.data));
    toast.success("Updated topic successfully");
  } catch (err) {
    yield put(actions.updateTopics.updateTopicsFailure(err));
    toast.error(getError(err));
  }
}
function* updateTopicStatusSaga(action) {
  try {
    const topics = yield call(api.updateTopicStatus, action.payload);
    yield put(actions.updateTopicStatus.updateTopicStatusSuccess(topics.data));
  } catch (err) {
    yield put(actions.updateTopics.updateTopicsFailure(err));
    toast.error(getError(err));
  }
}
function* deleteTopicSaga(action) {
  try {
    const topics = yield call(api.deleteTopics, action.payload);
    yield put(actions.deleteTopics.deleteTopicsSuccess(topics.data));
    toast.success("Deleted topic successfully");
  } catch (err) {
    yield put(actions.deleteTopics.deleteTopicsFailure(err));
    toast.error(getError(err));
  }
}
// Comment
function* fetchConditionCmtSaga(action) {
  try {
    let comments;
    if (action.payload.status === "recently") {
      comments = yield call(api.fetchRecentlyCmts);
    } else if (action.payload.status === "mostLikes") {
      comments = yield call(api.fetchCmtsByMostLikes);
    }
    yield put(actions.getConditionCmts.getCmtsSuccess(comments?.data));
  } catch (err) {
    yield put(actions.getConditionCmts.getCmtsFailure(err));
    toast.error(getError(err));
  }
}
function* fetchCommentSaga(action) {
  try {
    const comments = yield call(api.fetchComments, action.payload);
    yield put(actions.getComments.getCommentsSuccess(comments.data));
  } catch (err) {
    yield put(actions.getComments.getCommentsFailure(err));
    toast.error(getError(err));
  }
}
function* createCommentSaga(action) {
  try {
    const comments = yield call(api.createComments, action.payload);
    yield put(actions.createComments.createCommentsSuccess(comments.data));
    toast.success("Created comment successfully");
  } catch (err) {
    yield put(actions.createComments.createCommentsFailure(err));
    toast.error(getError(err));
  }
}
function* updateCommentSaga(action) {
  try {
    const comments = yield call(api.updateComments, action.payload);
    yield put(actions.updateComments.updateCommentsSuccess(comments.data));
    toast.success("Updated comment successfully");
  } catch (err) {
    yield put(actions.updateComments.updateCommentsFailure(err));
    toast.error(getError(err));
  }
}
function* deleteCommentSaga(action) {
  try {
    const comments = yield call(api.deleteComments, action.payload);
    yield put(actions.deleteComments.deleteCommentsSuccess(comments.data));
    toast.success("Deleted comment successfully");
  } catch (err) {
    yield put(actions.deleteComments.deleteCommentsFailure(err));
    toast.error(getError(err));
  }
}
// Subcomment
function* fetchSubcommentSaga(action) {
  try {
    const subcomments = yield call(api.fetchSubcomments, action.payload);
    yield put(actions.getSubcomments.getSubcommentsSuccess(subcomments.data));
  } catch (err) {
    yield put(actions.getSubcomments.getSubcommentsFailure(err));
    toast.error(getError(err));
  }
}
function* createSubcommentSaga(action) {
  try {
    const subcomments = yield call(api.createSubcomments, action.payload);
    yield put(
      actions.createSubcomments.createSubcommentsSuccess(subcomments.data)
    );
    toast.success("Comment replied");
  } catch (err) {
    yield put(actions.createSubcomments.createSubcommentsFailure(err));
    toast.error(getError(err));
  }
}
function* updateSubcommentSaga(action) {
  try {
    const subcomments = yield call(api.updateSubcomments, action.payload);
    yield put(
      actions.updateSubcomments.updateSubcommentsSuccess(subcomments.data)
    );
    toast.success("Updated reply successfully");
  } catch (err) {
    yield put(actions.updateSubcomments.updateSubcommentsFailure(err));
    toast.error(getError(err));
  }
}
function* deleteSubcommentSaga(action) {
  try {
    const subcomments = yield call(api.deleteSubcomments, action.payload);
    yield put(
      actions.deleteSubcomments.deleteSubcommentsSuccess(subcomments.data)
    );
    toast.success("Deleted reply successfully");
  } catch (err) {
    yield put(actions.deleteSubcomments.deleteSubcommentsFailure(err));
    toast.error(getError(err));
  }
}
function* mysaga() {
  //post
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
  yield takeLatest(actions.getAllPosts.getAllPostsRequest, fetchAllPostsSaga);
  yield takeLatest(actions.updatePosts.updatePostsRequest, updatePostSaga);
  yield takeLatest(
    actions.updatePostsLike.updatePostsLikeRequest,
    updatePostLikeSaga
  );
  yield takeLatest(
    actions.updatePostAccept.updatePostAcceptRequest,
    updatePostAcceptSaga
  );
  yield takeLatest(
    actions.updatePostReject.updatePostRejectRequest,
    updatePostRejectSaga
  );
  yield takeLatest(actions.createPosts.createPostsRequest, createPostSaga);
  yield takeLatest(actions.deletePosts.deletePostsRequest, deletePostSaga);
  yield takeLatest(
    actions.deletePostByAdmin.deletePostRequestByAdmin,
    deletePostByAdminSaga
  );
  //department
  yield takeLatest(
    actions.getDepartments.getDepartmentsRequest,
    fetchDepartmentSaga
  );
  yield takeLatest(
    actions.createDepartments.createDepartmentsRequest,
    createDepartmentSaga
  );
  yield takeLatest(
    actions.deleteDepartments.deleteDepartmentsRequest,
    deleteDepartmentSaga
  );
  yield takeLatest(
    actions.updateDepartments.updateDepartmentsRequest,
    updateDepartmentSaga
  );
  //category
  yield takeLatest(actions.getCategory.getCategoryRequest, fetchCategorySaga);
  yield takeLatest(
    actions.createCategory.createCategoryRequest,
    createCategorySaga
  );
  yield takeLatest(
    actions.deleteCategory.deleteCategoryRequest,
    deleteCategorySaga
  );
  yield takeLatest(
    actions.updateCategory.updateCategoryRequest,
    updateCategorySaga
  );
  //topic
  yield takeLatest(actions.getTopics.getTopicsRequest, fetchTopicSaga);
  yield takeLatest(actions.createTopics.createTopicsRequest, createTopicSaga);
  yield takeLatest(actions.deleteTopics.deleteTopicsRequest, deleteTopicSaga);
  yield takeLatest(actions.updateTopics.updateTopicsRequest, updateTopicSaga);
  yield takeLatest(
    actions.updateTopicStatus.updateTopicStatusRequest,
    updateTopicStatusSaga
  );
  //Comment
  yield takeLatest(
    actions.getConditionCmts.getCmtsRequest,
    fetchConditionCmtSaga
  );
  yield takeLatest(actions.getComments.getCommentsRequest, fetchCommentSaga);
  yield takeLatest(
    actions.createComments.createCommentsRequest,
    createCommentSaga
  );
  yield takeLatest(
    actions.deleteComments.deleteCommentsRequest,
    deleteCommentSaga
  );
  yield takeLatest(
    actions.updateComments.updateCommentsRequest,
    updateCommentSaga
  );
  //Subcomment
  yield takeLatest(
    actions.getSubcomments.getSubcommentsRequest,
    fetchSubcommentSaga
  );
  yield takeLatest(
    actions.createSubcomments.createSubcommentsRequest,
    createSubcommentSaga
  );
  yield takeLatest(
    actions.deleteSubcomments.deleteSubcommentsRequest,
    deleteSubcommentSaga
  );
  yield takeLatest(
    actions.updateSubcomments.updateSubcommentsRequest,
    updateSubcommentSaga
  );
}
export default mysaga;
