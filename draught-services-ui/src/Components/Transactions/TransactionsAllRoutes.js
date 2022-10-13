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

const TransRouteNamesTableAttributes = [
	{
		title: "Route Name",
		attributeDBName: "routeName",
		align: "center",
	},
	{
		title: "Route ID",
		attributeDBID: "routeID",
		align: "left",
	},
];

export default function TransAllRoutes(props) {
	const [allRouteNames, setAllRouteNames] = useState([]);

	useEffect(() => {
		const api = new API();

		async function getTransAllRoute() {
			const allRouteNamesJSONString = await api.getAllRouteNames();
			console.log("...grabbing transactions for all rotues");
			setAllRouteNames(allRouteNamesJSONString.data);
		}

		getTransAllRoute();
	}, []);

	const TRow = ({transAllRouteNameObject}) => {
		const [transAllRoute, setTransAllRoute] = useState([]);

		useEffect(() => {
			const api = new API();

			async function getTransAllRoute() {
				const transAllRoutesJSONString = await api.transRoute(
					281,
					transAllRouteNameObject.routeID
				);
				setTransAllRoute(transAllRoutesJSONString.data);
			}

			getTransAllRoute();
		}, []);

		return (
			<Table sx={{minWidth: 650}} aria-label="route name table">
				<TableRow x={{"&:last-child td, &:last-child th": {border: 0}}}>
					<TableHead>
						{TransRouteNamesTableAttributes.map((attr, idx) => (
							<TableCell key={idx} align={attr.align}>
								{
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
										width="100%"
										mt={2}
									>
										<h1>{transAllRouteNameObject[attr.attributeDBName]}</h1>
									</Box>
								}
							</TableCell>
						))}
					</TableHead>
					<TableBody>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							width="100%"
							met={2}
						>
							{transAllRoute.length > 0 && (
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
											{transAllRoute.map((transAllRoute, idx) => (
												<TableRow
													sx={{
														"&:last-child td, &:last-child th": {
															border: 0,
														},
													}}
												>
													{TransRouteTableAttributes.map((attr, idx) => (
														<TableCell key={idx} align={attr.align}>
															{transAllRoute[attr.attributeDBName]}
														</TableCell>
													))}
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							)}
						</Box>
					</TableBody>
				</TableRow>
			</Table>
		);
	};

	return (
		<Fragment>
			<Box display="flex" justifyContent="center" alignItems="center" width="100%">
				{allRouteNames.length > 0 && (
					<TableContainer component={Paper}>
						{allRouteNames.map((allRouteNames, idx) => (
							<TRow transAllRouteNameObject={allRouteNames} key={idx} />
						))}
					</TableContainer>
				)}
			</Box>
		</Fragment>
	);
}
