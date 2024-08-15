import React, { useMemo } from "react";

import Renderer from "../../Renderer";
import Experience from "../Experience";
import Overlay from "../Overlay/Overlay";
import { Loader } from "@react-three/drei";
import { Leva } from "leva";

export default function FacilityScene() {
	const memoizedBuildingScene = useMemo(() => {
		return (
			<Renderer>
				<Experience />
			</Renderer>
		);
	}, []);
	return (
		<>
			{memoizedBuildingScene}
			<Overlay />
			<Loader />
			<Leva hidden />
		</>
	);
}
