const dbConnection = require("../../database/mySQLconnect");

//GRAB ALL EMPLOYEES
const allEmployees = async (ctx) => {
	console.log("allEmployees called in EmployeesController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            employees
                        ORDER BY employeeName
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in EmployeesController::allEmployees", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in allEmployees.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB EMPLOYEE BASED ON EMPLOYEE ID
const employeesWithEmployeeID = async (ctx) => {
	console.log("employeesWithEmployeeID called in EmployeesController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            employees
                        WHERE 
                            employeeID = ?
                        `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.routeID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in EmployeesControllers::employeesWithEmployeeID",
						error
					);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in employeesWithEmployeeID.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

module.exports = {
	allEmployees,
	employeesWithEmployeeID,
};
