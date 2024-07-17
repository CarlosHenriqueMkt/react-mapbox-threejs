import React from "react";
import { Drawer, Button } from "@mui/material";

export default function CustomDrawer({ open, onClose, drawerContent }) {
	return (
		<Drawer anchor="right" open={open} onClose={onClose}>
			<div style={{ width: 250 }}>
				<h2>{drawerContent}</h2>
				<Button onClick={onClose}>Close</Button>
			</div>
		</Drawer>
	);
}
