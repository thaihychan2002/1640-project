import { takeLatest, call,put } from 'redux-saga/effects';
import * as actions from '../actions'
import * as api from '../../api'
function* fetchPostSaga(action) {
    const posts = yield call(api.fetchPosts);
    console.log(`[posts]`, posts);
    yield put(actions.getPosts.getPostsSuccess(posts.data))
}
function* mysaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga)
}
export default mysaga;