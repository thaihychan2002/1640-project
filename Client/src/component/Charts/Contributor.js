import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { allPostsState$ } from "../../redux/seclectors";

const Contributors = () => {
  const [chartData, setChartData] = useState({ series: [], options: {} });
  const posts = useSelector(allPostsState$);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const departments = posts?.reduce((accumulator, post) => {
      const departmentName = post?.department?.name;
      if (departmentName && !accumulator.includes(departmentName)) {
        accumulator.push(departmentName);
      }
      return accumulator;
    }, []);
    setDepartments(departments);
  }, [posts]);

  useEffect(() => {
    const contributorsByDepartment = departments.map((department, index) => {
      const contributors = posts?.filter(
        (post) => post?.department?.name === department
      )?.length;
      const hue = ((index * 71) % 360) / 360; // Generate a hue based on the index
      const color = `hsl(${hue * 360}, 70%, 50%)`; // Generate a color using the hue

      return {
        x: department,
        y: contributors || 0,
        color, // Generate a color based on the index
      };
    });

    const series = [
      {
        name: "Contributors",
        data: contributorsByDepartment,
      },
    ];
    const options = {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: departments,
      },
      title: {
        text: "Number of Contributors by Department",
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          distributed: true, // Set distributed to true to use multiple colors
        },
      },
      colors: contributorsByDepartment.map((data) => data.color), // Set the colors for each bar
    };
    setChartData({ series, options });
  }, [departments, posts]);

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height={350}
    />
  );
};

export default Contributors;
