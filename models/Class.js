const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
            max: 8 // Assuming a typical B.Tech course with 8 semesters
        },
        dayOfWeek: [{
            type: String,
            required: true,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }],
        startTime: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ }, // Ensures time format "HH:MM"
        endTime: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ }, // Ensures time format "HH:MM"
        topic: { type: String, required: true },
        branch: { type: String, required: true }, // e.g., Computer Science, Mechanical
        section: { type: String, required: true }, // e.g., A, B, C
        type: { type: String, required: true, enum: ['Theory', 'Practical'] },
        roomNo: { type: Number, required: true },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
