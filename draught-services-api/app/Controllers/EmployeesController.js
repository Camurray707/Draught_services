const dbConnection = require('../../database/mySQLconnect');

const allEmployees = async (ctx) => {
    console.log('employees all employees called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            employees
                        ORDER BY employeeName
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in EmployeesController::allEmployees", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allEmployees.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const employeesWithEmployeeID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            employees
                        WHERE 
                            employeeID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in EmployeesControllers::employeesWithEmployeeID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in employeesWithEmployeeID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

module.exports = {
    allEmployees,
    employeesWithEmployeeID
};
