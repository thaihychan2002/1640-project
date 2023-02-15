import { useDispatch } from "react-redux";
import * as actions from "./redux/actions";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllRoutes } from "./routes/AllRoutes";
function App() {
  const dispatch = useDispatch();
  dispatch(actions.getPosts.getPostsRequest());
  const allRoutes = useRoutes(AllRoutes);
  return (
    <>
      <ToastContainer position="bottom-center" limit={5} />
      {allRoutes}
    </>
  );
}

export default App;
