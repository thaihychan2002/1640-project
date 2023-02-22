import { Grid } from "@material-ui/core";
import { postsState$, departmentsState$ } from "../../redux/seclectors";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Store } from "../../Store";
import React from "react";
import * as actions from "../../redux/actions";
import ReactApexChart from "react-apexcharts";

export default function QA() {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  const [departments, setDepartments] = useState([]);

  const options = useMemo(() => {
    return {
      chart: {
        type: "donut",
      },
      labels: departments,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }, [departments]);

  const [series, setSeries] = useState([]);

  const getPostsByDepartment = useCallback(
    (department) => {
      return posts.filter((post) => post.department === department);
    },
    [posts]
  );

  const getPostCountByDepartment = useCallback(
    (department) => {
      return getPostsByDepartment(department).length;
    },
    [getPostsByDepartment]
  );

  useEffect(() => {
    const departments = posts.reduce((accumulator, post) => {
      if (!accumulator.includes(post.department)) {
        accumulator.push(post.department);
      }
      return accumulator;
    }, []);
    setDepartments(departments);
  }, [posts]);
  useEffect(() => {
    const series = departments.map((department) =>
      getPostCountByDepartment(department)
    );
    setSeries(series);
  }, [departments, getPostCountByDepartment]);

  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  return (
    <Grid container>
      <Grid item xs={2} sm={2} />
      <Grid item xs={8} sm={8}>
        <ReactApexChart options={options} series={series} type="donut" />
      </Grid>
    </Grid>
  );
}
