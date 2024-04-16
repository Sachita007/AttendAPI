# College Attendance API

> Version 1.0.0

API for managing college attendance, including students, teachers, courses, classes, and timetables.

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| POST | [/users/register](#postusersregister) | Registers a new user |
| POST | [/users/login](#postuserslogin) | Authenticates a user |
| GET | [/students](#getstudents) | Retrieves all students |
| POST | [/students](#poststudents) | Creates a new student |
| GET | [/students/{studentId}](#getstudentsstudentid) | Retrieves a student by ID |
| PUT | [/students/{studentId}](#putstudentsstudentid) | Updates a student |
| DELETE | [/students/{studentId}](#deletestudentsstudentid) | Deletes a student |
| GET | [/teachers](#getteachers) | Retrieves all teachers |
| POST | [/teachers](#postteachers) | Creates a new teacher |
| GET | [/teachers/{teacherId}](#getteachersteacherid) | Retrieves a teacher by ID |
| PUT | [/teachers/{teacherId}](#putteachersteacherid) | Updates a teacher |
| DELETE | [/teachers/{teacherId}](#deleteteachersteacherid) | Deletes a teacher |
| GET | [/courses](#getcourses) | Retrieves all courses |
| POST | [/courses](#postcourses) | Creates a new course |
| GET | [/courses/{courseId}](#getcoursescourseid) | Retrieves a course by ID |
| PUT | [/courses/{courseId}](#putcoursescourseid) | Updates a course |
| DELETE | [/courses/{courseId}](#deletecoursescourseid) | Deletes a course |
| GET | [/classes](#getclasses) | Retrieves all classes |
| POST | [/classes](#postclasses) | Creates a new class |
| GET | [/classes/{classId}](#getclassesclassid) | Retrieves a class by ID |
| PUT | [/classes/{classId}](#putclassesclassid) | Updates a class |
| DELETE | [/classes/{classId}](#deleteclassesclassid) | Deletes a class |
| GET | [/timetables](#gettimetables) | Retrieves all timetables |
| POST | [/timetables](#posttimetables) | Creates a new timetable |
| GET | [/timetables/{timetableId}](#gettimetablestimetableid) | Retrieves a timetable by ID |
| PUT | [/timetables/{timetableId}](#puttimetablestimetableid) | Updates a timetable |
| DELETE | [/timetables/{timetableId}](#deletetimetablestimetableid) | Deletes a timetable |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| Student | [#/components/schemas/Student](#componentsschemasstudent) |  |
| Teacher | [#/components/schemas/Teacher](#componentsschemasteacher) |  |
| Course | [#/components/schemas/Course](#componentsschemascourse) |  |
| Class | [#/components/schemas/Class](#componentsschemasclass) |  |
| Timetable | [#/components/schemas/Timetable](#componentsschemastimetable) |  |

## Path Details

***

### [POST]/users/register

- Summary  
Registers a new user

#### RequestBody

- application/json

```ts
{
  username: string
  password: string
  role: enum[student, teacher]
}
```

#### Responses

- 201 User registered successfully

- 400 Invalid input

***

### [POST]/users/login

- Summary  
Authenticates a user

#### RequestBody

- application/json

```ts
{
  username: string
  password: string
}
```

#### Responses

- 200 User authenticated

- 401 Authentication failed

***

### [GET]/students

- Summary  
Retrieves all students

#### Responses

- 200 A list of students

`application/json`

```ts
{
  firstName: string
  lastName: string
  email: string
  registrationNumber: string
}[]
```

***

### [POST]/students

- Summary  
Creates a new student

#### RequestBody

- application/json

```ts
{
  firstName: string
  lastName: string
  email: string
  registrationNumber: string
}
```

#### Responses

- 201 Student created

- 400 Invalid input

***

### [GET]/students/{studentId}

- Summary  
Retrieves a student by ID

#### Responses

- 200 Student found

`application/json`

```ts
{
  firstName: string
  lastName: string
  email: string
  registrationNumber: string
}
```

- 404 Student not found

***

### [PUT]/students/{studentId}

- Summary  
Updates a student

#### RequestBody

- application/json

```ts
{
  firstName: string
  lastName: string
  email: string
  registrationNumber: string
}
```

#### Responses

- 200 Student updated

- 400 Invalid input

- 404 Student not found

***

### [DELETE]/students/{studentId}

- Summary  
Deletes a student

#### Responses

- 204 Student deleted

- 404 Student not found

***

### [GET]/teachers

- Summary  
Retrieves all teachers

#### Responses

- 200 A list of teachers

`application/json`

```ts
{
  firstName: string
  lastName: string
  email: string
}[]
```

***

### [POST]/teachers

- Summary  
Creates a new teacher

#### RequestBody

- application/json

```ts
{
  firstName: string
  lastName: string
  email: string
}
```

#### Responses

- 201 Teacher created

- 400 Invalid input

***

### [GET]/teachers/{teacherId}

- Summary  
Retrieves a teacher by ID

#### Responses

- 200 Teacher found

`application/json`

```ts
{
  firstName: string
  lastName: string
  email: string
}
```

- 404 Teacher not found

***

### [PUT]/teachers/{teacherId}

- Summary  
Updates a teacher

#### RequestBody

- application/json

```ts
{
  firstName: string
  lastName: string
  email: string
}
```

#### Responses

- 200 Teacher updated

- 400 Invalid input

- 404 Teacher not found

***

### [DELETE]/teachers/{teacherId}

- Summary  
Deletes a teacher

#### Responses

- 204 Teacher deleted

- 404 Teacher not found

***

### [GET]/courses

- Summary  
Retrieves all courses

#### Responses

- 200 A list of courses

`application/json`

```ts
{
  title: string
  code: string
  description: string
}[]
```

***

### [POST]/courses

- Summary  
Creates a new course

#### RequestBody

- application/json

```ts
{
  title: string
  code: string
  description: string
}
```

#### Responses

- 201 Course created

- 400 Invalid input

***

### [GET]/courses/{courseId}

- Summary  
Retrieves a course by ID

#### Responses

- 200 Course found

`application/json`

```ts
{
  title: string
  code: string
  description: string
}
```

- 404 Course not found

***

### [PUT]/courses/{courseId}

- Summary  
Updates a course

#### RequestBody

- application/json

```ts
{
  title: string
  code: string
  description: string
}
```

#### Responses

- 200 Course updated

- 400 Invalid input

- 404 Course not found

***

### [DELETE]/courses/{courseId}

- Summary  
Deletes a course

#### Responses

- 204 Course deleted

- 404 Course not found

***

### [GET]/classes

- Summary  
Retrieves all classes

#### Responses

- 200 A list of classes

`application/json`

```ts
{
  course: string
  teacher: string
}[]
```

***

### [POST]/classes

- Summary  
Creates a new class

#### RequestBody

- application/json

```ts
{
  course: string
  teacher: string
}
```

#### Responses

- 201 Class created

- 400 Invalid input

***

### [GET]/classes/{classId}

- Summary  
Retrieves a class by ID

#### Responses

- 200 Class found

`application/json`

```ts
{
  course: string
  teacher: string
}
```

- 404 Class not found

***

### [PUT]/classes/{classId}

- Summary  
Updates a class

#### RequestBody

- application/json

```ts
{
  course: string
  teacher: string
}
```

#### Responses

- 200 Class updated

- 400 Invalid input

- 404 Class not found

***

### [DELETE]/classes/{classId}

- Summary  
Deletes a class

#### Responses

- 204 Class deleted

- 404 Class not found

***

### [GET]/timetables

- Summary  
Retrieves all timetables

#### Responses

- 200 A list of timetable entries

`application/json`

```ts
{
  class: string
  teacher: string
  dayOfWeek: string
  startTime: string
  endTime: string
}[]
```

***

### [POST]/timetables

- Summary  
Creates a new timetable

#### RequestBody

- application/json

```ts
{
  class: string
  teacher: string
  dayOfWeek: string
  startTime: string
  endTime: string
}
```

#### Responses

- 201 Timetable created

- 400 Invalid input

***

### [GET]/timetables/{timetableId}

- Summary  
Retrieves a timetable by ID

#### Responses

- 200 Timetable found

`application/json`

```ts
{
  class: string
  teacher: string
  dayOfWeek: string
  startTime: string
  endTime: string
}
```

- 404 Timetable not found

***

### [PUT]/timetables/{timetableId}

- Summary  
Updates a timetable

#### RequestBody

- application/json

```ts
{
  class: string
  teacher: string
  dayOfWeek: string
  startTime: string
  endTime: string
}
```

#### Responses

- 200 Timetable updated

- 400 Invalid input

- 404 Timetable not found

***

### [DELETE]/timetables/{timetableId}

- Summary  
Deletes a timetable

#### Responses

- 204 Timetable deleted

- 404 Timetable not found

## References

### #/components/schemas/Student

```ts
{
  firstName: string
  lastName: string
  email: string
  registrationNumber: string
}
```

### #/components/schemas/Teacher

```ts
{
  firstName: string
  lastName: string
  email: string
}
```

### #/components/schemas/Course

```ts
{
  title: string
  code: string
  description: string
}
```

### #/components/schemas/Class

```ts
{
  course: string
  teacher: string
}
```

### #/components/schemas/Timetable

```ts
{
  class: string
  teacher: string
  dayOfWeek: string
  startTime: string
  endTime: string
}
```