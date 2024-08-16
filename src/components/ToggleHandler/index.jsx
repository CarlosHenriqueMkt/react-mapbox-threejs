import React, { useState } from "react";
import { Box } from "@mui/material";
import ActiveAlarmsToggle from "../Buttons/ActiveAlarmsToggle";
import SLAToggle from "../Buttons/SLAToggle";

export default function ToggleHandler() {
	const [activeAlarms, setActiveAlarms] = useState(false);
	const [sla, setSla] = useState(false);

	const handleActiveAlarmsChange = () => {
		// If activeAlarms is already true, toggle it off, otherwise activate it
		setActiveAlarms((prev) => !prev);
		// If activeAlarms is being activated, turn off SLA
		if (!activeAlarms) setSla(false);
	};

	const handleSlaChange = () => {
		// If SLA is already true, toggle it off, otherwise activate it
		setSla((prev) => !prev);
		// If SLA is being activated, turn off activeAlarms
		if (!sla) setActiveAlarms(false);
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
			<ActiveAlarmsToggle
				checked={activeAlarms}
				onChange={handleActiveAlarmsChange}
			/>
			<SLAToggle checked={sla} onChange={handleSlaChange} />
		</Box>
	);
}
