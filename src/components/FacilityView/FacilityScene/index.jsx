import React from "react";
import Renderer from "../../Renderer";
import Experience from "../Experience";
import Overlay from "../Overlay/Overlay";
import { Loader } from "@react-three/drei";
import { Leva } from "leva";

export default function FacilityScene() {
	return (
		<>
			<Renderer>
				<Experience />
			</Renderer>
			<Overlay />
			<Loader />
			<Leva hidden />
		</>
	);
}
