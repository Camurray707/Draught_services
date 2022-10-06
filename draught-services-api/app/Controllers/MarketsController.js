const dbConnection = require('../../database/mySQLconnect');

const allMarkets = async (ctx) => {
    console.log('market all markets called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            markets
                        ORDER BY marketName
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MarketsController::allMarkets", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allMarkets.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const marketsWithMarketID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            market
                        WHERE 
                            marketID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.routeID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MarketsController::marketsWithMarketID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in marketsWithMarketID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

module.exports = {
    allMarkets,
    marketsWithMarketID
};
