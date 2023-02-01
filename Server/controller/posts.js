import { PostModel } from "../model/PostModel.js";

export const getPosts = async (req, res) => {
    try {
        // const post = new PostModel({
        //     title: 'test',
        //     content: 'this is a test',
        //     author: 'hychan'
        // });
        // post.save();
        const posts = await PostModel.find();
        console.log('posts', posts)
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
export const createPosts = async (req, res) => {
    try {
        const newPost = req.body;
        const post = new PostModel({ newPost });
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
export const updatePosts = async (req, res) => {
    try {
        const updatePosts = req.body;
        const post = PostModel.findOneAndUpdate(
            { _id: updatePosts._id },
            updatePosts,
            { new: true });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}