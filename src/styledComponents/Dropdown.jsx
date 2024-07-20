import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const DropdownBox = styled(Box, {
	shouldForwardProp: (prop) => prop !== "isTransitioning" && prop !== "open",
})(({ theme, open, isTransitioning }) => ({
	height: open ? "600px" : "0",
	overflowY: isTransitioning ? "hidden" : "auto",
	transition: "all 0.5s ease",
	marginTop: open ? 16 : 0,
	backgroundColor: theme.palette.background.paper,

	// Estilos para a scrollbar
	"&::-webkit-scrollbar": {
		width: "8px",
		paddingBottom: "8px",
	},
	"&::-webkit-scrollbar-track": {
		backgroundColor: "transparent",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: theme.palette.primary.main,
		borderRadius: "8px",
	},
	"&::-webkit-scrollbar-thumb:hover": {
		backgroundColor: theme.palette.primary.dark,
	},
	"&::-webkit-scrollbar-corner": {
		backgroundColor: "transparent",
	},
}));

const DropdownBoxContainer = ({ open, children }) => {
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		let timer;
		if (open) {
			setIsTransitioning(true);
			timer = setTimeout(() => {
				setIsTransitioning(false);
			}, 500); // match this duration with the CSS transition duration
		} else {
			setIsTransitioning(true);
			timer = setTimeout(() => {
				setIsTransitioning(false);
			}, 500); // match this duration with the CSS transition duration
		}
		return () => clearTimeout(timer);
	}, [open]);

	return (
		<DropdownBox open={open} isTransitioning={isTransitioning}>
			{children}
		</DropdownBox>
	);
};

export default DropdownBoxContainer;
