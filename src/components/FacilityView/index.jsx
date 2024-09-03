import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import FacilityScene from "./FacilityScene";
import ButtonsTopFacility from "../Buttons/ButtonsTopFacility";
import FacilityDrawer from "../FacilityDrawer";
import FacilityDrawerHandler from "../Buttons/FacilityDrawerHandler";
import { fetchFacilities } from "../../api/fetchFacilities";
import { workOrdersByStatus } from "../../api/workOrdersByStatus";
import { workOrdersSLABreachById } from "../../api/workOrderBySLABreach";
import CityHeader from "../CityHeader";

export default function FacilityView() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { facilityId } = useParams();
	const [building, setBuilding] = useState(null);
	const [facilityDrawerData, setFacilityDrawerData] = useState(null);
	const [hasReloaded, setHasReloaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loadBuildingData = async () => {
			try {
				const fetchedBuilding = await fetchFacilities(facilityId);

				const workOrders = await workOrdersByStatus(facilityId);
				const slaData = await workOrdersSLABreachById(facilityId);

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
