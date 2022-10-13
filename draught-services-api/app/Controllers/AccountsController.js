const dbConnection = require("../../database/mySQLconnect");

//GRAB ALL ACCOUNTS
const allAccounts = async (ctx) => {
	console.log("allAccounts called in AccountsController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            accounts
                        ORDER BY accountName
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in AccountsController::allAccounts", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in allAccounts.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB ACCOUNTS BASED ON ACCOUNT ID
const accountsWithAccountID = async (ctx) => {
	console.log("accountsWithAccountID called in AccountsController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            accounts
                        WHERE 
                            accountID = ?
                        `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.routeID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in AccountsController::accountsWithAccountID",
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
		console.log("Database connection error in accountsWithAccountID.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB ACCOUNT NAME BASED ON ACCOUNT ID
const accountByName = async (ctx) => {
	console.log("accountByName called in AccountsController.");
	return new Promise((resolve, reject) => {
		const query = `
                   SELECT accountName
                    FROM 
                        accounts
                    WHERE 
                        accountID = ?
                    `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.accountID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in AccountsController::accountByName", error);
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
		console.log("Database connection error in accountByName.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

module.exports = {
	allAccounts,
	accountsWithAccountID,
	accountByName,
};
