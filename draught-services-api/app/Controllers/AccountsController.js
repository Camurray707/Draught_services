const dbConnection = require('../../database/mySQLconnect');

const allAccounts = async (ctx) => {
    console.log('accounts all accounts called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            accounts
                        ORDER BY accountName
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in AccountsController::allAccounts", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allAccounts.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const accountsWithAccountID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            accounts
                        WHERE 
                            accountID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in AccountsController::accountsWithAccountID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in accountsWithAccountID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

module.exports = {
    allAccounts,
    accountsWithAccountID
};