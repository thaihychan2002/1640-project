import React from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import moment from 'moment'
import { useDispatch } from "react-redux";
import useStyles from './styles.js'
import { updatePosts } from "../../../redux/actions/index.js";

export default function Post({ post }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [likeactive, setlikeactive] = React.useState(false)
    const [dislikeactive, setdislikeactive] = React.useState(false)
    const onLikeBtnClick = React.useCallback(() => {
        if(likeactive){
            setlikeactive(false)
            dispatch(updatePosts.updatePostsRequest({ ...post, likeCount: post.likeCount - 1 }));
        }else{
            setlikeactive(true)
            dispatch(updatePosts.updatePostsRequest({ ...post, likeCount: post.likeCount + 1 }));
            if(dislikeactive){
                setdislikeactive(false)
                dispatch(updatePosts.updatePostsRequest({ ...post, likeCount: post.likeCount + 2 }));
            }
        }
    }, [dispatch, post,likeactive,dislikeactive]);
    const onDislikeBtnClick = React.useCallback(() => {
        if(dislikeactive){
            setdislikeactive(false)
            dispatch(updatePosts.updatePostsRequest({ ...post, likeCount: post.likeCount + 1 }));
        }else{
            setdislikeactive(true)
            dispatch(updatePosts.updatePostsRequest({ ...post, likeCount: post.likeCount - 1 }));
            if(likeactive){
                setlikeactive(false)
                dispatch(updatePosts.updatePostsRequest({ ...post, likeCount: post.likeCount - 2 }));
            }
        }
    }, [dispatch, post,likeactive,dislikeactive]);
    return (<Card>
        <CardHeader
            avatar={<Avatar>A</Avatar>}
            title={post.author}
            subheader={moment(post.updatedAt).format('HH:MM MM DD,YYYY')}
            action={
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            }
        ></CardHeader>
        <CardMedia image={post.attachment || ''} title='image' className={classes.media}></CardMedia>
        <CardContent>
            <Typography variant="h5" color="textPrimary">{post.title}</Typography>
            <Typography variant="body2" component='p' color="textSecondary">{post.content}</Typography>
        </CardContent>
        <CardActions>
            <IconButton onClick={onLikeBtnClick} style={{color: likeactive ?'red':''}}>
                <FavoriteIcon />
                <Typography component='span' color='textSecondary'>
                </Typography>
            </IconButton>
            <IconButton onClick={onDislikeBtnClick} style={{color: dislikeactive ?'blue':''}}>
                -<FavoriteIcon/>
                <Typography component='span' color='textSecondary'> 
                </Typography>
            </IconButton>
            {`${post.likeCount} likes`}
        </CardActions>
    </Card>
    );
}