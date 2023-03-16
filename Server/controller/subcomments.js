import { SubcommentModel } from '../model/subcomments.js'
import { CommentModel } from '../model/comments.js'
import { transporter } from '../utils.js'


export const getSubcomment = async (req, res) => {
    try {
        const newsubcomment = req.body
        const subcomment = await SubcommentModel.find()
            .sort({ createdAt: -1 })
            .populate('author')
            .populate('postID')
            .populate('commentID')
            .exec()
        res.status(200).json(subcomment)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const createSubcomment = async (req, res) => {
    try {
        const newSubcomment = req.body
        const comment = await CommentModel.findOne({ _id: req.body.commentID })
            .populate('author')
            .exec()
        const addsubcomment = new SubcommentModel(newSubcomment)
        await addsubcomment.save()
        const subcomment = await SubcommentModel.findOne({ commentID: req.body.commentID, _id: addsubcomment._id })
            .populate('author')
            .populate('postID')
            .populate('commentID')
            .exec()
        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: `${comment.author.email}`,
            subject: 'Someone has reply on your comment',
            text: 'Hello there, your comment received a reply. Check it now',
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred: ' + error.message)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
        const mailers = await SubcommentModel.find({ commentID: req.body.commentID })
            .populate('author')
            .populate('postID')
            .populate('commentID')
            .exec()
        mailers?.filter((mail) => mail?.commentID?._id !== comment._id && mail?.author?._id !== subcomment?.author?._id).map((mail) => {
            transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: `${mail.author.email}`,
                subject: 'Your activity have a new interact',
                text: 'Hello there, your activity have a new interact. Check it now',
            }, (error, info) => {
                if (error) {
                    console.log('Error occurred: ' + error.message)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
        })
        res.status(200).json(subcomment)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
export const deleteSubcomment = async (req, res) => {
    try {
        const deleteSubcomment = req.params.id
        const subcomment = await SubcommentModel.findByIdAndDelete(deleteSubcomment, {
            new: true,
        })
        res.status(200).json(subcomment)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
export const updateSubcomment = async (req, res) => {
    try {
        const updateSubcomment = req.body
        const subcomment = await SubcommentModel.findByIdAndUpdate(
            { _id: updateSubcomment._id },
            updateSubcomment,
            { new: true }
        )
            .populate('author')
            .populate('postID')
            .populate('commentID')
        res.status(200).json(subcomment)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}