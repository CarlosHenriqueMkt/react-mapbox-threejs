// CityFilters.js
import React from "react";
import { useLocation } from "react-router-dom";
import Viewer from "./3DViewer";
import Facilities from "./Facilities";
import UseCases from "./UseCases";
import ButtonsTopFacility from "./ButtonsTopFacility";
import ButtonTopCityInfo from "./ButtonTopCityInfo";

export default function CityFilters() {
	const location = useLocation();

	const renderTopButtons = () => {
		if (location.pathname.startsWith("/dubai")) {
			return location.pathname.match(/\/dubai\/[^/]+$/) ? (
				<ButtonsTopFacility />
			) : (
				<ButtonTopCityInfo />
			);
		}
		return null;
	};

	/* 	
	const renderBottomButtons = () => {
		if (location.pathname.startsWith("/dubai")) {
			return location.pathname.match(/\/dubai\/[^/]+$/) ? (
				<ButtonsBottomFacility />
			) : (
				<ButtonsBottomDubai />
			);
		}
		return null;
	}; 
	*/

	return (
		<>
			<Viewer />
			<Facilities />
			<UseCases />
			{renderTopButtons()}
			{/* {renderBottomButtons()} */}
		</>
	);
}
