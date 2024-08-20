import { Box, Button, useTheme } from "@mui/material";
import React from "react";

export default function FacilityDrawerHandler({ onClick, drawerOpen }) {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
				gap: 2,
				position: "absolute",
				top: 120,
				right: 100,
				backgroundColor: "transparent",
				overflow: "hidden",
				zIndex: "998",
			}}
		>
			<Button
				onClick={onClick}
				sx={{
					width: "66px",
					height: "66px",
					borderRadius: "12px",
					border: drawerOpen
						? `1px solid ${theme.palette.primary.main}`
						: "none",
					backgroundColor: drawerOpen
						? theme.palette.primary.light
						: theme.palette.background.main,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					"&:hover": {
						backgroundColor: theme.palette.primary.light,
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: theme.palette.primary.light,
						borderRadius: "6px",
						width: "52px",
						height: "52px",
					}}
				>
					<Box
						component="img"
						src="/icon/chart.svg"
						alt="map icon"
						style={{ width: "24px", height: "24px" }}
					/>
				</Box>
			</Button>
		</Box>
	);
}
