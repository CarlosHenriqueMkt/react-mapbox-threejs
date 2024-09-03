import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";

export default function FacilityAlarmDrawer({ alarm, onClose }) {
	if (!alarm) return null;

	return (
		<Box
			sx={{
				backgroundColor: "rgba(255, 255, 255, 1)",
				borderRadius: 4,
				padding: 3,
				width: "100%",
				boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 2,
				}}
			>
				<Typography
					variant="h6"
					sx={{ fontWeight: "500", color: "#333" }}
				>
					Alarms Details
				</Typography>
				<IconButton onClick={onClose} sx={{ p: 0 }}>
					<CloseIcon />
				</IconButton>
			</Box>

			<Box
				sx={{
					backgroundColor: "rgba(121, 50, 255, 0.05)",
					borderRadius: 4,
					padding: 2,
					mb: 3,
					border: "1px solid rgba(245, 245, 245, 0.5)",
				}}
			>
				<Box
					sx={{
						backgroundColor: "rgba(255, 0, 0, 0.1)",
						borderRadius: 2,
						padding: "2px 8px",
						display: "inline-block",
						mb: 1,
					}}
				>
					<Typography
						variant="body2"
						sx={{
							color: "red",
							fontWeight: "bold",
							fontSize: "12px",
						}}
					>
						{alarm.status}
					</Typography>
				</Box>
				<Typography variant="h6" sx={{ fontWeight: "700", mb: 1 }}>
					{alarm.name}
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: "#7e3ff2",
						display: "flex",
						alignItems: "center",
						mb: 1,
					}}
				>
					{alarm.address} <LinkIcon fontSize="small" sx={{ ml: 1 }} />
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						ID
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.id}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Created At
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.createdAt}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Acknowledge At
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.acknowledgeAt}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Closed At
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.closedAt}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Reading
					</Typography>
					<Box
						sx={{
							backgroundColor: "rgba(255, 0, 0, 0.1)",
							borderRadius: 2,
							padding: "2px 8px",
						}}
					>
						<Typography
							variant="body2"
							sx={{
								color: "red",
								fontWeight: "bold",
								fontSize: "12px",
							}}
						>
							{alarm.reading}
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					backgroundColor: "rgba(121, 50, 255, 0.02)",
					borderRadius: 4,
					padding: 2,
					border: "1px solid rgba(245, 245, 245, 0.5)",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Asset Name
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.assetName}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Asset Type
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.assetType}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Work Order Reference
					</Typography>
					<Typography
						variant="body2"
						sx={{
							color: "#7e3ff2",
							fontWeight: "bold",
							textDecoration: "underline",
							cursor: "pointer",
						}}
					>
						{alarm.workOrderReference}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Device Name
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.deviceName}
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
					}}
				>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Device ID
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.deviceId}
					</Typography>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography variant="body2" sx={{ color: "#333" }}>
						Device Type
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "#333", fontWeight: "bold" }}
					>
						{alarm.deviceType}
					</Typography>
				</Box>
			</Box>

			<Button
				variant="contained"
				sx={{
					backgroundColor: "#7e3ff2",
					color: "white",
					fontWeight: "bold",
					marginTop: 3,
					width: "100%",
					padding: "10px",
					textTransform: "none",
					borderRadius: 4,
					"&:hover": {
						backgroundColor: "#6b32d6",
					},
				}}
			>
				View Alarm
			</Button>
		</Box>
	);
}
