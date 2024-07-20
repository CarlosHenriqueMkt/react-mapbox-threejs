import React from "react";
import CityHeader from "../CityHeader";
import CityFilters from "../CityFilters";
import { Box } from "@mui/material";

export default function CityUI() {
	return (
		<>
			<Box
				position="absolute"
				zIndex="999"
				sx={{ display: "flex", flexDirection: "column" }}
			>
				<CityHeader />
				<CityFilters />
			</Box>
		</>
	);
}
