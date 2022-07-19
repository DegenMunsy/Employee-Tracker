const mysql = require('mysql2')
const inquirer = require('inquirer')
const cTable = require('console.table')

// connection to the db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MuskokaLaker21!',
        database: 'employees',
    },
    console.log('connected to employee db')
)


//ask questions here

const stateAction = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [ 'View all roles', 'View all employees', 'Add employee', 'Update employee' , 'Add role', 'Add department']
        }
    ]).then(response => {
        switch (response.action){
            case 'View all roles':
                rolesInfo()
                break;
            case 'View all employees':
                employeesInfo()
                break;
            case 'Add employee':
                addEmployee();
                break
            // case for the remaining choices    
        }
    })
}



const rolesInfo = () => {
    db.query('SELECT employee_role.id, employee_role.title, employee_role.salary FROM employee_role LEFT JOIN department ON employee_role.department_id=department.id', function (err, result, fields){
        console.table(result);
        stateAction();
    })
}

const employeesInfo = () => {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee LEFT JOIN department ON employee_role.department_id=department.id")
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is their first name?',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'What is their last name?',
            name: 'lastName',
        },
        {
            type: 'input',
            message: "What is the employee's role ID number?",
            name: 'employeeRole',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return `You did not enter a valid number`
                } else if (answer === ''){
                    return `You did not enter a valid number`
                }
                return true;
            },
        },
        {

            type: 'input',
            message: "What is the employee's manager's ID?",
            name: 'manager',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return `You did not enter a valid number`
                } else if (answer === ''){
                    return `You did not enter a valid number`
                }
                return true;
            },
        },
    ])
    .then((response) => {
        console.log('this is my response', response)

        // if this was successful
        db.query('INSERT INTO employee set ?;', {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: response.employeeRole,
            manager_id: response.manager
            });
            stateAction();
    })
}

//function updateEmployeeRole
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's role ID?",
            name: 'employeeRole',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return `You did not enter a valid number`
                } else if (answer === ''){
                    return `You did not enter a valid number`
                }
                return true;
            },
        },
        {
            type: 'input',
            message: "What is the employee's manager's ID?",
            name: 'manager',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return `You did not enter a valid number`
                } else if (answer === ''){
                    return `You did not enter a valid number`
                }
                return true;
            },
        },
    ])
    .then((response) => {
        console.log('this is my response', response)

        // if this was successful
        db.query('UPDATE INTO employee, employee_role set ?;', {
            role_id: response.employeeRole,
            manager_id: response.manager
            });
            stateAction();
    })
}    
//function addRole
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the mew role's ID?",
            name: 'employeeRole',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return `You did not enter a valid number`
                } else if (answer === ''){
                    return `You did not enter a valid number`
                }
                return true;
            },
        },
        {
            type: 'input',
            message: "What is the employee's manager's ID?",
            name: 'manager',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return `You did not enter a valid number`
                } else if (answer === ''){
                    return `You did not enter a valid number`
                }
                return true;
            },
        },
    ])
    .then((response) => {
        console.log('this is my response', response)

        // if this was successful
        db.query('UPDATE INTO employee, employee_role set ?;', {
            role_id: response.employeeRole,
            manager_id: response.manager
            });
            stateAction();
    })
}    


// addDepartment function


// class DB {
//     constructor(connection){
//         this.connection = connection;

//     }



    // Find all employees. Link with roles and departments to display their roles, salaries, departments and managers
    

    // Find all employees except this specific employee id


    // Create a new employee

    // Remove an employee with a given id

    // update the given employees role

    // update the given employees manager

    //  Find all roles joined with department to displat department name

    // Create a new role

    //  Remove a role from the database

    // find all departments

    // find all departments, join with employees and roles and sum up department budget

    // Create a new department

    // Remove a new department

    // Find all employees in a given department, join with roles and display role titles

    // Find all employees by manager, join with departments and role to display titles and department names
    
