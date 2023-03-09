import { Grid } from "@material-ui/core";
import "../../component/assets/css/PostDetails.css";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useEffect, useState } from "react";
import { downloadCSV, downloadZip, fetchPostBySlug } from "../../api";
import { useParams } from "react-router-dom";
import moment from "moment";
import { animalList } from "../../component/PostList/Post/anonymousAnimal.js";
import DownloadButton from "../../component/DownloadButton";
import * as actions from "../../redux/actions"
import { useDispatch } from "react-redux";
import CommentList from "../../component/CommentList";

const PostDetails = () => {
  const [allData, setAllData] = useState({});
  const params = useParams();
  const { slug } = params;
 const dispatch = useDispatch()
  // React.useEffect(() => {
  //   dispatch(actions.getComments.getCommentsRequest(allData));
  //   const fetchPost = async () => {
  //     const { data } = await fetchPostBySlug(slug);
  //     setAllData({
  //       ...allData,
  //       _id: data._id,
  //       slug: data.slug,
  //       title: data.title,
  //       author: data?.author?.fullName,
  //       authorAvatar: data.author?.avatar,
  //       attachment: data.attachment,
  //       likeCount: data.likeCount,
  //       content: data.content,
  //       createdAt: data.createdAt,
  //       isAnonymous: data.isAnonymous,
  //     });
  //   };
  //   fetchPost();
  // }, [slug, allData,dispatch]);
  console.log(allData);
  const getRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animalList.length);
    return animalList[randomIndex];
  };
 
  const animal = getRandomAnimal();
  const [likeActive, setLikeActive] = React.useState(false);
  const [dislikeActive, setDislikeActive] = React.useState(false);
  const onLikeBtnClick = React.useCallback(() => {
    if (likeActive) {
      setLikeActive(false);
      dispatch(
        actions.updatePosts.updatePostsRequest({
          _id: allData._id,
          likeCount: allData.likeCount - 1,
        })
      );
    } else {
      setLikeActive(true);
      dispatch(
        actions.updatePosts.updatePostsRequest({
          _id: allData._id,
          likeCount: allData.likeCount + 1,
        })
      );
      if (dislikeActive) {
        setDislikeActive(false);
        dispatch(
          actions.updatePosts.updatePostsRequest({
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
        actions.updatePosts.updatePostsRequest({
          _id: allData._id,
          likeCount: allData.likeCount + 1,
        })
      );
    } else {
      setDislikeActive(true);
      dispatch(
        actions.updatePosts.updatePostsRequest({
          _id: allData._id,
          likeCount: allData.likeCount - 1,
        })
      );
      if (likeActive) {
        setLikeActive(false);
        dispatch(
          actions.updatePosts.updatePostsRequest({
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
  // const downloadPost = async (slug) => {
  //   try {
  //     slug = allData.slug;
  //     const response = await downloadZip(slug);
  //     // Create a temporary URL for the downloaded file
  //     const url = window.URL.createObjectURL(new Blob([response.data]));

  //     // Create a link element and click it to download the file
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `post-${slug}.docx`);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={2} sm={2}></Grid>
      <Grid item xs={10} sm={10}>
        {/* <h1>Post Details</h1> */}
        <div className="post">
          <div className="postTop">
            <div className="postTopLeft" style={{ marginBottom: 15 }}>
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
              <IconButton
                onClick={onLikeBtnClick}
                style={{ color: likeActive ? "red" : "" }}
              >
                <FavoriteIcon />
                <Typography component="span" color="textSecondary"></Typography>
              </IconButton>
              <IconButton
                onClick={onDislikeBtnClick}
                style={{ color: dislikeActive ? "blue" : "" }}
              >
                -<FavoriteIcon />
                <Typography component="span" color="textSecondary"></Typography>
              </IconButton>
              {`${allData.likeCount} likes`}
            </div>
            <div className="postBottomRight">
              <span className="postCommentText"> 10 comments </span>
            </div>
          </div>
          <br />
          <div>comments</div>
          <br />
          <CommentList post={allData}></CommentList>
        </div>
      </Grid>
    </Grid>
  );
};
export default PostDetails;
