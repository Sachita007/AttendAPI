const express = require('express');
const app = express();
const globalErrorHandler = require('./controllers/errorController')
const userRouter = require("./rutes/UserRoutes")
const subjectRouters = require('./rutes/SubjectRoutes')
const classRoutes = require("./rutes/ClassRoutes")
const classControllers = require("./controllers/classControllers")
const attendanceRoute = require("./rutes/attendanceRoute")
const classRecordRoute = require("./rutes/classRecordRoute")





app.use(express.json());

app.use('/api/v1/user', userRouter)
app.use("/api/v1/classrecord", classRecordRoute)
app.use("/api/v1/attendance", attendanceRoute)
app.use('/api/v1/teacher/classes/:teacherId', classControllers.getClassesByTeacherId)
app.use('/api/v1/subject', subjectRouters)
app.use('/api/v1/class', classRoutes)

// app.use("/app/v1/products", productRouter)


// app.use("/app/v1/users", userRouter)

// app.use("/app/v1/carts", cartRouter)



app.use(globalErrorHandler)

module.exports = app
