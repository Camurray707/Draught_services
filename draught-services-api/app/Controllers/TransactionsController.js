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

//todo::
// const allRoutes = async (ctx) => {
//     console.log('accounts all accounts called.');
//     return new Promise((resolve, reject) => {
//         const query = `
//                        SELECT *
//                         FROM 
//                             transactions
//                         WHERE
//                             cycleID = ?
//                         `;
//         dbConnection.query({
//             sql: query,
//             value: [ctx.params.cycleID]
//         }, (error, tuples) => {
//             if (error) {
//                 console.log("Connection error in TransactionsController::allRoutes", error);
//                 return reject(error);
//             }
//             ctx.body = tuples;
//             ctx.status = 200;
//             return resolve();
//         });
//     }).catch(err => {
//         console.log("Database connection error in allRoutes.", err);
//         // The UI side will have to look for the value of status and
//         // if it is not 200, act appropriately.
//         ctx.body = [];
//         ctx.status = 500;
//     });
// }

const transactionsWithCycleID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT COUNT(*) 'Number of cycles'
                    FROM 
                        transactions
                    WHERE 
                        cycleID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::transactionsWithCycleID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionsWithCycleID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const transactionsWithAccountID = (ctx) => {
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
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.accountID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::transactionsWithAccountID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionsWithAccountID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const transactionsWithRouteID = (ctx) => {
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
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.routeID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::transactionsWithRouteID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionsWithRouteID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const transactionsWithMarketID = (ctx) => {
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
        dbConnection.query({
            sql: query,
            values: [ctx.params.cycleID, ctx.params.marketID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::transactionsWithMarketID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in transactionsWithMarketID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allTransactions,
    transactionsWithCycleID,
    transactionsWithAccountID,
    transactionsWithRouteID,
    transactionsWithMarketID,
};