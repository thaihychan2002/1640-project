import { takeLatest, call } from 'redux-saga/effects';
import * as actions from '../actions'
import * as api from '../../api'
function* fetchPostSaga(action) {
    const posts = yield call(api.fetchPosts);
    console.log(`[posts]`, posts)
}
function* mysaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga)
}
export default mysaga;