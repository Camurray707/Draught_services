const dbConnection = require("../../database/mySQLconnect");

//GRAB ALL TRANSACTIONS BASED ON TRANSACTION ID
const allTransactions = async (ctx) => {
	console.log("allTransactions called in TransactionsController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            transactions
                        ORDER BY transactionID
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in TransactionsController::allTransactions",
						error
					);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in allTransactions.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB TOP 100 TRANSACTIONS FROM TRANSACTIONS BASED ON NEWEST CYCLE ID BASED ON START DATE
const getSummary = async (ctx) => {
	console.log("getSummary called in TransactionsController.");
	return new Promise((resolve, reject) => {
		const query = `
                    SELECT * FROM transactions 
                    WHERE cycleID = (SELECT cycleID FROM cycles ORDER BY startDate DESC LIMIT 1) 
                    ORDER BY transactionDate DESC 
                    LIMIT 100

                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in TransactionsController::getSummary", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in getSummary.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB ALL ROUTES FROM TRANSACTIONS BASED ON CYCLE ID
const allRoutes = async (ctx) => {
	console.log("allRoutes called in TransactionsController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            transactions
                        WHERE
                            cycleID = ?
                        `;
		dbConnection.query(
			{
				sql: query,
				value: [ctx.params.cycleID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in TransactionsController::allRoutes", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in allRoutes.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB THE NUMBER OF CYCLES FROM TRANSACTIONS BASED ON CYCLE ID
const transactionsWithCycleID = async (ctx) => {
	console.log("transactionsWithCycleID called in TransactionsController.");
	return new Promise((resolve, reject) => {
		const query = `
                   SELECT COUNT(*) 'Number of cycles'
                    FROM 
                        transactions
                    WHERE 
                        cycleID = ?
                    `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.cycleID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in TransactionsController::transactionsWithCycleID",
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
		console.log("Database connection error in transactionsWithCycleID.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB ALL TRANSACTIONS WITH ACCOUNT ID
const transactionsWithAccountID = async (ctx) => {
	console.log("transactionsWithAccountID called in TransactionsController.");
	return new Promise((resolve, reject) => {
		const query = `
                   SELECT *
                    FROM 
                        transactions
                    WHERE
                        cycleID = ?
                        AND
                        accountID = ?
                    `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.cycleID, ctx.params.accountID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in TransactionsController::transactionsWithAccountID",
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
		console.log("Database connection error in transactionsWithAccountID.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB ALL TRANSACTIONS WITH ROUTE ID
const transactionsWithRouteID = async (ctx) => {
	console.log("transactionsWithRouteID called in TransactionsController.");
	return new Promise((resolve, reject) => {
		const query = `
                   SELECT *
                    FROM 
                        transactions
                    WHERE 
                        cycleID = ?
                        AND
                        routeID = ?
                    `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.cycleID, ctx.params.routeID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in TransactionsController::transactionsWithRouteID",
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
		console.log("Database connection error in transactionsWithRouteID.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB ALL TRANSACTIONS WITH MARKET ID
const transactionsWithMarketID = async (ctx) => {
	console.log("transactionsWithMarketID called in TransactionsController.");
	return new Promise((resolve, reject) => {
		const query = `
                   SELECT *
                    FROM 
                        transactions
                    WHERE 
                        cycleID = ?
                        AND
                        marketID = ?
                    `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.cycleID, ctx.params.marketID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in TransactionsController::transactionsWithMarketID",
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
		console.log("Database connection error in transactionsWithMarketID.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

module.exports = {
	allTransactions,
	transactionsWithCycleID,
	transactionsWithAccountID,
	transactionsWithRouteID,
	transactionsWithMarketID,
	allRoutes,
	getSummary,
};
