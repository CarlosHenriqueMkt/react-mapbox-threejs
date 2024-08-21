import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CircleIcon from "@mui/icons-material/Circle";

export default function CityFacilityDrawer({ open, onClose, facilityData }) {
	const navigate = useNavigate();

	const handleViewFacility = () => {
		navigate(`/dubai/${facilityData.path}`);
	};

	return (
		<Box
			sx={{
				position: "fixed",
				top: "12%",
				right: open ? "16px" : "-400px",
				width: 400,
				height: 800,
				transition: "right 0.3s ease",
				backgroundColor: "white",
				boxShadow: 3,
				p: 2,
				borderRadius: 2,
				zIndex: 999,
			}}
		>
			{facilityData && (
				<Box sx={{ position: "relative", height: "100%" }}>
					<IconButton
						onClick={onClose}
						sx={{
							position: "absolute",
							top: -8,
							right: -8,
							color: "black",
						}}
					>
						<HighlightOffIcon sx={{ fontSize: 20 }} />
					</IconButton>
					<Typography variant="body2" fontWeight="700">
						Details
					</Typography>
					<hr
						style={{
							marginBlock: "16px",
							border: "1px solid #F4F2FF",
						}}
					/>
					<Typography
						variant="h2"
						sx={{ fontSize: "16px", fontWeight: "700", mb: 1 }}
					>
						{facilityData.facilityName}
					</Typography>
					<Typography
						variant="body2"
						sx={{ mb: 2, color: "text.secondary" }}
					>
						Lorem Ipsum is simply and typesetting industry...
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							gap: 2,
							mb: 2,
						}}
					>
						<InfoCard
							title="Alarms"
							value={facilityData.alarms}
							color="blue"
						/>
						<InfoCard
							title="Work Orders"
							value={facilityData.workOrders}
							color="purple"
						/>
						<InfoCard
							title="Active WOs"
							value={facilityData.activeWO}
							color="green"
						/>
						<InfoCard
							title="Closed WOs"
							value={facilityData.closedWO}
							color="blue"
						/>
						<InfoCard
							title="SLA Met"
							value={facilityData.slaMet}
							color="purple"
						/>
						<InfoCard
							title="People"
							value={facilityData.people}
							color="purple"
						/>
					</Box>
					<Box sx={{ mb: 2 }}>
						{/* 						<Typography variant="h6" sx={{ mb: 1 }}>
							Energy Consumption
						</Typography> */}
						{/* Aqui você deve inserir o gráfico de consumo de energia */}
						<Box
							component="img"
							src="/chart.png"
							sx={{
								width: "100%",
								height: "278px",
							}}
						/>
					</Box>
					<Button
						variant="contained"
						color="primary"
						onClick={handleViewFacility}
						sx={{ width: "100%" }}
					>
						View Facility
					</Button>
				</Box>
			)}
		</Box>
	);
}

const InfoCard = ({ title, value, color }) => {
	const getBackgroundColor = (color) => {
		switch (color) {
			case "blue":
				return "rgba(0, 0, 255, 0.1)";
			case "purple":
				return "rgba(128, 0, 128, 0.1)";
			case "green":
				return "rgba(0, 128, 0, 0.1)";
			default:
				return "rgba(0, 0, 0, 0.1)";
		}
	};

	return (
		<Box
			sx={{
				flex: "1 1 calc(50% - 16px)",
				p: 2,
				backgroundColor: getBackgroundColor(color),
				borderRadius: 2,
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography
				variant="h2"
				sx={{ fontSize: "12px", color: "#969696" }}
			>
				{title}
			</Typography>
			<Typography
				variant="body1"
				sx={{ fontSize: "18px", fontWeight: "700", color }}
			>
				{value}
			</Typography>
			<CircleIcon sx={{ color: color, fontSize: "8px" }} />
		</Box>
	);
};
