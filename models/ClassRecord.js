const mongoose = require('mongoose');

const classRecordSchema = new mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    noOfClass: { type: Number, default: 0 },
    attendRecord: [{ date: { type: Date }, per: { type: Number } }],
    students: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Assuming 'User' represents the student model 
        },
        classAttended: { type: Number, default: 0 }
    }],
}, { timestamps: true });

const ClassRecord = mongoose.model('ClassRecord', classRecordSchema);

module.exports = ClassRecord;
