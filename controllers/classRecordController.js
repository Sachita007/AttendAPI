
const ClassRecord = require('./../models/ClassRecord');
const APIFeatures = require('./../utils/apiFeatures');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');

// Utility for async/await error handling

// Create a class record
exports.createClassRecord = tryCatch(async (req, res, next) => {
    const newClassRecord = await ClassRecord.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            classRecord: newClassRecord
        }
    });
});

// Get class record by class ID with populated students
// Get class record by class ID with populated students
exports.getClassRecordByClassId = tryCatch(async (req, res, next) => {
    const classId = req.params.classId;

    try {
        // Find the class record by class ID and populate the students field
        const classRecord = await ClassRecord.findOne({ class: classId }).populate({
            path: 'students.student',
            select: '-createdAt -role -updatedAt -cpassword -password' // Assuming 'name' is a field in the 'User' model representing student name
        });

        if (!classRecord) {
            return next(new AppError('No class record found for that class ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                classRecord
            }
        });
    } catch (err) {
        console.error(err);
        return next(new AppError('Internal server error', 500));
    }
});


exports.updateAttendance = tryCatch(async (req, res, next) => {
    const classId = req.params.classId
    const { attendance } = req.body;

    const classRecord = await ClassRecord.findOne({ class: classId });

    if (!classRecord) {
        return next(new AppError('Class record not found', 404));
    }

    // Update the number of classes
    classRecord.noOfClass += 1;

    // Loop through the attendance array and update classAttended for each student
    attendance.forEach((studentData) => {
        const studentIndex = classRecord.students.findIndex(student => String(student.student) === studentData.student);
        if (studentData.status == 'Present') {
            if (studentIndex !== -1) {
                classRecord.students[studentIndex].classAttended += 1;
            }
        }
    });

    // Save the updated class record
    await classRecord.save();

    req.body = attendance
    next()
});

// Update a class record by class ID
exports.updateClassRecordByClassId = tryCatch(async (req, res, next) => {
    const classId = req.params.classId;
    const updatedClassRecord = await ClassRecord.findOneAndUpdate({ class: classId }, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedClassRecord) {
        return next(new AppError('No class record found for that class ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            classRecord: updatedClassRecord
        }
    });
});

// Delete a class record by class ID
exports.deleteClassRecordByClassId = tryCatch(async (req, res, next) => {
    const classId = req.params.classId;
    const deletedClassRecord = await ClassRecord.findOneAndDelete({ class: classId });

    if (!deletedClassRecord) {
        return next(new AppError('No class record found for that class ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.addStudentToClass = tryCatch(async (req, res, next) => {
    const { classId, studentId } = req.params;

    try {
        // Find the class record
        const classRecord = await ClassRecord.findOne({ class: classId });

        if (!classRecord) {
            return next(new AppError('No class record found for that class ID', 404));
        }

        // Check if student already exists in the class
        const existingStudent = classRecord.students.find(student => String(student.student) === studentId);
        if (existingStudent) {
            return next(new AppError('Student is already enrolled in this class', 400));
        }

        // Add the student to the class
        classRecord.students.push({ student: studentId });
        await classRecord.save();

        res.status(200).json({
            status: 'success',
            data: {
                classRecord
            }
        });
    } catch (err) {
        console.error(err);
        return next(new AppError('Internal server error', 500));
    }
});
// Delete student from class
exports.deleteStudentFromClass = tryCatch(async (req, res, next) => {
    const { classId, studentId } = req.params;

    try {
        // Find the class record
        const classRecord = await ClassRecord.findOne({ class: classId });

        if (!classRecord) {
            return next(new AppError('No class record found for that class ID', 404));
        }

        // Check if student exists in the class
        const existingStudentIndex = classRecord.students.findIndex(student => String(student.student) === studentId);
        if (existingStudentIndex === -1) {
            return next(new AppError('Student is not enrolled in this class', 400));
        }

        // Remove the student from the class
        classRecord.students.splice(existingStudentIndex, 1);
        await classRecord.save();

        res.status(200).json({
            status: 'success',
            data: {
                classRecord
            }
        });
    } catch (err) {
        console.error(err);
        return next(new AppError('Internal server error', 500));
    }
});
