import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import FacilityScene from "./FacilityScene";
import ButtonsTopFacility from "../Buttons/ButtonsTopFacility";
import CityUI from "../CityUI";
import FacilityDrawer from "./FacilityDrawer";
import FacilityDrawerHandler from "../Buttons/FacilityDrawerHandler";
import { fetchFacilityId } from "../../api/fetchFacilityId"; // Ajuste o caminho conforme necessário

export default function FacilityView() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { facilityId } = useParams();
	const [building, setBuilding] = useState(null);
	const [hasReloaded, setHasReloaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loadBuildingData = async () => {
			const fetchedBuilding = await fetchFacilityId(facilityId);
			setBuilding(fetchedBuilding);
		};

		loadBuildingData();
	}, [facilityId]);

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
				Loading facility data...
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
