import { ActionLogModel } from '../model/actionLogs.js'

export const getAction = async (req, res) => {
    try {
        const action = await ActionLogModel.find()
            .populate('author')
            .populate('postID')
            .exec()
        res.status(200).json(action)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
export const createAction = async (req, res) => {
    try {
        const newAction = req.body
        const addnewAction = new ActionLogModel(newAction)
        await addnewAction.save()
        const action = await ActionLogModel.find()
            .populate('author')
            .populate('postID')
            .exec()
        res.status(200).json(action)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
export const updateAction = async (req, res) => {
    try {
        const updateAction = req.body
        const updatedaction = await ActionLogModel.findByIdAndUpdate(
            { _id: updateAction._id },
            updateAction,
            { new: true }
        )
            .populate('author')
            .populate('postID')
            .exec()
        const action = await ActionLogModel.find()
            .populate('author')
            .populate('postID')
            .exec()
        res.status(200).json(action)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}
export const filterAction = async (req, res) => {
    try {
        const Action = req.body
        const filteredaction = await ActionLogModel.find({ author:Action.author})
            .populate('author')
            .populate('postID')
            .exec()
        res.status(200).json(filteredaction)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}