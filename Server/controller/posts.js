import { PostModel } from '../model/posts.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
    // console.log("posts", posts);
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const createPosts = async (req, res) => {
  try {
    const newPost = req.body
    const post = new PostModel(newPost)
    await post.save()
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updatePosts = async (req, res) => {
  try {
    const updatePosts = req.body
    const post = await PostModel.findByIdAndUpdate(
      { _id: updatePosts._id },
      {updatePosts},
      { new: true }
    )
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const deletePosts = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params._id)
    if (post) {
      if (post.author === req.body.author) {
        await post.remove()
        res.send({ message: 'User Deleted' })
      }
    } else {
      res.status(404).send({ message: 'Cannot delete other post' })
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
