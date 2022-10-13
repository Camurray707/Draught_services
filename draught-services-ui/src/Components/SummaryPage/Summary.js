import React, {useState, useEffect, Fragment} from "react";
import API from "../../API_Interface/API_Interface";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const TransSummaryTableAttributes = [
	{
		title: "Transaction ID",
		attributeDBName: "transactionID",
		align: "left",
	},
	{
		title: "Transaction Date",
		attributeDBName: "transactionDate",
		align: "left",
	},
	{
		title: "Employee ID",
		attributeDBName: "employeeID",
		align: "left",
	},
	{
		title: "Account ID",
		attributeDBName: "accountID",
		align: "left",
	},
	{
		title: "Product ID",
		attributeDBName: "productID",
		align: "left",
	},
	{
		title: "Distributor ID",
		attributeDBName: "distributorID",
		align: "left",
	},
	{
		title: "Market ID",
		attributeDBName: "marketID",
		align: "left",
	},
	{
		title: "Route ID",
		attributeDBName: "routeID",
		align: "left",
	},
	{
		title: "Taps",
		attributeDBName: "taps",
		align: "left",
	},
];

export default function Summary(props) {
	const [summary, setSummary] = useState([]);

	useEffect(() => {
		const api = new API();

		async function getSummary() {
			const summaryJSONString = await api.transSummary();
			setSummary(summaryJSONString.data);
			console.log("...grabbing summary of last 100 transactions");
		}

		getSummary();
	}, []);

	const TRow = ({summaryObject}) => {
		return (
			<TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
				{TransSummaryTableAttributes.map((attr, idx) => (
					<TableCell key={idx} align={attr.align}>
						{summaryObject[attr.attributeDBName]}
					</TableCell>
				))}
			</TableRow>
		);
	};

	return (
		<Fragment>
			<Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
				<h1>Summary of last 100 Transactions</h1>
			</Box>
			{summary.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{minWidth: 650}} aria-label="summary table">
						<TableHead>
							<TableRow>
								{TransSummaryTableAttributes.map((attr, idx) => (
									<TableCell key={idx} align={attr.align}>
										{attr.title}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{summary.map((summary, idx) => (
								<TRow summaryObject={summary} key={idx} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Fragment>
	);
}
