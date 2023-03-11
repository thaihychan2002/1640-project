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

export default function PieChart() {
  //   const dispatch = useDispatch();
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
  const [seriesPie, setSeriesPie] = useState([]);

  const getPostsByDepartment = useCallback(
    (department) => {
      return posts?.filter((post) => post?.department?.name === department);
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
    const departments = posts?.reduce((accumulator, post) => {
      if (!accumulator.includes(post?.department?.name)) {
        if (post?.department?.name) accumulator.push(post?.department?.name);
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
  const formatter = (value) => <CountUp end={value} separator="," />;
  const downloadPosts = async () => {
    try {
      const response = await downloadCSV();
      const data = response.data;
      const csvUrl = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = csvUrl;
      link.setAttribute("download", "idea.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <center>
        <Statistic
          title="Active Ideas"
          value={posts.length}
          formatter={formatter}
        />
      </center>
      <ReactApexChart options={optionsPie} series={seriesPie} type="donut" />
      <center>
        <DownloadButton
          download={downloadPosts}
          textDownload={"Download All Ideas"}
        />
      </center>
    </div>
  );
}
