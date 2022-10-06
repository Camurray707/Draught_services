const dbConnection = require('../../database/mySQLconnect');

const allTransactions = async (ctx) => {
    console.log('accounts all accounts called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            transactions
                        ORDER BY transactionID
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::allTransactions", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allTransactions.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const transactionsWithTransactionID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            transactions
                        WHERE 
                            transactionID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in TransactionsController::transactionsWithTransactionID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in transactionsWithTransactionID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

module.exports = {
    allTransactions,
    transactionsWithTransactionID
};