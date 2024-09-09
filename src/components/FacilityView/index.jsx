import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import FacilityScene from "./FacilityScene";
import ButtonsTopFacility from "../Buttons/ButtonsTopFacility";
import FacilityDrawer from "../FacilityDrawer";
import FacilityDrawerHandler from "../Buttons/FacilityDrawerHandler";
import CityHeader from "../CityHeader";

// Mock data para substituir as APIs
const mockFacilities = [
	{
		id: 1,
		name: "Facility 1",
		location: { city: "Dubai", latitude: 25.197197, longitude: 55.274376 },
		description: "Description for Facility 1",
	},
	// Adicione mais mock facilities conforme necessário
];

const mockWorkOrders = {
	totalRecords: 120,
	data: [
		{ status: "In Progress" },
		{ status: "In Progress" },
		{ status: "Closed" },
		{ status: "In Progress" },
		{ status: "Closed" },
	],
};

const mockSLAData = {
	slaBreach: {
		data: {
			restoration: 5,
		},
	},
};

export default function FacilityView() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { facilityId } = useParams();
	const [building, setBuilding] = useState(null);
	const [facilityDrawerData, setFacilityDrawerData] = useState(null);
	const [hasReloaded, setHasReloaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loadBuildingData = () => {
			try {
				// Substitui a chamada da API `fetchFacilities` por dados mockados
				const fetchedBuilding = mockFacilities.find(
					(facility) => facility.id.toString() === facilityId
				);

				// Substitui a chamada da API `workOrdersByStatus` por dados mockados
				const workOrders = mockWorkOrders;

				// Substitui a chamada da API `workOrdersSLABreachById` por dados mockados
				const slaData = mockSLAData;

				const statusCounts = workOrders?.data?.reduce(
					(acc, workOrder) => {
						const status = workOrder.status;
						acc[status] = (acc[status] || 0) + 1;
						return acc;
					},
					{}
				);

				const slaMet = slaData?.slaBreach?.data?.restoration ?? 0;

				setFacilityDrawerData({
					...fetchedBuilding,
					workOrdersTotal: workOrders?.totalRecords ?? 0,
					statusCounts,
					slaMet,
				});

				setBuilding(fetchedBuilding);
			} catch (error) {
				console.error("Failed to load facility data:", error);
			}
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
			<Box
				width="100vw"
				display="flex"
				flexDirection="column"
				position="absolute"
				zIndex="999"
			>
				<CityHeader />
			</Box>
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
					facilityDrawerData={facilityDrawerData}
				/>
			</Box>
		</>
	);
}
