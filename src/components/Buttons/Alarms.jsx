import { Box, useTheme } from "@mui/material";
import React from "react";

export default function Alarms() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				position: "absolute",
				top: 120,
				left: 685,
				width: "350px",
				paddingInline: "16px",
				boxShadow: 3,
				borderRadius: "8px",
				backgroundColor: theme.palette.background.paper,
				overflow: "hidden",
			}}
		>
			<Box
				onClick={() => setOpen(!open)}
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					paddingBlock: "13px",
					cursor: "pointer",
					backgroundColor: "transparent",
				}}
			>
				Alarms
			</Box>
		</Box>
	);
}
