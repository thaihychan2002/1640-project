import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyles from "./styles.js";
import { updatePosts } from "../../../redux/actions/index.js";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [likeActive, setLikeActive] = React.useState(false);
  const [dislikeActive, setDislikeActive] = React.useState(false);
  const onLikeBtnClick = React.useCallback(() => {
    if (likeActive) {
      setLikeActive(false);
      dispatch(
        updatePosts.updatePostsRequest({
          ...post,
          likeCount: post.likeCount - 1,
        })
      );
    } else {
      setLikeActive(true);
      dispatch(
        updatePosts.updatePostsRequest({
          ...post,
          likeCount: post.likeCount + 1,
        })
      );
      if (dislikeActive) {
        setDislikeActive(false);
        dispatch(
          updatePosts.updatePostsRequest({
            ...post,
            likeCount: post.likeCount + 2,
          })
        );
      }
    }
  }, [dispatch, post, likeActive, dislikeActive]);
  const onDislikeBtnClick = React.useCallback(() => {
    if (dislikeActive) {
      setDislikeActive(false);
      dispatch(
        updatePosts.updatePostsRequest({
          ...post,
          likeCount: post.likeCount + 1,
        })
      );
    } else {
      setDislikeActive(true);
      dispatch(
        updatePosts.updatePostsRequest({
          ...post,
          likeCount: post.likeCount - 1,
        })
      );
      if (likeActive) {
        setLikeActive(false);
        dispatch(
          updatePosts.updatePostsRequest({
            ...post,
            likeCount: post.likeCount - 2,
          })
        );
      }
    }
  }, [dispatch, post, likeActive, dislikeActive]);
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar></Avatar>}
        title={post.author}
        subheader={moment(post.updatedAt).format("HH:MM MM DD,YYYY")}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      ></CardHeader>
      <CardMedia
        image={post.attachment || ""}
        title="image"
        className={classes.media}
      ></CardMedia>
      <CardContent>
        <Typography variant="h5" color="textPrimary">
          {post.title}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
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
        {`${post.likeCount} likes`}
      </CardActions>
    </Card>
  );
}
