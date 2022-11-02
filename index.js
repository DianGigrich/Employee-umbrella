const mysql = require('mysql2')
const inquirer = require('inquirer')
const cTable = require('console.table');

const emp = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Th1s1s1t!',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

async function beginInquiry() {
  try {
    const entryList = await inquirer.prompt([
      {
        type: "list",
        message: "Select an option:",
        name: "firstList",
        choices: ["View All Departments", "View All Roles", "View All Employees", "View Employees by Department", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role", "Delete An Employee", "EXIT"]
      }
    ])

    switch (entryList.firstList) {
      case "View All Departments":
        viewAllDepartments()
        break;
      case "View All Roles":
        viewAllRoles()
        break;
      case "View All Employees":
        viewAllEmployees()
        break;
      case "View Employees by Department":
        viewEmpByDepartment()
        break;
      case "Add A Department":
        addADepartment()
        break;
      case "Add A Role":
        addARole()
        break;
      case "Add An Employee":
        addAnEmployee()
        break;
      case "Update An Employee Role":
        updateEmployee()
        break;
      case "Delete An Employee":
        deleteEmployee()
        break;
      case "EXIT":
        console.log("GOODBYE")
        break;
    }

  } catch (err) {
    console.log(err)
  }
}


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewAllDepartments() {
  emp.query('SELECT * FROM departments;', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result)
      inquirer.prompt([
        {
          type: "confirm",
          message: "Return to menu?",
          name: "returnMain"
        }
      ]).then((answer) => {
        if (err) {
          console.error(err)
        } else if (answer.returnMain) {
          beginInquiry()
        } else {
          console.log("Goodbye")
        }
      })
    }
  })
};


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles() {
  emp.query('SELECT roles.id, roles.title, roles.salary, departments.name FROM roles JOIN departments ON roles.department = departments.id ORDER BY id;', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result)
      inquirer.prompt([
        {
          type: "confirm",
          message: "Return to menu?",
          name: "returnMain"
        }
      ]).then((answer) => {
        if (err) {
          console.error(err)
        } else if (answer.returnMain) {
          beginInquiry()
        } else {
          console.log("Goodbye")
        }
      })
    }
  });
}



// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {
  emp.query('SELECT employees.id, employees.first_name AS First, employees.last_name AS Last, manager.last_name AS Manager, roles.title AS JobTitle, roles.salary AS Salary, departments.name AS Dept FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department = departments.id LEFT JOIN employees AS manager ON employees.manager_id = manager.id;', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result)
      inquirer.prompt([
        {
          type: "confirm",
          message: "Return to menu?",
          name: "returnMain"
        }
      ]).then((answer) => {
        if (err) {
          console.error(err)
        } else if (answer.returnMain) {
          beginInquiry()
        } else {
          console.log("Goodbye")
        }
      })
    }
  });
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addADepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter a new department",
      name: "addDepartment"
    }
  ]).then((response) => {
    console.log(response.addDepartment, "added!")
    emp.query(`INSERT INTO departments (name) VALUES (?);`, [response.addDepartment], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        inquirer.prompt([
          {
            type: "confirm",
            message: "Return to menu?",
            name: "returnMain"
          }
        ]).then((answer) => {
          if (err) {
            console.error(err)
          } else if (answer.returnMain) {
            beginInquiry()
          } else {
            console.log("Goodbye")
          }
        })
      }
    })
  })
}


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
async function addARole() {

  emp.query("SELECT * FROM departments", function (err, results) {
    let choicesArr = results.map((departments) => {
      return {
        name: departments.name,
        value: departments.id,
      }
    })
    inquirer.prompt([
      {
        type: "input",
        message: "Enter title of role:",
        name: "addTitle"
      }, {
        type: "number",
        message: "Enter salary",
        name: "addSalary"
      }, {
        type: "list",
        message: "What is their department?",
        name: "whichDepartment",
        choices: choicesArr
      }
    ]).then((response) => {
      console.log("Title:" + response.addTitle + " Salary:" + response.addSalary + " DeptId:" + response.whichDepartment + " added!")
      emp.query(`INSERT INTO roles (title, salary, department)
      VALUES (?, ?, ?);`, [response.addTitle, response.addSalary, response.whichDepartment], (err) => {
        if (err) {
          console.log(err)
        } else {
          inquirer.prompt([
            {
              type: "confirm",
              message: "Return to menu?",
              name: "returnMain"
            }
          ]).then((answer) => {
            if (err) {
              console.error(err)
            } else if (answer.returnMain) {
              beginInquiry()
            } else {
              console.log("Goodbye")
            }
          })
        }
      })
    })
  })
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addAnEmployee() {

  inquirer.prompt([
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
      message: "Enter their role id",
      name: "whichRole",
    }, {
      type: "input",
      message: "What is their manager's id?",
      name: "addManager",
    }
  ]).then((response) => {
    console.log("New Employee added")
    emp.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ? , ?, ?);", [response.addFirst, response.addLast, response.whichRole, response.addManager], (err) => {
      if (err) {
        console.log(err)
      } else {
        inquirer.prompt([
          {
            type: "confirm",
            message: "Return to menu?",
            name: "returnMain"
          }
        ]).then((answer) => {
          if (err) {
            console.error(err)
          } else if (answer.returnMain) {
            beginInquiry()
          } else {
            console.log("Goodbye")
          }
        })
      }
    })
  })
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Which employee would you like to change?",
      name: "changedEmp"
    }, {
      type: "input",
      message: "What id would you like to change their role to?",
      name: "roleChange",
    }
  ]).then((response) => {
    emp.query(`UPDATE employees SET role_id = ? WHERE id = ?;`, [response.roleChange, response.changedEmp], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        inquirer.prompt([
          {
            type: "confirm",
            message: "Return to menu?",
            name: "returnMain"
          }
        ]).then((answer) => {
          if (err) {
            console.error(err)
          } else if (answer.returnMain) {
            beginInquiry()
          } else {
            console.log("Goodbye")
          }
        })
      }
    })
  })
}

function deleteEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Which employee would you like to remove?",
      name: "changedEmp"
    }, {
      type: "confirm",
      message: "Are you sure?",
      name: "Delete",
    }, {
      type: "confirm",
      message: "Would you like to return to the main menu?",
      name: "returnMain"
    }
  ]).then((response) => {
    console.log("employee id = " + response + "DELETED")
    emp.query(`DELETE FROM employees WHERE id = ?;`, [response.changedEmp], (err, result) => {
      if (err) {
        console.log(err)
      } else if (response.returnMain) {
        beginInquiry()
      } else {
        console.log("Goodbye")
      }
    })
  })
}

beginInquiry()