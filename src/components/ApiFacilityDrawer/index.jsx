import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CircleIcon from "@mui/icons-material/Circle";
import { fetchFacilityId } from "../../api/fetchFacilityId";

export default function ApiFacilityDrawer({ open, onClose }) {
	const navigate = useNavigate();

	const handleViewFacility = async () => {
		const id = await fetchFacilityId();
		if (id) {
			navigate(`/dubai/${id}`);
		}
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
					Azure Heights Residences
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
					<InfoCard title="Alarms" value="12" color="blue" />
					<InfoCard title="Work Orders" value="5" color="purple" />
					<InfoCard title="Active WOs" value="2" color="green" />
					<InfoCard title="Closed WOs" value="7" color="blue" />
					<InfoCard title="SLA Met" value="3" color="purple" />
					<InfoCard title="People" value="20" color="purple" />
				</Box>
				<Box sx={{ mb: 2 }}>
					{/* Gráfico de consumo de energia */}
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
