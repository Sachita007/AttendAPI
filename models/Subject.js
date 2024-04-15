const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    credits: { type: Number, required: true },
    type: { type: String, required: true, enum: ['Theory', 'Practical'] },
    semester: { type: Number, required: true }, // Semester number
    department: { type: String, required: true }, // Department name
    syllabus: { type: String }, // Syllabus details
    prerequisites: { type: [String] }, // Array of prerequisite subject codes
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;