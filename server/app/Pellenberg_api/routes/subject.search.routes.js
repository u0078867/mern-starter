import { Router } from 'express';
import * as SubjectController from '../controllers/subject.search.controller';
const router = new Router();

// Get all Subjects
router.route('/subjects').get(SubjectController.getSubjects);

//export default router;
module.exports = router;
