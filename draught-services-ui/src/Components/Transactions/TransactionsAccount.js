import React, {useState, useEffect, Fragment} from "react";
import API from "../../API_Interface/API_Interface";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const TransAccountTableAttributes = [
	{
		title: "Transaction ID",
		attributeDBName: "transactionID",
		align: "left",
	},
	{
		title: "Employee ID",
		attributeDBName: "employeeID",
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
		title: "Transaction ID",
		attributeDBName: "transactionID",
		align: "left",
	},
	{
		title: "Transaction Date",
		attributeDBName: "transactionDate",
		align: "left",
	},
];

export default function TransAccount(props) {
	const [transAccount, setTransAccount] = useState([]);
	const [accountName, setAccountName] = useState([]);
	const [cycleIDInput, setCycleIDInput] = useState(" ");
	const [accountIDInput, setAccountIDInput] = useState(" ");

	const [buttonListener, setButtonListener] = useState(true);

	useEffect(() => {
		const api = new API();

		async function getTransAccount() {
			const transAccountJSONString = await api.transAccount(cycleIDInput, accountIDInput);
			const accountByNameJSONString = await api.getAccountName(accountIDInput);
			const recentCycleJSONString = await api.getRecentCycle();
			if (cycleIDInput === " ") {
				setCycleIDInput(recentCycleJSONString.data[0].cycleID);
			}
			setTransAccount(transAccountJSONString.data);
			if (accountByNameJSONString.data[0] !== undefined) {
				console.log(
					`...grabbing transactions for account ->${accountByNameJSONString.data[0].accountName}<-`
				);
				setAccountName(accountByNameJSONString.data[0].accountName);
			}
		}

		getTransAccount();
	}, [buttonListener]);

	const handleCycleChange = (event) => {
		setCycleIDInput(event.target.value);
	};

	const handleAccountChange = (event) => {
		setAccountIDInput(event.target.value);
	};

	const TRow = ({transAccountObject}) => {
		return (
			<TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
				{TransAccountTableAttributes.map((attr, idx) => (
					<TableCell key={idx} align={attr.align}>
						{transAccountObject[attr.attributeDBName]}
					</TableCell>
				))}
			</TableRow>
		);
	};

	return (
		<Fragment>
			<Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>
				<TextField
					id="outlined-error-helper-text"
					label="Cycle ID"
					placeholder=""
					value={cycleIDInput}
					onChange={handleCycleChange}
				/>
				<TextField
					id="outlined-error-helper-text"
					label="Account ID"
					placeholder=""
					value={accountIDInput}
					onChange={handleAccountChange}
				/>
				<Divider />
			</Box>

			<Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
				<Button variant="outlined" size="medium" onClick={setButtonListener}>
					Find Account
				</Button>
			</Box>
			<Divider />
			<h1 display="flex" justifyContent="center" alignItems="center" width="100%">
				{accountName}
			</h1>

			<Box display="flex" justifyContent="center" alignItems="center" width="100%" met={2}>
				{transAccount.length > 0 && (
					<TableContainer component={Paper}>
						<Table sx={{minWidth: 650}} aria-label="transAccount table">
							<TableHead>
								<TableRow>
									{TransAccountTableAttributes.map((attr, idx) => (
										<TableCell key={idx} align={attr.align}>
											{attr.title}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{transAccount.map((transAccount, idx) => (
									<TRow transAccountObject={transAccount} key={idx} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>
		</Fragment>
	);
}
