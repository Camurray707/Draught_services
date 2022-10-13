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

const TransRouteTableAttributes = [
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

export default function TransRoute(props) {
	const [transRoute, setTransRoute] = useState([]);
	const [routeName, setRouteName] = useState([]);
	const [cycleIDInput, setCycleIDInput] = useState(" ");
	const [routeIDInput, setRouteIDInput] = useState(" ");
	const [buttonListener, setButtonListener] = useState(true);

	useEffect(() => {
		const api = new API();

		async function getTransRoute() {
			const transRouteJSONString = await api.transRoute(cycleIDInput, routeIDInput);
			const routeByNameJSONString = await api.getRouteName(routeIDInput);
			const recentCycleJSONString = await api.getRecentCycle();

			setTransRoute(transRouteJSONString.data);
			if (cycleIDInput === " ") {
				setCycleIDInput(recentCycleJSONString.data[0].cycleID);
			}
			if (routeByNameJSONString.data[0] !== undefined) {
				console.log(
					`...grabbing transactions for route ->${routeByNameJSONString.data[0].routeName}<-`
				);
				setRouteName(routeByNameJSONString.data[0].routeName);
			}
		}

		getTransRoute();
	}, [buttonListener]);

	const handleCycleChange = (event) => {
		setCycleIDInput(event.target.value);
	};

	const handleRouteChange = (event) => {
		setRouteIDInput(event.target.value);
	};

	const TRow = ({transRouteObject}) => {
		return (
			<TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
				{TransRouteTableAttributes.map((attr, idx) => (
					<TableCell key={idx} align={attr.align}>
						{transRouteObject[attr.attributeDBName]}
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
					label="Route ID"
					placeholder=""
					value={routeIDInput}
					onChange={handleRouteChange}
				/>
				<Divider />
			</Box>

			<Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
				<Button variant="outlined" size="medium" onClick={setButtonListener}>
					Find Route
				</Button>
			</Box>
			<Divider />
			<h1 display="flex" justifyContent="center" alignItems="center" width="100%">
				{routeName}
			</h1>

			<Box display="flex" justifyContent="center" alignItems="center" width="100%" met={2}>
				{transRoute.length > 0 && (
					<TableContainer component={Paper}>
						<Table sx={{minWidth: 650}} aria-label="transRoute table">
							<TableHead>
								<TableRow>
									{TransRouteTableAttributes.map((attr, idx) => (
										<TableCell key={idx} align={attr.align}>
											{attr.title}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{transRoute.map((transRoute, idx) => (
									<TRow transRouteObject={transRoute} key={idx} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>
		</Fragment>
	);
}
