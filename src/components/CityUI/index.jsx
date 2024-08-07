import React from "react";
import CityHeader from "../CityHeader";
import CityFilters from "../CityFilters";
import { Box } from "@mui/material";
import PopupAlert from "../PopupAlert";

export default function CityUI() {
	return (
		<>
			<Box
				width="100%"
				display="flex"
				flexDirection="column"
				position="absolute"
				zIndex="999"
			>
				<CityHeader />
				<CityFilters />
			</Box>
		</>
	);
}
