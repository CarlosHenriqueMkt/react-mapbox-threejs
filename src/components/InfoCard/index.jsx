import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import React from "react";

export default function InfoCard({ title, value, color }) {
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
}
