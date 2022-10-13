const dbConnection = require("../../database/mySQLconnect");
const setAccessToken = require("../../config/setAccessToken");

require("dotenv").config();

//GRAB USER FROM SCHEDULER-USERS USING USER ID
const authorizeUser = async (ctx) => {
	console.log("authorizeUser called in LoginController.");
	return new Promise((resolve, reject) => {
		let query = "SELECT * FROM scheduler_users WHERE user_id = ?";
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.user_id],
			},
			(error, tuples) => {
				if (error) {
					console.log("Query error.", error);
					return reject(`Query error. Error msg: error`);
				}
				if (tuples.length === 1) {
					// Did we have a matching user record?
					setAccessToken(ctx, tuples[0]);
					console.log("from studentRecord. About to return ", tuples[0]);
					ctx.body = {
						status: "OK",
						user: tuples[0],
					};
				} else {
					console.log("Not able to identify the user.");
					return reject("No such user.");
				}
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("authorize in LoginController threw an exception. Reason...", err);
		ctx.status = 200;
		ctx.body = {
			status: "Failed",
			error: err,
			user: null,
		};
	});
};

module.exports = {
	authorizeUser,
};
