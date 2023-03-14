import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@material-ui/core";
import Navigation from "./component/Navigation/Navigation";
import { AllRoutes } from "./routes/AllRoutes";
function App() {
  const allRoutes = useRoutes(AllRoutes);
  return (
    <>
      <ToastContainer position="bottom-center" limit={5} />
      <Grid item xs={2} sm={2}>
        <Navigation />
      </Grid>
      {allRoutes}
    </>
  );
}

export default App;
