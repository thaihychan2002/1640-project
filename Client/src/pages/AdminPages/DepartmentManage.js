import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { Helmet } from "react-helmet-async";

export default function DepartmentManage() {
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2} />
      <Grid item xs={10} sm={10}>
        Department
      </Grid>
    </Grid>
  );
}
