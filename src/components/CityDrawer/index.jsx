import React from "react";
import { Drawer, Box, Typography } from "@mui/material";
import "./cityDrawer.css"; // Import the CSS file for custom styles

export default function CityDrawer({ drawerOpen, onClose, content }) {
	return (
		<Drawer anchor="right" open={drawerOpen} onClose={onClose}>
			<Box
				sx={{ width: 250, padding: 2 }}
				role="presentation"
				onClick={onClose}
				onKeyDown={onClose}
				className="custom-drawer"
			>
				{content}
			</Box>
		</Drawer>
	);
}
