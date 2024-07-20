// CityFilters.js
import React from "react";
import Viewer from "./3DViewer";
import Facilities from "./Facilities";
import UseCases from "./UseCases";
/* import { useLocation } from "react-router-dom";
import ButtonTopDubai from "./ButtonTopDubai";
import ButtonsTopFacility from "./ButtonsTopFacility";
import ButtonsBottomDubai from "./ButtonsBottomDubai";
import ButtonsBottomFacility from "./ButtonsBottomFacility"; */

export default function CityFilters() {
	/* 	const location = useLocation();

	const renderTopButtons = () => {
		if (location.pathname.startsWith("/dubai")) {
			return location.pathname.match(/\/dubai\/[^/]+$/) ? (
				<ButtonsTopFacility />
			) : (
				<ButtonTopDubai />
			);
		}
		return null;
	};

	const renderBottomButtons = () => {
		if (location.pathname.startsWith("/dubai")) {
			return location.pathname.match(/\/dubai\/[^/]+$/) ? (
				<ButtonsBottomFacility />
			) : (
				<ButtonsBottomDubai />
			);
		}
		return null;
	}; */

	return (
		<>
			{/* {renderTopButtons()} */}
			<Viewer />
			<Facilities />
			<UseCases />
			{/* {renderBottomButtons()} */}
		</>
	);
}
