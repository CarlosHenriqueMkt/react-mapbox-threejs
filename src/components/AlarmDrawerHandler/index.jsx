import React from "react";
import { Box } from "@mui/material";

export default function AlarmDrawerHandler({ open, children }) {
	return (
		<Box
			sx={{
				position: "fixed",
				bottom: -100,
				right: open ? 0 : "-400px", // Mover para fora da tela se não estiver aberto
				width: "400px",
				height: "100%",
				transition: "right 0.3s ease",
				zIndex: 999,
				padding: "16px",
				overflowY: "auto",
			}}
		>
			{children}
		</Box>
	);
}
