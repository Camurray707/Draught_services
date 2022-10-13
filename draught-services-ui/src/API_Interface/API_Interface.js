import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    //ROUTE ROUTES
    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }

    async routesWithID(routeID) {
        return axiosAgent.get(`routes/${routeID}`);
    } 
    
    async getRouteName(routeID) {
        return axiosAgent.get(`routes/${routeID}/by-name`)
    }

    async getAllRouteNames() {
        return axiosAgent.get(`routes/all-names`)
    }

    //MARKET ROUTES
    async allMarkets() {
        return axiosAgent.get(`markets/all-markets`);
    }

    async marketsWithID(marketID) {
        return axiosAgent.get(`markets/${marketID}`);
    }

    async getMarketName(marketID) {
        return axiosAgent.get(`markets/${marketID}/by-name`)
        }

    //ACCOUNT ROUTES
    async allAccounts() {
        return axiosAgent.get(`accounts/all-accounts`);
    }

    async getAccountName(accountID) {
        return axiosAgent.get(`accounts/${accountID}/by-name`)
        }

    async accountsWithAccountID(accountID) {
        return axiosAgent.get(`accounts/${accountID}`);
    }

    //TRANSACTION ROUTES
    async transAccount(cycleID, accountID) {
        return axiosAgent.get(`transactions/${cycleID}/${accountID}/one-account`)
    }

    async transRoute(cycleID, routeID) {
        return axiosAgent.get(`transactions/${cycleID}/${routeID}/trans-for-route`)
    }

    async transRoutes(cycleID,routeID) {
        return axiosAgent.get(`transactions/${cycleID}/${routeID}/trans-for-route`)
    }

    async transAllRoutes(cycleID) {
        return axiosAgent.get(`transactions/${cycleID}/all-routes`)
    }

    async transMarket(cycleID, marketID) {
        return axiosAgent.get(`transactions/${cycleID}/${marketID}/trans-for-market`)
    }

    async transSummary() {
        return axiosAgent.get('transactions/summary')
    }

    //CYCLE ROUTES
    async getRecentCycle() {
        return axiosAgent.get('cycles/recent')
    }


}