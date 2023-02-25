import { takeLatest, call, put, take } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";
//post
function* fetchPostSaga(action) {
  try {
    const posts = yield call(api.fetchPosts);
    yield put(actions.getPosts.getPostsSuccess(posts.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getPosts.getPostsFailure(err));
  }
}
function* createPostSaga(action) {
  try {
    const posts = yield call(api.createPosts, action.payload);
    yield put(actions.createPosts.createPostsSuccess(posts.data));
  } catch (err) {
    console.log(err);
    yield put(actions.createPosts.createPostsFailure(err));
  }
}
function* updatePostSaga(action) {
  try {
    console.log("updatePostSaga", { action });
    const updatedPost = yield call(api.updatePosts, action.payload);
    console.log("[updatePostSaga - post]", updatedPost);
    yield put(actions.updatePosts.updatePostsSuccess(updatedPost.data));
  } catch (err) {
    console.error(err);
    yield put(actions.updatePosts.updatePostsFailure(err));
  }
}
function* deletePostSaga(action) {
  try {
    console.log("deletePostSaga", { action });
    const deletedPost = yield call(api.deletePosts, action.payload);
    yield put(actions.deletePosts.deletePostsSuccess(deletedPost.data));
  } catch (err) {
    console.error(err);
    yield put(actions.deletePosts.deletePostsFailure(err));
  }
}
//department
function* fetchDepartmentSaga(action) {
  try {
    const departments = yield call(api.fetchDepartments);
    yield put(actions.getDepartments.getDepartmentsSuccess(departments.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getDepartments.getDepartmentsFailure(err));
  }
}
function* createDepartmentSaga(action) {
  try {
    const departments = yield call(api.createDepartments,action.payload);
    yield put(actions.createDepartments.createDepartmentsSuccess(departments.data));
  } catch (err) {
    console.log(err);
    yield put(actions.createDepartments.createDepartmentsFailure(err));
  }
}
function* updateDepartmentSaga(action) {
  try {
    const departments = yield call(api.updateDepartments,action.payload);
    yield put(actions.updateDepartments.updateDepartmentsSuccess(departments.data));
  } catch (err) {
    console.log(err);
    yield put(actions.updateDepartments.updateDepartmentsFailure(err));
  }
}
function* deleteDepartmentSaga(action) {
  try {
    const departments = yield call(api.deleteDepartments,action.payload);
    yield put(actions.deleteDepartments.deleteDepartmentsSuccess(departments.data));
    console.log(departments)
  } catch (err) {
    console.log(err);
    yield put(actions.deleteDepartments.deleteDepartmentsFailure(err));
  }
}
// category
function* fetchCategorySaga(action) {
  try {
    const categories = yield call(api.fetchCategories);
    yield put(actions.getCategories.getCategoriesSuccess(categories.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getCategories.getCategoriesFailure(err));
  }
}
function* createCategorySaga(action) {
  try {
    const categories = yield call(api.createCategories,action.payload);
    yield put(actions.createCategories.createCategoriesSuccess(categories.data));
  } catch (err) {
    console.log(err);
    yield put(actions.createCategories.createCategoriesFailure(err));
  }
}
function* updateCategorySaga(action) {
  try {
    const categories = yield call(api.updateCategories,action.payload);
    yield put(actions.updateCategories.updateCategoriesSuccess(categories.data));
  } catch (err) {
    console.log(err);
    yield put(actions.updateCategories.updateCategoriesFailure(err));
  }
}
function* deleteCategorySaga(action) {
  try {
    const categories = yield call(api.deleteCategories,action.payload);
    yield put(actions.deleteCategories.deleteCategoriesSuccess(categories.data));
  } catch (err) {
    console.log(err);
    yield put(actions.deleteCategories.deleteCategoriesFailure(err));
  }
}
function* mysaga() {
  //post
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
  yield takeLatest(actions.updatePosts.updatePostsRequest, updatePostSaga);
  yield takeLatest(actions.createPosts.createPostsRequest, createPostSaga);
  yield takeLatest(actions.deletePosts.deletePostsRequest, deletePostSaga);
  //department
  yield takeLatest(actions.getDepartments.getDepartmentsRequest,fetchDepartmentSaga);
  yield takeLatest(actions.createDepartments.createDepartmentsRequest,createDepartmentSaga);
  yield takeLatest(actions.deleteDepartments.deleteDepartmentsRequest,deleteDepartmentSaga);
  yield takeLatest(actions.updateDepartments.updateDepartmentsRequest,updateDepartmentSaga);
  //category
  yield takeLatest(actions.getCategories.getCategoriesRequest,fetchCategorySaga);
  yield takeLatest(actions.createCategories.createCategoriesRequest,createCategorySaga);
  yield takeLatest(actions.deleteCategories.deleteCategoriesRequest,deleteCategorySaga);
  yield takeLatest(actions.updateCategories.updateCategoriesRequest,updateCategorySaga);
}
export default mysaga;
