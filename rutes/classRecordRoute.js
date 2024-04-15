const express = require("express");
const router = express.Router();
const attendanceControllers = require('../controllers/AttendanceControllers')
const classRecordController = require('./../controllers/classRecordController')

router.route("/:classId").get(classRecordController.getClassRecordByClassId)

module.exports = router;