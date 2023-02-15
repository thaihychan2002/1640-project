import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions'
import * as api from '../../api'
function* fetchPostSaga(action) {
    try {
        const posts = yield call(api.fetchPosts);
        yield put(actions.getPosts.getPostsSuccess(posts.data));
    }
    catch (err) {
        console.log(err);
        yield put(actions.getPosts.getPostsFailure(err));
    }
}
function* fetchDepartmentSaga(action) {
    try {
        const departments = yield call(api.fetchDepartments);
        yield put(actions.getDepartments.getDepartmentsSuccess(departments.data));
    }
    catch (err) {
        console.log(err);
        yield put(actions.getDepartments.getDepartmentsFailure(err));
    }
}
function* createPostSaga(action) {
    try {
        const posts = yield call(api.createPosts, action.payload);
        yield put(actions.createPosts.createPostsSuccess(posts.data));
    }
    catch (err) {
        console.log(err);
        yield put(actions.createPosts.createPostsFailure(err));
    }
}
function* updatePostSaga(action) {
    try {
        console.log('updatePostSaga',{action})
        const updatedPost = yield call(api.updatePosts, action.payload);
        console.log('[updatePostSaga - post]',updatedPost)
        yield put(actions.updatePosts.updatePostsSuccess(updatedPost.data));
    } catch (err) {
        console.error(err);
        yield put(actions.updatePosts.updatePostsFailure(err));
    }
}
function* mysaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
    yield takeLatest(actions.getDepartments.getDepartmentsRequest, fetchDepartmentSaga)
    yield takeLatest(actions.updatePosts.updatePostsRequest, updatePostSaga);
    yield takeLatest(actions.createPosts.createPostsRequest, createPostSaga);
}
export default mysaga;