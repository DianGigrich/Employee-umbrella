const inquirer = require("inquirer")

async function beginInquiry() {
    try {
        const entryList = inquirer.prompt([
            {
                type: "list",
                message: "Select an option:",
                name: "firstList",
                choices: ["View All Departmets", "View All Roles", "View All Employees", "Add A Department", "Add A Roll", "Add An Employee", "Update An Employee Role"]
            }
        ])

        switch (entryList) {
            case "View All Departments":
                viewAllDepartments()
                break;
            case "View All Roles":
                viewAllRoles()
                break;
            case "View All Employees":
                viewAllEmployees()
                break;
            case "Add A Department":
                addADepartment()
                break;
            case "Add A Roll":
                addARoll()
                break;
            case "Add An Employee":
                addAnEmployee()
                break;
            case "Update An Employee Role":
                updateEmployee()
                break;
        }







    } catch (err) {
        console.log(err)
    }

}


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewAllDepartments(){
    `SELECT * FROM department;`

}
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles(){
    `SELECT * FROM roles;`
}
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees(){
   `SELECT * FROM employees;`
}
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addADepartment() {
    inquirer.prompt ([
        {
            type: "input",
            message: "Please enter a new department",
            name: "addDepartment"
        },{
            type: "confirm",
            message: "Would you like to return to the main menu?",
            name: "returnMainMenu"
        }
        
    ]).then((response) => {
        `INSERT INTO department (name)
        VALUES ("${response.name}");
        SELECT * FROM department;`
        if (response.returnMainMenu) {
            beginInquiry()
        } else {
            console.log("Goodbye")
        }
    })

}
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addARoll() {
    inquirer.prompt ([
        {
            type: "input",
            message: "Please enter a new role",
            name: "addRole"
        }, {
            type: "input",
            message: "Enter a title",
            name: "addTitle"
        }, {
            type: "decimal",
            message: "Enter salary",
            name: "addSalary"
        }, {
            type: "input",
            message: "Which department?",
            name: "addToDepartment",
        }, {
            type: "confirm",
            message: "Would you like to return to the main menu?",
            name: "returnMainMenu"
        }
        
    ]).then((response) => {
        `INSERT INTO roles (name, title, salary, department)
        VALUES ("${response.name}");
        SELECT * FROM roles;`
        if (response.returnMainMenu) {
            beginInquiry()
        } else {
            console.log("Goodbye")
        }
    })
}
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addAnEmployee(){
    inquirer.prompt ([
        {
            type: "input",
            message: "Enter first name",
            name: "addFirst"
        }, {
            type: "input",
            message: "Enter last name",
            name: "addLast"
        }, {
            type: "input",
            message: "Enter their role",
            name: "whichRole"
        }, {
            type: "input",
            message: "What is their manager's id?",
            name: "addManager",
        }, {
            type: "confirm",
            message: "Would you like to return to the main menu?",
            name: "returnMainMenu"
        }
        
    ]).then((response) => {
        `INSERT INTO employees (name)
        VALUES ("${response.name}");
        SELECT * FROM department;`
        if (response.returnMainMenu) {
            beginInquiry()
        } else {
            console.log("Goodbye")
        }
    })
}
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployee(){

}
module.exports = beginInquiry

function addIntern(answers) {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select the school you attend:",
            name: "school",
            choices: ["University of Washington", "Central Washington University", "Washington University", "Unversity of Community College"]
        }, {
            type: "confirm",
            message: "Would you like to add a team members?",
            name: "addNew"
        }
    ]).then((response) => {
        const intern = new Intern(answers.name, answers.id, answers.email, response.school)
        employeeArray.push(intern)
        console.log(intern)
        if (response.addNew) {
            Begin()
        } else {
            writeHTML()
        }
    })
}