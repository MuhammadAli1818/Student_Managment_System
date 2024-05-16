#! /usr/bin/env node
import inquirer from "inquirer";
console.log("\n\t\t<<<=============================>>>");
console.log("\t<<<========== Code with Muhammad Ali ==========>>>");
console.log("\t\t<<<=============================>>>\n");
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = ++Student.counter;
        this.name = name;
        this.courses = [];
        this.balance = 400;
    }
    // method to enroll in a course
    enroll_course(courseName) {
        this.courses.push(courseName);
    }
    // method to view student balance
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    // method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`Fees paid for ${this.name}: $${amount}`);
    }
    // method to display student status
    display_status() {
        console.log("\n<<<=============================>>>");
        console.log(`\nStudent Status:`);
        console.log(`\tID: ${this.id}`);
        console.log(`\tName: ${this.name}`);
        console.log(`\tCourses: ${this.courses.join(", ")}`);
        console.log(`\tBalance: $${this.balance}\n`);
        console.log("<<<=============================>>>\n");
    }
}
// define a student_manager class to manage student
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // method to add a new student
    add_student(name) {
        const student = new Student(name);
        this.students.push(student);
        console.log(`Students: ${name} added successfully. Student ID: ${student.id}`);
    }
    // method to enroll a student in a course
    enroll_student(studentId, courseName) {
        const student = this.find_student(studentId);
        if (student) {
            student.enroll_course(courseName);
            console.log(`${student.name} enrolled in ${courseName} successfully`);
        }
    }
    // method to view student balance
    view_balance(studentId) {
        const student = this.find_student(studentId);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(`Student with ID ${studentId} not found`);
        }
    }
    // method to pay student fees
    pay_fees(studentId, amount) {
        const student = this.find_student(studentId);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(`Student with ID ${studentId} not found`);
        }
    }
    // method to display student status
    display_status(studentId) {
        const student = this.find_student(studentId);
        if (student) {
            student.display_status();
        }
        else {
            console.log(`Student with ID ${studentId} not found`);
        }
    }
    // method to find a student by student id
    find_student(studentId) {
        return this.students.find((student) => student.id === studentId);
    }
}
// define a main function to run the program
async function main() {
    const manager = new student_manager();
    console.log("Welcome to the Student Management System!");
    console.log("-".repeat(50));
    // prompt the user to select an action
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Select an action:",
                choices: [
                    "Add Student",
                    "Enroll Student in Course",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Display Student Status",
                    "Exit",
                ],
            },
        ]);
        if (action === "Add Student") {
            const { name } = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter the name of the student:",
                },
            ]);
            manager.add_student(name);
        }
        else if (action === "Enroll Student in Course") {
            const { studentId, courseName } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studentId",
                    message: "Enter the ID of the student:",
                },
                {
                    type: "input",
                    name: "courseName",
                    message: "Enter the name of the course:",
                },
            ]);
            manager.enroll_student(parseInt(studentId), courseName);
        }
        else if (action === "View Student Balance") {
            const { studentId } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studentId",
                    message: "Enter the ID of the student:",
                },
            ]);
            manager.view_balance(parseInt(studentId));
        }
        else if (action === "Pay Student Fees") {
            const { studentId, amount } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studentId",
                    message: "Enter the ID of the student:",
                },
                {
                    type: "input",
                    name: "amount",
                    message: "Enter the amount to pay:",
                },
            ]);
            manager.pay_fees(parseInt(studentId), parseFloat(amount));
        }
        else if (action === "Display Student Status") {
            const { studentId } = await inquirer.prompt([
                {
                    type: "input",
                    name: "studentId",
                    message: "Enter the ID of the student:",
                },
            ]);
            manager.display_status(parseInt(studentId));
        }
        else {
            console.log("Thank you for using the Student Management System!");
            console.log("Exiting...");
            process.exit();
        }
    }
}
// call the main function to start the program
main();
