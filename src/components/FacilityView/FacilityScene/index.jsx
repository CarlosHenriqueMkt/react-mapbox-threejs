import React, { useMemo } from "react";

import Renderer from "../../Renderer";
import Experience from "../Experience";
import Overlay from "../Overlay/Overlay";
import { Loader } from "@react-three/drei";
import { Leva } from "leva";
import { Box } from "@mui/material";

export default function FacilityScene() {
	const memoizedBuildingScene = useMemo(() => {
		return (
			<Renderer>
				<Experience />
			</Renderer>
		);
	}, []);
	return (
		<Box overflow="hidden">
			{memoizedBuildingScene}
			<Overlay />
			<Loader />
			<Leva hidden />
		</Box>
	);
}
