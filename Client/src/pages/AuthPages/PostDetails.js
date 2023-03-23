import { Grid } from "@material-ui/core";
import "../../component/assets/css/PostDetails.css";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext, useEffect, useState } from "react";
import { downloadZip, fetchPostBySlug } from "../../api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { animalList } from "../../component/PostList/Post/anonymousAnimal.js";
import * as actions from "../../redux/actions";
import DownloadButton from "../../component/DownloadButton/index.js";
import NotFound from "../NotAuthPages/NotFound.js";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import CommentList from "../../component/CommentList";
import Responsive from "../../component/ResponsiveCode/Responsive";
import { Store } from "../../Store";
const PostDetails = () => {
  const [allData, setAllData] = useState({});
  const params = useParams();
  const { slug } = params;
  const dispatch = useDispatch();
  const { isXs } = Responsive();
  const { state } = useContext(Store);
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await fetchPostBySlug(slug);
      setAllData({
        _id: data._id,
        slug: data.slug,
        title: data.title,
        author: data?.author?.fullName,
        authorAvatar: data.author?.avatar,
        attachment: data.attachment,
        filePath: data?.filePath,
        likeCount: data.likeCount,
        view: data.view,
        content: data.content,
        createdAt: data.createdAt,
        isAnonymous: data.isAnonymous,
      });
    };
    fetchPost();
  }, [slug]);
  React.useEffect(() => {
    dispatch(actions.getComments.getCommentsRequest(allData));
  }, [dispatch, allData]);
  const getRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animalList.length);
    return animalList[randomIndex];
  };

  const [animal, setAnimal] = useState("");
  useEffect(() => {
    setAnimal(getRandomAnimal());
  }, []);
  const [likeActive, setLikeActive] = React.useState(false);
  const [dislikeActive, setDislikeActive] = React.useState(false);
  const onLikeBtnClick = React.useCallback(() => {
    if (likeActive) {
      setLikeActive(false);
      dispatch(
        actions.updatePostsLike.updatePostsLikeRequest({
          _id: allData._id,
          likeCount: allData.likeCount - 1,
        })
      );
    } else {
      setLikeActive(true);
      dispatch(
        actions.updatePostsLike.updatePostsLikeRequest({
          _id: allData._id,
          likeCount: allData.likeCount + 1,
        })
      );
      if (dislikeActive) {
        setDislikeActive(false);
        dispatch(
          actions.updatePostsLike.updatePostsLikeRequest({
            _id: allData._id,
            likeCount: allData.likeCount + 2,
          })
        );
      }
    }
  }, [dispatch, allData, likeActive, dislikeActive]);
  const onDislikeBtnClick = React.useCallback(() => {
    if (dislikeActive) {
      setDislikeActive(false);
      dispatch(
        actions.updatePostsLike.updatePostsLikeRequest({
          _id: allData._id,
          likeCount: allData.likeCount + 1,
        })
      );
    } else {
      setDislikeActive(true);
      dispatch(
        actions.updatePostsLike.updatePostsLikeRequest({
          _id: allData._id,
          likeCount: allData.likeCount - 1,
        })
      );
      if (likeActive) {
        setLikeActive(false);
        dispatch(
          actions.updatePostsLike.updatePostsLikeRequest({
            _id: allData._id,
            likeCount: allData.likeCount - 2,
          })
        );
      }
    }
  }, [dispatch, allData, likeActive, dislikeActive]);
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
  const downloadURL = async () => {
    try {
      const link = document.createElement("a");
      link.href = allData.filePath;
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {allData._id ? (
        <Grid container spacing={2} alignItems="stretch">
          <Helmet>
            <title>{allData.title}</title>
          </Helmet>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={10}>
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                <div>
                  <DownloadButton
                    download={downloadURL}
                    textDownload={"Download File Path"}
                  />
                </div>
                <div>
                  {state.userInfo.role === "Admin" && (
                    <DownloadButton
                      download={downloadPost}
                      textDownload={"Download ZIP"}
                    />
                  )}
                </div>
              </div>
              <div className="postBottom">
                <IconButton
                  onClick={onLikeBtnClick}
                  style={{ color: likeActive ? "red" : "" }}
                >
                  <FavoriteIcon />
                  <Typography component="span" color="textSecondary">
                    Like
                  </Typography>
                </IconButton>
                <IconButton
                  onClick={onDislikeBtnClick}
                  style={{ color: dislikeActive ? "blue" : "" }}
                >
                  -<FavoriteIcon />
                  <Typography component="span" color="textSecondary">
                    Dislike
                  </Typography>
                </IconButton>
                {`${allData.likeCount} likes`}
                <div className="postBottomRight">
                  <span> {allData.view} Views </span>
                </div>
              </div>
              <br />
              <br />
              <CommentList post={allData}></CommentList>
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
