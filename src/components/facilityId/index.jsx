import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alerts } from "../../data/alerts";
import { Box, Button } from "@mui/material";

export default function FacilityId() {
	const { facilityId } = useParams();
	const alert = alerts.find((alert) => alert.route === facilityId);
	const navigate = useNavigate();

	if (!alert) {
		return (
			<Box
				sx={{
					width: "100vw",
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				Facility not found
				<Button onClick={() => navigate("/dubai")}>
					Voltar para Dubai
				</Button>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<h1>{alert.building}</h1>
			<p>{alert.type}</p>
			<p>{alert.location}</p>
			<p>{alert.alarmType}</p>
			<p>{alert.time}</p>
		</Box>
	);
}
