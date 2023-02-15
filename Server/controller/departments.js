import { DepartmentModel } from "../model/departments.js";
export const getDepartment = async (req, res) => {
    try {
        const department = await DepartmentModel.find();
        res.status(200).json(department);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const createDepartment = async (req, res) => {
    try {
        const newDepartment = req.body;
        const department = new DepartmentModel({ newDepartment });
        await department.save();
        res.status(200).json(department);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
export const deleteDepartment = async (req, res) => {
    try {
        const deleteDepartment = req.body;
        const department = await DepartmentModel.findOneAndDelete(
            { _id: deleteDepartment._id },
            deleteDepartment,
            { new: true }
        );
        res.status(200).json(department);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};