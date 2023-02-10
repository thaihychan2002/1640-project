import { useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import * as actions from './redux/actions'
function App() {
  const dispatch = useDispatch();
  dispatch(actions.getPosts.getPostsRequest());
  return (
    <HomePage></HomePage>
  );
}

export default App;


