import React from "react";
import Viewer from "./3DViewer";
import Facilities from "./Facilities";
import SolutionsScenarios from "./SolutionsScenarios";
import { useLocation } from "react-router-dom";
import Alarms from "../Buttons/Alarms";

export default function CityFilters() {
	const location = useLocation();
	const renderButtons = () => {
		if (location.pathname.startsWith("/dubai")) {
			return location.pathname.match(/\/dubai\/[^/]+$/) ? (
				<SolutionsScenarios />
			) : (
				<Alarms />
			);
		}
		return null;
	};

	return (
		<>
			<Viewer />
			<Facilities />
			{renderButtons()}
		</>
	);
}
