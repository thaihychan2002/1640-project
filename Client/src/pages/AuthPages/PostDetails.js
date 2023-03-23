import "../../component/assets/css/PostDetails.css";
import React from "react";
import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { postsdetailState$, postsLoading$ } from "../../redux/seclectors";
import jwtDecode from "jwt-decode";
import Postdetail from "../../component/Postdetail";
import LoadingBox from "../../component/LoadingBox/LoadingBox";
import NotFound from "../../pages/NotAuthPages/NotFound.js";
const PostDetails = () => {

  const params = useParams();
  const { slug } = params;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.viewPostsBySlug.viewPostRequestBySlug(slug));
  }, [dispatch, slug]);

  const token = localStorage.getItem("userInfo");
  const user = jwtDecode(token)
  // const postdetail = useSelector(postsdetailState$)
  // const [post, setpost] = React.useState({
  //   title: '',
  //   author: '',
  //   content:'',
  //   department: '',
  //   topic: '',
  //   attachment:'' ,
  //   isAnonymous: '',
  //   likeCount:'' ,
  //   dislikeCount: '',
  // });
  // setpost({
  //   ...post, title: postdetail.title,
  //   author: postdetail.author,
  //   content: postdetail.content,
  //   department: postdetail?.department,
  //   topic: postdetail?.topic,
  //   attachment: postdetail.attachment,
  //   isAnonymous: postdetail.isAnonymous,
  //   likeCount: postdetail.likeCount,
  //   dislikeCount: postdetail.dislikeCount,
  // })

  const post = useSelector(postsdetailState$)
  const isLoading= useSelector(postsLoading$)
  React.useEffect(() => {
    dispatch(actions.filterActionsLog.filterActionsLogRequest({ author: user._id }));
  }, [dispatch, user])
  React.useEffect(() => {
    dispatch(actions.getComments.getCommentsRequest(post));
  }, [dispatch, post]);

  return (
    <>
    {isLoading ? (
      <LoadingBox />
    ) : (
      post?.map((post) => <Postdetail key={post._id} post={post} />)
    )}</>
  );
};

export default PostDetails;
