const dbConnection = require("../../database/mySQLconnect");

//GRAB THE MOST RECENT CYCLE IN CYCLES BASED ON START DATE
const getRecentCycle = async (ctx) => {
	console.log("getRecentCycle called in CycleController.");
	return new Promise((resolve, reject) => {
		const query = `
                    SELECT cycleID 
                        FROM cycles 
                        ORDER BY startDate 
                        DESC 
                        LIMIT 1;
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in CycleController::getRecentCycle", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in getRecentCycle.", err);
		ctx.body = [];
		ctx.status = 500;
	});
};

module.exports = {
	getRecentCycle,
};
