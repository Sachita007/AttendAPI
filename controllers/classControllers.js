// Import dependencies

const Class = require('./../models/Class');
const APIFeatures = require('./../utils/apiFeatures');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');


// Utility for async/await error handling

// Get all classes
exports.getAllClasses = tryCatch(async (req, res, next) => {
    let query = Class.find()
        .populate({
            path: 'subject',
            select: '-__v -createdAt -updatedAt'
        })
        .populate({
            path: 'teacher', // Assuming that 'user' replaces 'teacher'
            select: 'username email role subject -_id' // Example fields, adjust as necessary
        });

    const features = new APIFeatures(query, req.query)
        .filter()
        .sorting()
        .limitFields()
        .pagination();
    const classes = await features.query;

    res.status(200).json({
        status: 'success',
        results: classes.length,
        data: {
            classes
        }
    });
});

// Get a single class by ID
exports.getClass = tryCatch(async (req, res, next) => {
    const classData = await Class.findById(req.params.id)
        .populate('subject')
        .populate({
            path: 'teacher', // Assuming that 'user' replaces 'teacher'
            select: 'username email role subject -_id' // Example fields, adjust as necessary
        });

    if (!classData) {
        return next(new AppError('No class found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            class: classData
        }
    });
});

// Create a new class
exports.createClass = tryCatch(async (req, res, next) => {
    const newClass = await Class.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            class: newClass
        }
    });
});

// Update a class
exports.updateClass = tryCatch(async (req, res, next) => {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).populate({
        path: 'teacher',
        select: 'username email role subject -_id'
    });

    if (!updatedClass) {
        return next(new AppError('No class found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            class: updatedClass
        }
    });
});

// Delete a class
exports.deleteClass = tryCatch(async (req, res, next) => {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) {
        return next(new AppError('No class found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});




// Get all classes of a teacher by teacher ID
exports.getClassesByTeacherId = tryCatch(async (req, res, next) => {
    const teacherId = req.params.teacherId;

    // Initialize the query with the Class model
    let query = Class.find({ teacher: teacherId });

    // Initialize APIFeatures with the query and query string
    const features = new APIFeatures(query, req.query)
        .filter()
        .sorting()
        .limitFields()
        .pagination();

    // Execute the query
    const classes = await features.query;

    if (!classes || classes.length === 0) {
        return next(new AppError('No classes found for that teacher ID', 404));
    }

    res.status(200).json({
        status: 'success',
        results: classes.length,
        data: {
            classes
        }
    });
});
