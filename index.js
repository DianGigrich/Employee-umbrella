const mysql = require('mysql2')
const inquirer = require('inquirer')
const express = require("express")
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role", "EXIT"]
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
      case "EXIT":
        console.log("GOODBYE")
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
        }
      })
    }
  })
};


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles() {
  emp.query('SELECT * FROM roles;', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
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
        }
      })
    }
  });
}



// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {
  emp.query('SELECT * FROM employees;', (err, result) => {
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
    }, {
      type: "confirm",
      message: "Return to menu?",
      name: "returnMain"
    }
  ]).then((response) => {
    emp.query(`INSERT INTO departments (name) VALUES (?);`, [response.addDepartment], (err, result) => {
      if (err) {
        console.log(err)
      } else if (response.returnMain) {
        console.log(result)
        beginInquiry()
      } else {
        console.log("Goodbye")
      }
    })
  })
}




// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addARole() {
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
      type: "input",
      message: "Enter their department id:",
      name: "whichDepartment"
    }, {
      type: "confirm",
      message: "Would you like to return to the main menu?",
      name: "returnMain"
    }
  ]).then((response) => {
    emp.query(`INSERT INTO roles (title, salary, department)
      VALUES (?, ?, ?);`, [response.addTitle, response.addSalary, response.whichDepartment], (err, result) => {
      if (err) {
        console.log(err)
      } else if (response.returnMain) {
        console.log(result)
        beginInquiry()
      } else {
        console.log("Goodbye")
      }
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
      name: "whichRole"
    }, {
      type: "input",
      message: "What is their manager's id?",
      name: "addManager",
    }, {
      type: "confirm",
      message: "Would you like to return to the main menu?",
      name: "returnMain"
    }
  ]).then((response) => {
    emp.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
      VALUES (?, ? , ?, ?);`, [response.addFirst, response.addLast, response.whichRole, response.addManager], (err, result) => {
      if (err) {
        console.log(err)
      } else if (response.returnMain) {
        console.table(result)
        beginInquiry()
      } else {
        console.log("Goodbye")
      }
    })
  })
}


// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployee(answers) {

  inquirer.prompt(
    {
      type: "input",
      message: "Which employee would you like to change?",
      name: "changedEmp",
    }, {
    type: "input",
    message: "what would you like to change their role to?",
    name: "roleChange"
  }, {
    type: "confirm",
    message: "Would you like to return to the main menu?",
    name: "returnMain"
  }
  ).then((response) => {
    emp.query(`UPDATE employees SET ? WHERE id = ?;`, [response.roleChange, response.changedEmp], (err, result) => {
      if (err) {
        console.log(err)
      } else if (response.returnMain) {
        console.log(result)
        beginInquiry()
      } else {
        console.log("Goodbye")
      }
    })
  })
}

beginInquiry()

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});