import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const airQualityColors = [
	{ label: "Good", value: 50, color: "rgba(121, 180, 115, 1)" },
	{ label: "Moderate", value: 100, color: "rgba(226, 193, 0, 1)" },
	{
		label: "Unhealthy for Sensitive Groups",
		value: 150,
		color: "rgba(238, 147, 0, 1)",
	},
	{ label: "Unhealthy", value: 200, color: "rgba(223, 41, 53, 1)" },
	{ label: "Very Unhealthy", value: 250, color: "rgba(121, 50, 255, 1)" },
	{ label: "Hazardous", value: 300, color: "rgba(85, 0, 0, 1)" },
];

const AirQualityIndicator = ({ value }) => {
	const theme = useTheme();

	const currentLevel = airQualityColors.find(
		(level) => value <= level.value
	) || { label: "Hazardous", color: "maroon" };

	const currentIndex = airQualityColors.findIndex(
		(level) => level.value === currentLevel.value
	);

	const totalLevels = airQualityColors.length;

	// Calcule a posição do número no meio da cor correspondente
	const calculatePosition = (index) => {
		const levelWidth = 100 / totalLevels;
		return (index + 0.5) * levelWidth;
	};

	const currentPosition = calculatePosition(currentIndex);

	return (
		<Box
			sx={{
				backgroundColor: "rgba(250, 246, 255, 1)",
				border: "1px solid rgba(121, 50, 255, 0.1)",
				borderRadius: 2,
				padding: 2,
				position: "relative",
				overflow: "hidden",
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
				Air Quality
			</Typography>
			<Typography
				variant="body2"
				color={currentLevel.color}
				sx={{ display: "flex", alignItems: "center", mb: 1 }}
			>
				{currentLevel.label} <ArrowDropDownIcon fontSize="small" />
			</Typography>
			<Box
				sx={{
					position: "relative",
					height: 20,
					borderRadius: 5,
					overflow: "hidden",
					display: "flex",
				}}
			>
				{airQualityColors.map((level, index) => (
					<Box
						key={index}
						sx={{
							flexGrow: 1,
							height: "100%",
							backgroundColor: level.color,
							borderTopLeftRadius: index === 0 ? 5 : 0,
							borderBottomLeftRadius: index === 0 ? 5 : 0,
							borderTopRightRadius:
								index === totalLevels - 1 ? 5 : 0,
							borderBottomRightRadius:
								index === totalLevels - 1 ? 5 : 0,
						}}
					/>
				))}
				<Typography
					variant="body2"
					sx={{
						position: "absolute",
						top: "50%",
						left: `${currentPosition}%`,
						transform: "translate(-50%, -50%)",
						color: theme.palette.common.white,
						fontWeight: "bold",
					}}
				>
					{value}
				</Typography>
			</Box>
		</Box>
	);
};

export default AirQualityIndicator;
