import React, { Suspense, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import PopupHandler from "../../components/PopUpHandler";
import ButtonsBottomDubai from "../../components/Buttons/HowToUse";
import ButtonTopCityInfo from "../../components/Buttons/ButtonTopCityInfo";
import DubaiCityView from "../../components/MapView";

export default function Dubai() {
	return (
		<>
			<DubaiCityView />
			<PopupHandler />
			<ButtonTopCityInfo />
			<ButtonsBottomDubai />
		</>
	);
}
