const User = require('../models/User'); // Assuming userModel.js is in the same directory
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ClassRecord = require('../models/ClassRecord'); // Import the ClassRecord model

dotenv.config({ path: "./.env" });

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODB_SERVER_LINK).then(() => {
        console.log("Connected");
    });
}



// Function to generate random Indian names
function generateIndianName() {
    const firstNames = ['Aarav', 'Aarna', 'Advait', 'Akhil', 'Anaya', 'Arjun', 'Ishaan', 'Kavya', 'Krishna', 'Neha'];
    const lastNames = ['Sharma', 'Patel', 'Khan', 'Reddy', 'Gupta', 'Kumar', 'Singh', 'Shah', 'Rao', 'Malhotra'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return { firstName, lastName };
}

// Function to generate random email addresses
function generateEmail(firstName, lastName) {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    const username = firstName.toLowerCase() + lastName.toLowerCase() + Math.floor(Math.random() * 100);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${domain}`;
}

// Generate 50 students
async function generateStudents(subjectId) {
    const students = [];
    for (let i = 0; i < 50; i++) {
        const { firstName, lastName } = generateIndianName();
        const email = generateEmail(firstName, lastName);
        const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
        const password = 'password123'; // You might want to generate random passwords
        const role = 'Student';
        const cpassword = 'password123';
        const subject = [subjectId]

        const student = await User.create({ username, email, firstName, lastName, password, subject, cpassword, role });
        students.push(student._id);
    }
    return students;
}

// Function to create class record if it doesn't exist
async function createClassRecordIfNotExists(classId) {
    try {
        const existingRecord = await ClassRecord.findOne({ class: classId });
        if (!existingRecord) {
            await ClassRecord.create({ class: classId });
            console.log('Class record created.');
        } else {
            console.log('Class record already exists.');
        }
    } catch (error) {
        console.error('Error creating class record:', error);
    }
}

// Add students to the class record
async function addStudentsToClass(classId, studentIds) {
    try {
        const classRecord = await ClassRecord.findOneAndUpdate(
            { class: classId },
            { $addToSet: { students: { $each: studentIds.map(id => ({ student: id })) } } },
            { new: true }
        );
        console.log('Students added to class record:', classRecord);
    } catch (error) {
        console.error('Error adding students to class record:', error);
    }
}

// Call the functions to create class record (if needed), generate students, and add them to the class record
(async () => {
    try {
        const subjectId = '661a7c6e6048bc8fbed38605';
        const classId = '661b289bb50ece57f8566803';

        await createClassRecordIfNotExists(classId);

        const studentIds = await generateStudents(subjectId);
        await addStudentsToClass(classId, studentIds);

        // Disconnect from MongoDB
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
})();