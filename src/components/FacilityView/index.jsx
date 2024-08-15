import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alerts } from "../../data/alerts";
import { Box, Button } from "@mui/material";
import FacilityScene from "./FacilityScene";
import ButtonsTopFacility from "../Buttons/ButtonsTopFacility";
import CityUI from "../CityUI";

export default function FacilityView() {
	const { facilityId } = useParams();
	const alert = alerts.find((alert) => alert.route === facilityId);
	const navigate = useNavigate();
	const [hasReloaded, setHasReloaded] = useState(false);

	useEffect(() => {
		// Verifica se a página foi recarregada para a rota atual
		const lastReloadedPath = sessionStorage.getItem("lastReloadedPath");

		if (lastReloadedPath === `/dubai/${facilityId}`) {
			setHasReloaded(true);
		} else {
			// Se não foi recarregado corretamente, ainda não renderiza a UI
			setHasReloaded(false);
		}
	}, [facilityId]);

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
					Back to Dubai
				</Button>
			</Box>
		);
	}

	if (!hasReloaded) {
		// Retorna null ou um placeholder enquanto espera o reload
		return null;
	}

	return (
		<>
			<CityUI />
			<Box position="relative" overflow="hidden">
				<Box
					position="absolute"
					zIndex="999"
					overflow="hidden"
					right={0}
					top={500}
					sx={{ pointerEvents: "none" }}
				>
					<h1>{alert.building}</h1>
					<p>{alert.type}</p>
					<p>{alert.location}</p>
					<p>{alert.alarmType}</p>
					<p>{alert.time}</p>
				</Box>
				<FacilityScene />
				<ButtonsTopFacility />
			</Box>
		</>
	);
}
