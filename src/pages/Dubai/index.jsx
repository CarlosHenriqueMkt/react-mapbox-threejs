import React, { Suspense, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import PopupHandler from "../../components/PopUpHandler";
import ButtonsBottomDubai from "../../components/Buttons/HowToUse";
import ButtonTopCityInfo from "../../components/Buttons/ButtonTopCityInfo";
import CityUI from "../../components/CityUI";
import DubaiCityView from "../../components/MapView";
import { Loader } from "@react-three/drei";

export default function Dubai() {
	const moveCameraRef = useRef(null);

	return (
		<Suspense fallback={<Loader />}>
			<CityUI moveCameraToCoordinates={moveCameraRef} />
			<DubaiCityView moveCameraToCoordinates={moveCameraRef} />
			<PopupHandler />
			<ButtonTopCityInfo />
			<ButtonsBottomDubai />
		</Suspense>
	);
}
