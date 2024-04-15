const express = require("express");
const router = express.Router();
const subjectControllers = require('./../controllers/subjectController')

router.route("/").post(subjectControllers.createSubject).get(subjectControllers.getAllSubjects);
router.route("/:id").put(subjectControllers.updateSubjectById).get(subjectControllers.getSubjectById).delete(subjectControllers.deleteSubjectById);


module.exports = router;