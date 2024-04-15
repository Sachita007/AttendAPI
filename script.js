const User = require('./models/User'); // Assuming userModel.js is in the same directory
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODB_SERVER_LINK).then(() => {
        console.log("Connected");
    });
}

// Dummy subject IDs for students
const subjects = [
    "661a7c516048bc8fbed385fd",
    "661a7c596048bc8fbed385ff",
    "661a7c606048bc8fbed38601",
    "661a7c676048bc8fbed38603",
    "661a7c6e6048bc8fbed38605",
    "661a7c776048bc8fbed38607",
    "661a7c7e6048bc8fbed38609",
    "661a7c866048bc8fbed3860b"
];

// Indian names for dummy students
const indianNames = [
    "Aarav", "Aarohi", "Aditya", "Aisha", "Akash", "Ananya", "Arjun", "Aryan", "Dia", "Divya",
    "Esha", "Ishaan", "Jai", "Kabir", "Krish", "Mahi", "Meera", "Neha", "Rohan", "Saanvi",
    "Shreya", "Tara", "Ved", "Vihaan", "Zoya"
];

// Function to generate dummy student data
function generateDummyStudents(numStudents) {
    const students = [];
    for (let i = 1; i <= numStudents; i++) {
        const username = `student${i}`;
        const email = `student${i}@example.com`;
        const password = "password123"; // You might want to generate random passwords
        const firstName = indianNames[Math.floor(Math.random() * indianNames.length)];
        const lastName = `Surname${i}`;
        const role = "Student";
        const subjectIDs = getRandomSubjects(); // Randomly select subjects for each student
        const cpassword = password; // Assuming confirmation password is same as password
        students.push({
            username,
            email,
            password,
            firstName,
            lastName,
            role,
            subject: subjectIDs,
            cpassword
        });
    }
    return students;
}

// Function to get random subject IDs for each student
function getRandomSubjects() {
    const numSubjects = Math.floor(Math.random() * 4) + 1; // Randomly select 1 to 4 subjects
    const shuffledSubjects = subjects.sort(() => 0.5 - Math.random()); // Shuffle subjects array
    return shuffledSubjects.slice(0, numSubjects); // Select first numSubjects subjects
}

// Generate 10 dummy students
const dummyStudents = generateDummyStudents(20);

// Save dummy students to database
User.insertMany(dummyStudents)
    .then((docs) => {
        console.log(`${docs.length} students inserted.`);
    })
    .catch((err) => {
        console.error(err);
    });
