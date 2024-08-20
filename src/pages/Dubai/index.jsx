import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import PopupHandler from "../../components/PopUpHandler";
import ButtonsBottomDubai from "../../components/Buttons/HowToUse";
import ButtonTopCityInfo from "../../components/Buttons/ButtonTopCityInfo";
import CityUI from "../../components/CityUI";
import DubaiCityView from "../../components/MapView";

export default function Dubai() {
	return (
		<React.Fragment>
			<CityUI />
			<DubaiCityView />
			<PopupHandler />
			<ButtonTopCityInfo />
			<ButtonsBottomDubai />
		</React.Fragment>
	);
}
