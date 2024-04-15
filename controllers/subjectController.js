const Subject = require('../models/Subject');
const APIFeatures = require('./../utils/apiFeatures');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');

// Controller function to create a new subject
exports.createSubject = tryCatch(async (req, res, next) => {
    const subject = await Subject.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            subject
        }
    });
});

// Controller function to get all subjects
exports.getAllSubjects = tryCatch(async (req, res, next) => {
    // Initialize the query with the Subject model
    let query = Subject.find();

    // Initialize APIFeatures with the query and query string
    const features = new APIFeatures(query, req.query)
        .filter()
        .sorting()
        .limitFields()
        .pagination();

    // Execute the query
    const subjects = await features.query;

    res.status(200).json({
        status: 'success',
        results: subjects.length,
        data: {
            subjects
        }
    });
});

// Controller function to get a subject by ID
exports.getSubjectById = tryCatch(async (req, res, next) => {
    console.log(req.params)
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
        return next(new AppError('Subject not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            subject
        }
    });
});

// Controller function to update a subject by ID
exports.updateSubjectById = tryCatch(async (req, res, next) => {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!subject) {
        return next(new AppError('Subject not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            subject
        }
    });
});

// Controller function to delete a subject by ID
exports.deleteSubjectById = tryCatch(async (req, res, next) => {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
        return next(new AppError('Subject not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
