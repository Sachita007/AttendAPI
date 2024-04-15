const mongoose = require("mongoose");
const Subject = require("./models/Subject");
const Class = require("./models/Class");

// Function to generate random time within a range
function generateRandomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// MongoDB connection setup
mongoose.connect("mongodb+srv://zoro:zoro@cluster0.5ljqocp.mongodb.net/AttendAPi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Connected to MongoDB");

    // Real subjects for B.Tech in ECE
    const subjectsData = [
        {
            title: "Analog Electronic Circuits",
            code: "EC203",
            credits: 4,
            type: "Theory",
            semester: 3,
            department: "ECE",
            syllabus: "Study of analog electronic circuits.",
            prerequisites: []
        },
        {
            title: "Digital Signal Processing",
            code: "EC304",
            credits: 4,
            type: "Theory",
            semester: 4,
            department: "ECE",
            syllabus: "Introduction to digital signal processing techniques.",
            prerequisites: []
        },
        {
            title: "Microprocessors and Microcontrollers",
            code: "EC305",
            credits: 4,
            type: "Theory",
            semester: 5,
            department: "ECE",
            syllabus: "Study of microprocessors and microcontrollers.",
            prerequisites: []
        },
        {
            title: "Communication Engineering",
            code: "EC406",
            credits: 4,
            type: "Theory",
            semester: 6,
            department: "ECE",
            syllabus: "Fundamentals of communication engineering.",
            prerequisites: []
        },
        {
            title: "VLSI Design",
            code: "EC507",
            credits: 4,
            type: "Theory",
            semester: 7,
            department: "ECE",
            syllabus: "Study of very large-scale integration design.",
            prerequisites: []
        }
    ];

    // Create subjects
    const subjects = await Subject.insertMany(subjectsData);

    // Create classes for each subject with random timings
    const teacherId = "661a725ee0094eba63079cb2"; // Teacher ID
    const classes = [];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    subjects.forEach(subject => {
        daysOfWeek.forEach(day => {
            const startTime = generateRandomTime(); // Generate random start time
            const endTime = generateRandomTime(); // Generate random end time
            const classObj = new Class({
                subject: subject._id,
                semester: subject.semester,
                dayOfWeek: [day],
                startTime: startTime,
                endTime: endTime,
                topic: `Topic for ${subject.title}`,
                branch: "ECE",
                section: "A",
                type: subject.type,
                roomNo: 101,
                teacher: teacherId
            });
            classes.push(classObj);
        });
    });

    // Save classes to database
    await Class.insertMany(classes);

    console.log("Subjects:", subjects);
    console.log("Classes:", classes);

    // Disconnect from MongoDB after completing operations
    await mongoose.disconnect();
}).catch(error => {
    console.error("Error connecting to MongoDB:", error);
});
