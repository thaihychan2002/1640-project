import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import { Grid } from '@material-ui/core';
import Post from './Post';
import IdeaBox from '../IdeaBox';
import { postsState$ } from '../../redux/seclectors';

export default function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);

    React.useEffect(() => { dispatch(actions.getPosts.getPostsRequest()); }, [dispatch]);
    return (
        <Grid container spacing={2} alignItems='stretch'>
            <Grid item xs={12} sm={12}>
                <IdeaBox></IdeaBox>
            </Grid>
            {posts.map((post) => (
                <Grid item xs={12} sm={12} key={post._id} >
                    <Post post={post} />
                </Grid>
            ))}
        </Grid>
    );
}
