import { TopicsModel } from '../model/topics.js'
import {
  createTopicSchema,
  updateTopicSchema,
  updateTopicStatusSchema,
} from '../helpers/validation_schema.js'
export const getTopic = async (req, res) => {
  try {
    const topic = await TopicsModel.find()
    res.status(200).json(topic)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const getTopicPaginated = async (req, res) => {
  try {
    const ITEMS_PER_PAGE = 2
    const page = req.query.page || 1
    const query = {}
    const skip = (page - 1) * ITEMS_PER_PAGE
    const countPromise = await TopicsModel.estimatedDocumentCount(query)
    const topicsPromise = await TopicsModel.find(query)
      .limit(ITEMS_PER_PAGE)
      .skip(skip)
    const [count, topics] = await Promise.all([countPromise, topicsPromise])
    const pageCount = Math.ceil(count / ITEMS_PER_PAGE)
    res.send({ pagination: { count, pageCount, ITEMS_PER_PAGE }, topics })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const createTopic = async (req, res, next) => {
  try {
    await createTopicSchema.validateAsync(req.body)
    const newTopic = req.body
    const topic = new TopicsModel(newTopic)
    await topic.save()
    res.status(200).json(topic)
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
export const deleteTopic = async (req, res) => {
  try {
    const deleteTopic = req.params.id
    const topic = await TopicsModel.findByIdAndDelete(deleteTopic, {
      new: true,
    })
    res.status(200).json(topic)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updateTopic = async (req, res, next) => {
  try {
    await updateTopicSchema.validateAsync(req.body)
    const updateTopic = req.body
    const topic = await TopicsModel.findByIdAndUpdate(
      { _id: updateTopic._id },
      updateTopic,
      { new: true }
    )
    res.status(200).json(topic)
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
export const updateTopicStatus = async (req, res, next) => {
  try {
    await updateTopicStatusSchema.validateAsync(req.body)
    const updateTopic = req.body
    const topic = await TopicsModel.findByIdAndUpdate(
      { _id: updateTopic._id },
      updateTopic,
      { new: true }
    )
    res.status(200).json(topic)
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
