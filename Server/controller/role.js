import { RoleModel } from '../model/role.js'
export const getRole = async (req, res) => {
  try {
    const role = await RoleModel.find({})
    res.send(role)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
}
export const createRole = async (req, res) => {
  try {
    await createRoleSchema.validateAsync(req.body)
    const newRole = req.body
    const role = new RoleModel(newRole)
    await role.save()
    res.status(200).json(role)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
}
export const deleteRole = async (req, res) => {
  try {
    const deleteRole = req.params.id
    const role = await RoleModel.findByIdAndDelete(deleteRole, { new: true })
    res.status(200).json(role)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updateRole = async (req, res) => {
  try {
    const updateRole = req.body
    const role = await RoleModel.findByIdAndUpdate(
      { _id: updateRole._id },
      updateRole,
      { new: true }
    )
    res.status(200).json(role)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
