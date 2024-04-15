const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Excused'], required: true },
    date: { type: Date, required: true },
    // Additional fields
    reason: { type: String }, // Reason for absence or excused absence
    remarks: { type: String }, // Any additional remarks or notes
    // You can add more fields as per your application requirements
}, { timestamps: true });

const AttendanceRecord = mongoose.model('AttendanceRecord', attendanceRecordSchema);

module.exports = AttendanceRecord;
