import { Grid } from "@material-ui/core";
import "../../component/assets/css/PostDetails.css";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { downloadCSV, downloadZip, fetchPostBySlug } from "../../api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { animalList } from "../../component/PostList/Post/anonymousAnimal.js";
import { Button } from "antd";
import axios from "axios";
import DownloadButton from "../../component/DownloadButton/index.js";
import NotFound from "../NotAuthPages/NotFound.js";
import { Helmet } from "react-helmet-async";
const PostDetails = () => {
  const [allData, setAllData] = useState({
    _id: "",
    title: "",
    author: "",
    attachment: "",
    content: "",
    createdAt: "",
    isAnonymous: false,
  });
  const params = useParams();
  const { slug } = params;
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await fetchPostBySlug(slug);
      setAllData({
        ...allData,
        _id: data._id,
        slug: data.slug,
        title: data.title,
        author: data?.author?.fullName,
        authorAvatar: data.author?.avatar,
        attachment: data.attachment,
        content: data.content,
        createdAt: data.createdAt,
        isAnonymous: data.isAnonymous,
      });
    };
    fetchPost();
  }, [slug]);

  const getRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animalList.length);
    return animalList[randomIndex];
  };

  const animal = getRandomAnimal();

  const downloadPost = async () => {
    try {
      const id = allData._id;
      const response = await downloadZip(id);
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "idea.zip");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };
  console.log(allData);
  return (
    <div>
      {allData._id ? (
        <Grid container spacing={2} alignItems="stretch">
          <Helmet>
            <title>{allData.title}</title>
          </Helmet>
          <Grid item xs={2} sm={2} />
          <Grid item xs={10} sm={10}>
            <div className="post">
              <div className="postTop">
                <div
                  className="postTopLeft"
                  style={{ marginBottom: 15, marginTop: 15 }}
                >
                  {allData.isAnonymous ? (
                    <>
                      <img
                        className="postImage"
                        src={animal.avatar}
                        alt={`${animal.name} Avatar`}
                      />
                      <span className="postUsername">
                        {" "}
                        Anonymous {animal.name}{" "}
                      </span>
                    </>
                  ) : (
                    <>
                      <img
                        className="postImage"
                        src={allData.authorAvatar}
                        alt={allData.author}
                      />
                      <span className="postUsername"> {allData.author} </span>
                    </>
                  )}
                  {/* <img className="postImage" src={allData.authorAvatar} alt="" /> */}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="postTitle">{allData.title}</span>

                <span className="postDate">
                  {moment(allData.createdAt).format("LLL")}
                </span>
              </div>
              <div
                className="postContent"
                dangerouslySetInnerHTML={{ __html: allData.content }}
              ></div>
              <center>
                <img className="postImg" src={allData.attachment} alt="" />
              </center>
              <div style={{ marginLeft: "80%" }}>
                <DownloadButton
                  download={downloadPost}
                  textDownload={"Download ZIP"}
                />
              </div>
              <div className="postBottom">
                <div className="postBottomLeft">
                  <LikeOutlined style={{ fontSize: "32px" }} />
                  <span className="postLikeCounter"> 10 </span>
                  <DislikeOutlined style={{ fontSize: "32px" }} />
                  <span className="postDislikeCounter"> 10 </span>
                </div>
                <div className="postBottomRight">
                  <span className="postCommentText"> 10 comments </span>
                </div>
              </div>
              <br />
              <div>comments</div>
              <br />
              <div>
                <img
                  className="postImage"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png"
                  alt=""
                />
                <span className="postUsername"> phat </span>
                <span className="postComment"> sfdlkasdjlfjladsjfl</span>
              </div>
              <br />
              <div>
                <img
                  className="postImage"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png"
                  alt=""
                />
                <span className="postUsername"> phat </span>
                <span className="postComment"> sfdlkasdjlfjladsjfl</span>
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default PostDetails;
