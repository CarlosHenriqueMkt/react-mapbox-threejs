import React from "react";
import { Box, Typography } from "@mui/material";

export default function HazardDetectionCard() {
	// Informação mockada
	const hazardType = "Water Leakage";

	return (
		<Box
			sx={{
				backgroundColor: "rgba(250, 246, 255, 1)",
				borderRadius: 2,
				padding: 2,
				boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
				border: "1px solid rgba(0, 0, 0, 0.1)",
			}}
		>
			<Typography
				variant="body1"
				sx={{
					fontSize: "16px",
					fontWeight: "700",
					color: "rgba(0, 0, 0, 0.8)",
					marginBottom: "8px",
				}}
			>
				Hazard Detection
			</Typography>
			<Box
				sx={{
					backgroundColor: "rgba(255, 0, 0, 0.1)",
					borderRadius: 2,
					padding: "12px 24px",
					textAlign: "center",
				}}
			>
				<Typography
					variant="body2"
					sx={{
						fontSize: "14px",
						fontWeight: "500",
						color: "red",
					}}
				>
					{hazardType}
				</Typography>
			</Box>
		</Box>
	);
}
