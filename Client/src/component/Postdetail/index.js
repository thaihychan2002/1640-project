import "../../component/assets/css/PostDetails.css";
import {
    IconButton, Typography,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Grid
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext, useRef } from "react";
import { downloadZip } from "../../api";
import { Dropdown, Space } from "antd";
import moment from "moment";
import { animalList } from "../../component/PostList/Post/anonymousAnimal.js";
import * as actions from "../../redux/actions";
import DownloadButton from "../../component/DownloadButton/index.js";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import CommentList from "../../component/CommentList";
import Responsive from "../../component/ResponsiveCode/Responsive";
import { actionslogState$ } from "../../redux/seclectors";
import jwtDecode from "jwt-decode";
import { Store } from "../../Store";
import useStyles from "./styles.js";
import NoPost from "../NoPost";
export default function Postdetail({ post }) {
    const dispatch = useDispatch();
    const { state } = useContext(Store);
    const user = state.userInfo;
    const actionslog = useSelector(actionslogState$)
    const { isXs } = Responsive();
    const classes = useStyles();
    const actiondata = useRef({
        _id: '',
        action: ''
    })
    const actionview = useRef({
        _id: ''
    })
    React.useEffect(() => {
        const token = localStorage.getItem("userInfo");
        const user = jwtDecode(token)
        dispatch(actions.filterActionsLog.filterActionsLogRequest({ author: user._id }));
    }, [dispatch])
    const checkaction = actionslog.filter((action) => action.postID._id === post._id && action.action !== 'Viewed')
    checkaction.map((action) => actiondata.current._id = action._id)
    checkaction.map((action) => actiondata.current.action = action.action)
    const checkviewed = actionslog.filter((action) => action.postID._id === post._id && action.action === 'Viewed')
    checkviewed.map((action) => actionview.current._id = action._id)
    const getRandomAnimal = () => {
        const randomIndex = Math.floor(Math.random() * animalList.length);
        return animalList[randomIndex];
    };
    const animal = useRef("");
    animal.current = getRandomAnimal()
    const [likeActive, setLikeActive] = React.useState(actiondata.current.action === 'Like' ? true : false);
    const [dislikeActive, setDislikeActive] = React.useState(actiondata.current.action === 'Dislike' ? true : false);
    const onLikeBtnClick = React.useCallback(() => {
        if (likeActive) {
            setLikeActive(false);
            actiondata.current.action = 'Initial_value'
            dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
            dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Like', author: user._id, postID: post._id })))
            dispatch(
                actions.updatePostsLike.updatePostsLikeRequest({
                    ...post,
                    view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
                    likeCount: post.likeCount - 1,
                })
            );
        } else {
            setLikeActive(true);
            actiondata.current.action = 'Like'
            dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
            dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Like', author: user._id, postID: post._id })))
            dispatch(
                actions.updatePostsLike.updatePostsLikeRequest({
                    ...post,
                    view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
                    likeCount: post.likeCount + 1,
                })
            );
            if (dislikeActive) {
                setDislikeActive(false);
                dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Like', author: user._id, postID: post._id })))
                dispatch(
                    actions.updatePostsLike.updatePostsLikeRequest({
                        ...post,
                        likeCount: post.likeCount + 1,
                        dislikeCount: post.dislikeCount === 0 ? 0 : post.dislikeCount - 1,
                    })
                );
            }
        }
    }, [dispatch, post, likeActive, dislikeActive, user, actiondata, checkaction, checkviewed]);
    const onDislikeBtnClick = React.useCallback(() => {
        if (dislikeActive) {
            setDislikeActive(false);
            actiondata.current.action = 'Initial_value'
            dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
            dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Dislike', author: user._id, postID: post._id })))
            dispatch(
                actions.updatePostsLike.updatePostsLikeRequest({
                    ...post,
                    view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
                    dislikeCount: post.likeCount + 1,
                }),
            );
        } else {
            setDislikeActive(true);
            actiondata.current.action = 'Dislike'
            dispatch(checkviewed.length > 0 ? actions.updateActionsLog.updateActionsLogRequest({ _id: actionview.current._id, action: 'Viewed' }) : actions.createActionsLog.createActionsLogRequest({ action: 'Viewed', author: user._id, postID: post._id }))
            dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Dislike', author: user._id, postID: post._id })))
            dispatch(
                actions.updatePostsLike.updatePostsLikeRequest({
                    ...post,
                    view: checkviewed.length > 0 ? (post.view) : (post.view + 1),
                    dislikeCount: post.dislikeCount + 1,
                })
            );
            if (likeActive) {
                setLikeActive(false);
                dispatch(checkaction.length > 0 ? (actions.updateActionsLog.updateActionsLogRequest(actiondata.current)) : (actions.createActionsLog.createActionsLogRequest({ action: 'Dislike', author: user._id, postID: post._id })))
                dispatch(
                    actions.updatePostsLike.updatePostsLikeRequest({
                        ...post,
                        likeCount: post.likeCount === 0 ? 0 : post.likeCount - 1,
                        dislikeCount: post.dislikeCount + 1
                    })
                );
            }
        }
    }, [dispatch, post, likeActive, dislikeActive, user, checkaction, actiondata, checkviewed]);
    const downloadPost = async () => {
        try {
            const id = post._id;
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
    const items = [
        {
            key: "1",
            label: <div>Report</div>,
        },
        {
            key: "2",
            label: <div>Save post</div>,
        },
    ];
    return (
        post._id ?
            (<Grid container spacing={2} alignItems="stretch" style={{ width: '2000px' }} >
                <Helmet>
                    <title>{post.title}</title>
                </Helmet>
                <Grid item xs={2} sm={2} />
                <Grid item xs={10} sm={10}>
                    <div className="post">
                        {/* <div className="postTop">
                        <div
                            className="postTopLeft"
                            style={{ marginBottom: 15, marginTop: 15 }}
                        >
                            {post.isAnonymous ? (
                                <>
                                    <img
                                        className="postImage"
                                        src={animal.avatar}
                                        alt={`${animal.name} Avatar`}
                                    />
                                    <Typography  className="postUsername">
                                        {" "}
                                        Anonymous {animal.name}{" "}
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <img
                                        className="postImage"
                                        src={post.author.avatar}
                                        alt={post.author}
                                    />
                                    <Typography  className="postUsername">{post.author}</Typography>
                                </>
                            )}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography  className="postTitle" >{post.title}</Typography>
                        <Typography  className="postDate">  {moment(post.createdAt).format("LLL")}</Typography>
                    </div>{console.log('here')}
                    <Typography
                        variant="body2"
                        component="div"
                        className="postContent"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></Typography>
                    <center>
                        <img className="postImg" src={post.attachment} alt="" />
                    </center>
                    <div style={{ marginLeft: isXs ? "59%" : "80%" }}>
                        <DownloadButton
                            download={downloadPost}
                            textDownload={"Download ZIP"}
                        />
                    </div>
                    <div className="postBottom">
                        <IconButton
                            onClick={onLikeBtnClick}
                            style={{ color: likeActive ? "red" : "" }}
                        >
                            <FavoriteIcon />
                            <Typography  color="textSecondary">
                                Like
                            </Typography>
                        </IconButton>
                        <IconButton
                            onClick={onDislikeBtnClick}
                            style={{ color: dislikeActive ? "blue" : "" }}
                        >
                            -<FavoriteIcon />
                            <Typography  color="textSecondary">
                                Dislike
                            </Typography>
                        </IconButton>
                        {`${post.likeCount} likes`}
                        <div className="postBottomRight">
                            <Typography > {post.view} Views </Typography>
                        </div>
                    </div> */}
                        <Card className={classes.card} key={post._id}>
                            <CardHeader
                                avatar={
                                    post.isAnonymous ? (
                                        <img src={animal.current.avatar} alt={`${animal.current.name} Avatar`} />
                                    ) : (
                                        <img src={post?.author?.avatar} alt={post?.author?.fullName} />
                                    )
                                }
                                title={
                                    post.isAnonymous
                                        ? `Anonymous ${animal.current.name}`
                                        : post?.author?.fullName
                                }
                                subheader={moment(post.createdAt).format("LLL")}
                                action={
                                    post.author._id === user._id ? (
                                        <IconButton title="Edit post">
                                            <MoreVertIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton title="Edit post">
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                                trigger={["click"]}
                                            >
                                                <Space onClick={(e) => e.preventDefault()}>
                                                    <MoreVertIcon />
                                                </Space>
                                            </Dropdown>
                                        </IconButton>
                                    )
                                }
                            />
                            <CardMedia
                                image={post.attachment || ""}
                                title="image"
                                component="img"
                                className={classes.media}
                                style={{ width: "100%", height: "auto" }}
                            />
                            <CardContent>
                                <Typography variant="h5" color="textPrimary">
                                    {post.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component="p"
                                    color="textSecondary"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                ></Typography>
                            </CardContent>
                            <CardActions
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                <div>
                                    <IconButton
                                        onClick={onLikeBtnClick}
                                        style={{ color: likeActive ? "red" : "" }}
                                    >
                                        <FavoriteIcon />
                                        <Typography component="span" color="textSecondary"> {`${post.likeCount} likes`}</Typography>
                                    </IconButton>
                                    <IconButton
                                        onClick={onDislikeBtnClick}
                                        style={{ color: dislikeActive ? "blue" : "" }}
                                    >
                                        -<FavoriteIcon />
                                        <Typography component="span" color="textSecondary">{`${post.dislikeCount} dislikes`}</Typography>
                                    </IconButton>

                                </div>
                                <div>{post.view} Views</div>
                            </CardActions>
                            <div style={{ marginLeft: isXs ? "59%" : "80%" }}>
                                <DownloadButton
                                    download={downloadPost}
                                    textDownload={"Download ZIP"}
                                />
                            </div>
                        </Card>
                        <br />
                        <br />
                        <CommentList post={post}></CommentList>
                    </div>
                </Grid>
            </Grid>) : (<NoPost />)
    );
}