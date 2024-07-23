import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const PopupAlert = ({ open, onClose, facilityData }) => {
	if (!open) return null;

	return (
		<Box
			sx={{
				position: "fixed",
				bottom: 16,
				left: 16,
				backgroundColor: "#fff5f5",
				border: "1px solid #ffcccc",
				borderRadius: 4,
				boxShadow: 3,
				p: 2,
				zIndex: 1000,
				maxWidth: 400,
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<WarningIcon sx={{ color: "#ff4d4d" }} />
					<Typography variant="h6" sx={{ color: "#ff4d4d" }}>
						Water Leak Detected!
					</Typography>
				</Box>
				<IconButton onClick={onClose} size="small">
					<HighlightOffIcon sx={{ color: "black" }} />
				</IconButton>
			</Box>
			<Typography variant="body2" sx={{ mt: 1 }}>
				Attention needed in <strong>{facilityData.facilityName}</strong>
				: A water leak has been detected in the swimming pool area.
			</Typography>
			<Button
				variant="contained"
				color="error"
				onClick={onClose}
				sx={{ mt: 2 }}
			>
				View Facility
			</Button>
		</Box>
	);
};

export default PopupAlert;
