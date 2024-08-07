import React, { useState, useEffect, useRef } from "react";
import { alerts as mockAlerts } from "../../data/alerts";
import { Box } from "@mui/material";
import PopupAlert from "../PopupAlert";

export default function PopupHandler() {
	const [alerts, setAlerts] = useState(mockAlerts);
	const containerRef = useRef(null);

	useEffect(() => {
		if (containerRef.current) {
			const { scrollHeight, clientHeight } = containerRef.current;
			containerRef.current.scrollTop = scrollHeight - clientHeight;
		}
	}, [alerts]);

	return (
		<Box
			ref={containerRef}
			sx={{
				position: "fixed",
				left: 10,
				bottom: 0,
				width: "100%",
				maxWidth: 450,
				maxHeight: 700,
				overflowY: "auto",
				padding: 2,
				zIndex: 1,
				display: "flex",
				flexDirection: "column-reverse",
				gap: 2,
				"&::-webkit-scrollbar": {
					width: "1px",
					backgroundColor: "transparent",
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "transparent",
				},
				"&::-webkit-scrollbar-track": {
					backgroundColor: "transparent",
				},
			}}
		>
			{alerts.map((alert) => (
				<PopupAlert key={alert.id} alert={alert} />
			))}
		</Box>
	);
}
