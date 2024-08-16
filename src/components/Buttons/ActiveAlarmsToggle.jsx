import React from "react";
import { Box, Switch, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function ActiveAlarmsToggle({ checked, onChange }) {
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<NotificationsIcon />
			<Typography>Active Alarms</Typography>
			<Switch checked={checked} onChange={onChange} />
		</Box>
	);
}

export default ActiveAlarmsToggle;
