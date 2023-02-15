import express from 'express';
import { deleteDepartment,createDepartment, getDepartment } from '../controller/departments.js';
const router = express.Router();
router.get('/',getDepartment);
router.post('/create',createDepartment);
router.post('/delete',deleteDepartment);

export default router;