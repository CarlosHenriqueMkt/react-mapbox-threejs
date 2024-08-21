import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alerts } from "../../data/alerts";
import { buildings } from "../../data/buildings"; // Importe os prédios
import { Box, Button } from "@mui/material";
import FacilityScene from "./FacilityScene";
import ButtonsTopFacility from "../Buttons/ButtonsTopFacility";
import CityUI from "../CityUI";
import FacilityDrawer from "./FacilityDrawer";
import FacilityDrawerHandler from "../Buttons/FacilityDrawerHandler";

export default function FacilityView() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { facilityId } = useParams();
	const building = buildings.find(
		(building) => building.route === facilityId
	);
	const navigate = useNavigate();
	const [hasReloaded, setHasReloaded] = useState(false);

	useEffect(() => {
		const lastReloadedPath = sessionStorage.getItem("lastReloadedPath");

		if (lastReloadedPath === `/dubai/${facilityId}`) {
			setHasReloaded(true);
		} else {
			setHasReloaded(false);
		}

		localStorage.removeItem("facilityId");
		localStorage.setItem("facilityId", facilityId);
	}, [facilityId]);

	if (!building) {
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
					Back to Dubai
				</Button>
			</Box>
		);
	}

	if (!hasReloaded) {
		return null;
	}

	const handleClick = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<>
			<CityUI />
			<FacilityDrawerHandler
				onClick={handleClick}
				drawerOpen={drawerOpen}
			/>
			<Box position="relative" overflow="hidden">
				<FacilityScene />
				<ButtonsTopFacility />
				<FacilityDrawer
					open={drawerOpen}
					onClose={handleClick}
					facilityDrawerData={building}
				/>
			</Box>
		</>
	);
}

{
	/* 
	const buildingAlerts = alerts.filter(
		(alert) => alert.buildingId === building.id
	);
	
	<Box
					position="absolute"
					zIndex="99999"
					overflow="hidden"
					right={0}
					top={0}
					sx={{ pointerEvents: "none" }}
				>
					{buildingAlerts.map((alert) => (
						<div key={alert.id}>
							<p>{alert.type}</p>
							<p>{alert.location}</p>
							<p>{alert.alarmType}</p>
							<p>{alert.time}</p>
						</div>
					))}
				</Box> */
}
