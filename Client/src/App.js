import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import Navigation from "./component/Navigation/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import * as actions from "./redux/actions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  dispatch(actions.getPosts.getPostsRequest());

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={5} />
      <header>
        <Navigation />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
