import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
    Grid,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import moment from "moment";
import React, { useContext, useState } from "react";
import { useDispatch, } from "react-redux";
import useStyles from "./styles.js";
import { Modal, Button, Input } from "antd";
import { Store } from "../../../Store";
import * as actions from "../../../redux/actions"
import { animalList } from "./anonymousAnimal.js";
const { TextArea } = Input;


export default function Comment({ comment }) {
    const dispatch = useDispatch();
    const { state } = useContext(Store);
    const user = state.userInfo;
    const [CmtEdit, setCmtEdit] = useState(false);
    const [Cmtupdate, setcmtUpdate] = useState(false);
    const [Cmtoption, setCmtOption] = useState(false);

    const [newcmt, setnewcmt] = React.useState({});
    // Anonymous Animals
    const getRandomAnimal = () => {
        const randomIndex = Math.floor(Math.random() * animalList.length);
        return animalList[randomIndex];
    };
    const [likecmtActive, setLikecmtActive] = React.useState(false);
    const [dislikecmtActive, setDislikecmtActive] = React.useState(false);
    const onLikecmtClick = React.useCallback(() => {
        if (likecmtActive) {
            setLikecmtActive(false);
            dispatch(
                actions.updateComments.updateCommentsRequest({
                    ...comment,
                    likeCount: comment.likeCount - 1,
                })
            );
        } else {
            setLikecmtActive(true);
            dispatch(
                actions.updateComments.updateCommentsRequest({
                    ...comment,
                    likeCount: comment.likeCount + 1,
                })
            );
            if (dislikecmtActive) {
                setDislikecmtActive(false);
                dispatch(
                    actions.updateComments.updateCommentsRequest({
                        ...comment,
                        likeCount: comment.likeCount + 2,
                    })
                );
            }
        }
    }, [dispatch, comment, likecmtActive, dislikecmtActive]);
    const onDislikecmtClick = React.useCallback(() => {
        if (dislikecmtActive) {
            setDislikecmtActive(false);
            dispatch(
                actions.updateComments.updateCommentsRequest({
                    ...comment,
                    likeCount: comment.likeCount + 1,
                })
            );
        } else {
            setDislikecmtActive(true);
            dispatch(
                actions.updateComments.updateCommentsRequest({
                    ...comment,
                    likeCount: comment.likeCount - 1,
                })
            );
            if (likecmtActive) {
                setLikecmtActive(false);
                dispatch(
                    actions.updateComments.updateCommentsRequest({
                        ...comment,
                        likeCount: comment.likeCount - 2,
                    })
                );
            }
        }
    }, [dispatch, comment, likecmtActive, dislikecmtActive]);
    const animal = getRandomAnimal();
    const classes = useStyles();
    const viewModal = React.useCallback(() => {
        if (comment.author.fullName === user.fullName) {
            setCmtEdit(true);
        }
        else {
            setCmtOption(true);
        }
    }, [user, comment]);
    const handleOk = React.useCallback(() => {
        setCmtEdit(false);
    }, []);
    const handleoption = React.useCallback(() => {
        setCmtOption(false);
    }, []);
    const Cmtoptionopen = React.useCallback(() => {
        setcmtUpdate(true);
    }, []);
    const Cmtoptionclose = React.useCallback(() => {
        setcmtUpdate(false);
    }, []);
    const updatecmthandler = React.useCallback(() => {
        dispatch(actions.updateComments.updateCommentsRequest({ _id: comment._id,author:user._id, ...newcmt }));
        handleOk()
        Cmtoptionclose()
    }, [dispatch, newcmt, comment, Cmtoptionclose,handleOk,user]);
    const deletehandler = React.useCallback(() => {
        dispatch(actions.deleteComments.deleteCommentsRequest(comment._id))
    }, [comment, dispatch])
    return (
        <>
            <Card className={classes.card} key={comment._id}>
                <CardHeader
                    avatar={
                        comment.isAnonymous ? (
                            <img src={animal.avatar} alt={`${animal.name} Avatar`} />
                        ) : (
                            <img src={comment.author.avatar} alt={comment.author.fullName} />
                        )
                    }
                    title={
                        comment.isAnonymous ? `Anonymous ${animal.name}` : comment.author.fullName
                    }
                    subheader={moment(comment.createdAt).format("LLL")}
                    action={
                        <IconButton onClick={viewModal} title="Edit comment">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography variant="body2" component="p" color="textSecondary">
                        {comment.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        onClick={onLikecmtClick}
                        style={{ color: likecmtActive ? "red" : "" }}
                    >
                        <FavoriteIcon />
                        <Typography component="span" color="textSecondary"></Typography>
                    </IconButton>
                    <IconButton
                        onClick={onDislikecmtClick}
                        style={{ color: dislikecmtActive ? "blue" : "" }}
                    >
                        -<FavoriteIcon />
                        <Typography component="span" color="textSecondary"></Typography>
                    </IconButton>
                    {`${comment.likeCount} likes`}
                </CardActions>
            </Card>
            <Modal
                open={CmtEdit}
                onOk={handleOk}
                onCancel={handleOk}
                footer={null}
                className="container"
            >
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12} lg={12}>
                        <center>Option</center>
                    </Grid>
                    <Grid item xs={12} lg={12} >
                        <Button
                            type="primary"
                            block
                            style={{ marginBottom: "10px" }}
                            onClick={Cmtoptionopen}
                        >
                            Update
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={12} >
                        <Button
                            type="primary"
                            block
                            onClick={deletehandler}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
            <Modal
                open={Cmtoption}
                onOk={handleoption}
                onCancel={handleoption}
                footer={null}
                className="container"
            >
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12} lg={12} >
                        <Button
                            type="primary"
                            block
                        >
                            Report
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
            <Modal
                open={Cmtupdate}
                onOk={Cmtoptionclose}
                onCancel={Cmtoptionclose}
                footer={null}
                className="container" >
                <Grid item xs={12} lg={12}>
                    <center>Update comment</center>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextArea placeholder="Any comments ?" className="idea-create" allowClear
                        size="large"
                        onChange={(e) =>
                            setnewcmt({
                                content: e.target.value,
                            })
                        }
                        required />
                </Grid>
                <Grid item xs={12} lg={12} >
                        <Button
                            type="primary"
                            block
                            style={{ marginBottom: "10px" }}
                            onClick={updatecmthandler}
                        >
                            Update
                        </Button>
                    </Grid>
            </Modal>
        </>
    );
}