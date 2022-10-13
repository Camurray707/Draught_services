import Accounts from "../Components/Accounts/Accounts";
import Routes from "../Components/Routes/Routes";
import Markets from "../Components/Markets/Markets";
import Transactions from "../Components/Transactions/Transactions";
import Summary from "../Components/SummaryPage/Summary";

import TransactionsAccount from "../Components/Transactions/TransactionsAccount";
import TransactionsRoute from "../Components/Transactions/TransactionsRoute";
import TransactionsMarket from "../Components/Transactions/TransactionsMarket";
import TransactionsAllRoutes from "../Components/Transactions/TransactionsAllRoutes";

const presentationComponents = (props) => {
	return [
		{
			title: "Summary",
			component: <Summary />,
		},
		{
			title: "Markets",
			component: <Markets />,
		},
		{
			title: "Routes",
			component: <Routes />,
		},
		{
			title: "Accounts",
			component: <Accounts />,
		},
	];
};

const containerComponents = (props) => {
	return [
		{
			title: "Transactions",
			component: <Transactions />,
		},
	];
};

const transactionsContainerComponents = (props) => {
	return [
		{
			title: "Account Transactions",
			component: <TransactionsAccount />,
		},
		{
			title: "Route Transactions",
			component: <TransactionsRoute />,
		},
		{
			title: "Market Transactions",
			component: <TransactionsMarket />,
		},
		{
			title: "All Route Transactions",
			component: <TransactionsAllRoutes />,
		},
	];
};

export {presentationComponents, containerComponents, transactionsContainerComponents};
