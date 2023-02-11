import { useDispatch } from "react-redux";
import Navigation from "./component/Navigation/Navigation";
import AccountSwitch from "./component/Account/AccountSwitch";
import * as actions from "./redux/actions";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "./routes/Routes";

function App() {
  const dispatch = useDispatch();
  dispatch(actions.getPosts.getPostsRequest());
  const router = useRoutes(Routes);

  return (
    <>
      <ToastContainer position="bottom-center" limit={5} />
      {router}
    </>
  );
}

export default App;
