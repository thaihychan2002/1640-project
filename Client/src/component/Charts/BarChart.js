import { Grid } from "@material-ui/core";
import { allPostsState$ } from "../../redux/seclectors";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo, useCallback } from "react";
import React from "react";
import * as actions from "../../redux/actions";
import ReactApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import { Statistic } from "antd";
import CountUp from "react-countup";
import { downloadCSV } from "../../api";
import DownloadButton from "../../component/DownloadButton";

export default function BarChart() {
  const dispatch = useDispatch();
  const posts = useSelector(allPostsState$);

  const [departments, setDepartments] = useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  const getPostCountsByDay = useCallback(() => {
    const postCountsByDay = {};
    const now = Date.now();
    const lastWeek = now - 14 * 24 * 60 * 60 * 1000; // 14 days ago
    posts?.forEach((post) => {
      const date = new Date(post.createdAt).toDateString();
      if (new Date(post.createdAt).getTime() >= lastWeek) {
        // only count posts from last 14 days
        const department = post?.department?.name;
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
      if (!accumulator.includes(post?.department?.name)) {
        if (post?.department?.name) accumulator.push(post?.department?.name);
      }
      return accumulator;
    }, []);
    setDepartments(departments);
  }, [posts]);

  useEffect(() => {
    const postCountsByDay = getPostCountsByDay();
    const dates = Object.keys(postCountsByDay);
    // const dates = Object.keys(postCountsByDay).sort();
    const series = departments?.map(
      (department) => {
        const data = dates?.map((date) => {
          return postCountsByDay[date][department] || 0;
        });
        return {
          name: department,
          data: data,
        };
      },
      [departments, getPostCountsByDay]
    );
    const options = {
      chart: {
        type: "bar", // Change type to "bar"
      },
      xaxis: {
        categories: dates,
      },
      yaxis: {
        title: {
          text: "Number of Posts per day",
        },
      },
    };
    setSeries(series);
    setOptions(options);
  }, [departments, getPostCountsByDay]);

  return <ReactApexChart options={options} series={series} type="bar" />;
}
