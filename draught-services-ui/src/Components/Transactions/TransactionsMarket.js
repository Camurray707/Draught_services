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

const TransMarketTableAttributes = [
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

export default function TransMarket(props) {
	const [transMarket, setTransMarket] = useState([]);
	const [marketName, setMarketName] = useState([]);
	const [cycleIDInput, setCycleIDInput] = useState(" ");
	const [marketIDInput, setMarketIDInput] = useState(" ");

	const [buttonListener, setButtonListener] = useState(true);

	useEffect(() => {
		const api = new API();

		async function getTransMarket() {
			const transMarketJSONString = await api.transMarket(cycleIDInput, marketIDInput);
			const marketByNameJSONString = await api.getMarketName(marketIDInput);
			const recentCycleJSONString = await api.getRecentCycle();
			if (cycleIDInput === " ") {
				setCycleIDInput(recentCycleJSONString.data[0].cycleID);
			}
			setTransMarket(transMarketJSONString.data);
			if (marketByNameJSONString.data[0] !== undefined) {
				console.log(
					`...grabbing transactions for market ->${marketByNameJSONString.data[0].marketName}<-`
				);
				setMarketName(marketByNameJSONString.data[0].marketName);
			}
		}

		getTransMarket();
	}, [buttonListener]);

	const handleCycleChange = (event) => {
		setCycleIDInput(event.target.value);
	};

	const handleMarketChange = (event) => {
		setMarketIDInput(event.target.value);
	};

	const TRow = ({transMarketObject}) => {
		return (
			<TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
				{TransMarketTableAttributes.map((attr, idx) => (
					<TableCell key={idx} align={attr.align}>
						{transMarketObject[attr.attributeDBName]}
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
					label="Market ID"
					placeholder=""
					value={marketIDInput}
					onChange={handleMarketChange}
				/>
				<Divider />
			</Box>

			<Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
				<Button variant="outlined" size="medium" onClick={setButtonListener}>
					Find Market
				</Button>
			</Box>
			<Divider />
			<h1 display="flex" justifyContent="center" alignItems="center" width="100%">
				{marketName}
			</h1>

			<Box display="flex" justifyContent="center" alignItems="center" width="100%" met={2}>
				{transMarket.length > 0 && (
					<TableContainer component={Paper}>
						<Table sx={{minWidth: 650}} aria-label="transMarket table">
							<TableHead>
								<TableRow>
									{TransMarketTableAttributes.map((attr, idx) => (
										<TableCell key={idx} align={attr.align}>
											{attr.title}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{transMarket.map((transMarket, idx) => (
									<TRow transMarketObject={transMarket} key={idx} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>
		</Fragment>
	);
}
