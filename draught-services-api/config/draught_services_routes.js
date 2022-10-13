const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');


/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.
const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("draught_services_routes.js: login-route error:", err));

//Cycle route configuration.
const CycleController = require('../app/Controllers/CycleController.js');
const cycleRouter = require('koa-router')({
    prefix: '/cycles'
});
cycleRouter.use(VerifyJWT);
cycleRouter.get('/recent', Authorize('admin'), CycleController.getRecentCycle, (err) => console.log(`recent cycle ran into an error: ${err}`));

// Routes router configuration.
const RoutesController = require('../app/Controllers/RoutesController.js');
const routesRouter = require('koa-router')({
    prefix: '/routes'
});
routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/all-names', Authorize('admin'), RoutesController.allRouteNames, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID/', Authorize('admin'), RoutesController.routeWithRouteID);
routesRouter.get('/:routeID/by-name', Authorize('admin'), RoutesController.routeByName);



// Markets router configuration.
const MarketsController = require('../app/Controllers/MarketsController.js');
const marketsRouter = require('koa-router')({
    prefix: '/markets'
});
marketsRouter.use(VerifyJWT);
marketsRouter.get('/all-markets', Authorize('admin'), MarketsController.allMarkets, err => console.log(`allMarkets ran into an error: ${err}`));
marketsRouter.get('/:marketID/', Authorize('admin'), MarketsController.marketsWithMarketID);
marketsRouter.get('/:marketID/by-name', Authorize('admin'), MarketsController.marketByName);



// Employees router configuration.
const EmployeesController = require('../app/Controllers/EmployeesController.js');
const employeesRouter = require('koa-router')({
    prefix: '/employees'
});
employeesRouter.use(VerifyJWT);
employeesRouter.get('/all-employees', Authorize('admin'), EmployeesController.allEmployees, err => console.log(`allEmployees ran into an error: ${err}`));
employeesRouter.get('/:employeeID/', Authorize('admin'), EmployeesController.employeesWithEmployeeID);


// Accounts router configuration.
const AccountsController = require('../app/Controllers/AccountsController.js');
const accountsRouter = require('koa-router')({
    prefix: '/accounts'
});
accountsRouter.use(VerifyJWT);
accountsRouter.get('/all-accounts', Authorize('admin'), AccountsController.allAccounts, err => console.log(`allAccounts ran into an error: ${err}`));
accountsRouter.get('/:accountID/', Authorize('admin'), AccountsController.accountsWithAccountID);
accountsRouter.get('/:accountID/by-name', Authorize('admin'), AccountsController.accountByName);


// Transactions router configuration.
const TransactionsController = require('../app/Controllers/TransactionsController.js');
const transactionsRouter = require('koa-router')({
    prefix: '/transactions'
});
transactionsRouter.use(VerifyJWT);
transactionsRouter.get('/all-transactions', Authorize('admin'), TransactionsController.allTransactions, err => console.log(`allTransactions ran into an error: ${err}`));
transactionsRouter.get('/summary', Authorize('admin'), TransactionsController.getSummary, err => console.log(`allTransactions ran into an error: ${err}`));
transactionsRouter.get('/:cycleID/', Authorize('admin'), TransactionsController.transactionsWithCycleID);
transactionsRouter.get('/:cycleID/:accountID/one-account', Authorize('admin'), TransactionsController.transactionsWithAccountID);
transactionsRouter.get('/:cycleID/:routeID/trans-for-route', Authorize('admin'), TransactionsController.transactionsWithRouteID);
transactionsRouter.get('/:cycleID/all-routes', Authorize('admin'), TransactionsController.allRoutes, err => console.log(`all-routes ran into an error: ${err}`));
transactionsRouter.get('/:cycleID/:marketID/trans-for-market', Authorize('admin'), TransactionsController.transactionsWithMarketID);


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    routesRouter.routes(),
    marketsRouter.routes(),
    employeesRouter.routes(),
    accountsRouter.routes(),
    transactionsRouter.routes(),
    cycleRouter.routes(),

);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
