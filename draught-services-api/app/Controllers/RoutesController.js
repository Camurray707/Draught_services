const dbConnection = require("../../database/mySQLconnect");

//GRAB ALL ROUTES
const allRoutes = async (ctx) => {
	console.log("allRoutes called in RoutesController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            routes
                        ORDER BY routeName
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in RoutesController::allRoutes", error);
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

//GRAB ROUTE BASED ON ROUTE ID
const routeWithRouteID = async (ctx) => {
	console.log("routeWithRouteID called in RoutesController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            routes
                        WHERE 
                            routeID = ?
                        ORDER BY routeName
                        `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.routeID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in RoutesController::routeWithRouteID", error);
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
		console.log("Database connection error in allRoutes.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB ROUTE NAME FROM ROUTES BASED ON ROUTE ID
const routeByName = async (ctx) => {
	console.log("routeByName called in RoutesController.");
	return new Promise((resolve, reject) => {
		const query = `
                   SELECT routeName
                    FROM 
                        routes
                    WHERE 
                        routeID = ?
                    `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.routeID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in RoutesController::routeByName", error);
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
		console.log("Database connection error in routeByName.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB ROUTE NAME AND ID FROM ROUTES
const allRouteNames = async (ctx) => {
	console.log("allRouteNames called in RoutesController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT routeName, routeID
                        FROM 
                            routes
                        ORDER BY routeName
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in RoutesController::allRoutes", error);
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

module.exports = {
	allRoutes,
	routeWithRouteID,
	routeByName,
	allRouteNames,
};
