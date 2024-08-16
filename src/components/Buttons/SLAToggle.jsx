import React from "react";
import { Box, Switch, Typography } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

function SLAToggle({ checked, onChange }) {
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<AssignmentTurnedInIcon />
			<Typography>SLA</Typography>
			<Switch checked={checked} onChange={onChange} />
		</Box>
	);
}

export default SLAToggle;
