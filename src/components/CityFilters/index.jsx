import React from "react";
import Dropdown from "./3DViewer";
import { Box } from "@mui/material";
import Viewer from "./3DViewer";
import Facilities from "./Facilities";

export default function CityFilters() {
	return (
		<>
			<Viewer />
			<Facilities />
		</>
	);
}
