const express = require("express");
const router = express.Router();
const attendanceControllers = require('../controllers/AttendanceControllers')
const classRecordController = require('../controllers/classRecordController')

router.route("/:classId").post(classRecordController.updateAttendance, attendanceControllers.createAttendanceRecord).get(attendanceControllers.getAllAttendanceRecords)
router.route("/student/:userId").get(attendanceControllers.getUserAttendanceRecords)
router.route("/:id").put(attendanceControllers.updateAttendanceRecord).delete(attendanceControllers.deleteAttendanceRecord)
router.route("/class/:classId").get(attendanceControllers.getTeacherClassAttendanceRecords)
router.route("/").post(attendanceControllers.getAttendanceRecordsByMultipleClasses)


module.exports = router;