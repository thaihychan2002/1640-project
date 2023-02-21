import { Grid } from "@material-ui/core";
import { postsState$, departmentsState$ } from "../../redux/seclectors";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useState, useEffect } from "react";
import { Store } from "../../Store";
import React from "react";
import * as actions from "../../redux/actions";
import ReactApexChart from "react-apexcharts";

export default function QA() {
  const { state } = useContext(Store);
  const user = state.userInfo;
  const [options, setOptions] = useState({
    chart: {
      type: "donut",
    },
    labels: ["Phong cong tac sinh vien", "Phong tu van tuyen sinh"],

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
  });

  const dispatch = useDispatch();
  const posts = useSelector(postsState$);
  const [departments, setDepartments] = useState([]);

  // const departments = useSelector(departmentsState$);
  let count = 0;
  const ctsvLength = posts.filter(
    (post) => post.department === "phong cong tac sinh vien"
  ).length;
  const tvtsLength = posts.filter(
    (post) => post.department === "phong tu van tuyen sinh"
  ).length;
  const [series, setSeries] = useState([ctsvLength, tvtsLength]);
  // posts.filter((post) =>
  //   departments.map(
  //     (department) => post.department === department.name && count++
  //   )
  // );
  // console.log(count);

  useEffect(() => {
    const departments = posts.reduce((accumulator, post) => {
      if (!accumulator.includes(post.department)) {
        accumulator.push(post.department);
      }
      return accumulator;
    }, []);
    setDepartments(departments);
  }, [posts]);
  const getPostsByDepartment = (department) => {
    return posts.filter((post) => post.department === department);
  };
  const getPostCountByDepartment = (department) => {
    return getPostsByDepartment(department).length;
  };
  React.useEffect(() => {
    dispatch(actions.getDepartments.getDepartmentsRequest());
  }, [dispatch]);
  return (
    <Grid container>
      <Grid item xs={2} sm={2} />
      <Grid item xs={8} sm={8}>
        {departments.map((department) => (
          <div key={department}>
            <h3>{department}</h3>
            <p>{getPostCountByDepartment(department)} posts</p>

            <ul>
              {getPostsByDepartment(department).map((post) => (
                <li key={post._id}>
                  <h4>{post.title}</h4>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <ReactApexChart options={options} series={series} type="donut" />
      </Grid>
    </Grid>
  );
}
