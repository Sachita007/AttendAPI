const express = require("express");
const router = express.Router();
const classControllers = require('./../controllers/classControllers')
const classRecordController = require("./../controllers/classRecordController")

router.route("/").post(classControllers.createClass).get(classControllers.getAllClasses);
router.route("/:id").put(classControllers.updateClass).get(classControllers.getClass).delete(classControllers.deleteClass);
router.route("/studentRecord").post(classRecordController.createClassRecord)
router.route('/studentRecord/:classId').get(classRecordController.getClassRecordByClassId).post(classRecordController.updateClassRecordByClassId).delete(classRecordController.deleteClassRecordByClassId)
router.route('/studentRecord/:classId/:studentId').post(classRecordController.addStudentToClass).delete(classRecordController.deleteStudentFromClass)
// router.route("/teacher/:teacherId").get(classControllers.getClassesByTeacherId)


module.exports = router;