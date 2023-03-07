import { Grid } from "@material-ui/core";
import { allPostsState$ } from "../../redux/seclectors";
import { useSelector, useDispatch } from "react-redux";
import {  useState, useEffect, useMemo, useCallback } from "react";

import React from "react";
import * as actions from "../../redux/actions";
import ReactApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
export default function QA() {
  const dispatch = useDispatch();
  const posts = useSelector(allPostsState$);

  const [departments, setDepartments] = useState([]);
  const optionsPie = useMemo(() => {
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
  const [seriesPie, setSeriesPie] = useState([]);
  const [options, setOptions] = useState({});

  const getPostsByDepartment = useCallback(
    (department) => {
      return posts?.filter((post) => post.department === department);
    },
    [posts]
  );

  const getPostCountByDepartment = useCallback(
    (department) => {
      return getPostsByDepartment(department).length;
    },
    [getPostsByDepartment]
  );

  // const getPostCountsByDay = useCallback(() => {
  //   const postCountsByDay = {};
  //   posts.forEach((post) => {
  //     const date = new Date(post.createdAt).toDateString();
  //     const department = post.department;
  //     if (!postCountsByDay[date]) {
  //       postCountsByDay[date] = {};
  //     }
  //     if (!postCountsByDay[date][department]) {
  //       postCountsByDay[date][department] = 0;
  //     }
  //     postCountsByDay[date][department]++;
  //   });
  //   return postCountsByDay;
  // }, [posts]);
  const getPostCountsByDay = useCallback(() => {
    const postCountsByDay = {};
    const now = Date.now();
    const lastWeek = now - 7 * 24 * 60 * 60 * 1000; // 7 days ago
    posts?.forEach((post) => {
      const date = new Date(post.createdAt).toDateString();
      if (new Date(post.createdAt).getTime() >= lastWeek) {
        // only count posts from last 7 days
        const department = post.department;
        if (!postCountsByDay[date]) {
          postCountsByDay[date] = {};
        }
        if (!postCountsByDay[date][department]) {
          postCountsByDay[date][department] = 0;
        }
        postCountsByDay[date][department]++;
      }
    });
    return postCountsByDay;
  }, [posts]);

  useEffect(() => {
    const departments = posts?.reduce((accumulator, post) => {
      if (!accumulator.includes(post.department)) {
        accumulator.push(post.department);
      }
      return accumulator;
    }, []);
    setDepartments(departments);
  }, [posts]);
  useEffect(() => {
    const series = departments?.map((department) =>
      getPostCountByDepartment(department)
    );
    setSeriesPie(series);
  }, [departments, getPostCountByDepartment]);

  useEffect(() => {
    const postCountsByDay = getPostCountsByDay();
    const dates = Object.keys(postCountsByDay).sort();
    const series = departments?.map((department) => {
      const data = dates?.map((date) => {
        return postCountsByDay[date][department] || 0;
      });
      return {
        name: department,
        data: data,
      };
    });
    setSeries(series);
  }, [departments, getPostCountsByDay]);

  useEffect(() => {
    const postCountsByDay = getPostCountsByDay();
    const dates = Object.keys(postCountsByDay).sort();
    const series = departments?.map((department) => {
      const data = dates?.map((date) => {
        return postCountsByDay[date][department] || 0;
      });
      return {
        name: department,
        data: data,
      };
    });
    const options = {
      chart: {
        type: "bar", // Change type to "bar"
      },
      xaxis: {
        categories: dates,
      },
      yaxis: {
        title: {
          text: "Number of Posts",
        },
      },
    };
    setSeries(series);
    setOptions(options);
  }, [departments, getPostCountsByDay]);

  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getAllPosts.getAllPostsRequest());
  }, [dispatch]);
  return (
    <Grid container>
      <Helmet>
        <title>QA Coordinator</title>
      </Helmet>
      <Grid item xs={2} sm={2} />
      <Grid item xs={8} sm={8}>
        <ReactApexChart options={optionsPie} series={seriesPie} type="donut" />
        <ReactApexChart options={options} series={series} type="bar" />
      </Grid>
    </Grid>
  );
}
