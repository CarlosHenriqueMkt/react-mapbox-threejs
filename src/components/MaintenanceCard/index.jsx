import React from "react";
import { Box, Typography } from "@mui/material";
import InfoCard from "../InfoCard";

export default function MaintenanceCard() {
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
				variant="h6"
				sx={{
					fontSize: "16px",
					fontWeight: "600",
					color: "rgba(0, 0, 0, 0.8)",
					marginBottom: "16px",
				}}
			>
				Maintenances
			</Typography>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "16px",
				}}
			>
				<Typography
					variant="body1"
					sx={{
						fontSize: "14px",
						fontWeight: "500",
						color: "rgba(0, 0, 0, 0.7)",
					}}
				>
					Upcoming Maintenance
				</Typography>
				<Typography
					variant="body2"
					sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.5)" }}
				>
					10 April, 23:06:23
				</Typography>
			</Box>

			<Box
				sx={{
					display: "flex",
					gap: 2,
				}}
			>
				<InfoCard title="Cost Of Maintenance" value="12000" color="" />
				<InfoCard title="Cost Of Material" value="4000" color="green" />
				<InfoCard title="Cost Of Labor" value="20000" color="purple" />
			</Box>
		</Box>
	);
}
