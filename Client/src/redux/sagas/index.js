import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { useDispatch } from "react-redux";
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
// category
function* fetchCategorySaga(action) {
  try {
    const categories = yield call(api.fetchCategories);
    yield put(actions.getCategories.getCategoriesSuccess(categories.data));
  } catch (err) {
    yield put(actions.getCategories.getCategoriesFailure(err));
    toast.error(getError(err));
  }
}
function* createCategorySaga(action) {
  try {
    const categories = yield call(api.createCategories, action.payload);
    yield put(
      actions.createCategories.createCategoriesSuccess(categories.data)
    );
    toast.success("Created category successfully");
  } catch (err) {
    yield put(actions.createCategories.createCategoriesFailure(err));
    toast.error(getError(err));
  }
}
function* updateCategorySaga(action) {
  try {
    const categories = yield call(api.updateCategories, action.payload);
    yield put(
      actions.updateCategories.updateCategoriesSuccess(categories.data)
    );
    toast.success("Updated category successfully");
  } catch (err) {
    yield put(actions.updateCategories.updateCategoriesFailure(err));
    toast.error(getError(err));
  }
}
function* deleteCategorySaga(action) {
  try {
    const categories = yield call(api.deleteCategories, action.payload);
    yield put(
      actions.deleteCategories.deleteCategoriesSuccess(categories.data)
    );
    toast.success("Deleted category successfully");
  } catch (err) {
    yield put(actions.deleteCategories.deleteCategoriesFailure(err));
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
function* mysaga() {
  //post
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
  yield takeLatest(actions.getAllPosts.getAllPostsRequest, fetchAllPostsSaga);
  yield takeLatest(actions.updatePosts.updatePostsRequest, updatePostSaga);
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
  yield takeLatest(
    actions.getCategories.getCategoriesRequest,
    fetchCategorySaga
  );
  yield takeLatest(
    actions.createCategories.createCategoriesRequest,
    createCategorySaga
  );
  yield takeLatest(
    actions.deleteCategories.deleteCategoriesRequest,
    deleteCategorySaga
  );
  yield takeLatest(
    actions.updateCategories.updateCategoriesRequest,
    updateCategorySaga
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
}
export default mysaga;
