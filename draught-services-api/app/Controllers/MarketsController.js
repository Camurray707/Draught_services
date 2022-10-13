const dbConnection = require("../../database/mySQLconnect");

//GRAB ALL MARKETS
const allMarkets = async (ctx) => {
	console.log("allMarkets called in MarketsController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            markets
                        ORDER BY marketName
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in MarketsController::allMarkets", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in allMarkets.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB MARKET BASED ON MARKET ID
const marketsWithMarketID = async (ctx) => {
	console.log("marketsWithMarketID called in MarketsController.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            markets
                        WHERE 
                            marketID = ?
                        `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.marketID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in MarketsController::marketsWithMarketID",
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
		console.log("Database connection error in marketsWithMarketID.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

//GRAB MARKET NAME FROM MARKET BASED ON MARKET ID
const marketByName = async (ctx) => {
	console.log("marketByName called in MarketsController.");
	return new Promise((resolve, reject) => {
		const query = `
                   SELECT marketName
                    FROM 
                        markets
                    WHERE 
                        marketID = ?
                    `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.marketID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in MarketsController::marketByName", error);
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
		console.log("Database connection error in marketByName.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

module.exports = {
	allMarkets,
	marketsWithMarketID,
	marketByName,
};
