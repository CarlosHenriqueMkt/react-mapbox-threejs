import React from "react";
import CityHeader from "../CityHeader";
import { Box } from "@mui/material";

export default function CityUI() {
	return (
		<>
			<Box
				width="100vw"
				display="flex"
				flexDirection="column"
				position="absolute"
				zIndex="999"
			>
				<CityHeader />
			</Box>
		</>
	);
}
